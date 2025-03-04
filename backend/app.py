from flask import Flask, request, jsonify
import cv2
import numpy as np
import pandas as pd
from face_rec import faceapp, ml_search_algorithm, extract_embedding  # Assuming these functions exist
import redis
import base64
from PIL import Image
import json
from datetime import datetime, timedelta
from flask_cors import CORS
import random
import string
import bcrypt



app = Flask(__name__)
CORS(app, resources={r"/": {"origins": ""}})  

@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    return response

def hash_password(password):
    """Hash a password using bcrypt."""
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed

def verify_password(stored_hash, password):
    """Verify if the entered password matches the stored hash."""
    return bcrypt.checkpw(password.encode('utf-8'), stored_hash)

app.secret_key = 'your_secret_key'  # Required for Flask sessions
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(minutes=30)

# Redis connection using CLI-based setup (no password or hostname)
r = redis.StrictRedis(host="localhost", port=6379, decode_responses=True)

@app.route('/getAttendance', methods=['POST'])
def get_attendance():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    # Check if the user exists in Redis
    user_key = f'user:{username}'
    user_data = r.hgetall(user_key)

    if not user_data:
        return jsonify({"error": "Invalid username"}), 400

    # Check password
    stored_password = user_data.get(b'password')
    if stored_password.decode('utf-8') != password:
        return jsonify({"error": "Invalid password"}), 400

    # Get attendance data for the user
    attendance_key = f'attendance:{username}'
    attendance_data = r.lrange(attendance_key, 0, -1)

    # Convert attendance data from Redis and return it
    attendance_list = [json.loads(record.decode('utf-8')) for record in attendance_data]

    return jsonify(attendance_list)

# Threshold for recognition
THRESHOLD = 0.6  # Example threshold; may need adjustment
@app.route('/login', methods=['POST'])
def login():
    try:
        # Get the username and password from the request body
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return jsonify({"message": "Username and password are required"}), 400

        # Fetch user data from Redis
        dataframe = load_dataframe_from_redis()
        user_row = dataframe[dataframe['Username'] == username]

        if user_row.empty:
            return jsonify({"message": "Invalid username or password"}), 400

        # Verify the password
        stored_hash = user_row['Password'].values[0].encode('utf-8')
        if not verify_password(stored_hash, password):
            return jsonify({"message": "Invalid username or password"}), 400

        return jsonify({"message": "Login successful"}), 200

    except Exception as e:
        print("Error during login:", e)
        return jsonify({"message": str(e)}), 500
    


@app.route('/api/logout', methods=['POST'])
def logout():
 try:
         # The front end handles the token removal, but we can send a success response.
       return jsonify({"message": "Logged out successfully"}), 200
 except Exception as e:
        return jsonify({"error": str(e)}), 500


def save_dataframe_to_redis(dataframe):
    try:
        data_dict = dataframe.to_dict(orient="records")
        r.set("face_data", json.dumps(data_dict))  # Save as JSON
        # Save individual users as Redis hashes for easier access
        for _, row in dataframe.iterrows():
            user_id = row['user_id']
            user_data = {
                'Name': row['Name'],
                'RollNo': row['RollNo'],
                'Role': row['Role'],
                'Username': row['Username'],
                'Password': row['Password'],  # Save the hashed password
                'Embedding': json.dumps(row['embedding'])  # Save the embedding as a JSON string
            }
            r.hmset(f"user:{user_id}", user_data)  # Save user data in a hash
    except Exception as e:
        print("Error saving to Redis:", e)

def load_dataframe_from_redis():
    try:
        data_json = r.get("face_data")
        if data_json:
            data_dict = json.loads(data_json)

            return pd.DataFrame(data_dict)
        else:
            return pd.DataFrame(columns=['Name', 'RollNo', 'Role', 'embedding', "username"])
    except Exception as e:
        print("Error loading from Redis:", e)
        return pd.DataFrame(columns=['Name', 'RollNo', 'Role', 'embedding'])

# Load data on startup
dataframe = load_dataframe_from_redis()

def generate_user_id():
    """Generate a random user ID."""
    return ''.join(random.choices(string.ascii_letters + string.digits, k=16))

@app.route('/api/register', methods=['POST'])
def register():
    try:
        image_file = request.files.get("image")
        name = request.form.get("name")
        roll_no = request.form.get("rollNo")
        role = request.form.get("role")
        username = request.form.get("username")
        password = request.form.get("password")  # Ensure this is hashed before storing

        if not image_file or not name or not roll_no or not role or not username or not password:
            return jsonify({"error": "All fields are required"}), 400

        image = np.array(Image.open(image_file).convert("RGB"))
        results = faceapp.get(image)
        
        if not results:
            return jsonify({"error": "No face detected"}), 400

        embedding = results[0]['embedding'].tolist()

        # Hash the password
        hashed_password = hash_password(password).decode('utf-8')

        # Generate a unique user_id
        user_id = generate_user_id()

        # Load existing data and add new entry
        dataframe = load_dataframe_from_redis()
        new_entry = pd.DataFrame([[name, roll_no, role, username, hashed_password, embedding, user_id]], 
                                 columns=['Name', 'RollNo', 'Role', 'Username', 'Password', 'embedding', 'user_id'])
        dataframe = pd.concat([dataframe, new_entry], ignore_index=True)

        save_dataframe_to_redis(dataframe)
        return jsonify({"message": "User registered successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/recognize', methods=['POST'])
def recognize():
    try:
        image_file = request.files.get("image")
        if not image_file:
            return jsonify({"error": "No image provided"}), 400

        # Load image and extract embedding
        image = np.array(Image.open(image_file).convert("RGB"))
        embedding = extract_embedding(image)
        if embedding is None:
            return jsonify({"error": "No face detected"}), 400

        # Load data from Redis
        dataframe = load_dataframe_from_redis()
        print("Loaded DataFrame:", dataframe)  # Debug: Check stored data

        # Perform face recognition
        name, role = ml_search_algorithm(dataframe, "embedding", np.array(embedding))
        print("Recognition Result:", name, role)  # Debug: Log recognition output

        if name != 'Unknown':
            return jsonify({"name": name, "role": role}), 200
        else:
            return jsonify({"error": "No match found"}), 404

    except Exception as e:
        print("Error during recognition:", e)
        return jsonify({"error": str(e)}), 500

@app.route('/api/mark-attendance', methods=['POST'])
def mark_attendance():
    try:
        image_file = request.files.get("image")
        if not image_file:
            return jsonify({"error": "No image provided"}), 400

        # Convert image to RGB array
        image = np.array(Image.open(image_file).convert("RGB"))
        embedding = extract_embedding(image)
        if embedding is None:
            return jsonify({"error": "No face detected"}), 400

        # Load user data
        dataframe = load_dataframe_from_redis()
        name, role = ml_search_algorithm(dataframe, "embedding", np.array(embedding))

        if name == "Unknown":
            return jsonify({"error": "No match found"}), 404

        today = datetime.now().strftime("%Y-%m-%d")
        current_time = datetime.now().strftime("%H:%M:%S")

        # Get user ID for the recognized user
        user_row = dataframe[dataframe['Name'] == name]
        user_id = user_row['user_id'].values[0]

        # Check if attendance is already marked for today
        attendance_key = f"{user_id}-{today}"
        if r.exists(attendance_key):
            return jsonify({"error": "Attendance already marked for today"}), 400

        # Mark attendance
        attendance_data = {
            "name": name,
            "role": role,
            "rollNo": user_row["RollNo"].values[0],
            "date": today,
            "time": current_time
        }

        # Save attendance data to Redis
        r.set(attendance_key, json.dumps(attendance_data))

        # Append to the attendance report
        attendance_report_key = "attendance_report"
        attendance_report = r.get(attendance_report_key)
        attendance_report = json.loads(attendance_report) if attendance_report else []
        attendance_report.append(attendance_data)
        r.set(attendance_report_key, json.dumps(attendance_report))

        # Update user's attendance history
        previous_dates_key = f"{user_id}_attendance_dates_times"
        previous_dates_times = r.get(previous_dates_key)
        previous_dates_times = json.loads(previous_dates_times) if previous_dates_times else []
        previous_dates_times.append({"date": today, "time": current_time})
        r.set(previous_dates_key, json.dumps(previous_dates_times))

        return jsonify({"message": "Attendance marked successfully", "attendance": attendance_data}), 200

    except Exception as e:
        print("Error marking attendance:", e)
        return jsonify({"error": str(e)}), 500

@app.route('/get-attendance-history', methods=['GET'])
def get_attendance_history():
    name = request.args.get('name')
    if not name:
        return jsonify({"error": "Name is required"}), 400

    # Fetch attendance history from Redis
    attendance_history = r.lrange(f"{name}_attendance_dates_times", 0, -1)
    if not attendance_history:
        return jsonify({"error": "No attendance records found for this user"}), 404

    # Format and return attendance records
    formatted_records = [json.loads(record) for record in attendance_history]
    return jsonify(formatted_records)


@app.route('/api/view-attendance', methods=['POST'])
def view_attendance():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400

    # Fetch user data from the DataFrame (loaded from Redis)
    dataframe = load_dataframe_from_redis()
    user_row = dataframe[dataframe['Username'] == username]

    if user_row.empty:
        return jsonify({"error": "Invalid username or password"}), 400

    # Verify password
    stored_hash = user_row['Password'].values[0].encode('utf-8')
    if not verify_password(stored_hash, password):
        return jsonify({"error": "Invalid username or password"}), 400

    # Fetch attendance records from Redis
    user_id = user_row['user_id'].values[0]
    attendance_data = r.get(f"{user_id}_attendance_dates_times")

    if attendance_data:
        attendance_records = json.loads(attendance_data)
        return jsonify({"attendance": attendance_records}), 200
    else:
        return jsonify({"message": "No attendance records found"}), 404

if __name__ == '__main__':
   app.run(debug=True) 
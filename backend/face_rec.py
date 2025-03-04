import numpy as np
import cv2
import redis
import pickle
from insightface.app import FaceAnalysis
from sklearn.metrics import pairwise
from PIL import Image

# Initialize faceapp globally
faceapp = FaceAnalysis(name='buffalo_sc',root='insightface_model', providers = ['CPUExecutionProvider'])
faceapp.prepare(ctx_id = 0, det_size=(640,640), det_thresh = 0.5)

# Connect to Redis
r = redis.StrictRedis(host="localhost", port=6379)


# ML Search Algorithm for Cosine Similarity
def ml_search_algorithm(dataframe, feature_column, test_vector, name_role=['Name', 'Role'], thresh=0.5):
    X_list = dataframe[feature_column].tolist()
    valid_rows = [i for i, embedding in enumerate(X_list) if len(embedding) == len(test_vector)]
    
    if not valid_rows:
        return 'Unknown', 'Unknown'
    
    valid_dataframe = dataframe.iloc[valid_rows].copy()
    valid_embeddings = [X_list[i] for i in valid_rows]
    
    x = np.asarray(valid_embeddings)
    
    similar = pairwise.cosine_similarity(x, test_vector.reshape(1, -1))
    similar_arr = np.array(similar).flatten()

    valid_dataframe['cosine'] = similar_arr
    data_filter = valid_dataframe.query(f'cosine >= {thresh}')
    
    if len(data_filter) > 0:
        data_filter.reset_index(drop=True, inplace=True)
        argmax = data_filter['cosine'].argmax()
        person_name, person_role = data_filter.loc[argmax][name_role]
    else:
        person_name = 'Unknown'
        person_role = 'Unknown'
        
    return person_name, person_role

# Extract face embeddings from an image
def extract_embedding(image):
    results = faceapp.get(image)
    if results:
        return results[0]['embedding']  # Assume only one face per image
    return None


def face_prediction(image, dataframe, feature_column='embedding'):
    embedding = extract_embedding(image)

    if embedding is None:
        return None, "No face detected"  # Return None if no face is detected

    # Perform face recognition using stored embeddings
    name, role = ml_search_algorithm(dataframe, feature_column, np.array(embedding))

    # Convert the image to RGB for display
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    face_bboxes = faceapp.get(image)

    for face in face_bboxes:
        bbox = face['bbox']
        x1, y1, x2, y2 = map(int, bbox)
        
        # Draw bounding box around the face
        cv2.rectangle(image_rgb, (x1, y1), (x2, y2), (0, 255, 0), 2)

        # Display name and role
        label = f"{name} ({role})"
        cv2.putText(image_rgb, label, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)

    return image_rgb, None  # Return the modified image
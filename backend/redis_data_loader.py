import redis
import pickle
import pandas as pd

# Connect to Redis
r = redis.StrictRedis(host="localhost", port=6379)

# Fetch and load the data
data = r.get('face_embeddings')
if data:
    dataframe = pickle.loads(data)
    print(dataframe)
else:
    print("No data found under 'face_embeddings'")
from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app) # Idhu dhaan unga frontend-ah backend-oda pesavaikkum

# MongoDB Connection
MONGO_URI = os.environ.get('MONGO_URI')
client = MongoClient(MONGO_URI)
db = client['skyway_db']
bookings_collection = db['bookings']

@app.route('/')
def home():
    return "Skyway Cab Backend is Live!"

@app.route('/book', methods=['POST'])
def book_cab():
    data = request.json
    bookings_collection.insert_one(data)
    return jsonify({"message": "Booking successful!"}), 201

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
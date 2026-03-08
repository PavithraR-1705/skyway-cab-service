from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS
import os

app = Flask(__name__)
# CORS add panniyachu, ippo frontend-backend connection-la issue varaadhu
CORS(app) 

# MongoDB Connection Logic
MONGO_URI = os.environ.get('MONGO_URI')

if not MONGO_URI:
    print("❌ Error: MONGO_URI environment variable kidaikkala! Render settings check pannunga.")
    client = None
    bookings_collection = None
else:
    try:
        # Connect to MongoDB Atlas
        client = MongoClient(MONGO_URI)
        db = client['skyway_db']
        bookings_collection = db['bookings']
        
        # Connection working-ah nu check panna oru ping
        client.admin.command('ping')
        print("✅ MongoDB Connected Successfully!")
    except Exception as e:
        print(f"❌ MongoDB Connection Error: {e}")
        client = None

@app.route('/')
def home():
    return "Skyway Cab Backend is Live and Ready!"

@app.route('/book', methods=['POST'])
def book_cab():
    try:
        data = request.json
        if not data:
            return jsonify({"error": "Data kidaikkala"}), 400
        
        if bookings_collection is not None:
            # Database-la data-ah save pandrom
            bookings_collection.insert_one(data)
            return jsonify({"message": "Booking successful and saved to MongoDB!"}), 201
        else:
            return jsonify({"error": "Database connected-la illai"}), 500
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # Render-ku yetha port setting
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)

@app.route('/get-bookings', methods=['GET'])
def get_bookings():
    bookings = list(bookings_collection.find({}, {"_id": 0})) # ID-ah thavira matha ellathaiyum edukkum
    return jsonify(bookings), 200
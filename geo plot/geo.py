# # geo.py

# # Import module
# from geopy.geocoders import Nominatim

# # Initialize Nominatim API
# geolocator = Nominatim(user_agent="geoapiExercises")

# # Assign Latitude & Longitude
# Latitude = "28.47644590734393"
# Longitude = "77.04998946253656"


# # Displaying Latitude and Longitude
# print("Latitude: ", Latitude)
# print("Longitude: ", Longitude)

# # Get location with geocode
# location = geolocator.geocode(Latitude+","+Longitude)

# # Display location
# print("\nLocation of the given Latitude and Longitude:")
# print(location)



# geo.py
from flask import Flask, request, jsonify
from geopy.geocoders import Nominatim
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS

@app.route('/get_location', methods=['GET'])
def get_location():
    lat = request.args.get('lat')
    lon = request.args.get('lon')
    
    if not lat or not lon:
        return jsonify({"error": "Please provide latitude and longitude"}), 400
    
    geolocator = Nominatim(user_agent="geoapiExercises")
    location = geolocator.reverse(f"{lat},{lon}")
    
    if location:
        return jsonify({"location": location.address})
    else:
        return jsonify({"error": "Location not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)

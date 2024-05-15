// const express = require('express');
// const fs = require('fs');
// const cors = require('cors'); // Import CORS middleware

// const app = express();
// app.use(cors()); // Enable CORS for all routes

// // Read the GeoJSON file
// fs.readFile('geo.json', (err, data) => {
//   if (err) {
//     console.error('Error reading file:', err);
//     return;
//   }

//   // Parse the JSON data
//   const geojsonData = JSON.parse(data);

//   // Access properties of the features
//   const featuresData = geojsonData.features.map((feature) => {
//     return {
//       name: feature.properties.name,
//       coordinates: feature.geometry.coordinates[0], // Assuming the first set of coordinates is the boundary
//     };
//   });

//   // Route to send features data as JSON response
//   app.get('/geojson', (req, res) => {
//     res.json(featuresData);
//   });

//   // Route to get name based on latitude and longitude
//   app.get('/getname', (req, res) => {
//     const { lat, long } = req.query;
//     if (!lat || !long) {
//       return res
//         .status(400)
//         .json({ error: 'Latitude and longitude are required.' });
//     }

//     const latitude = parseFloat(lat);
//     const longitude = parseFloat(long);

//     if (isNaN(latitude) || isNaN(longitude)) {
//       return res
//         .status(400)
//         .json({ error: 'Latitude and longitude must be valid float values.' });
//     }

//     const coordinates = {
//       latitude,
//       longitude,
//     };

//     // Find the feature that matches the coordinates
//     const matchedFeature = featuresData.find((feature) => {
//       return isPointInsidePolygon(coordinates, feature.coordinates);
//     });

//     if (matchedFeature) {
//       res.json({
//         name: matchedFeature.name,
//       });
//     } else {
//       res.json({
//         error: 'No matching feature found for the provided coordinates.',
//       });
//     }
//   });

//   // Route for the root URL
//   app.get('/', (req, res) => {
//     res.send('Welcome to the GeoJSON API');
//   });
// });

// // Function to check if a point is inside a polygon
// function isPointInsidePolygon(point, polygon) {
//   let isInside = false;
//   let j = polygon.length - 1;

//   for (let i = 0; i < polygon.length; i++) {
//     const vertex1 = polygon[i];
//     const vertex2 = polygon[j];

//     if (
//       ((vertex1[0] < point.longitude && vertex2[0] >= point.longitude) ||
//         (vertex2[0] < point.longitude && vertex1[0] >= point.longitude)) &&
//       (vertex1[1] < point.latitude || vertex2[1] < point.latitude) &&
//       vertex1[1] +
//         ((point.longitude - vertex1[0]) / (vertex2[0] - vertex1[0])) *
//           (vertex2[1] - vertex1[1]) <
//         point.latitude
//     ) {
//       isInside = !isInside;
//     }

//     j = i;
//   }

//   return isInside;
// }

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());  // Enable CORS
app.use(express.json());

app.get('/api/get_location', async (req, res) => {
    const { lat, lon } = req.query;
    try {
        const response = await axios.get(`http://localhost:5000/get_location?lat=${lat}&lon=${lon}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

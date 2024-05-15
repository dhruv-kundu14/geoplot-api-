// // LeafletMap.js

// import React, { useEffect } from 'react';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';

// const LeafletMap = ({ latitude, longitude }) => {
//   useEffect(() => {
//     // Check if map container exists
//     const mapElement = document.getElementById('map');
//     if (!mapElement) {
//       console.error('Map container not found');
//       return;
//     }

//     // Initialize map
//     const map = L.map(mapElement).setView([latitude, longitude], 13);

//     // Add tile layer from OpenStreetMap
//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution: '&copy; OpenStreetMap contributors',
//     }).addTo(map);

//     // Add marker to the map
//     let newMarker;
//     map.on('click', function (e) {
//       if (typeof newMarker === 'undefined') {
//         newMarker = L.marker(e.latlng, { draggable: true });
//         newMarker.addTo(map);
//       } else {
//         newMarker.setLatLng(e.latlng);
//       }

//       console.log(`Latitude: ${e.latlng.lat}, Longitude: ${e.latlng.lng}`);
//       now();
//     });

//     // Log message when component is mounted
//     console.log('LeafletMap component mounted');
//   }, [latitude, longitude]);

//   function now() {
//     console.log(
//       `Latitude: ${latitude}, Longitude: ${longitude} (Global after click)`
//     );
//   }

//   return <div id='map' style={{ height: '400px' }}></div>;
// };

// export default LeafletMap;

/////////////////////////////////////////////////////////

// import React, { useEffect } from 'react';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';

// const LeafletMap = ({ onLocationFetched }) => {
//   useEffect(() => {
//     const mapElement = document.getElementById('map');
//     if (!mapElement) {
//       console.error('Map container not found');
//       return;
//     }

//     if (mapElement.classList.contains('leaflet-container')) {
//       console.log('Map already initialized');
//       return;
//     }

//     const map = L.map(mapElement).setView([28.479568, 77.080062], 13);

//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution: '&copy; OpenStreetMap contributors',
//     }).addTo(map);

//     let marker;
//     map.on('click', async function (e) {
//       if (marker) {
//         marker.setLatLng(e.latlng);
//       } else {
//         marker = L.marker(e.latlng, { draggable: true }).addTo(map);
//       }

//       const { lat, lng } = e.latlng;
//       try {
//         const response = await fetch(`http://localhost:3001/api/get_location?lat=${lat}&lon=${lng}`);
//         const data = await response.json();
//         onLocationFetched(data);
//       } catch (error) {
//         console.error('Error fetching location:', error);
//         onLocationFetched({ error: 'Failed to fetch location' });
//       }
//     });

//     console.log('LeafletMap component mounted');
//   }, [onLocationFetched]);

//   return <div id='map' style={{ height: '400px' }}></div>;
// };

// export default LeafletMap;

import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const LeafletMap = ({ onLocationFetched }) => {
  useEffect(() => {
    const mapElement = document.getElementById('map');
    if (!mapElement) {
      console.error('Map container not found');
      return;
    }

    if (mapElement.classList.contains('leaflet-container')) {
      console.log('Map already initialized');
      return;
    }

    const map = L.map(mapElement).setView([28.479568, 77.080062], 13);

    // Creating the custom icon
    const defaultIcon = L.icon({
      iconUrl: './marker-icon.png',
      iconSize: [25, 41],
      iconAnchor: [10, 41],
      popupAnchor: [2, -40],
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    let marker;
    map.on('click', async function (e) {
      if (marker) {
        marker.setLatLng(e.latlng);
      } else {
        marker = L.marker(e.latlng, { draggable: true, icon: defaultIcon }).addTo(map);
      }

      const { lat, lng } = e.latlng;
      try {
        const response = await fetch(`http://localhost:3001/api/get_location?lat=${lat}&lon=${lng}`);
        const data = await response.json();
        onLocationFetched(data);
      } catch (error) {
        console.error('Error fetching location:', error);
        onLocationFetched({ error: 'Failed to fetch location' });
      }
    });

    console.log('LeafletMap component mounted');
  }, [onLocationFetched]);

  return <div id='map' style={{ height: '400px' }}></div>;
};

export default LeafletMap;

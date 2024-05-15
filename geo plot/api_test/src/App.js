// // App.js

// import React, { useState } from 'react';
// import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
// import L from 'leaflet';
// import './App.css';

// function App() {
//   const position = [28.479568, 77.080062]; // Example position

//   // Creating the custom icon
//   const defaultIcon = L.icon({
//     iconUrl: './marker-icon.png',
//     iconSize: [25, 41],
//     iconAnchor: [10, 41],
//     popupAnchor: [2, -40],
//   });

//   const [clickPosition, setClickPosition] = useState(null);
//   const [popupContent, setPopupContent] = useState('');
//   const [loading, setLoading] = useState(false);

//   function LocationMarker() {
//     useMapEvents({
//       click(e) {
//         const { lat, lng } = e.latlng;
//         setClickPosition([lat, lng]);
//         fetchData(lat, lng);
//       }
//     });

//     async function fetchData(lat, lng) {
//       setLoading(true);
//       try {
//         const response = await fetch(`http://localhost:5000/getname?lat=${lat}&long=${lng}`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch data');
//         }
//         const data = await response.json();
//         setPopupContent(data.name || 'Not marked');
//       } catch (error) {
//         setPopupContent('Not marked');
//       } finally {
//         setLoading(false);
//       }
//     }

//     return clickPosition === null ? null : (
//       <Marker position={clickPosition} icon={defaultIcon}>
//         <Popup>
//           {loading ? 'Loading...' : popupContent}
//         </Popup>
//       </Marker>
//     );
//   }

//   return (
//     <div className='App'>
//       <MapContainer center={position} zoom={13} scrollWheelZoom={true}>
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
//         />
//         {/* Adding a Marker with the custom icon */}
//         <Marker position={position} icon={defaultIcon}></Marker>
//         <LocationMarker />
//       </MapContainer>
//     </div>
//   );
// }

// export default App;

// App.js

import React, { useState } from 'react';
import LeafletMap from './components/LeafletMap';
import './App.css';

function App() {
  const [locationData, setLocationData] = useState(null);

  const handleLocationFetched = (data) => {
    setLocationData(data);
  };

  return (
    <div className='App'>
      <LeafletMap onLocationFetched={handleLocationFetched} />
      {locationData && (
        <div>
          <h1>Location Data:</h1>
          <pre>{locationData.location || locationData.error}</pre>
        </div>
      )}
    </div>
  );
}

export default App;

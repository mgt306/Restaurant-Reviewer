import * as React from 'react';
import './App.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import Map from 'react-map-gl';

function App() {
    return (
      <div className='App'>
        <h1>Welcome to your Restaurant Reviewer</h1>
        <Map
          mapboxAccessToken={
            'pk.eyJ1IjoiYW5odHJyIiwiYSI6ImNsOW9kbGtwazBnbTAzd281YXJ3ejhjcmsifQ.Et0LpdRG7mN6MB58p_52qQ'
          }
          initialViewState={{
            longitude: -73.9976,
            latitude: 40.7307,
            zoom: 13,
          }}
          style={{
            width: window.innerWidth, height: window.innerHeight
          }}
          mapStyle="mapbox://styles/anhtrr/cl9odtk6b001v15s1cq54igry"
        />
      </div>
  );
}

export default App;
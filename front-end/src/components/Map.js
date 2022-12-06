import 'mapbox-gl/dist/mapbox-gl.css';

import { useEffect, useState } from 'react';
import Map, { Marker, NavigationControl, Popup } from 'react-map-gl';
// require('dotenv').config()
// console.log(process.env)
//believe dotenv gets used at build time and not runtime, so app has to be build first? 

const Mapp = () => {
    const [viewport, setViewport] = useState({});
    useEffect(() =>{
        navigator.geolocation.getCurrentPosition((pos) => {
            setViewport({
                ...viewport,
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
                zoom: 15,
                pitch: 45,
            });
        });
    }, []);

    
    return (  
        <div>
            {viewport.latitude && viewport.longitude && (
                <div>
                    <Map className="Original"
                        mapboxAccessToken = {"pk.eyJ1IjoiYW5odHJyIiwiYSI6ImNsOW9kbGtwazBnbTAzd281YXJ3ejhjcmsifQ.Et0LpdRG7mN6MB58p_52qQ"}
                        initialViewState={viewport}
                        style={{position: 'fixed', width: "100%", height: "100%"}}
                        mapStyle="mapbox://styles/anhtrr/cl9odtk6b001v15s1cq54igry"
                        onRender={(event) => event.target.resize()}
                    >
                        <Marker
                            longitude={viewport.longitude}
                            latitude={viewport.latitude}
                        />
                        <NavigationControl
                            position='top-right' />
                    </Map>
                </div>
            )}
        </div>
    );
}
 
export default Mapp;
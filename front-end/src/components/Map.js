import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useState } from 'react';
import ReactMapGL, { Marker, NavigationControl, Popup } from 'react-map-gl';
import axios from "axios";
require('dotenv').config()
console.log(process.env)
//believe dotenv gets used at build time and not runtime, so app has to be build first? 

const Mapp = () => {
    const [viewport, setViewport] = useState([]);
    
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
    
    const [pins, setPins] = useState([]);
    useEffect(() => {
        const getPins = async () => {
          try {
            const allPins = await axios.get("http://localhost:8800/api/pins");
            setPins(allPins.data);
          } catch (err) {
            console.log(err);
          }
        };
        getPins();
    }, []);

    return (  
        <div>
            {viewport.latitude && viewport.longitude &&(
                <div>
                    <ReactMapGL className="Original"
                        mapboxAccessToken = {"pk.eyJ1IjoiYW5odHJyIiwiYSI6ImNsOW9kbGtwazBnbTAzd281YXJ3ejhjcmsifQ.Et0LpdRG7mN6MB58p_52qQ"}
                        initialViewState={viewport}
                        style={{position: 'fixed', width: "100%", height: "100%"}}
                        mapStyle="mapbox://styles/anhtrr/cl9odtk6b001v15s1cq54igry"
                        onRender={(event) => event.target.resize()}
                    >
                        {pins.map((p)=>{
                            <Marker 
                            latitude={p.lat}
                            longitude={p.long}
                            />
                        })}
                        <Marker
                            longitude={viewport.longitude}
                            latitude={viewport.latitude}
                            color="#fff"
                        />
                        <NavigationControl
                            position='top-right' />
                        
                    </ReactMapGL>
                </div>
            )}
        </div>
    );
}
 
export default Mapp;
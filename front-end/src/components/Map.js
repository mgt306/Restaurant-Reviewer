import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useState } from 'react';
import ReactMapGL, { Marker, NavigationControl, Popup } from 'react-map-gl';
import axios from "axios";
require('dotenv').config()
console.log(process.env)
//believe dotenv gets used at build time and not runtime, so app has to be build first? 

const Mapp = () => {
    const [viewport, setViewport] = useState([]);
    const [userLoc, setUserLoc] = useState([]);
    useEffect(() =>{
        navigator.geolocation.getCurrentPosition((pos) => {
            setViewport({
                ...viewport,
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
                zoom: 15,
                pitch: 45,
            });
            setUserLoc({
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
            })
        });
    }, []);
    
    const [pins, setPins] = useState([]);
    useEffect(() => {
        const getPins = async () => {
          try {
            const restaurants = await axios.get("/api/pins");
            setPins(restaurants.data);
            console.log(restaurants.data);
          } catch (err) {
            console.log(err.response.data);
            console.log("no pins");
          }
        };
        getPins();
    }, []);

    const [currentPlaceId, setCurrentPlaceId] = useState([]);
    const handleMarkerClick = (id, lat, long) => {
        setCurrentPlaceId({id: id, longitude: long, latitude: lat});
        setViewport({ ...viewport, latitude: lat, longitude: long, zoom: 15, pitch: 45 });
    };

    return (  
        <div>
            {userLoc.latitude && userLoc.longitude &&(
                <div>
                    <ReactMapGL className="Original"
                        mapboxAccessToken = {"pk.eyJ1IjoiYW5odHJyIiwiYSI6ImNsOW9kbGtwazBnbTAzd281YXJ3ejhjcmsifQ.Et0LpdRG7mN6MB58p_52qQ"}
                        initialViewState={viewport}
                        style={{position: 'fixed', width: "100%", height: "100%"}}
                        mapStyle="mapbox://styles/anhtrr/cl9odtk6b001v15s1cq54igry"
                        onRender={(event) => event.target.resize(viewport)} 
                    >
                        {pins.map((p)=>
                            <>
                                <Marker     
                                    latitude={p.latitude}
                                    longitude={p.longitude}
                                    onClick={() => handleMarkerClick(p._id, p.latitude, p.longitude)}
                                />
                            </>
                        )}
                        <Marker
                            longitude={userLoc.longitude}
                            latitude={userLoc.latitude}
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
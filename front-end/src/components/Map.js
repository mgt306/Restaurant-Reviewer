import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useState } from 'react';
import Map, { Marker } from 'react-map-gl';

const Mapp = () => {
    const [viewport, setViewport] = useState({});
    useEffect(() =>{
        navigator.geolocation.getCurrentPosition((pos) => {
            setViewport({
                ...viewport,
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
                zoom: 13.5,
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
                        style={{width: '100vw', height: '94vh'}}
                        mapStyle="mapbox://styles/anhtrr/cl9odtk6b001v15s1cq54igry"
                        onRender={(event) => event.target.resize()}
                    >
                        <Marker
                            longitude={viewport.longitude}
                            latitude={viewport.latitude}
                        />
                    </Map>
                </div>
            )}
        </div>
    );
}
 
export default Mapp;
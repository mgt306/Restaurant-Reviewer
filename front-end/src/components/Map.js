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
            const restaurants = await axios.get("/pins");
            setPins(restaurants.data);
          } catch (err) {
            console.log(err);
          }
        };
        getPins();
    }, []);

    const [currentPlaceId, setCurrentPlaceId] = useState([]);
    const handleMarkerClick = (id, lat, long) => {
        setCurrentPlaceId(id);
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
                                    onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
                                />
                            
                            {p._id === currentPlaceId &&(
                                <Popup
                                    key={p._id}
                                    latitude={p.latitude}
                                    longitude={p.longitude}
                                    closeButton={true}
                                    closeOnClick={false}
                                    onClose={() => setCurrentPlaceId(null)}
                                    anchor="left"
                                >
                                    <div className='card' style={{color:"#1e1e1e", fontWeight:"bolder", alignContent:"center"}}>
                                        <h4 className='place'>{p.name}</h4>
                                        <p className ="address">{p.address}</p>
                                        <div className='review'>
                                            <p className='reviewTitle'>
                                                "{p.review.title}"<br/>
                                                {p.review.description}<br/><br/>
                                                Overall Rating: {p.review.overallRating}/5<br/><br/>
                                                Food Rating: {p.review.foodRating}/5<br/>
                                                Service Rating: {p.review.serviceRating}/5<br/>
                                                Price Rating: {p.review.priceRating}/5<br/>
                                            </p>
                                        </div>
                                    </div>
                                </Popup>
                                
                            )}
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

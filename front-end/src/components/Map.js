import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useState } from 'react';
import ReactMapGL, { Marker, NavigationControl, Popup } from 'react-map-gl';
import axios from "axios";
import StarIcon from '@mui/icons-material/Star';
import { format } from "timeago.js";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Link } from 'react-router-dom';
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
          } catch (err) {
            console.log(err);
          }
        };
        getPins();
    }, []);

    const [restoURL, setRestoURL] = useState([]);
    const [url, setURL] = useState([]);
    const [review, setReview] = useState([]);
    const [currentPlaceId, setCurrentPlaceId] = useState([]);
    const handleMarkerClick = (id, lat, long, reviews) => {
        setCurrentPlaceId(id);
        setReview(reviews);
        setURL("/review/"+id);
        setRestoURL("/viewResto/"+id);
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
                                    onClick={() => handleMarkerClick(p._id, p.latitude, p.longitude, p.reviews)}
                                />
                                {p._id === currentPlaceId && (
                                <div className='currentPlacePopup'>
                                    <Popup
                                        key={p._id}
                                        latitude={p.latitude}
                                        longitude={p.longitude}
                                        closeButton={true}
                                        closeOnClick={false}
                                        onClose={() => {setCurrentPlaceId(null); setReview(null); setURL(null); setRestoURL(null);}}
                                        offset='25'
                                        captureScroll={true}
                                    >
                                        <div>
                                            <label>RESTAURANT</label>
                                            <h3 className='place'><Link to={restoURL} className='linkk'>{p.name}</Link></h3>
                                            <p></p>
                                            <p></p>
                                            <label>ADDRESS</label>
                                            <h5>{p.address}</h5>
                                            <p></p>
                                            <p></p>
                                            <label>CUSTOMER REVIEWS</label>
                                            <p></p>
                                            <l><Link to={url} className='linkk'>Post A Review for {p.name}?</Link></l>
                                            <p></p>
                                            {review.map((r)=>
                                                <div className='reviews' style={{paddingLeft: '10px', textAlign: 'center'}}>
                                                <card>
                                                    <l>{r.title}</l>
                                                    <div className='stars'>
                                                        <p className='ovrating'>Overall Rating: {Array(r.overallRating).fill(<StarIcon/>)} {Array(5-r.overallRating).fill(<StarBorderIcon/>)}</p>
                                                        <p>Ambiance Rating: {Array(r.ambianceRating).fill(<StarIcon/>)} {Array(5-r.ambianceRating).fill(<StarBorderIcon/>)}</p>
                                                        <p>Food Rating: {Array(r.foodRating).fill(<StarIcon/>)} {Array(5-r.foodRating).fill(<StarBorderIcon/>)}</p>
                                                        <p>Service Rating: {Array(r.serviceRating).fill(<StarIcon/>)} {Array(5-r.serviceRating).fill(<StarBorderIcon/>)}</p>
                                                        <p>Price Rating: {Array(r.priceRating).fill(<StarIcon/>)} {Array(5-r.priceRating).fill(<StarBorderIcon/>)}</p>
                                                    </div>
                                                </card>
                                                <i><b>Posted by user "{r.postedBy.username}" {format(r.createdAt)} </b></i>
                                                <p></p>
                                                <p></p>
                                                </div>
                                            )}
                                            {review.length === 0 && (
                                                <div className='noReviews' style={{textAlign: 'center'}}>
                                                <h5>No Reviews Yet</h5>                                               
                                                </div>
                                            )}                                           
                                        </div>
                                    </Popup>
                                </div>
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

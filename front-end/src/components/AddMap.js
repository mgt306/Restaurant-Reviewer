import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useState, useCallback, useRef } from 'react';
import ReactMapGL, { Marker, NavigationControl, Popup, GeolocateControl} from 'react-map-gl';
import axios from "axios";
import StarIcon from '@mui/icons-material/Star';
import { format } from "timeago.js";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Link, useNavigate } from 'react-router-dom';
import "./NewMap.css";

require('dotenv').config()
console.log(process.env)

//believe dotenv gets used at build time and not runtime, so app has to be build first? 

const AddMapp = () => {
    const navigate = useNavigate();
    const mapRef = useRef();
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
            })
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
    const handleMarkerClick = useCallback((id, lat, long, reviews) => {
        setCurrentPlaceId(String(id));
        setReview(reviews);
        setURL("/review/"+String(id));
        console.log(url);
        setRestoURL("/viewResto/"+String(id));
        setViewport({ latitude: lat, longitude: long, zoom: 15, pitch: 45 });
        mapRef.current.flyTo({center: [long, lat], duration: 2000});
    });

    const handleClose = useCallback( async () => {
        await mapRef.current.flyTo({center: [userLoc.longitude, userLoc.latitude], zoom: 15, pitch: 45, duration: 2000});
    });

    const [addResto, setAddResto] = useState(null);
    const [addAvail, setAddAvail] = useState(0);
    const handleAdd = useCallback( async (e) => {
        const longitude = e.lngLat.wrap().lng;
        const latitude = e.lngLat.wrap().lat;
        await mapRef.current.flyTo({center: [longitude, latitude], zoom: 15, pitch: 45, duration: 2000});
        setAddResto({
            name: "",
            address: "",
            phone: null,
            website: null,
            lat: latitude,
            long: longitude,
            images: "",
            provider: null,
            bookingurl: null,
        });
    });

    

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const newRestaurant = {
            name: addResto.name,
            address: addResto.address,
            phone: addResto.phone,
            website: "https://"+addResto.website,
            latitude: addResto.lat,
            longitude: addResto.long,
            images: addResto.url,
            booking: {
                provider: addResto.provider,
                url: addResto.bookingurl
            }
        }
        try {
            const resp = await axios.post("/api/pins", newRestaurant);
            console.log(resp.data);
            alert("Success! You have added " + addResto.name);
        } catch (error) {
            console.log(error.response);
            alert(error);
        }
        setAddResto(null);
        await handleClose();
        navigate("/");
    };

    const handleClosee = useCallback( async () => {
        await mapRef.current.flyTo({center: [addResto.long, addResto.lat], zoom: 15, pitch: 45, duration: 2000});
    });

    const handleCloseee = useCallback( async () => {
        await mapRef.current.flyTo({center: [viewport.longitude, viewport.latitude], zoom: 15, pitch: 45, duration: 2000});
    });
    return (  
        <div>
            {userLoc.latitude && userLoc.longitude &&(
                <div style={{position: 'fixed', width: "100%", height: "100%"}}>
                    <ReactMapGL className="Original"
                        ref={mapRef}
                        mapboxAccessToken = {"pk.eyJ1IjoiYW5odHJyIiwiYSI6ImNsOW9kbGtwazBnbTAzd281YXJ3ejhjcmsifQ.Et0LpdRG7mN6MB58p_52qQ"}
                        initialViewState={viewport}
                        mapStyle="mapbox://styles/anhtrr/cl9odtk6b001v15s1cq54igry"
                        //onRender={(event) => event.target.resize(viewport)} 
                        keyboard={true}
                        onDblClick={addAvail === 1 && handleAdd}
                        doubleClickZoom={false}
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
                                        closeOnMove={false}
                                        onClose={() => {setCurrentPlaceId(null); setReview(null); setURL(null); setRestoURL(null); addResto && handleClosee()}}
                                        captureScroll={true}
                                        //anchor="top-right"
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
                                                    <l>"{r.title}"</l>
                                                    <div className='stars'>
                                                        <p className='overallratingg'>Overall Rating: <a className='filledStar'>{Array(r.overallRating).fill(<StarIcon/>)}</a> {Array(5-r.overallRating).fill(<StarBorderIcon/>)}</p>
                                                        <p className='ratingg'>Ambiance Rating: <a className='filledStar'>{Array(r.ambianceRating).fill(<StarIcon/>)}</a> {Array(5-r.ambianceRating).fill(<StarBorderIcon/>)}</p>
                                                        <p className='ratingg'>Food Rating: <a className='filledStar'>{Array(r.foodRating).fill(<StarIcon/>)}</a> {Array(5-r.foodRating).fill(<StarBorderIcon/>)}</p>
                                                        <p className='ratingg'>Service Rating: <a className='filledStar'>{Array(r.serviceRating).fill(<StarIcon/>)}</a> {Array(5-r.serviceRating).fill(<StarBorderIcon/>)}</p>
                                                        <p className='ratingg'>Price Rating: <a className='filledStar'>{Array(r.priceRating).fill(<StarIcon/>)}</a> {Array(5-r.priceRating).fill(<StarBorderIcon/>)}</p>
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
                            onClick={()=>handleClose()}
                        />
                        <NavigationControl
                            position='top-right' />
                        <div className='buttonss'>
                        {addAvail === 0 &&(
                            <button 
                                className="btn btn-primary1"
                                onClick={() => setAddAvail(1)} 
                                title="To enable add restaurant mode, first click this button. Then, to add a Restaurant, double click it's location on the map to place the Restaurant."
                            >
                                Enable Add Restaurant Mode<br/>
                                Hover for more Info!
                            </button>
                        )}
                        {addAvail === 1 &&(
                            <button
                                className="btn btn-primary1"
                                onClick={() => {setAddAvail(0); setAddResto(null); handleClose()}}
                            >
                                Disable Add Restaurant Mode                                 
                            </button>
                            
                        )}
                        </div>
                        {addResto &&(
                            <>
                                <Popup
                                    latitude={addResto.lat}
                                    longitude={addResto.long}
                                    closebutton={true}
                                    closeOnClick={false}
                                    onClose={() => {setAddResto(null); currentPlaceId && handleCloseee()}}
                                >
                                    <div className='addRestaurant'>
                                        <form
                                            onSubmit={handleSubmit}
                                        >
                                            <div className='form-group'>
                                                <label className='headingsss'>RESTAURANT NAME</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="name"
                                                    placeholder="Name - Required"
                                                    value={addResto.name}
                                                    onChange={e => setAddResto({...addResto, name: e.target.value})}
                                                />
                                            </div>
                                            <div className='form-group'>
                                                <label className='headingss'>RESTAURANT ADDRESS</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="address"
                                                    placeholder="Address - Required"
                                                    value={addResto.address}
                                                    onChange={e => setAddResto({...addResto, address: e.target.value})}
                                                />
                                            </div>
                                            <div className='form-group'>
                                                <label className='headingss'>RESTAURANT PHONE NUMBER</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="phoneNumber"
                                                    placeholder="Number - Not Required"
                                                    value={addResto.phone}
                                                    onChange={e => setAddResto({...addResto, phone: e.target.value})}
                                                />
                                            </div>
                                            <div className='form-group'>
                                                <label className='headingss'>RESTAURANT WEBSITE</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="website"
                                                    placeholder="Website - Not Required"
                                                    value={addResto.website}
                                                    onChange={e => setAddResto({...addResto, website: e.target.value})}
                                                />
                                            </div>
                                            <div className='form-group'>
                                                <label className='headingss'>RESTAURANT IMAGE URL</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="images"
                                                    placeholder="Image - Not Required"
                                                    value={addResto.images}
                                                    onChange={e => setAddResto({...addResto, images: e.target.value})}
                                                />
                                            </div>
                                            <div className='form-group'>
                                                <label className='headingss'>RESTAURANT BOOKING PROVIDER</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="provider"
                                                    placeholder="Provider - Not Required"
                                                    value={addResto.provider}
                                                    onChange={e => setAddResto({...addResto, provider: e.target.value})}
                                                />
                                            </div>
                                            <div className='form-group'>
                                                <label className='headingss'>RESTAURANT BOOKING URL</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="url"
                                                    placeholder="Booking URL - Not Required"
                                                    value={addResto.bookingurl}
                                                    onChange={e => setAddResto({...addResto, bookingurl: e.target.value})}
                                                />
                                            </div>
                                            <button type="submit" className="btn btn-primary">Submit</button>
                                        </form>
                                    </div>
                                </Popup>
                            </>
                        )}
                        <GeolocateControl
                            position='top-right'
                        /> 
                        
                    </ReactMapGL>
                </div>
            )}
        </div>
    );
}
 
export default AddMapp;

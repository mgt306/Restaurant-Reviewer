import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";
import "./ViewResto.css";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { format } from "timeago.js";

const ViewResto = () => {
    
    let restaurantId = useParams();
    const idd = "/api/pins/"+restaurantId.RestaurantId;
    
    const [pin, setPin] = useState([]);
    useEffect(() => {
        const getPin = async () => {
          try {
            const restaurant = await axios.get(String(idd));
            setPin(restaurant.data);
            setReviews(restaurant.data.reviews);
          } catch (err) {
            console.log(err);
          }
        };
        getPin();
    }, []);

    const [reviews, setReviews] = useState([]);

    return (  
        <div className='restoo'>
            {pin.length !== 0 &&(
                <card className='restaurantProfile'>
                    <label className='restaurantlabels'>RESTAURANT NAME</label>
                    <h1 className='restaurantinfo'>{pin.name}</h1>
                    <label className='restaurantlabels'>RESTAURANT INFO</label>
                    <h5 className='restaurantinfo'> Address: {pin.address}</h5>
                    <h5 className='restaurantinfo'> Phone: {pin.phone}</h5>
                    <label className='restaurantlabels'>BOOKING INFO</label>
                    <p></p>
                    {pin.booking.length !== 0 &&(
                        <>
                        <a className='restaurantlinks' href={pin.booking.url}>{pin.booking.provider}</a>
                        <p></p>
                        </>
                    )} 
                    {pin.website.length !== 0 && (
                        <>
                        <a className='restaurantlinks' href={pin.website}>Website</a>
                        <p></p>
                        </>
                    )}
                    <label className='restaurantlabels'>RESTAURANT IMAGE</label>
                    <p></p>
                    <img className='restaurantImage' src={pin.images} alt="restoImage" ></img>
                    <p></p>
                    <label className='restaurantlabels'>RESTAURANT REVIEWS</label>
                    <p></p>
                    <div className='reviewsss'>
                    {reviews.map((r) =>
                        <div className='singularReview'>
                            <h5 className='reviewTitle'>"{r.title}"</h5>
                                <p className='rating'>Ambiance Rating: <a className='filledStar'>{Array(r.ambianceRating).fill(<StarIcon/>)}</a>{Array(5-r.ambianceRating).fill(<StarBorderIcon/>)}</p>
                                <p className='rating'>Food Rating: <a className='filledStar'>{Array(r.foodRating).fill(<StarIcon/>)}</a>{Array(5-r.foodRating).fill(<StarBorderIcon/>)}</p>
                                <p className='rating'>Service Rating: <a className='filledStar'>{Array(r.serviceRating).fill(<StarIcon/>)}</a>{Array(5-r.serviceRating).fill(<StarBorderIcon/>)}</p>
                                <p className='rating'>Price Rating: <a className='filledStar'>{Array(r.priceRating).fill(<StarIcon/>)}</a>{Array(5-r.priceRating).fill(<StarBorderIcon/>)}</p>
                            <label className='reviewlabels'>Review by<label className='userrr'>"{r.postedBy.username}"</label><label className='timeAgoo'>{format(r.createdAt)}</label></label>
                        </div>
                    )}
                    </div>
                </card>
            )}
            
        </div>
    );
}

export default ViewResto;

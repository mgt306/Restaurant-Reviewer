import React from 'react';
import { useParams, Link } from 'react-router-dom';
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

    const urlll = "/review/"+restaurantId.RestaurantId;

    return (  
        <div className='restoo'>
            {pin &&(
                <card className='restaurantProfile'>
                    <label className='restaurantlabels'>RESTAURANT NAME</label>
                    <h1 className='restaurantinfo'>{pin.name}</h1>
                    <label className='restaurantlabels'>RESTAURANT INFO</label>
                    <h5 className='restaurantinfo'> Address: {pin.address}</h5>
                    {pin.phone &&(
                        <h5 className='restaurantinfo'> Phone: {pin.phone}</h5>
                    )}
                    <label className='restaurantlabels'>BOOKING INFO</label>
                    <p></p>
                    {pin.booking &&(
                        <>
                            {pin.booking.provider && pin.booking.url &&(
                                <>
                                <a className='restaurantlinks' href={pin.booking.url}>
                                    {pin.booking.provider}
                                </a>
                                </>
                            )}
                            {!pin.booking.provider && pin.booking.url && (
                                <>
                                <a className='restaurantlinks' href={pin.booking.url}>
                                    Book here!
                                </a>
                                </>
                            )}
                            {pin.booking.provider && !pin.booking.url &&(
                                <>
                                <h5>Find {pin.name} on {pin.booking.provider}</h5>
                                </>
                            )}
                        
                        <p></p>
                        </>
                    )} 
                    {pin.website && (
                        <>
                        <a className='restaurantlinks' href={pin.website}>Website</a>
                        <p></p>
                        </>
                    )}
                    {pin.images &&(
                        <>
                            <label className='restaurantlabels'>RESTAURANT IMAGE</label>
                            <p></p>
                            <img className='restaurantImage' src={pin.images} alt="restoImage" ></img>
                            <p></p>
                        </>
                    )}
                    <label className='restaurantlabels'>RESTAURANT REVIEWS</label>
                    <p></p>
                    {reviews.length !== 0 &&(
                    <>
                    <div className='reviewsss'>
                        <>
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
                        </>
                    </div>
                    <p></p>
                    <l className='placeeee'><Link to={urlll} className='linkk'>Post A Review for {pin.name}?</Link></l>
                    </>
                    )}
                    {reviews.length === 0 &&(
                        <>
                        <div className='noReviewss'>
                            <h5 className='srry'>Sorry, there are no reviews for {pin.name} yet!</h5>
                        </div>
                        <p></p>
                        <l className='placeeee'><Link to={urlll} className='linkk'>Post A Review for {pin.name}?</Link></l>
                        </>
                    )}
                    
                </card>
            )}
            
        </div>
    );
}

export default ViewResto;

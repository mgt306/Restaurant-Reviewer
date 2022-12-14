import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";
import "./ViewResto.css";

const ViewResto = () => {
    
    let restaurantId = useParams();
    const idd = "/api/pins/"+restaurantId.RestaurantId;
    
    const [pin, setPin] = useState([]);
    useEffect(() => {
        const getPin = async () => {
          try {
            const restaurant = await axios.get(String(idd));
            setPin(restaurant.data);
          } catch (err) {
            console.log(err);
          }
        };
        getPin();
    }, []);

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
                        <a className='restaurantinfo' href={pin.booking.url}>{pin.booking.provider}</a>
                        <p></p>
                        </>
                    )} 
                    {pin.website.length !== 0 && (
                        <>
                        <a className='restaurantinfo' href={pin.website}>Website</a>
                        <p></p>
                        </>
                    )}
                    <label className='restaurantlabels'>RESTAURANT IMAGE</label>
                    <p></p>
                    <img className='restaurantImage' src={pin.images} alt="restoImage" ></img>
                </card>
            )}
        </div>
    );
}

export default ViewResto;

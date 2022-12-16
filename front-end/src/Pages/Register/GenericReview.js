import { useParams, useNavigate } from "react-router-dom";
import "./GenericReview.css";
import { useState, useEffect } from "react";
import { React } from "react";
import axios from "axios";

const GenericReview = props => {
    const navigate = useNavigate();
    let RestaurantId = useParams();
    
    let idd = "/api/pins/"+RestaurantId.RestaurantId;

    const [review, setReview] = useState({
        title: "",
        ambianceRating: 0,
        foodRating: 0,
        serviceRating: 0,
        priceRating: 0,
        overallRating: 0,
        postedBy:{
            username: "",
        }
    });
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

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const newReview = { reviews:{
            title: review.title,
            ambianceRating: review.ambianceRating,
            foodRating: review.foodRating,
            serviceRating: review.serviceRating,
            priceRating: review.priceRating,
            overallRating: review.overallRating,
            postedBy: {
                username: review.postedBy.username
            }
        }
        }
        try {
            const resp = await axios.put(String(idd), newReview);
            console.log(resp.data);
        } catch (error) {
            console.log(error.response);
            alert(error);
        }
        alert("Success! You have added a review");
        let restaurantProf = "/viewResto/"+RestaurantId.RestaurantId;
        navigate(String(restaurantProf));
    };
    return (
        <div className="container">
            <div className="card">
                <div className="card-header">
                    {pin.length !== 0 &&(
                        <h3>Review for {pin.name}</h3>
                    )}
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className='headings' htmlFor="title">Title</label>                                    
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                placeholder="Title Your Review!"
                                value={review.title}
                                onChange={e => setReview({ ...review, title: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label className='headings' htmlFor="username">Your Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="overallRating"
                                placeholder="Enter Your Name!"
                                value={review.postedBy.username}
                                onChange={e => setReview({ ...review, postedBy: {username: e.target.value} })}
                            />
                        </div>
                        <div className="form-group">
                            <label className='headings' htmlFor="ambianceRating">Ambiance Rating</label>
                            <select
                                className="form-control"
                                onChange={e => setReview({ ...review, ambianceRating: e.target.value })}
                                value={review.ambianceRating}
                                id="ambianceRating"
                            >
                                <option value="0">0 - Very Bad</option><option value="1">1 - Bad</option><option value="2">2 - Meh</option><option value="3">3 - Decent</option><option value="4">4 - Good</option><option value="5">5 - Very Good</option>
                            </select>                                 
                        </div>
                        <div className="form-group">
                            <label className='headings' htmlFor="foodRating">Food Rating</label>
                            <select
                                className="form-control"
                                onChange={e => setReview({ ...review, foodRating: e.target.value })}
                                value={review.foodRating}
                                id="foodRating"
                            >
                                <option value="0">0 - Very Bad</option><option value="1">1 - Bad</option><option value="2">2 - Meh</option><option value="3">3 - Decent</option><option value="4">4 - Good</option><option value="5">5 - Very Good</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className='headings' htmlFor="serviceRating">Service Rating</label>
                            <select
                                className="form-control"
                                onChange={e => setReview({ ...review, serviceRating: e.target.value })}
                                value={review.serviceRating}
                                id="serviceRating"
                            >
                                <option value="0">0 - Very Bad</option><option value="1">1 - Bad</option><option value="2">2 - Meh</option><option value="3">3 - Decent</option><option value="4">4 - Good</option><option value="5">5 - Very Good</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className='headings' htmlFor="priceRating">Price Rating</label>
                            <select
                                className="form-control"
                                onChange={e => setReview({ ...review, priceRating: e.target.value })}
                                value={review.priceRating}
                                id="priceRating"
                            >
                                <option value="0">0 - Very Bad</option><option value="1">1 - Bad</option><option value="2">2 - Meh</option><option value="3">3 - Decent</option><option value="4">4 - Good</option><option value="5">5 - Very Good</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className='headings' htmlFor="overallRating">Overall Rating</label>
                            <select
                                className="form-control"
                                onChange={e => setReview({ ...review, overallRating: e.target.value })}
                                value={review.overallRating}
                                id="overallRating"
                            >
                                <option value="0">0 - Very Bad</option><option value="1">1 - Bad</option><option value="2">2 - Meh</option><option value="3">3 - Decent</option><option value="4">4 - Good</option><option value="5">5 - Very Good</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default GenericReview;

import { useParams } from "react-router-dom";
import "./GenericReview.css";
import { useState, useEffect } from "react";
import { React } from "react";
import axios from "axios";

const GenericReview = props => {
    
    let RestaurantId = useParams();
    
    let idd = "/pins/"+RestaurantId.RestaurantId;

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
            console.log(err.response.data);
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
            console.log(error.response.data);
        }
        window.open("/");
    };

    return (
        <div className="container">
            <div className="row">
                <div className="bruh">
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
                                        placeholder="Enter title"
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
                                        placeholder="Enter your name"
                                        value={review.postedBy.username}
                                        onChange={e => setReview({ ...review, postedBy: {username: e.target.value} })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className='headings' htmlFor="ambianceRating">Ambiance Rating</label>
                                    <div className="ratings">
                                        <input
                                            type="Number"
                                            className="form-control"
                                            id="ambianceRating"
                                            placeholder="Enter ambiance rating"
                                            value={review.ambianceRating}
                                            onChange={e => setReview({ ...review, ambianceRating: e.target.value })}
                                        />                                        
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className='headings' htmlFor="foodRating">Food Rating</label>
                                    <input
                                        type="Number"
                                        className="form-control"
                                        id="foodRating"
                                        placeholder="Enter food rating"
                                        value={review.foodRating}
                                        onChange={e => setReview({ ...review, foodRating: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className='headings' htmlFor="serviceRating">Service Rating</label>
                                    <input
                                        type="Number"
                                        className="form-control"
                                        id="serviceRating"
                                        placeholder="Enter service rating"
                                        value={review.serviceRating}
                                        onChange={e => setReview({ ...review, serviceRating: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className='headings' htmlFor="priceRating">Price Rating</label>
                                    <input
                                        type="Number"
                                        className="form-control"
                                        id="priceRating"
                                        placeholder="Enter price rating"
                                        value={review.priceRating}
                                        onChange={e => setReview({ ...review, priceRating: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className='headings' htmlFor="overallRating">Overall Rating</label>
                                    <input
                                        type="Number"
                                        className="form-control"
                                        id="overallRating"
                                        placeholder="Enter overall rating"
                                        value={review.overallRating}
                                        onChange={e => setReview({ ...review, overallRating: e.target.value })}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GenericReview;
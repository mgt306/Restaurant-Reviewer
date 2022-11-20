import { Link } from "react-router-dom";
import "./GenericReview.css";
import { useState, useEffect } from "react";
import { React } from "react";
import { axios } from "axios";

const GenericReview = props => {
    const [review, setReview] = useState({
        id: "",
        title: "",
        description: "",
        ambianceRating: "",
        foodRating: "",
        serviceRating: "",
        priceRating: "",
        overallRating: "",
        date: "",
        userId: "",
        restaurantId: ""
    });
    
    const [user, setUser] = useState({
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card">
                        <div className="card-header">
                            <h3>Review</h3>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="title">Title</label>
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
                                    <label htmlFor="description">Description</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="description"
                                        placeholder="Enter description"
                                        value={review.description}
                                        onChange={e => setReview({ ...review, description: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="ambianceRating">Ambiance Rating</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="ambianceRating"
                                        placeholder="Enter ambiance rating"
                                        value={review.ambianceRating}
                                        onChange={e => setReview({ ...review, ambianceRating: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="foodRating">Food Rating</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="foodRating"
                                        placeholder="Enter food rating"
                                        value={review.foodRating}
                                        onChange={e => setReview({ ...review, foodRating: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="serviceRating">Service Rating</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="serviceRating"
                                        placeholder="Enter service rating"
                                        value={review.serviceRating}
                                        onChange={e => setReview({ ...review, serviceRating: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="priceRating">Price Rating</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="priceRating"
                                        placeholder="Enter price rating"
                                        value={review.priceRating}
                                        onChange={e => setReview({ ...review, priceRating: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="overallRating">Overall Rating</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="overallRating"
                                        placeholder="Enter overall rating"
                                        value={review.overallRating}
                                        onChange={e => setReview({ ...review, overallRating: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="date">Date</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="date"
                                        placeholder="Enter date"
                                        value={review.date}
                                        onChange={e => setReview({ ...review, date: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="userId">User Id</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="userId"
                                        placeholder="Enter user id"
                                        value={review.userId}
                                        onChange={e => setReview({ ...review, userId: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="restaurantId">Restaurant Id</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="restaurantId"
                                        placeholder="Enter restaurant id"
                                        value={review.restaurantId}
                                        onChange={e => setReview({ ...review, restaurantId: e.target.value })}
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

import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';

const AddReview = () => {
    const [user] = useAuthState(auth);
  const handleAddreview = (event) => {
    event.preventDefault();
    const review = {
        customer: user.email,
        customerName: user.displayName,
        reviewText: event.target.reviewHere.value,
        stars:event.target.stars.value,
      }; 
    fetch("http://localhost:5000/review", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(review),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast(`review added successfully`);
      });
  };
    return (
        <div>
            <h1>add review</h1>
            <form onSubmit={handleAddreview}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              disabled
              value={user?.email || ""}
              className="input input-bordered "
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Your name</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              disabled
              value={user?.displayName || ""}
              className="input input-bordered"
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text">Review</span>
            </label>
            <input
            
              type="text"
              name="reviewHere"
              placeholder="Enter review"
              required
              className="input searchField input-bordered input-primary "
            />
            <label className="label">
              <span className="label-text">stars</span>
            </label>
            <input
            
              type="number"
              name="stars"
              min={1}
              max={5}
              placeholder="Enter review star"
              required
              className="input searchField input-bordered input-primary "
            />
          </div>
          
          <input
            type="submit"
            value="Submit"
            className="btn w-full max-w-xs mt-6"
          />
        </form>
        </div>
    );
};

export default AddReview;
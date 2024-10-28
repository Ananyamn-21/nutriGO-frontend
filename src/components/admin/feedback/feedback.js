import React, { useState, useEffect } from "react";

const Feedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
 
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch("http://localhost:8080/food/allFeedbacks");
        const data = await response.json();

        if (response.ok) {
          setFeedbacks(data);
        } else {
          setError("Failed to fetch feedbacks");
        }
      } catch (error) {
        setError("Error fetching feedbacks");
      } finally {
        setLoading(false)
      }
    };

    fetchFeedbacks();
  }, []);

  const deleteFeedback = async (id) => {
    try {
    
      const response = await fetch(`http://localhost:8080/food/feedbacks/delete/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setFeedbacks(feedbacks.filter(feedback => feedback._id !== id)); // Remove the deleted feedback from the list
      } else {
        setError("Failed to delete feedback");
      }
    } catch (error) {
      setError("Error deleting feedback");
    }
  };

  return (
    <div className="container">
      <h2>User Feedbacks</h2>
      {loading ? (
        <p>Loading feedbacks...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : feedbacks.length === 0 ? (
        <p>No feedbacks available</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Sl No</th>
              <th>Username</th>
              <th>Feedback</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((feedback, index) => (
              <tr key={feedback._id}>
                <td>{index + 1}</td>
                <td>{feedback.name}</td>
                <td>{feedback.feedback}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteFeedback(feedback._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Feedbacks;

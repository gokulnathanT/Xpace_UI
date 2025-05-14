import "../Css/SentRequest.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import "../Css/MyJourney.css"; 

const MyJourney = () => {
  const [journeys, setJourneys] = useState([]);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchJourneys = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/api/journeys/user/${userData.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setJourneys(response.data);
      } catch (error) {
        console.error("Error fetching journeys:", error);
      }
    };

    if (userData?.id && token) {
      fetchJourneys();
    }
  }, []);

  const updateJourneyStatus = async (id, newStatus) => {
    try {
      await axios.post(
        `http://localhost:8081/api/journeys/updateStatus/${id}`,
         {status:newStatus},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Refresh the journey list
      setJourneys((prev) =>
        prev.map((j) => (j.id === id ? { ...j, status: newStatus } : j))
      );
    } catch (error) {
      console.error(`Error updating status to ${newStatus}:`, error);
    }
  };

  return (
    <div className="sent-request-container">
      {journeys.length === 0 ? (
        <p>No journeys found.</p>
      ) : (
        journeys.map((journey) => (
          <div key={journey.id} className="sent-request-card">
            <div className="sent-request-header">
              <span className="request-id">Journey ID: {journey.id}</span>
            </div>
            <div className="sent-request-body">
              <p>
                <strong>From:</strong> {journey.startLocation}
              </p>
              <p>
                <strong>To:</strong> {journey.endLocation}
              </p>
              <p>
                <strong>Capacity:</strong> {journey.totalCapacity} kg
              </p>
              <p>
                <strong>Status:</strong> {journey.status}
              </p>
            </div>
          {journey.status==="IN_PROGRESS" || journey.status==="SCHEDULED"  &&(
            <div className="sent-request-footer">
              <button
                className="btn cancel"
                onClick={() => updateJourneyStatus(journey.id, "CANCELLED")}
              >
                Cancel
              </button>
              <button
                className="btn complete"
                onClick={() => updateJourneyStatus(journey.id, "COMPLETED")}
              >
                Mark as Completed
              </button>
            </div> )
}
          </div>
        ))
      )}
    </div>
  );
};

export default MyJourney;

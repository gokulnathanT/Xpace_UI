import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Css/ReceivedRequest.css";

const ReceivedRequest = () => {
  const token = localStorage.getItem("token");
  const userData = JSON.parse(localStorage.getItem("userData"));

  const [myJourney, setMyJourney] = useState([]);
  const [selectedJourneyId, setSelectedJourneyId] = useState(null);
  const [requests, setRequests] = useState([]);
  const [journeyCapacity, setJourneyCapacity] = useState(null);
  const [errors, setErrors] = useState({});

  const [shipmentDetails, setShipmentDetails] = useState({
    status: "",
    Weight: "",
    pickUp: "",
    dropAt: "",
    journeyId: ``,
    createdById: ``,
  });
  useEffect(() => {
    const fetchJourneys = async () => {
      if (!token || !userData) return;

      try {
        const response = await axios.get(
          `http://localhost:8081/api/journeys/user/${userData.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMyJourney(response.data);
        setSelectedJourneyId(response.data[0]?.id || null);
      } catch (error) {
        console.error("Error fetching journeys:", error);
      }
    };

    fetchJourneys();
  }, []);

  const handleJourneyClick = async (journeyId, journeyCapacity) => {
    setSelectedJourneyId(journeyId);
    setJourneyCapacity(journeyCapacity);
    try {
      const response = await axios.get(
        `http://localhost:8081/api/spacerequests/journey/${journeyId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

    const validate=()=>{
      let tempErrors={};
      for (const field in shipmentDetails) {
        if (!shipmentDetails[field]) {
          tempErrors[field] = "This value is required";
        }
      }
      setErrors(tempErrors);
      return Object.keys(tempErrors).length===0;
    };

  const createShipment = async (request) => {
    const shipmentPayload = {
      status: "IN_TRANSIT",
      weight: request.requestedCapacity,
      pickUp: request.pickUp,
      dropAt: request.dropAt,
      journeyId: request.toJourneyId,
      createdById: userData.id,
    };

    // Validate inline
    const tempErrors = {};
    for (const field in shipmentPayload) {
      if (!shipmentPayload[field]) {
        tempErrors[field] = "This value is required";
      }
    }

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8081/api/shipments/create",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(shipmentPayload),
        }
      );

      const shipmentData = await response.json();
      console.log(shipmentData);

      if (response.ok) {
        alert("Shipment created successfully by request acceptance!");
        setErrors({});
        handleAccept(request.id);
        setShipmentDetails({
          status: "",
          weight: ``,
          pickUp: "",
          dropAt: "",
          journeyId: ``,
          createdById:``,
        });
      } else {
        alert("Creation error!");
      }
    } catch (error) {
      console.error("Error in shipment creation by request acceptance!", error);
      alert("Shipment creation error by request acceptance!");
    }
  };

  // if (validate()) {
  //   console.log("Shipment created by request acceptance: ", shipmentDetails);
  //   setShipmentDetails({
  //     status: "",
  //     weight: ``,
  //     pickUp: "",
  //     dropAt: "",
  //     journeyId: ``,
  //     createdById: ``,
  //   });
  //   setErrors({});
  // }

  const handleDecline = async (requestId) => {
    try {
      await axios.put(
        `http://localhost:8081/api/spacerequests/update/${requestId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      window.location.reload();
    } catch (error) {
      console.error("Error declining request:", error);
    }
  };
  const handleAccept= async (requestId) =>{
    try {
      await axios.put(
        `http://localhost:8081/api/spacerequests/updateAccept/${requestId}`,{},
        {
          headers:{
            Authorization: `Bearer ${token}`,
          },
        }
      );
      window.location.reload();
    } catch (error) {
      console.error("Error declining request:", error);
    }
  }

  return (
    <div className="dashboard-container">
      <div className="left-panel">
        <h2>My Journeys</h2>
        {myJourney.map((journey) => (
          <div
            key={journey.id}
            className={`journey-card ${journey.id === selectedJourneyId ? "selected" : ""}`}
            onClick={() =>
              handleJourneyClick(journey.id, journey.availableCapacity)
            }
          >
            <h1 id="journey-Id">Journey : {journey.id}</h1>
            <div className="journey-top">
              <h3>
                Route : {journey.startLocation} → {journey.endLocation}
              </h3>
              <span className={`status-badge ${journey.status.toLowerCase()}`}>
                {journey.status}
              </span>
            </div>

            <div className="journey-details">
              <p>
                <strong>Total Capacity :</strong> {journey.totalCapacity} kg
              </p>
              <p>
                <strong>Available Capacity:</strong> {journey.availableCapacity}{" "}
                kg
              </p>
              <p>
                <strong>Date:</strong> {journey.startDate}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="right-panel">
        <h2>
          Requests &nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp; Journey '
          {selectedJourneyId}
        </h2>
        {requests.length === 0 ? (
          <p>No requests yet.</p>
        ) : (
          requests.map((req) => (
            <div key={req.id} className="request-card">
              <div className="request-details">
                <p>
                  <strong>From:</strong> {req.pickUp} → {req.dropAt}
                </p>
                <p>
                  <strong>Capacity:</strong> {req.requestedCapacity}
                </p>
                <p>
                  <strong>Status:</strong> {req.status}
                </p>
              </div>
              <div className="request-acceptance"></div>
              {req.status === "PENDING" &&
                req.requestedCapacity <= journeyCapacity && (
                  <div className="actions">
                    <button
                      className="accept-btn"
                      onClick={() => createShipment(req)}
                    >
                      Accept
                    </button>
                    <button
                      className="decline-btn"
                      onClick={() => handleDecline(req.id)}
                      disabled={req.status === "REJECTED"}
                    >
                      Decline
                    </button>
                  </div>
                )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReceivedRequest;


 

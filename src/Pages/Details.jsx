// src/Pages/Details.js

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Components/Navbar";
import bgimg from "../assets/images/background3.jpeg";
import { Truck, MapPin, Package, User } from "lucide-react";
import "../Css/Details.css";
import CreateShipment from "./CreateShipment";

const Details = () => {
  const { id } = useParams();
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetch() {
      const fetched_data = await axios.get(
        `http://localhost:8081/api/journeys/${id}`
      );
      setDetails(fetched_data.data);
      setLoading(false);
    }
    fetch();
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleClick = () => {
    navigate(`/shipments/${details.id}?assignedInchargeId=${details.assignedIncharge}`);
  };
  const user = JSON.parse(localStorage.getItem("user"));
  const userRole=user.role;
  const userId = user.userId;
  const handleCreationClick=()=>{
    navigate(`/createShipment?journeyId=${details.id}&userId=${userId}`);
  }
  const handleRequestCreationClick=()=>{
    navigate(`/createSpaceRequest?fromAdminId=${userId}&toAdminId=${details.createdBy}&journeyId=${details.id}`);
  }


  const usedCapacity = details.totalCapacity - details.availableCapacity;
  const capacityPercentage = (usedCapacity / details.totalCapacity) * 100;

  if (loading) {
    return (
      <div className="loading-container">
        <div
          className="background-image"
          style={{ backgroundImage: `url(${bgimg})` }}
        />
        <div className="loading-card">
          <p>Loading journey details...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="details-container">
        <div
          className="background-image"
          style={{ backgroundImage: `url(${bgimg})` }}
        />
        <div className="details-card">
          <div className="details-header">
            <h2>Journey : {details.id}</h2>
            <div className={`status-badge ${details.status.toLowerCase()}`}>
              {details.status}
            </div>
          </div>
          <div className="route-section">
            <h3>Route Information</h3>
            <div className="route-info">
              <div className="location">
                <div className="pin start">
                  <MapPin size={16} />
                </div>
                <p>{details.startLocation}</p>
                <span>{formatDate(details.startDate)}</span>
              </div>

              <div className="route-line" />

              <div className="location">
                <div className="pin end">
                  <MapPin size={16} />
                </div>
                <p>{details.endLocation}</p>
                <span>{formatDate(details.endDate)}</span>
              </div>
            </div>
          </div>

          <div className="capacity-section">
            <h3>Capacity Information</h3>
            <div className="capacity-info">
              <div className="icon-row">
                <Package size={20} />
                <span>Total: {details.totalCapacity} kg</span>
              </div>
              <div className="icon-row">
                <Package size={20} />
                <span>Available: {details.availableCapacity} kg</span>
              </div>
            </div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${capacityPercentage}%` }}
              ></div>
            </div>
            <div className="progress-labels">
              <span>Used: {usedCapacity} kg</span>
              <span>{capacityPercentage.toFixed(1)}%</span>
            </div>
          </div>

          <div className="additional-info">
            <div className="info-grid">
              <div className="info-item">
                <User size={20} />
                <span>Assigned Incharge ID: {details.assignedIncharge}</span>
              </div>
              <div className="info-item">
                <User size={20} />
                <span>Creater ID: {details.createdBy}</span>
              </div>
              <div className="info-item">
                <User size={20} />
                <span>Driver ID: {details.driverId}</span>
              </div>
              <div className="shipment-buttons">
                {userId == details.createdBy ||userId==details.assignedIncharge && (
                  <button className="shipment-btn" onClick={handleClick}>
                    View Shipments
                  </button>
                )}

                {userRole == "JOURNEY_INCHARGE" &&
                  details.assignedIncharge == userId && (
                    <button
                      className="shipment-creation-btn"
                      onClick={handleCreationClick}
                    >
                      Create Shipments
                    </button>
                  )}
                {userRole === "ADMIN" && details.createdBy != userId && (
                  <button
                    className="spacerequest-creation-btn"
                    onClick={handleRequestCreationClick}
                  >
                    Requests
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;

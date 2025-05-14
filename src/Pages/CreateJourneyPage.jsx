import { useState } from "react";
import "../Css/CreateJourneyPage.css";
import img from "../assets/images/background.png";

export default function CreateJourneyPage() {
  const user1 = JSON.parse(localStorage.getItem("user"));
  const userid = user1.userId;
  const [formData, setFormData] = useState({
    truckNo: "",
    driverId:`` ,
    startLocation:"",
    endLocation: "",
    startDate: "",
    endDate: "",
    totalCapacity: ``,
    availableCapacity: ``,
    status: "",
    assignedIncharge: ``,
    createdBy: userid,
  });

  
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    for (const field in formData) {
      if (!formData[field]) {
        tempErrors[field] = "This value is required";
      }
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response=await fetch("http://localhost:8081/api/journeys/create",{
        method:"POST",
        headers:{
          Accept:"application/json",
          "Content-Type":"application/json"
        },
        body:JSON.stringify(formData)
      });
      const journeyData=await response.json();
      console.log(journeyData);
      if(response.ok){
        alert("Journey created successfully");
      }
      else{
        alert("Creation error !");
      }
    } catch (error) {
      console.error("Error in journey creation ! ",error);
      alert("Journey creation unsuccessful !");
    }
    if (validate()) {
      console.log("Journey Created:", formData);
      setFormData({
        truckNo: "",
        driverId: ``,
        startLocation: "",
        endLocation: "",
        startDate: "",
        endDate: "",
        totalCapacity: ``,
        availableCapacity: ``,
        status: "",
        assignedIncharge: ``,
        createdBy: ``,
      });
      setErrors({});
    }
  };

  return (
    <div className="page-wrapper">
      <div className="background-image" />
      <div className="journey-form-container">
        <h2 className="form-title">Create New Journey</h2>
        <form onSubmit={handleSubmit} className="journey-form">
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Truck Number</label>
              <input
                type="text"
                name="truckNo"
                value={formData.truckNo}
                onChange={handleChange}
                className="form-input"
              />
              {errors.truckNo && <p className="form-error">{errors.truckNo}</p>}
            </div>

            <div className="form-group">
              <label className="form-label">Driver ID</label>
              <input
                type="text"
                name="driverId"
                value={formData.driverId}
                onChange={handleChange}
                className="form-input"
              />
              {errors.driverId && (
                <p className="form-error">{errors.driverId}</p>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Start Location</label>
              <input
                type="text"
                name="startLocation"
                value={formData.startLocation}
                onChange={handleChange}
                className="form-input"
              />
              {errors.startLocation && (
                <p className="form-error">{errors.startLocation}</p>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">End Location</label>
              <input
                type="text"
                name="endLocation"
                value={formData.endLocation}
                onChange={handleChange}
                className="form-input"
              />
              {errors.endLocation && (
                <p className="form-error">{errors.endLocation}</p>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="form-input"
              />
              {errors.startDate && (
                <p className="form-error">{errors.startDate}</p>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="form-input"
              />
              {errors.endDate && <p className="form-error">{errors.endDate}</p>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Total Capacity (kg)</label>
              <input
                type="number"
                name="totalCapacity"
                value={formData.totalCapacity}
                onChange={handleChange}
                className="form-input"
              />
              {errors.totalCapacity && (
                <p className="form-error">{errors.totalCapacity}</p>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Available Capacity (kg)</label>
              <input
                type="number"
                name="availableCapacity"
                value={formData.availableCapacity}
                onChange={handleChange}
                className="form-input"
              />
              {errors.availableCapacity && (
                <p className="form-error">{errors.availableCapacity}</p>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="form-input"
              >
                <option value="">Select status</option>
                <option value="SCHEDULED">SCHEDULED</option>
              </select>
              {errors.status && <p className="form-error">{errors.status}</p>}
            </div>

            <div className="form-group">
              <label className="form-label">Assigned Incharge</label>
              <input
                type="text"
                name="assignedIncharge"
                value={formData.assignedIncharge}
                onChange={handleChange}
                className="form-input"
              />
              {errors.assignedIncharge && (
                <p className="form-error">{errors.assignedIncharge}</p>
              )}
            </div>
          </div>
{/* 
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Created By</label>
              <input
                type="text"
                name="createdBy"
                value={formData.createdBy}
                onChange={handleChange}
                className="form-input"
              />
              {errors.createdBy && (
                <p className="form-error">{errors.createdBy}</p>
              )}
            </div>
            <div className="form-group empty-group"></div>{" "}
          </div> */}
          <div className="submit-container">
            <button type="submit" className="submit-btn">
              Create Journey
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

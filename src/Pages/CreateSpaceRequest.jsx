import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import "../Css/CreateSpaceRequest.css"; // if using separate CSS
import shipmentImage from "../assets/images/truck.jpeg"; // replace with your own image path

const CreateSpaceRequest = () => {
  const location=useLocation();
  const searchParams = new URLSearchParams(location.search);
  const fromAdminId = searchParams.get("fromAdminId");
  const toAdminId = searchParams.get("toAdminId");
  const journeyId = searchParams.get("journeyId");
  const [formData, setFormData] = useState({
    fromAdminId: fromAdminId,
    toAdminId: toAdminId,
    toJourneyId: journeyId,
    requestedCapacity: "",
    pickUp: "",
    dropAt: "",
    status: ""
  });

  const [errors,setErrors]=useState({});
  const validate=()=>{
    let temperrors={};
    for(const field in formData){
      if(!formData[field]){
        temperrors[field]="This value is required";
      }
    }
    setErrors(temperrors);
    return Object.keys(temperrors).length===0;
  }

  const handleChange=(e)=>{
    const {name,value}=e.target;
    setFormData({...formData,[name]:value});
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
      const response=await fetch("http://localhost:8081/api/spacerequests/create",{
        method:"POST",
        headers:{
          Accept:"application/json",
          "Content-type":"application/json"
        },
        body:JSON.stringify(formData)
      });
      const data=await response.json();
      console.log(data);
      if(response.ok){
        alert("Space request created successfully!");
      }
      else{
        alert("Creation error !");
      }
    }
    catch(error){
      console.error("Error in space request creation !",error);
      alert("Space request creation error !");
    }
    if(validate()){
      console.log("Form data is valid : ",formData);
      setFormData({
        fromAdminId:fromAdminId,
        toAdminId:toAdminId,
        toJourneyId:journeyId,
        requestedCapacity:``,
        pickUp: "",
        dropAt: "",
        status: ""
      });
      setErrors({});
    }
  }

  return (
    <div className="spacerequest-container">
      <div className="form-section">
        <h2>Create SpaceRequest</h2>
        <form className="spacerequest-form" onSubmit={handleSubmit}>
          <div className="form-Id-group">
            <div className="form-group">
              <label>To Admin ID</label>
              <input
                type="number"
                name="toAdminId"
                value={formData.toAdminId}
                readOnly
              />
            </div>
            <div className="form-group">
              <label>From Admin ID</label>
              <input
                type="number"
                name="fromAdminId"
                value={formData.fromAdminId}
                readOnly
              />
            </div>
          </div>
          <div className="form-Id-group">
            <div className="form-group">
              <label>Journey ID</label>
              <input
                type="number"
                name="toJourneyId"
                value={formData.toJourneyId}
                readOnly
              />
            </div>

            <div className="form-group">
              <label>Requested Capacity (kg)</label>
              <input
                type="number"
                name="requestedCapacity"
                value={formData.requestedCapacity}
                onChange={handleChange}
                placeholder="Enter requested capacity"
              />
            </div>
          </div>

          <div className="form-Id-group">
            <div className="form-group">
              <label>Pick Up</label>
              <input
                type="text"
                name="pickUp"
                value={formData.pickUp}
                onChange={handleChange}
                placeholder="Pick-up location"
              />
            </div>
            <div className="form-group">
              <label>Drop At</label>
              <input
                type="text"
                name="dropAt"
                value={formData.dropAt}
                onChange={handleChange}
                placeholder="Drop-off location"
              />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Status</label>
            <select
              name="status"
              onChange={handleChange}
              value={formData.status}
              className="form-input"
            >
              <option value="">select</option>
              <option value="PENDING">Pending</option>
            </select>
            {errors.status && <p className="form-error">{errors.status}</p>}
          </div>
          <button type="submit" className="submit-btn">
            Send Request
          </button>
        </form>
      </div>

      <div
        className="image-section"
        style={{ backgroundImage: `url(${shipmentImage})` }}
      />
    </div>
  );
};

export default CreateSpaceRequest;

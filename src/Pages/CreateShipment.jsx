import React, { useState } from "react";
import "../Css/CreateShipment.css"; // if using separate CSS
import shipmentImage from "../assets/images/truck.jpeg"; // replace with your own image path

const CreateShipment = () => {
  const queryParams=new URLSearchParams(location.search);
  const journeyId=queryParams.get("journeyId");
  const userId=queryParams.get("userId");

   console.log("Journey ID:", journeyId);
   console.log("User ID:", userId);
  const [formData,setFormData]=useState({
    status:"",
    weight:"",
    pickUp:"",
    dropAt:"",
    journeyId:journeyId,
    createdById:userId
  });

  const [errors, setErrors] = useState({});
  const validate=()=>{
    let tempErrors={};
    for(const field in formData){
      if(!formData[field]){
        tempErrors[field]="This value is required";
      }
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length===0;
  };
  const handleChange=(e)=>{
    const {name,value}=e.target;
    setFormData({...formData,[name]:value});
  }

  const handleSubmit= async (e)=>{
    e.preventDefault();
    try {
      const response=await fetch("http://localhost:8081/api/shipments/create",{
        method:"POST",
        headers:{
          Accept:"application/json",
          "Content-Type":"application/json"
        },
        body:JSON.stringify(formData)
      });
      const shipmentData=await response.json();
      console.log(shipmentData);
      if(response.ok){
        alert("Shipment created successfully!");
      }
      else{
        alert("Creation error !");
      }
    } catch (error) {
      console.error('Error in shipment creation !',error);
      alert("Shipment creation error !");
    }

    if(validate()){
      console.log("Shipment created : ",formData);
      setFormData({
        status: "",
        weight: ``,
        pickUp: "",
        dropAt: "",
        journeyId: ``,
        createdById: ``
      });
      setErrors({});
    }
  }
  return (
    <div className="shipment-container">
      <div className="form-section">
        <h2>Create Shipment</h2>
        <form onSubmit={handleSubmit} className="shipment-form">
          <div className="form-group">
            <label className="form-label">Status</label>
            <select
              name="status"
              onChange={handleChange}
              value={formData.status}
              className="form-input"
            >
              <option value="">select</option>
              <option value="IN_TRANSIT">In Transit</option>
            </select>
            {errors.status && <p className="form-error">{errors.status}</p>}
          </div>
          <div className="form-group">
            <label className="form-label">Weight (kg)</label>
            <input
              type="number"
              name="weight"
              onChange={handleChange}
              value={formData.weight}
              placeholder="Enter weight"
              className="form-input"
            />
            {errors.weight && <p className="form-error">{errors.weight}</p>}
          </div>
          <div className="form-group">
            <label className="form-label">Pick Up</label>
            <input
              type="text"
              name="pickUp"
              onChange={handleChange}
              value={formData.pickUp}
              className="form-input"
              placeholder="Pick-up location"
            />
            {errors.pickUp && <p className="form-error">{errors.pickUp}</p>}
          </div>
          <div className="form-group">
            <label className="form-label">Drop At</label>
            <input
              type="text"
              name="dropAt"
              onChange={handleChange}
              className="form-input"
              value={formData.dropAt}
              placeholder="Drop-off location"
            />
            {errors.dropAt && <p className="form-error">{errors.dropAt}</p>}
          </div>
          <button type="submit" className="submit-btn">
            Create Shipment
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

export default CreateShipment;

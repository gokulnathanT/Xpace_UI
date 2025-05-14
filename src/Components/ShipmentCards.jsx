import "../Css/ShipmentCards.css";
import img from "../assets/images/Vector.png";
import axios from "axios";
const ShipmentCards = ({ shipment ,assignedInchargeId}) => {
    const token = localStorage.getItem("token");
    const userData = JSON.parse(localStorage.getItem("userData"));

    console.log(userData.id);
    console.log(assignedInchargeId);
  // const handleCancel = async () => {
  //   try {
  //     await axios.put(``)
  //   } catch (error) {
      
  //   }
  // }
  const handleDelivered = async (shipmentId) => {
    try {
      await axios.put(
        `http://localhost:8081/api/shipments/updateDelivered/${shipmentId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      window.location.reload();
    } catch (error) {
      console.error("Error handling delivered request:", error);
    }
  };

  const handleCancel= async (shipmentId)=>{
    try {
      await axios.put(
         `http://localhost:8081/api/shipments/updateCancel/${shipmentId}`,
         {},
         {
          headers:{
            Authorization:`Bearer ${token}`,
          },
         }
      );
      window.location.reload();
    } catch (error) {
      console.error("Error handling cancel request: ",error);
    }
  };

  return (
    <div className="shipment-list-card">
      <div className="shipment-info" key={shipment.id}>
        <div className="shipment-tags">
          <h3 className="shipment-title">Shipment ID / {shipment.id}</h3>
          <span className="tag blue">{shipment.status}</span>
        </div>

        <div className="progress-bar">
          <div className="progress" style={{ width: "65%" }}></div>
        </div>

        <div className="shipment-details">
          <div className="shipment-locations">
            <div className="location">
              <p className="label">
                Pick Up :{" "}
                <span className="text">{shipment.pickUp || "N/A"}</span>
              </p>
              <p className="text"></p>
            </div>
            <div className="location">
              <p className="label">
                Drop At :{" "}
                <span className="text">{shipment.dropAt || "N/A"}</span>
              </p>
            </div>
            <div className="location">
              <p className="label">
                Weight : <span className="text">{shipment.weight} kg</span>
              </p>
            </div>
          </div>
          <div>
            <img src={img} alt="good" />
          </div>
        </div>
        {shipment.status === "IN_TRANSIT" && userData.id==assignedInchargeId &&(
          <div className="shipment-actions">
            <button id="cancel" onClick={() => handleCancel(shipment.id)}>
              Cancel
            </button>
            <button id="delivered" onClick={() => handleDelivered(shipment.id)}>
              Delivered
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShipmentCards;

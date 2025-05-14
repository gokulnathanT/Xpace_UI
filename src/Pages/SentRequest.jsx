
import "../Css/SentRequest.css"; // if using separate CSS
import axios from "axios";
import React, {  useState ,useEffect} from "react";
const SentRequest = () => {
  const [requests, setRequests] = useState([]);
const userData = JSON.parse(localStorage.getItem("userData"));
const token = localStorage.getItem("token");
  useEffect(() => {
    

    console.log("Token : ", token);
    console.log("user id : ", userData?.id);

    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/api/spacerequests/fromAdmin/${userData.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRequests(response.data);
        console.log("Requests: ", response.data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    if (userData?.id && token) {
      fetchRequests();
    } else {
      console.warn("User data or token missing in localStorage");
    }
  }, []);
  const handleRevert = async (id) => {
    console.log(`Reverting request ID: ${id}`);
    try {
      const response1 = await axios.delete(
        `http://localhost:8081/api/spacerequests/deleteSpaceRequest/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response1);
      window.location.reload();
    } catch (error) {
      console.error("Error declining request : ",error);
    }
  };
   

   const handleView = (id) => {
     console.log(`Viewing request ID: ${id}`);
     // You can redirect or open modal
   };

  return (
    <div className="sent-request-container">
      {requests.length === 0 ? (
        <p>No sent requests found.</p>
      ) : (
        requests.map((req) => (
          <div key={req.id} className="sent-request-card">
            <div className="sent-request-header">
              <span className="badge sender">Sender</span>
              <span className="request-id">Request ID: {req.id}</span>
            </div>
            <div className="sent-request-body">
              <p>
                <strong>To Admin ID:</strong> {req.toAdminId}
              </p>
              <p>
                <strong>Journey ID:</strong> {req.toJourneyId}
              </p>
              <p>
                <strong>Requested Capacity:</strong> {req.requestedCapacity} kg
              </p>
              <p>
                <strong>Status:</strong> {req.status}
              </p>
            </div>
            <div className="sent-request-footer">
              <button
                className="btn revert"
                onClick={() => handleRevert(req.id)}
              >
                Revert
              </button>
              {/* <button className="btn view" onClick={() => handleView(req.id)}>
                View
              </button> */}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
export default SentRequest;
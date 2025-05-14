// src/components/Navbar.jsx
import React ,{useState,useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faUser } from "@fortawesome/free-regular-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Css/Navbar.css";
import img from "../assets/images/avathar.png";

const Navbar = () => {
  const navigate = useNavigate();

  
  const handleClick = () => {
    navigate("/create");
  };

  const toSentRequest =()=>{
    navigate("/sentRequest");
  }
  const toReceivedRequest =()=>{
    navigate("/receivedRequest");
  }
  const toMyJourneys =()=>{
    navigate("/MyJourney");
  }
  const toDashboard= ()=>{
    navigate("/dashboard");
  }
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  }
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userData");
    navigate("/");
  };
  let fetchedUserData ;
  const user1=JSON.parse(localStorage.getItem("user"));
  const userid=user1.userId;
  const role=user1.role;
    useEffect(()=>{
      async function fetchUserData(){
        try {
           fetchedUserData = await axios.get(`http://localhost:8081/api/users/user/${userid}`)
          setUserDetails(fetchedUserData.data);
          // console.log("Dataa : ", fetchedUserData.data.id);
          // console.log("Dataa : ", fetchedUserData.data.name);
        } catch (error) {
          console.log(error);
        }
      }
      fetchUserData();
    },[])
  return (
    <div className="navbar-container">
      <div className="navbar-logo">Xpace</div>
      <div className="navbar-right">
        <div className="navbar-icon">
          <FontAwesomeIcon icon={faBell} size="lg" />
        </div>
        {role === "ADMIN" && (
          <button onClick={handleClick} className="create-button">
            <FontAwesomeIcon icon={faPlus} size="md" color="white" />
            <div className="create-text">Create Journey</div>
          </button>
        )}

        {/* <button onClick={handleClickShip} className="create-s-button">
          <FontAwesomeIcon icon={faPlus} size="md" color="white" />
          <div className="create-s-text"> Create Shipment</div>
        </button> */}
        <div className="navbar-user" onClick={toggleDropdown}>
          <FontAwesomeIcon icon={faUser} className="user-icon" />
          {isDropdownOpen && (
            <div className="user-content">
              <div className="user-info">
                <div className="user-img">
                  <img src={img} alt="avathar" />
                </div>
                <div className="user-details">
                  <p>
                    <strong>{userDetails.name}</strong>
                  </p>
                  <p>{userDetails.email}</p>
                </div>
              </div>

              {role === "ADMIN" && (
                <>
                  <a href="" onClick={toSentRequest}>
                    Sent Request
                  </a>
                  <a href="" onClick={toReceivedRequest}>
                    Received Requests
                  </a>
                  <a href="" onClick={toDashboard}>
                    Dashboard{" "}
                  </a>
                  <a href="" onClick={toMyJourneys}>
                    My Journeys
                  </a>
                </>
              )}
              {/* <a href="" onClick={toMyJourneys}>
                My Journeys
              </a> */}
              {role === "JOURNEY_INCHARGE" && (
                <>
                  <a href=""></a>
                </>
              )}
              <a href="" onClick={logout}>
                Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

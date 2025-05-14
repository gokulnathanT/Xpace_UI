import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Cards from '../Components/Cards'
import Navbar from '../Components/Navbar'
import Search from '../Components/Search'

const Homepage = () => {
  const [data,setData] = useState([]);
  const [searchQuery,setSearchQuery]=useState('');
  const [filteredData,setFilteredData]=useState([]);
  useEffect(()=>{
    async function fetch(){
      try {
      const fetchedData = await axios.get("http://localhost:8081/api/journeys")
      setData(fetchedData.data)
      console.log(fetchedData.data);
      } catch (error) {
        console.log(e)
      }
    }
    fetch();
  },[])

  useEffect(()=>{
    const query=searchQuery.toLowerCase();
    const filtered=data.filter((journey)=>
      journey.startLocation.toLowerCase().includes(query) ||
      journey.endLocation.toLowerCase().includes(query) ||
      journey.startDate.toLowerCase().includes(query) ||
      journey.endDate.toLowerCase().includes(query) ||
      journey.totalCapacity.toString().toLowerCase().includes(query)
    );
    setFilteredData(filtered);
  },[searchQuery,data])
  const user1=JSON.parse(localStorage.getItem("user"));
  const userid=user1.userId;
  useEffect(()=>{
    async function fetchUserData(){
      try {
        const fetchedUserData = await axios.get(`http://localhost:8081/api/users/user/${userid}`)
        localStorage.setItem("userData",JSON.stringify(fetchedUserData.data))
        console.log("Dataa : ", fetchedUserData.data.id);
        console.log("Dataa : ", fetchedUserData.data.name);
      } catch (error) {
        console.log(e);
      }
    }
    fetchUserData();
  },[])
  return (
    <div className="bg-[#f2f3f5]">
      <div className="p-2">
        <input
          type="text"
          placeholder="Search by capacity , Start or End Location ...,"
          value={searchQuery}
          style={{
            background:
              "url('https://cdn-icons-png.flaticon.com/512/622/622669.png') no-repeat 10px center",
            backgroundSize: "16px",
            textAlign: "left",
            padding: "10px",
            paddingLeft: "35px",
          }}
          onChange={(e) => setSearchQuery(e.target.value)}
          className=" w-[100px] md:w-[400px] p-2 border rounded-md shadow-sm"
        />
        <div className="grid  mt-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((d) => (
            <Cards key={d.id} Data={d} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Homepage

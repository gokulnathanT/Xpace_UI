import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom' 
import axios from 'axios';
import Navbar from '../Components/Navbar'
import bgimg from '../assets/images/a-minimalistic-illustration-of-a-cargo-t_LqLNWuYxT7mqIzLQ9PuQKQ_WpEdfnUXSmuSz4ubfkWw6g.jpeg'
const Details = () => {
    const { id } = useParams();
    const [details,setDetails] = useState({});
    useEffect(()=>{
        async function fetch() {
            const fetched_data=await axios.get(`http://localhost:8081/api/journeys/${id}`);
            setDetails(fetched_data.data);
            console.log(fetched_data.data);
        }
        fetch()
    },[id])
  return (
    <>
    
    <Navbar/>
    <img src={bgimg} className="w-screen h-screen object-fit relative overflow opacity-30" />
    </>
  )
}

export default Details

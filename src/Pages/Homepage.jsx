import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Cards from '../Components/Cards'
import Navbar from '../Components/Navbar'
import Search from '../Components/Search'

const Homepage = () => {
  const [data,setData] = useState([]);
  useEffect(()=>{
    async function fetch(){
      try {
      const fetchedData = await axios.get("http://localhost:8081/api/journeys")
      setData(fetchedData.data)
      } catch (error) {
        console.log(e)
      }
    }
    fetch();
  },[])
  return (
    <div className='bg-[#f2f3f5]'>
      <Navbar/>
      <div className='p-2'>
      <Search/>
      <div className="grid  mt-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {
       data.map((d) => <Cards key={d.id} Data={d}/>)
      }
      </div>
    </div>
    </div>
  )
}

export default Homepage

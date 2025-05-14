import { useEffect ,useState} from "react";
import axios from 'axios';
import Navbar from "../Components/Navbar";
import Search from "../Components/Search";
import ShipmentCards from "../Components/ShipmentCards";
import { useLocation, useParams } from "react-router-dom";

const Shipments=()=>{
    const { id } = useParams();
    const location=useLocation();
    const searchParams=new URLSearchParams(location.search);
    const assignedInchargeId=searchParams.get("assignedInchargeId");
    const [data,setData] =useState([]);
    console.log("::",assignedInchargeId);
    useEffect(()=>{
        async function fetch() {
            try{
                const fetched_data=await axios.get(`http://localhost:8081/api/shipments/${id}`);
                setData(fetched_data.data)
            }
            catch(error){
                console.log(e);
            }
        }
        fetch();
    },[])

    return (
      <div className="bg-[#f2f3f5]">
        <div className="p-2">
          <div className="grid  mt-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {
                data.map((shipment)=>
                    <ShipmentCards key={shipment.id} shipment={shipment} assignedInchargeId={assignedInchargeId}/>
                )
            }
          </div>
        </div>
      </div>
    );
}
export default Shipments;
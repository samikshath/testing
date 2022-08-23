import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ShowComplaints = () => {
    const [complaint,setComplaint]=useState([])

    const getComplaints=()=>{
        axios.get('http://localhost:8080/complaint/getAllComplaintOfRestaurant/9')
        .then(response=>{
            setComplaint(response.data)
        })
      }

    useEffect(()=>{
        getComplaints();
    },[])  

    const resolveComplaint=(id)=>{
      axios.put('http://localhost:8080/complaint/changeComplaintStatus/'+id)
      .then(()=>{
        alert("Resolved")
        window.location.reload();
      }
   
      )
    }
  return (
    <div>
    <h1 >Pending Complaints</h1>
    <table className="table table-dark">
          <thead>
            <tr>
              <th scope="col">User Id</th>
              <th scope="col">Order Id</th>
              <th scope="col">Order Time</th>
              <th scope="col">Complaint Status</th>
              <th scope="col">Complaint </th>
              <th >Action</th>
            </tr>
          </thead>
          <tbody>
          {complaint.map((c)=>{
              if(c.complaintStatus==="pending"){
            return (
              <tr>
                <td>{c.userOrder.user.userId}</td>
                <td>{c.userOrder.orderId}</td>
                <td>{c.userOrder.orderTime}</td>
                <td>{c.complaintStatus}</td>
                <td>{c.complaintMessage}</td>
                <td> <button className='btn btn-success' onClick={()=>{ resolveComplaint(c.complaintId)}}>Resolve Complaint</button></td>
               
              </tr>
            )
              }
         })}
            
            
          </tbody>
       </table>
       </div>
  )
}

export default ShowComplaints
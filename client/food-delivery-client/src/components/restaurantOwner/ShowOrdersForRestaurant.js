import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ShowOrdersForRestaurant = () => {
const [orders,setOrders]=useState([])
const [orderStatus,setOrderStatus]=useState("")

const getAllOrders=()=>{
  axios.get("http://localhost:8080/order/getAllOrdersForRestaurant/"+ 9)
  .then(response => {
    setOrders(response.data)
  })
}

const updateOrderStatus=(id,status)=>{
  console.log("order obj:",status)
  axios.put("http://localhost:8080/order/updateOrderStatus/"+status+"/"+id)
  .then(response => {
    console.log(response)
    getAllOrders();
  })
}

useEffect(()=>{
  getAllOrders()
},[orderStatus])

  return (
    <div>
        <h1>Order Details</h1>
        <table className="table table-dark">
          <thead>
            <tr>
              <th scope="col">Order Id</th>
              <th scope="col">User Id</th>
              <th scope="col">Order Time</th>
              <th scope="col">Total in Rupees</th>
              <th scope="col">Order Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
          {orders.map((order)=>{
            let dateTime = order.orderTime.toString().split(/[T . +]/);
            return (
              <tr>
                  <td>{order.orderId}</td>
                  <td>{order.user.userId}</td>
                  <td>{dateTime[0]+ "  " +dateTime[1]}</td>
                  <td>{order.total}</td>
                  <td>{order.orderStatus}</td>

                  <td>
                  <button className='btn btn-lg btn-secondary' onClick={()=>{updateOrderStatus(order.orderId,orderStatus) }}>Change</button>
                  <button type="button" className="btn btn-lg btn-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                  <span className="visually-hidden">Toggle Dropdown</span>
                  </button>
                  <ul className="dropdown-menu bg-secondary">
                          <button className="btn btn-success" onClick={()=>{setOrderStatus("accepted")  }} >Accept</button> 
                           <br/>
                           <button className="btn btn-primary" onClick={()=>{setOrderStatus("prepared")}}>Prepare</button>
                           <br/>
                           <button className="btn btn-warning" onClick={()=>{setOrderStatus("dispatched")}}>Dispatch</button>
                           <br/>
                           <button className="btn btn-info" onClick={()=>{setOrderStatus("delivered")}}>delivered</button>
                           <br/>
                           <button className="btn btn-danger" onClick={()=>{setOrderStatus("canceled");  updateOrderStatus(order.orderId,orderStatus)}}>Cancel</button>                       
                   </ul>      
                  </td>
              </tr>
            )
          })}
          </tbody>
       </table>
    </div>
  )
}

export default ShowOrdersForRestaurant
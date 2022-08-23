import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import '../../css/Dashboard.css'

const RestaurantDashboard=()=>{

const [ordercount, setordercount]=useState();
const navigate = useNavigate()

const FetchOrder=()=>{
  axios.get(`http://localhost:8080/admin/orderCount`).then((response)=>{
    setordercount(response.data)
  })
}
//   const FetchRest=()=>{
//     axios.get(`http://localhost:8080/admin/restCount`).then((response)=>{
//       setrestcount(response.data)
//     })
//   }

//   const getAllUser = () => {
//     navigate('/user-details')
//    }

//    const getAllRestaurant =()=>{
//      navigate('/restaurant')
//    }

   const getAllOrders = ()=>{
     navigate('/show-orders-owner')
   }
return(  
  <div className="dashboard">
   <head>
   <link rel="stylesheet" type="text/css" href="https://pixinvent.com/stack-responsive-bootstrap-4-admin-template/app-assets/css/bootstrap-extended.min.css"/>
<link rel="stylesheet" type="text/css" href="https://pixinvent.com/stack-responsive-bootstrap-4-admin-template/app-assets/fonts/simple-line-icons/style.min.css"/>
<link rel="stylesheet" type="text/css" href="https://pixinvent.com/stack-responsive-bootstrap-4-admin-template/app-assets/css/colors.min.css"/>
   </head>
<div className="row">
    <div classNameName="col-sm-10">
        <h2 style={{textAlign:'center',color:"aqua", fontSize:"50px"}}>Statistics</h2>
        <div className="row para">
        {/* <div className="col-xl-3 col-sm-6 col-12">
          <div className="card">
            <div className="card-content">
              <div className="card-body">
                <div className="media d-flex">
                  <div className="align-self-center">
                    <i className="icon-speech warning font-large-2 float-left"></i>
                  </div>
                  <div className="media-body text-right" onChange={FetchRest()} onClick={()=>getAllRestaurant()}>
                    <h3>{restcount}</h3>
                    <span>Total Restaurants</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <div className="col-xl-3 col-sm-6 col-12">
          <div className="card">
            <div className="card-content">
              <div className="card-body">
                <div className="media d-flex">
                  <div className="align-self-center">
                    <i className="icon-graph success font-large-2 float-left"></i>
                  </div>
                  <div className="media-body text-right" onChange={FetchOrder()} onClick={()=>getAllOrders()}>
                    <h3>{ordercount}</h3>
                    <span>Total Orders</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
</div>
</div> 
)
}
export default RestaurantDashboard

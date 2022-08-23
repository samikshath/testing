import React, { useEffect, useState } from 'react'
import '../../css/Updateprofile.css'
import axios from 'axios'

const UpdateProfile = () => {
  
  const [userAddress,setUserAddress]=useState({
    addressId: 0,
    area: "",
    street: "",
    pincode: ""
})

  const [user,setUser]=useState({
    userId: 0,
    userName: "",
    userPassword: "",
    userEmail: "",
    userMobileNo: "",
    attemptsCount: 0,
    address: userAddress,
    userOrders: [],
    otp: 0
  })



  const getData=()=>{

        if (sessionStorage.getItem("userEmail")) {
          axios.get('http://localhost:8080/food-delivery/getUserByEmail/'+sessionStorage.getItem("userEmail").toString())
          .then(response=>{
              console.log(response.data)
              setUser(response.data)
          });  
  }
}
  useEffect(()=>{
    getData()
  },[])

  const updateUserProfile = (id) =>{

    axios.put('http://localhost:8080/food-delivery/update/'+user.userId ,user)
    .then(response=>{
    console.log(response)
    })
  }

  return (
        <div className='container update'>
            <div className='form-width'>
           <form >
           <h3 className='text-white'>Update User Profile</h3>
            <div className="form-row">

              <div className="col-md-12 mb-3">
                <input type="text" className="form-control"  placeholder="User Name" value={user.userName} onChange={(e)=>{
                  setUser( {...user,userName: e.target.value})
                }}  /> 
              </div>
              {/* <div className="col-md-12 mb-3">
                <input type="email" className="form-control "  placeholder="User Email" onChange={(e)=>{
                  setUser( {...user,userEmail: e.target.value})
                }}   />
              </div> */}
              <div className="col-md-12 mb-3">
                <input type="password" className="form-control "  placeholder="User Password" value={user.userPassword} onChange={(e)=>{
                  setUser( {...user,userPassword: e.target.value})
                }}  /> 
              </div>
              <div className="col-md-12 mb-3">
                <input type="number" className="form-control "  placeholder="Mobile Number" value={user.userMobileNo} onChange={(e)=>{
                  setUser( {...user,userMobileNo: e.target.value})
                }} /> 
              </div>
              <div className="col-md-12 mb-3">
                <input type="text" className="form-control " placeholder="Area" value={user.address.area} onChange={(e)=>{
                  setUserAddress({...userAddress, area:e.target.value})
                  setUser({...user, address:userAddress})
                }}  /> 
              </div>
              <div className="col-md-12 mb-3">
                <input type="text" className="form-control "  placeholder="Street" value={user.address.street} onChange={(e)=>{
                  setUserAddress({...userAddress, street:e.target.value})
                  setUser({...user, address:userAddress})
                }} /> 
              </div>
              <div className="col-md-12 mb-3">
                <input type="text" className="form-control "  placeholder="Pincode" value={user.address.pincode} onChange={(e)=>{
                  setUserAddress({...userAddress, pincode:e.target.value})
                  setUser({...user, address:userAddress})
                }}   /> 
              </div>
                </div>

            <div className="col-md-12 mb-3">
            <button className="btn btn-primary col-md-12 mb-3" onClick={updateUserProfile}>Update Profile</button>
            </div>
       </form>
       </div>

    </div>
  )
}
export default UpdateProfile
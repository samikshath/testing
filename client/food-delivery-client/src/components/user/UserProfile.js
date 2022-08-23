import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../css/UserProfile.css'

const UserProfile = () => {
  const navigate=useNavigate();
  const [user, setUser] = useState({
    userId: 0,
    userName: "",
    userPassword: "",
    userEmail: "",
    userMobileNo: "",
    attemptsCount: 0,
    address: {
      addressId: 0,
      area: "",
      street: "",
      pincode: ""
    },
    userOrders: [],
    otp: 0
  });

  const getUserData = () => {
    if (sessionStorage.getItem("userEmail")) {
      axios.get('http://localhost:8080/food-delivery/getUserByEmail/'+sessionStorage.getItem("userEmail").toString())
      .then(response=>{
          console.log(response.data)
          setUser(response.data)
      });
    }
    else if(sessionStorage.getItem("admin")) {
      axios.get('http://localhost:8080/food-delivery/getUserByEmail/'+sessionStorage.getItem("userEmail").toString())
      .then(response=>{
        console.log(response.data)
        setUser(response.data)
      });
    }
    // else{
    //   alert('please login...')
    // }
  };
  useEffect(() => {
    getUserData();
  }, []);

  const updateProfilePage=()=>{
    navigate('/update-profile')
  }

  const complaintPage=(id)=>{
    navigate('/my-complaint/'+id);
  }

  return (
    <div className="container">
      <div className="userProfileDiv">
      <h1>User Profile :</h1>
        <table className="table table-props table-dark">
          <tbody>
          <tr>
            <td>Name:</td>
            <td>{user.userName}</td>
          </tr>
          <tr>
            <td>EmailId:</td>
            <td>{user.userEmail}</td>
          </tr>
          <tr>
            <td>MobileNo:</td>
            <td>{user.userMobileNo}</td>
          </tr>
          <tr>
            <td>Address:</td>
            <td>
             {user.address.area},
             {user.address.street},
             {user.address.pincode}.
            </td>
          </tr>
          </tbody>
        </table>          
         
      <button className="btn btn-warning" onClick={()=>{updateProfilePage()}}>Update Profile</button>

      {sessionStorage.getItem('user') && <button className="btn btn-primary" onClick={()=>{complaintPage(user.userId)}}> My Complaints</button>}
      </div>
          
    </div>
  );
};

export default UserProfile;

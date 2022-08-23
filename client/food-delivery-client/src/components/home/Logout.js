import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = () => {
  let navigate=useNavigate();
  
  
  const refreshPage=()=>{
    axios.post('http://localhost:8080/food-delivery/logout',JSON.parse(sessionStorage.getItem('user')))
    .then(response=>{
      console.log(response.data)
    })
    window.location.reload()
    sessionStorage.clear();
  }
 useEffect(()=>{
  navigate('/')
  refreshPage()
 },[])

  return (
    <div>
         
    </div>
  )
}

export default Logout
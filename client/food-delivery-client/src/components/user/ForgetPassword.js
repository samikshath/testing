import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
    const navigate=useNavigate()
    const [email,setEmail]=useState('');
    const[number,setNumber]=useState('');
    const [otp,setOtp]=useState('');
    const [changePasswordButton,setChangePasswordButton]=useState(false)
    const [newPassword,setNewPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')
    const [user,setUser]=useState({})

    const sendOTPToMobile=(emailId)=>{
        axios.get('http://localhost:8080/food-delivery/sendOTP/'+emailId)
        .then(response=>{
            console.log(response.data)
            setOtp(response.data)
            
        })
        axios.get('http://localhost:8080/food-delivery/getUserByEmail/'+emailId)
        .then(response=>{
          setUser(response.data)
        })

    }
    const setPassword=()=>{
      if(newPassword===confirmPassword)
      axios.put('http://localhost:8080/food-delivery/update/'+user.userId,({...user,userPassword:newPassword}))
      .then(()=>{
        console.log("Password Updated");
        navigate('/user-login')
      }
 
      )
    }

    let sendOtpToEmailDiv=
    (
      <div>
      <input className='form-control' type={'email'} placeholder='Enter Your Email' onChange={(e)=>{ setEmail(e.target.value)}}/><br/><br/>
      <button className='btn btn-warning' onClick={()=>{ sendOTPToMobile(email)}}>Sent OTP</button><br/><br/>
      <input className='form-control' placeholder='Enter OTP' onChange={(e)=>{ setNumber(e.target.value)}} /><br/><br/>
      <button className='btn btn-danger' onClick={()=>{ checkOTP(number) }}>Check OTP</button><br/><br/>
      </div >
    )
    let changePasswordDiv=
   (<div>
   <input className='form-control' placeholder='Enter new Password' onChange={(e)=>{setNewPassword(e.target.value)}} /><br/><br/>
   <input className='form-control' placeholder='Confirm Password' onChange={(e)=>{setConfirmPassword(e.target.value)}}/><br/><br/>
   <button className='btn btn-success' onClick={setPassword}>Change Password</button>
   </div>)

   
   const checkOTP=(enteredOtp)=>{
      if(otp==enteredOtp){
      console.log("inside Check OTP");
      setChangePasswordButton(true)
      }
     else
     alert("Enter correct Password")
   }
  return (
    <div className='container mt-4'>

      {changePasswordButton==false && sendOtpToEmailDiv}
      {changePasswordButton && changePasswordDiv}

    </div>
    
  )
}

export default ForgetPassword
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AlertModal from '../home/AlertModal';

const ComplaintMesage = () => {

    const navigate=useNavigate()
    const id=useParams();
    const [message,setMessage]=useState('');
    const [show,setShow]=useState(false)
    const [registerModalOpen,setRegisterModalOpen]=useState(false)
    const hideModal=()=>{
      setShow(false)
      setRegisterModalOpen(false)
      navigate('/show-orders')
    }
    const sendComplaint=(message)=>{
        console.log(message)
        axios.post("http://localhost:8080/complaint/addComplaint/"+id.id,message)
        .then(response => {
            console.log(response)
            setShow(true)
            setRegisterModalOpen(true)
        })

    };
  return (
    <div className='container-sm'>
     <br/> <br/> <br/>   
    <div className='row'>
    <input className='w-50 col-10 form-control px-3'  placeholder='Add your Complaint' onChange={(e)=>{setMessage(e.target.value)}}/>
    <button className='btn col-2 btn-danger px-3' onClick={()=>{sendComplaint(message)}}>Send Complaint</button>
    </div>
    {registerModalOpen && <AlertModal show={show} handleClose={hideModal} >Complaint Registered</AlertModal>}
    </div>
  )
}

export default ComplaintMesage
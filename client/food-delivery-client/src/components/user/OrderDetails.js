import React,{useState} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar, Button, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OrderDetails = (props) => {
const [foodMenus,setFoodMenus]=useState(props.orderDetails)
const [order,setOrder]=useState(props.order)
const [foodRating, setFoodRating]=useState(0);
const [feedback, setFeedback]=useState('');
const navigate=useNavigate()

const addRatingAndFeedback=(id)=>{
  if(foodRating !== '' && feedback!==''){
   axios.put("http://localhost:8080/order/setRatingFeedback/"+id,{foodRating,feedback})
     .then(response=>{
      // console.log(response.data)
      navigate("/")
     })
    }
    else
       window.alert("Empty fields")
}
  return (
    <Modal size='xl' show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h3></h3>
      <table className="table table-warning table-striped text-center">
        <thead>
          <tr>
            <td>Food Name</td>
            <td>Food Category</td>
            <td>Price</td>
            <td>Quantity</td>
            <td >Rating</td>
            <td >Feedback</td>
          </tr>
        </thead>
        <tbody>
          {props.orderDetails.map(foodItem=>{
            return ( <tr key={foodItem.srNo}>
                  <td><img width={"100rem"} className='rounded' src={"http://localhost:8080/" + foodItem.foodMenus.thumbnail} alt={foodItem.foodMenus.foodName} /><p>{foodItem.foodMenus.foodName}</p></td>
                  <td>{foodItem.foodMenus.foodCategory}</td>
                  <td>{foodItem.foodMenus.offer}</td>
                  <td>{foodItem.quantity}</td>
                  {
                   (order.orderStatus == "delivered")?
                  (
                  <>
                  <td><input type="number" onChange={(e)=>{setFoodRating(e.target.value)}}/></td>
                  <td ><input type="text" onChange={(e)=>{setFeedback(e.target.value)}}/>
                  <div><button onClick={()=>{addRatingAndFeedback(foodItem.srNo); }}>Submit Feedback</button></div></td>
                  </>
                  ) :
                  (
                    <>
                    <td></td>
                    <td></td>
                    </>
                  )
                 }  
              </tr>)
          })}
        </tbody>
      </table>
      </Modal.Body>
    </Modal>
  )
}

export default OrderDetails
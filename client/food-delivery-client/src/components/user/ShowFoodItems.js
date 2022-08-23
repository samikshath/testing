import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@mui/material';
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CartIcon from "@mui/icons-material/ShoppingCart";
import ShareIcon from "@mui/icons-material/Share";
import AlertModal from './../home/AlertModal';

const ShowFoodItems = () => {
  const location = useLocation()
  const restaurantId = location.state
  const [foodItems, setFoodItems] = useState([])
  const cart = useSelector((state) => state);
  const [show, setShow]=useState(false)
  const [isModalOpen,setIsModalOpen]=useState(false)
  const dispatch = useDispatch();
  const hideModal=()=>{
    setShow(false);
    setIsModalOpen(false)
  }

  useEffect(() => {
    getFoodByRestaurant()
  }, [])

  const getFoodByRestaurant = () => {
    axios.get('http://localhost:8080/food-menu/getFoodByRestaurant/' + restaurantId)
      .then(response => {
        setFoodItems(response.data)
      })
  }
  
  const addToCart = (food) => {
    if(sessionStorage.getItem('user'))
    {dispatch({ type: 'ADD', payload: food })}
    else{setShow(true);setIsModalOpen(true)}
  }

  return (
    <div className="d-flex container">
      <div className="flex-wrap">
        {foodItems.map(food => {
          food.quantity = 1
          return (<Card className="m-4 text-center" sx={{ display: "inline-flex", flexDirection: "column", height: "100%" }}>
            <CardMedia component="img" alt="" height="200" sx={{ width: 275 }} image={"http://localhost:8080/restaurant/" + food.thumbnail} />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography sx={{ fontSize: 30 }} variant="body1">{food.foodName}</Typography>
              <Typography color={"#F5A74A"} gutterBottom variant="h5" component="div">
              ₹ {food.price}
              </Typography>
            </CardContent>
            <CardActions sx={{ mx: 5 }}>
              <Button size="small" onClick={() => addToCart(food)}>
                <CartIcon sx={{ mx: 2 }} />
                Add To Cart
              </Button>
            </CardActions>

          </Card>)
        })}
      </div>
      {isModalOpen && <AlertModal show={show} handleClose={hideModal}>Please login to continue</AlertModal>}
    </div>

  )
}


export default ShowFoodItems
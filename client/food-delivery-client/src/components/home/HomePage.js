import React, { useState, useEffect } from "react";
import "../../css/HomePage.css";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from '@mui/material/IconButton';


const HomePage = () => {
  const [allRestaurants, setAllRestaurants] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem('user'))

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = () => {
    axios
      .get("http://localhost:8080/restaurant/allRestaurant")
      .then((response) => {
        setAllRestaurants(response.data);
      });
  };
 
  const showFoodItems = (restId) => {
    console.log(restId);
    navigate("/food-items", { state: restId });

  };

 
  

  const goToSearch=()=>{
    navigate("/filter")
  }



  return (
    <div className="home">
    <div className="container ">
      <span className="h2 float-left m-4 text-warning">Restaurants </span>
     <div className="float-end"> <Button variant="contained"  onClick={()=>goToSearch()}>Search</Button></div>
      <div className="d-flex flex-wrap text-center">
        {allRestaurants.map(restaurant => {
          return (<Card className="m-4 text-center" sx={{alignItems:"center", display: "inline-flex", flexDirection: "column", height: "100%" }}>
            <CardMedia component="img" alt="" height="200" sx={{ width: 275 }} image={"http://localhost:8080/restaurant/" + restaurant.thumbnail} />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography sx={{ fontSize: 30 }} variant="body1">{restaurant.restaurantName}</Typography>
            </CardContent>
            <CardActions >
              <Button size="small" onClick={() => {
                showFoodItems(restaurant.restId);
              }}>
                Show Food Menu
              </Button>
            </CardActions>
           
          </Card>)
        })}
      </div>
     
    </div>
    </div>
  );
};

export default HomePage;

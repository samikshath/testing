import React, { useState, useEffect } from "react";
import "../../css/HomePage.css";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";


const AdminHomePage = () => {
  const [allRestaurants, setAllRestaurants] = useState([]);
  const navigate = useNavigate();

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

  return (
    <div className="container my-5">
      <span className="h2 float-left m-4 text-warning">Restaurants </span>
      <div className="d-flex flex-wrap text-center">
        {allRestaurants.map(restaurant => {
          return (<Card className="m-4 text-center" sx={{alignItems:"center", display: "inline-flex", flexDirection: "column", height: "100%" }}>
            <CardMedia component="img" alt="" height="200" sx={{ width: 275 }} image={"http://localhost:8080/restaurant/" + restaurant.thumbnail} />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography sx={{ fontSize: 30 }} variant="body1">{restaurant.restaurantName}</Typography>
            </CardContent>
          </Card>)
        })}
      </div>
    </div>
  );
};

export default AdminHomePage;

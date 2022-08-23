import React from 'react'
import { Modal } from 'react-bootstrap';
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios  from 'axios';

const SearchModal = (props) => {
    const navigate = useNavigate();
    const user = JSON.parse(sessionStorage.getItem('user'))

    
 ;
    const showFoodItems = (restId) => {
        console.log(restId);
        navigate("/food-items", { state: restId });

    };
   
    // console.log(props.data)

    return (
        <Modal size='xl' show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Restaurants</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container my-5">
                    {/* <span className="h2 float-left">Restaurants near you : </span> */}
                    <div className="d-flex flex-wrap text-center">
                        {props.data.map((restaurant) => {
                            return (<Card className="m-4 text-center" sx={{alignItems:"center", display: "inline-flex", flexDirection: "column", height: "100%" }}>
                                <CardMedia component="img" alt="" height="200" sx={{ width: 275 }} image={"http://localhost:8080/restaurant/" + restaurant.thumbnail} />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography sx={{ fontSize: 30 }} variant="body1">{restaurant.restaurantName}</Typography>
                                </CardContent>
                                <CardActions sx={{ mx: 7 }}>
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
            </Modal.Body>
        </Modal>
    )
}

export default SearchModal
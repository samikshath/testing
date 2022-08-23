import { Container, Divider, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

function UpdateOffer() {
  const [offer, setOffer] = useState(0.0)
  const [error, setError] = useState('');
  const [errorResponse, setErrorResponse] = useState('');
  const location = useLocation()
  const foodMenu = location.state;
  const navigate = useNavigate()

  const updateOfferPrice = () => {
    if (offer) {
      const data = new FormData()
      data.append("offer", offer)

      axios.put("http://localhost:8080/food-menu/updateOffer/" + foodMenu.foodId, data)
        .then(response => {
          navigate('/offer')
        })
        .catch(error => {
          setErrorResponse(error.response.data)
          alert(errorResponse)
        })
    } else {
      setError('something is missing')
    }
  }

  const backToOfferPage = () => {
    navigate('/offer')
  }

  return (
    <Container maxWidth='md' sx={{ pb: 4 }}>
      <span className="h3 text-danger">{error}</span>
      <Typography varient="h1" sx={{ pt: 3, fontSize: 35 }} color={"blue"} >Update Offer</Typography>
      <Divider />
      <TextField label='Food Offer Price' name='Food Offer Price' fullWidth required margin='normal' onChange={(event) => {
        setOffer(event.target.value)
      }}></TextField>

      <Button variant="contained" onClick={() => updateOfferPrice()} color="secondary"> Update Offer Price</Button>

      <Button variant="contained" color="warning" sx={{ m: 2 }} onClick={() => backToOfferPage()}>Back </Button>
    </Container>
  )
}

export default UpdateOffer
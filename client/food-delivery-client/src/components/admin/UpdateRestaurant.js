import { Button, Container, Divider, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

function UpdateRestaurant() {
  const location = useLocation()
  const navigate = useNavigate()

  const restaurant = location.state
  const [restaurantName, setRestaurantName] = useState('')
  const [restaurantUserName, setRestaurantUserName] = useState('')
  const [thumbnail, setThumbnail] = useState(undefined)
  const [error, setError] = useState('');
  const [errorResponse, setErrorResponse] = useState('');

  const getRestaurantById = () => {
    axios.get("http://localhost:8080/restaurant/getRestaurantById/" + restaurant.restId)
      .then(response => { console.log(response.data) })
      .catch(error => {
        console.log(error.data)
      })
  }

  useEffect(() => {
    getRestaurantById()
  }, [])

  const onFileSelect = (event) => {
    setThumbnail(event.target.files[0])
  }

  const backToRestaurant = () => {
    navigate('/restaurant')
  }

  const updateRestaurant = () => {
    if (restaurantName && restaurantUserName && thumbnail) {
      const data = new FormData()
      data.append('restaurantName', restaurantName)
      data.append('restaurantUserName', restaurantUserName)
      data.append('thumbnail', thumbnail)


      axios.put('http://localhost:8080/restaurant/updateRestaurant/' + restaurant.restId, data)
        .then((response) => {
          navigate("/restaurant")
        }).catch(error => {
          setErrorResponse(error.response.data)
          alert(errorResponse)
        })
    } else {
      setError('something is missing')
    }
  }

  return (
    <Container maxWidth='md' sx={{ pb: 4 }}>
      <span className="h3 text-danger">{error}</span>
      <Typography varient="h1" sx={{ pt: 3, fontSize: 35 }} color={"blue"} >Update Restaurant</Typography>
      <Divider />
      <TextField label='Restaurant Name' name='Restaurant Name' fullWidth required margin='normal' onChange={(event) => {
        setRestaurantName(event.target.value)
      }}></TextField>

      <TextField label='Restaurant User Name' name='Restaurant User Name' fullWidth required margin='normal' onChange={(event) => {
        setRestaurantUserName(event.target.value)
      }}></TextField>

      <TextField label='Thumbnail' name='Thumbnail' accept="image/*" type={"file"} fullWidth required margin='normal' onChange={onFileSelect}></TextField>

      <Button id="succesBtn" variant="contained" onClick={() => updateRestaurant()} color="secondary"> Update Restaurant</Button>

      <Button variant="contained" color="warning" sx={{ m: 2 }} onClick={() => backToRestaurant()}>Back  </Button>
    </Container>
  )
}


export default UpdateRestaurant
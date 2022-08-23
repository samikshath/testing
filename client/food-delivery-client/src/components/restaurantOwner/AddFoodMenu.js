import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Button, Container, Divider, TextField, Typography } from '@mui/material';
import Select from '@mui/material/Select';

const AddFoodMenu = () => {
    const [restaurants, setRestaurants] = useState([])
    const [restaurant, setRestaurant] = useState(-1)
    const [foodName, setFoodName] = useState('')
    const [price, setPrice] = useState(0)
    const [foodCategory, setFoodCategory] = useState('')
    const [offer, setOffer] = useState(0)
    const [thumbnail, setThumbnail] = useState(undefined)
    const [error, setError] = useState('');
    const [errorResponse, setErrorResponse] = useState('');

    const navigate = useNavigate()

    useEffect(() => {
        fetchAllRestaurant()
    }, [])

    const fetchAllRestaurant = () => {
        axios.get('http://localhost:8080/restaurant/allRestaurant').then(response => {
            setRestaurant(response.data[0].restId)
            setRestaurants(response.data)
        })
    }
    const onFileSelect = (event) => {
        setThumbnail(event.target.files[0])
    }

    const addFoodMenu = () => {
        if(foodName && price && thumbnail && foodCategory && offer && restaurant){
        const data = new FormData()
        data.append('foodName', foodName)
        data.append('price', price)
        data.append('thumbnail', thumbnail)
        data.append('foodCategory', foodCategory)
        data.append('offer', offer)
        data.append('restId', restaurant)

        axios.post('http://localhost:8080/food-menu/addFoodMenus', data)
            .then(response => {
                navigate('/food-menu')
            }).catch(error=>{
                setErrorResponse(error.response.data)
                alert(errorResponse)
            })
        } else {
            setError('something is missing')
        }
    }

    const toFoodMenu = () => {
        navigate("/food-menu")
    }
    return (

        <Container maxWidth='md' sx={{ pb: 4 }}>
             <span className="h3 text-danger">{error}</span>
            <Typography varient="h1" sx={{ pt: 3, fontSize: 35 }} color={"rebeccapurple"} > Add Food</Typography>
            <Divider />
            <TextField label='Food Name' name='Food Name' fullWidth required margin='normal' onChange={(event) => {
                setFoodName(event.target.value)
            }}></TextField>

            <TextField label='Price' name='Price' fullWidth required margin='normal' onChange={(event) => {
                setPrice(event.target.value)
            }}></TextField>

            <TextField label='Offer' name='Offer' fullWidth required margin='normal' onChange={(event) => {
                setOffer(event.target.value)
            }}></TextField>

            <TextField label='Food Category' name='Food Category' fullWidth required margin='normal' onChange={(event) => {
                setFoodCategory(event.target.value)
            }}></TextField>

            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Restaurant</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Restaurant"
                        onChange={(event) => {
                            setRestaurant(event.target.value)
                        }}
                    >
                        {restaurants.map((restaurant) => {
                            return (
                                <MenuItem value={restaurant.restId}> {restaurant.restaurantName}</MenuItem>
                            )
                        })
                        }
                    </Select>
                </FormControl>
            </Box>

            <TextField label='Thumbnail' name='Thumbnail' accept="image/*" type={"file"} fullWidth required margin='normal' onChange={onFileSelect}></TextField>

            <Button id="succesBtn" variant="contained" onClick={() => addFoodMenu()} color="secondary"> Add</Button>

            <Button variant="contained" color="warning" sx={{ m: 2 }} onClick={() => toFoodMenu()}>Back  </Button>
        </Container>
    )
}

export default AddFoodMenu

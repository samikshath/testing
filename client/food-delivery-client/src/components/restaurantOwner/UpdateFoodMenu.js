import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../css/EditFoodMenu.css';
import { Button, Container, Divider, TextField, Typography } from '@mui/material';

const UpdateFoodMenu = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const foodMenu = location.state
    const [foodName, setFoodName] = useState('')
    const [foodCategory, setFoodCategory] = useState('')
    const [thumbnail, setThumbnail] = useState(undefined)
    const [error, setError] = useState('');
    const [errorResponse, setErrorResponse] = useState('');

    const getFoodMenubyId = () => {
        axios.get("http://localhost:8080/food-menu/" + foodMenu.foodId)
            .then(response => {

            })
            .catch(error => {
                console.log(error.data)
            })
    }

    useEffect(() => {
        getFoodMenubyId()
    }, [])

    const onFileSelect = (event) => {
        setThumbnail(event.target.files[0])
    }

    const backToFoodMenu = () => {
        navigate('/food-menu')
    }

    const updateFoodMenu = () => {
        if (foodName && thumbnail && foodCategory) {
            const data = new FormData()
            data.append('foodName', foodName)
            data.append('thumbnail', thumbnail)
            data.append('foodCategory', foodCategory)

            axios.put('http://localhost:8080/food-menu/updateFoodMenu/' + foodMenu.foodId, data)
                .then((response) => {
                    // console.log(response.data)
                    navigate("/food-menu")
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
            <Typography varient="h1" sx={{ pt: 3, fontSize: 35 }} color={"blue"} >Update Food</Typography>
            <Divider />
            <TextField label='Food Name' name='Food Name' fullWidth required margin='normal' onChange={(event) => {
                setFoodName(event.target.value)
            }}></TextField>

            <TextField label='Food Category' name='Food Category' fullWidth required margin='normal' onChange={(event) => {
                setFoodCategory(event.target.value)
            }}></TextField>

            <TextField label='Thumbnail' name='Thumbnail' accept="image/*" type={"file"} fullWidth required margin='normal' onChange={onFileSelect}></TextField>

            <Button id="succesBtn" variant="contained" onClick={() => updateFoodMenu()} color="secondary"> Update Food</Button>

            <Button variant="contained" color="warning" sx={{ m: 2 }} onClick={() => backToFoodMenu()}>Back  </Button>
        </Container>
    )
}

export default UpdateFoodMenu
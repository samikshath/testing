import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar, Button, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Restaurant = () => {
  const [restaurants, setRestaurants] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    getAllRestaurant()
  }, [])

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));


  const getAllRestaurant = () => {
    axios.get('http://localhost:8080/restaurant/allRestaurant').then((response) => {
      setRestaurants(response.data)
    }).catch((error) => {
      console.log(error)
    })
  }

  const deleteRestaurant = (restaurantId) => {
    axios.delete('http://localhost:8080/restaurant/deleteRestaurant/' + restaurantId).then((response) => {
      setErrorMessage('')
      getAllRestaurant()
    }).catch((error) => {
      setErrorMessage(error.response.data)
    })
  }

  const editRestaurant = restaurant => {
    navigate('/edit-restaurant', { state: restaurant })
  }

  const toAddRestaurant = () => {
    navigate("/add-restaurant")
  }

  const exportFoodItemDetails=()=>{
    axios.get('http://localhost:8080/admin/export-foodItem-details')
    .then(response=>{

    })
  }

  const exportRestaurantDetails=()=>{
    axios.get('http://localhost:8080/admin/export-restaurant-details')
    .then(response=>{

    })
  }
  
  return (
    <div >
      <Typography variant='h3' sx={{ color: 'red' }}>{errorMessage}</Typography>
      <Typography variant='h4' color={"crimson"}> Restaurants</Typography>

      <div className='links'>
        <Button sx={{ m: 2 }} color='primary' variant="outlined" onClick={() => toAddRestaurant()}>Add Resaturant</Button>
      </div>
      <button onClick={exportFoodItemDetails} className='btn btn-outline-primary mb-4 mx-4'>Export Food Item Details</button>
      <button onClick={exportRestaurantDetails} className='btn btn-outline-primary mb-4 mx-4'>Export Restaurant Details</button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="right">#</StyledTableCell>
              <StyledTableCell>Restaurant Name</StyledTableCell>
              <StyledTableCell >Restaurant Email ID</StyledTableCell>
              <StyledTableCell align="left">Restaurant User Name</StyledTableCell>
              {/* <StyledTableCell align="left">Restaurant Password</StyledTableCell> */}
              <StyledTableCell align="left">Restaurant Images</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {restaurants.map((restaurant, index) => (
              <StyledTableRow key={restaurant.restId}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell>{restaurant.restaurantName}</StyledTableCell>
                <StyledTableCell align="left">{restaurant.restaurantEmail}</StyledTableCell>
                <StyledTableCell align="left">{restaurant.restaurantUserName}</StyledTableCell>
                {/* <StyledTableCell align="left">{restaurant.restaurantPassword}</StyledTableCell> */}
                <StyledTableCell align="left"><Avatar alt="Restaurant" variant='square' sx={{ borderRadius: 3, width: 150, height: 90 }} src={"http://localhost:8080/" + restaurant.thumbnail} /></StyledTableCell>
                <StyledTableCell align='right'><Button color='error' size="small" variant="outlined" startIcon={<DeleteIcon />} onClick={() => deleteRestaurant(restaurant.restId)}>Delete</Button>
                  <Button color='info' size="small" variant="outlined" sx={{ margin: 5 }} onClick={() => editRestaurant(restaurant)}> Update</Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Restaurant


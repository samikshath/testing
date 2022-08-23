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
import { Button } from '@mui/material';
import '../../css/User.css'

const User = () => {
  const [users, setUsers] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    getAllUser()
  }, [])

  const getAllUser = () => {
    axios.get('http://localhost:8080/food-delivery/allUser').then((response) => {
        setUsers(response.data)
    }).catch((error) => {
      console.log(error)
    })
  }

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

  const unblockUser=(user)=>{
    axios.put('http://localhost:8080/admin/unblock/'+user.userId,user)
    .then(response=>{
      alert('User unblock successfully')
      getAllUser();
    })
    
  }
  
  const exportUserDetails=()=>{
    axios.get('http://localhost:8080/admin/export-user-details')
    .then(response=>{
      
    })
  }

  return (
  
    <div className="user">
    <h1> Users </h1>
    <button className="btn btn-primary mx-5">Check User History</button>
    <button onClick={exportUserDetails} className="btn btn-primary mx-5">Export User History</button>
    <hr />
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>#</StyledTableCell>
            <StyledTableCell align="right">User Name</StyledTableCell>
            <StyledTableCell align="right">User Email Id</StyledTableCell>
            <StyledTableCell align="right">User Password</StyledTableCell>
            <StyledTableCell align="right">User Mobile No.</StyledTableCell>
            <StyledTableCell align="right">Attempts</StyledTableCell>
            <StyledTableCell align="right">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { users.map((user, index) =>(
            <StyledTableRow key={user.userId}>
              <StyledTableCell component="th" scope="row">
              {
              (user.attemptsCount<=3) ?
                (user.isBlocked=true) : (user.isBlocked=false)
              }
              {console.log("is Blocked: ",user.isBlocked)}
              {index + 1}
              </StyledTableCell>
              <StyledTableCell align="right">{user.userName}</StyledTableCell>
              <StyledTableCell align="right">{user.userEmail}</StyledTableCell>
              <StyledTableCell align="right">{user.userPassword}</StyledTableCell>
              <StyledTableCell align="right">{user.userMobileNo}</StyledTableCell>
              <StyledTableCell align="right">{user.attemptsCount}</StyledTableCell>
              <StyledTableCell align="right"> <Button disabled={user.isBlocked} onClick={()=>unblockUser(user)} variant="contained">Unblock</Button></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default User


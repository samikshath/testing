import React, { useState } from 'react'
import { Container, Typography, Box, TextField, Button } from '@mui/material'
import { fontSize, height } from '@mui/system';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Registration() {

  const [isDisabled, setIsDisabled] = useState(true)
  const [userName, setUserName] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userMobileNo, setUserMobileNo] = useState('')
  const [street, setStreet] = useState('');
  const [area, setArea] = useState('');
  const [pincode, setPincode] = useState('');
  const navigate = useNavigate()

  // const characters = 'ABCDFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';

  // function generateString(length) {
  //   let result = '';
  //   const charactersLength = characters.length;
  //   for (let i = 0; i < length; i++) {
  //     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  //   }
  //   return result;
  // }
  // const captcha = generateString(6)

  const resgister = () => {
    const body = { userName, userPassword, userEmail, userMobileNo, address: { street, pincode, area } }

    const header = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios.post("http://localhost:8080/food-delivery/register", body, header)
      .then(response => {
        console.log(response)
        alert("h")
      })
      .catch(error => console.log(error));
      navigate("/user-login")
  }

  // let handleChange = (e) => {
  //   let name = e.target.name;
  //   let value = e.target.value;
  //   user[name] = value;
  //   setUser(user);
  // }

  // const onSubmit = e => {
  //   var element = document.getElementById("succesBtn");
  //   var inputData = document.getElementById("inputType");

  //   element.innerHTML = "checking...";
  //   inputData.disabled = true;
  //   element.disabled = true;

  //   setIsDisabled(false);

  //   var myFunctions = function () {
  //     if (captcha == user.username) {
  //       element.style.backgroundColor = "green";
  //       element.innerHTML = "Captcha Verified";
  //       element.disabled = true;
  //       element.style.cursor = "not-allowed";
  //       inputData.style.display = "none"
  //     }
  //     else {
  //       element.style.backgroundColor = "red";
  //       element.innerHTML = "Not Matched";
  //       element.disabled = true;
  //       element.style.cursor = "not-allowed";


  //       var myFunction = function () {
  //         element.style.backgroundColor = "black";
  //         element.innerHTML = "verify Captcha ";
  //         element.disabled = false;
  //         element.style.cursor = "pointer";
  //         inputData.disabled = false;
  //         inputData.value = '';

  //       };
  //       setTimeout(myFunction, 5000);
  //     }
  //   }
  //   setTimeout(myFunctions, 5000);
  // };

  const styles = {
    paperContainer: {
      backgroundImage: `url(https://th.bing.com/th/id/OIP.3LtxHFr92ZmO_qB5-t4SJgHaEo?pid=ImgDet&rs=1)`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    },

    Container: {
      backgroundImage: `url(https://images.unsplash.com/photo-1563291074-2bf8677ac0e5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=707&q=80)`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    }
  };

  return (
    <body style={styles.paperContainer}>
      <Box component='form' pt={10}>
        <Container maxWidth='sm' style={styles.Container} sx={{ pb: 4 }}>
          <Typography varient="h1" sx={{ pt: 3, fontSize: 35 }} >Registration</Typography>

          <TextField label='Full Name' name='name' fullWidth required margin='normal' onChange={(event) => setUserName(event.target.value)}></TextField>

          <TextField label='Email Address' name='email' fullWidth required margin='normal' onChange={(event) => setUserEmail(event.target.value)}></TextField>

          <TextField label='Mobile' name='mobile' fullWidth required margin='normal' onChange={(event) => setUserMobileNo(event.target.value)}></TextField>

          <TextField type={"password"} label='Password' name='password' fullWidth required margin='normal' onChange={(event) => setUserPassword(event.target.value)}></TextField>

          <TextField label='Area' name='Area' fullWidth required margin='normal' onChange={(event) => setArea(event.target.value)}></TextField>

          <TextField label='Street' name='Street' fullWidth required margin='normal' onChange={(event) => setStreet(event.target.value)}></TextField>

          <TextField label='Pincode' name='Pincode' fullWidth required margin='normal' onChange={(event) => setPincode(event.target.value)}></TextField>


          {/* <TextField label='Captch' fullWidth required margin='normal'>{captcha}</TextField> */}
          {/* <br /><br />
          <div class="col-md-8">
            <h4 id="captcha" style={{ margineLeft: "25px", position: "absolute" }}> {captcha}</h4>
          </div>
          <br /><br /> */}
          {/* 
          <TextField label='Captcha' type="text"
            placeholder="Enter Captcha"
            id="inputType"
            className="form-control"
            name="user_captcha_input"
            name="username"
            onChange={handleChange}
            required margin='normal'
            fullWidth ></TextField>

          <Button id="succesBtn" variant="contained" fullWidth onClick={onSubmit} color="secondary">verify captcha</Button> */}

          {/* <Button variant="contained" color='secondary' sx={{justifyContent:'flex-end' , alignItems:'flex-end'}}>Cancel</Button> */}
          <br /><br></br>

          {/* <Button type='submit' variant="contained" color="primary" fullWidth disabled={isDisabled} onClick={() => resgister()}>Submit</Button>*/}
          <Button type='submit' variant="contained" color="primary" fullWidth onClick={() => resgister()}>Submit</Button>


        </Container>
      </Box>
    </body>
  )
}

export default Registration
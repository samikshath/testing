import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../css/Login.css";
import AlertModal from "../home/AlertModal";
import FormControl from "@mui/material/FormControl";
import {  Link, useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  IconButton,
  TextField,
  Typography,
  Link as MUILink
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Fingerprint from "@mui/icons-material/Fingerprint";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

function Login() {
  let navigate = useNavigate();
  const [loginObject, setLoginObject] = useState({
    userEmail: "",
    userPassword: "",
  });
  const [user, setUser] = useState({});

  const [otpCheck, setOtpCheck] = useState(0);
  const [otpEntered, setOtpEntered] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')
  const [message, setMessage] = useState('')
  const hideModal = () => {
    setAlertModalOpen(false);
    setShow(false);
  };
  const generateOtp = () => {
    axios
      .post("http://localhost:8082/login", loginObject)
      .then((response) => {
        setOtpCheck(response.data);
        setErrorMessage('')
        setAlertModalOpen(true)
        setShow(true)
      })
      .catch((error) => {
        console.log(error.response.data)
        setErrorMessage(error.response.data)
      });
  };

  const otpCheckMethod = () => {
    if (otpCheck === parseInt(otpEntered)) {
      //console.log('inside if')
      setIsDisabled(false);
      axios
        .get(
          "http://localhost:8080/food-delivery/getUserByEmail/" +
          loginObject.userEmail
        )
        .then((response) => {
          setUser(response.data);
        });
      sessionStorage.setItem("userEmail", loginObject.userEmail);
    } else {
      setShow(true);
      setAlertModalOpen(true);
      setIsDisabled(true);
    }
  };


  

  

 

  const gotoHomePage = () => {
    sessionStorage.setItem("user", JSON.stringify(user));
    navigate("/");
    window.location.reload();
  };

  const Copyright = () => {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {"Copyright © "}
        <MUILink color="inherit" href="#">
          Your Website
        </MUILink>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  };

  return (
  
    <div className="bg-white" >
      <Grid container>
        {alertModalOpen && (
          <AlertModal show={show} handleClose={hideModal}>OTP has been sent on your registered Email</AlertModal>
        )}
        <Grid sx={{ my: 20 }} item xs={6}>
          <Box
            component="img"
            src="https://m.coruscatesolution.com/wp-content/themes/Coruscate/img/Services/food-delivery-apps/food-delivery-apps.svg"
            alt=""
            className="img-fluid"
          />
        </Grid>
        <Grid item xs={6}>
          <Container
            component="main"
            maxWidth="sm"
            sx={{ backgroundColor: "grey", my:10 }}
          >
            
            <Box
              sx={{
                marginTop: 5,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                border: "1px grey solid",
                p: 6,
              }}
              bgcolor="9CF1E1"
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box component="form" noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={(event) =>
                    setLoginObject({
                      ...loginObject,
                      userEmail: event.target.value,
                    })
                  }
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(event) =>
                    setLoginObject({
                      ...loginObject,
                      userPassword: event.target.value,
                    })
                  }
                />
                <Typography sx={{ color: 'red' }}>{errorMessage}</Typography>
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={generateOtp}
                >
                  Generate OTP
                </Button>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="OTP"
                  label="OTP"
                  type="text"
                  id="number"
                  onChange={(event) => {
                    setOtpEntered(event.target.value);
                  }}
                />
                <Button
                  type="button"
                  fullWidth
                  variant="outlined"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={otpCheckMethod}
                >
                  Check OTP
                  <IconButton aria-label="fingerprint" color="secondary">
                    <Fingerprint />
                  </IconButton>
                </Button>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me" 
                  
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={isDisabled}
                  onClick={gotoHomePage}
                >
                  Sign In
                </Button>
               
              </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </Container>
        </Grid>
      </Grid>
    </div>
  );
}

export default Login;

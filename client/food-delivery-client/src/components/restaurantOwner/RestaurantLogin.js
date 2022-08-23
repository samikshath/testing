import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/AdminAndRestaurantLogin.css";

const RestaurantLogin = () => {
  let navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('')
  const [loginObject, setLoginObject] = useState({
    restaurantEmail: "",
    restaurantPassword: "",
  });


  const restaurantLogin = () => {
    axios
      .post("http://localhost:8080/restaurant/login", loginObject)
      .then((response) => {
        setLoginObject(response.data);
        setErrorMessage('')
        // setAlertModalOpen(true)
        sessionStorage.setItem("restaurant", JSON.stringify(response.data));
        console.log(response.data)
        navigate("/restaurantdashboard");
        window.location.reload()
      })
      .catch((error) => {
        console.log(error.response.data)
        setErrorMessage(error.response.data)
      });
  };

  
  return (
    <div className="container register">
      <div className="row">
        <div className="col-md-3 register-left">
          <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" />
          <h3>Welcome</h3>
          <p>You are 30 seconds away from earning your own money!</p>
          <br />
        </div>
        <div className="col-md-9 register-right">

          <div className="tab-content row" id="myTabContent">
          <div
              className="tab-pane fade"
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <h3 className="register-heading">Login as Admin</h3>
              <div className="row register-form">
                <div className="col-md-8">
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Your Email *"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password *"                    
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <button type="submit" className="btnRegister">
                    Login
                  </button>
                </div>
              </div>
            </div>
            <div
              className="tab-pane fade active show"
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <h3 className="register-heading">Login as Restaurant Owner</h3>
              <div className="row register-form">
                <div className="col-md-8">
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Your Email *"
                      onChange={(event) =>
                        setLoginObject({
                          ...loginObject,
                          restaurantEmail: event.target.value,
                        })
                      }
                    />
                  </div>
                  <br/>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password *"
                      onChange={(event) =>
                        setLoginObject({
                          ...loginObject,
                          restaurantPassword: event.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <button  onClick={() => restaurantLogin()} type="submit" className="btnRegister">
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantLogin;

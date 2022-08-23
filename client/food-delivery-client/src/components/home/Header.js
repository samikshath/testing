import React from "react";
import { Link } from "react-router-dom";
import "../../css/Header.css";
import logo from "../../images/food-delivery.jpg";
import { useSelector } from "react-redux";
import { Badge, IconButton } from "@mui/material";
import CartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from '@mui/icons-material/Favorite';

const Header = () => {
  const cart = useSelector((state) => state);
  let userLoggedIn;
  sessionStorage.getItem("userEmail") !== null
    ? (userLoggedIn = (
      <>
        <Link className="nav-link" to={"/user-profile"}>
          Profile
        </Link>
        
         <Link className="order-text" to={"/my-current-orders"}>
          my Orders
        </Link>
         

            
        
    

        <Link className="nav-link " to={"/cart"}>
          <Badge badgeContent={cart.length} color="secondary" sx={{ mr: 1 }}>
            <CartIcon />
          </Badge>
          Cart
          </Link>

        
      
        <Link className="nav-link" to={"/logout"}>
          Logout
          </Link>
      </>
    ))
    : (userLoggedIn = (
      <div className="dropdown">
        <button
          className="btn btn-primary dropdown-toggle"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Login
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li>
            {/* <Link to={"/user-login"}> */}
            <a className="dropdown-item" href="user-login">
              User
            </a>
            {/* </Link> */}
          </li>
          <li>
            <a className="dropdown-item" href="admin-login">
              Admin
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="restaurant-login">
              Restaurant
            </a>
          </li>
        </ul>
      </div>

    ));

  return (
    <div className="header container-fluid">
      <div className="float-left">
        <a className="navbar-brand heading m-2">
          <img
            src={logo}
            width="50"
            height="50"
            className="d-inline-block align-top"
            alt=""
          />
        </a>
        <span className="h1">
          <Link className="heading m-3 mt-4" to={"/"}>
            Online Food Delivery App
          </Link>
        </span>
        
        <nav className="navbar nav nav-pills flex-wrap">
          <Link data-toggle="pill" className="nav-link active-tab" to={"/"}>
            Home
          </Link>
          <Link className="nav-link " to={"/contactus"}>
            Contact Us
          </Link>
          <Link className="nav-link active-tab" to={"/aboutus"}>
            About Us
          </Link>
          {userLoggedIn}


          {/* 
           <Link className="nav-link " to={"/my-complaint"}>
          Complaints
        </Link>
        <Link className="nav-link " to={"/show-complaint"}>
          Show Complaints Rest
        </Link> */}
        </nav>
        <br />
        <br />
      </div>
    </div>
  );
};

export default Header;

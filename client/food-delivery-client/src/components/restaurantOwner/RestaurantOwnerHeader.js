import React from 'react'
import { Link } from 'react-router-dom'
// import '../../css/AdminHeader.css'

function RestaurantOwnerHeader() {
    return (
        <div className="topnav" id="myTopnav">
            <Link className="nav-link demo" to='#'> Food App</Link>
            <Link className="nav-link demo" to="/restaurantdashboard">Home</Link>
            <Link className="nav-link demo" to="/show-orders-owner">Orders</Link>

            <Link className="nav-link" to={"/food-menu"}>
                FoodMenu
            </Link>
            <Link className="nav-link" to={"/offer"}>
                Offers
            </Link>

            <div className="topnav-right">
                <Link className="nav-link demo" to={"/logout"}>
                    LogOut
                </Link>
            </div>
        </div>
    )
}

export default RestaurantOwnerHeader

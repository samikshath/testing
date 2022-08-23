import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Offer() {
    const [foodMenus, setFoodMenus] = useState([])
    const navigate = useNavigate()
    const fetchAllFoodMenus = () => {
        axios.get("http://localhost:8080/food-menu/allOffers")
            .then(response => {
                setFoodMenus(response.data)
            }).catch(error => {
                console.log(console.log(error.data))
            })
    }

    useEffect(() => {
        fetchAllFoodMenus();
    }, [])

    const editFoodOffer = foodMenu => {
        navigate("/edit-offer", { state: foodMenu })
    }
    const removeFoodOffer = foodId => {
        axios.put("http://localhost:8080/food-menu/removeOffer/" + foodId)
            .then(response => { fetchAllFoodMenus() })
            .catch(error => { console.log(error) })
    }
    return (
        <div>
            <h3>Food Price</h3>
            <br />
            <div className='links'>
                <Link to='/add-offer'>
                    <button className='btn btn-warning'>Add Offers</button>
                </Link>
            </div>
            <hr />
            <table className="table table-hover table-responsive" style={{ textAlign: 'justify' }}>
                <thead className="table-dark">
                    <tr>
                        <th>#</th>
                        <th>Food Name</th>
                        <th>Price</th>
                        <th>Food Offers</th>
                        <th>Food Images</th>
                        <th className='text-center' colSpan={2}>Action</th>
                    </tr>
                </thead >
                <tbody className="table-light">
                    {
                        foodMenus.map((foodMenu, index) => {
                            return (
                                <tr key={foodMenu.foodId}>
                                    <td>{index + 1}</td>
                                    <td>{foodMenu.foodName}</td>
                                    <td>{foodMenu.price}</td>
                                    <td>{foodMenu.offer}</td>
                                    <td>
                                        <img src={"http://localhost:8080/" + foodMenu.thumbnail}
                                            alt='food menu'
                                            className="thumbnail-sm" />
                                    </td>
                                    <td>
                                        <button type="button" onClick={() => editFoodOffer(foodMenu)} className="btn btn-dark btn-rounded">
                                            Update
                                        </button>
                                    </td>
                                    <td>
                                        <button type="button" onClick={() => removeFoodOffer(foodMenu.foodId)} className="btn btn-dark btn-rounded">
                                            Remove
                                        </button>
                                    </td>

                                </tr>
                            )
                        })}
                </tbody>
            </table>
        </div>
    )
}

export default Offer
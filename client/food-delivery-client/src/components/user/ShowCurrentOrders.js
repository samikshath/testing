import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import ConfirmModal from "../home/ConfirmModal";
import AlertModal from "../home/AlertModal";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import OrderDetails from './OrderDetails';

const ShowCurrentOrders = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));
  const [orders, setOrders] = useState([]);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [isOrderCancelled, setIsOrderCancelled] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});
  const [orderDetails,setOrderDetails]=useState([]);
  const [isOrderDetailsModalOpen,setIsOrderDetailsModalOpen]=useState(false)
  const [orderToPass,setOrderToPass]=useState({})

  const hideModal = () => {
    setShow(false);
    setConfirmModalOpen(false);
    setAlertModalOpen(false);
    setIsOrderDetailsModalOpen(false)
  };

  const fetchOrdersForUsers = () => {
    axios
      .get("http://localhost:8080/order/getAllOrdersForUser/" + user.userId)
      .then((response) => {
        setOrders(response.data);
      });
  };

  // const checkCancelOrderStatus = () => {
  //   orders.map((order) => {
  //     axios
  //       .post("http://localhost:8080/order/check-order-status-api", order)
  //       .then((response) => {
  //         console.log(response.data);
  //         return { ...order, isDisabled: response.data };
  //         console.log("is Disabled: ", order.isDisabled);
  //       });
  //   });
  // };

  const checkCancelOrder = (order) => {
    axios
      .post("http://localhost:8080/order/check-order-status-api", order)
      .then((response) => {
        console.log(response.data)
        if (!response.data) {
          setShow(true);
          // setConfirmModalOpen(false)
          setAlertModalOpen(true);
        } else {
          // hideModal()
          setConfirmModalOpen(true);
        }
      });
  };
  const cancelOrder = (order) => {
    axios
      .put("http://localhost:8080/order/cancel-order/" + order.orderId, order)
      .then((response) => {
        setIsOrderCancelled(true);
        fetchOrdersForUsers();
      });
  };
  useEffect(() => {
    fetchOrdersForUsers();
  }, []);

  const showOrderContent=(order)=>{
  
    axios.get('http://localhost:8080/order/getOrderDetails/'+order.orderId)
    .then(response=>{
      setOrderDetails(response.data)
      setOrderToPass(order)
    })
  }

  return (
    <div className="container my-5">
      <h1 className="heading-center">All order Details</h1>
      <table className="table table-success table-striped">
        <thead>
          <tr>
            <td>Order Id</td>
            <td>Order Status</td>
            <td>Order Time</td>
            <td>Restaurant name</td>
            <td colSpan={3}>Action</td>
          </tr>
        </thead>
        <tbody>
          {orders
            .filter((order) => {
              return (
                order.orderStatus !== "delivered" &&
                order.orderStatus !== "cancelled"
              );
            })
            .map((order) => {
              let dateTime = order.orderTime.toString().split(/[T . +]/);
              return (
                <tr key={order.orderId}>
                  <td>{order.orderId}</td>
                  <td>{order.orderStatus}</td>
                  <td>{dateTime[0] + " " + dateTime[1]}</td>
                  <td>
                    <a href="#">{order.restaurant.restaurantName}</a>
                  </td>
                  <td>
                    <Button
                      variant="outlined"
                      sx={{ color: "secondary.main" }}
                      className="btn btn-success"
                      onClick={()=>{setShow(true);setIsOrderDetailsModalOpen(true);showOrderContent(order)}}
                    >
                      Show Order Details
                    </Button>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        setShow(true);
                        //   setConfirmModalOpen(true);
                        setSelectedOrder(order);
                        checkCancelOrder(order);
                      }}
                      className="btn btn-danger"
                    >
                      Cancel Order
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {confirmModalOpen && (
        <ConfirmModal
          show={show}
          handleClose={hideModal}
          confirmAction={() => cancelOrder(selectedOrder)}
        >
          Are You sure to cancel this order?
        </ConfirmModal>
      )}
      {alertModalOpen && (
        <AlertModal show={show} handleClose={hideModal}>
          Sorry... You cannot cancel order after 15 minutes
        </AlertModal>
      )}
      {isOrderCancelled && (
        <AlertModal show={show} handleClose={hideModal}>
          Order Cancelled...
        </AlertModal>
      )}
      {isOrderDetailsModalOpen && 
      (<OrderDetails show={show} order={orderToPass} handleClose={hideModal} orderDetails={orderDetails} />)}
    </div>
  );
};

export default ShowCurrentOrders;

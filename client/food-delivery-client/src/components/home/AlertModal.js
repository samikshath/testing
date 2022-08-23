import React,{useState} from "react";
import Cart from "../user/Cart";
import {Modal, Button} from 'react-bootstrap'

const AlertModal = (props) => {
  return (
    
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.children}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={props.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    
  );
};

export default AlertModal;

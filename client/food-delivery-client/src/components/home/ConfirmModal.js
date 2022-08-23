import React from 'react'
import { Button, Modal } from 'react-bootstrap'

const ConfirmModal = (props) => {
  return (
    <Modal show={props.show} onHide={props.handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Confirm Action</Modal.Title>
    </Modal.Header>
    <Modal.Body>{props.children}</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={props.handleClose}>
        Close
      </Button>
      <Button variant="primary" onClick={props.confirmAction}>
        Confirm
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

export default ConfirmModal
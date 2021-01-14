import React from "react";
import { Modal, Button } from "react-bootstrap";

const ViewDetialsModal = ({ show, toggleModal, currentRow }) => {
  const {
    FirstName,
    LastName,
    Gender,
    Latitude,
    Longitude,
    CreditCardNumber,
    CreditCardType,
    Email,
    DomainName,
    PhoneNumber,
    MacAddress,
    URL,
    UserName,
    LastLogin,
    PaymentMethod,
  } = currentRow;

  return (
    <Modal show={show} onHide={toggleModal}>
      <Modal.Header closeButton>
        <Modal.Title>Patient Details</Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        <div>
            <p>
                <strong>First Name:</strong>
                {FirstName}
            </p>

            <p>
                <strong>Last Name:</strong>
                {LastName}
            </p>

            <p>
                <strong>User Name:</strong>
                {UserName}
            </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={toggleModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewDetialsModal;

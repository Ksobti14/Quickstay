import React, { useState } from 'react';
import { Modal, Button, Carousel } from 'react-bootstrap';
import '../index.css';
import { Link } from 'react-router-dom';
import moment from 'moment'; // Import moment for date handling

const Roomrender = ({ room,fromdate,todate}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <div className="room-card row shadow p-3 mb-5 bg-white rounded">
      <div className="col-md-4">
        <img src={room.imageurls[0]} className="smallimg" alt="Room" />
      </div>
      <div className="col-md-7">
        <h1 className="room-name">{room.name}</h1>
        <p className="room-detail">
          <strong>Max Count:</strong> {room.maxcount}
        </p>
        <p className="room-detail">
          <strong>Phone Number:</strong> {room.phonenumber}
        </p>
        <p className="room-detail">
          <strong>Type:</strong> {room.type}
        </p>
        <div style={{ float: 'right' }}>
          {/* Pass formatted dates as DD-MM-YYYY */}
          {fromdate && todate ? (
  <Link to={`/book/${room._id}/${fromdate}/${todate}`}>
    <button className="btn btn-primary m-2">Book Now</button>
  </Link>
) : (
  <button className="btn btn-secondary m-2" disabled>
    Select Dates to Book
  </button>
)}

          <Button variant="primary" onClick={handleShow}>
            View Details
          </Button>
        </div>
      </div>

      {/* Enhanced Modal */}
      <Modal show={show} onHide={handleClose} dialogClassName="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel prevLabel="" nextLabel="">
            {room.imageurls.map((url) => (
              <Carousel.Item key={url}>
                <img className="d-block w-100" src={url} alt="Room" />
              </Carousel.Item>
            ))}
          </Carousel>
          <p>{room.description}</p>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
};

export default Roomrender;

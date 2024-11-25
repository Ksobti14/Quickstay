import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../index.css';
import Loading from '../components/Loading';
import Error from '../components/Error';
import moment from 'moment'; // Import moment.js
import StripeCheckout from 'react-stripe-checkout';
import Swal from 'sweetalert2'
const Bookingscreen = () => {
    const [loading, setLoading] = useState(true); // Control loading state
    const [error, setError] = useState(false); // Control error state
    const [room, setRoom] = useState(null); // Store room data

    const { roomid, fromdate, todate } = useParams();
    const totaldays = moment(todate).diff(moment(fromdate), 'days');
    const totalamount = totaldays * (room?.rentperday || 0); // Calculate total amount safely

    // Fetch room details on component load
    useEffect(() => {
        const fetchRoomDetails = async () => {
            try {
                setLoading(true);
                const response = await axios.post('https://quickstay-cloudproject.onrender.com/api/rooms/getroombyid', { roomid });
                setRoom(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching room details:', error);
                setError(true);
                setLoading(false);
            }
        };

        fetchRoomDetails();
    }, [roomid]);

    // Handle booking and payment
    async function bookRoom(token) {
        const bookingdetails = {
            room,
            userid: JSON.parse(localStorage.getItem('currentUser'))._id,
            fromdate,
            todate,
            totalamount,
            totaldays,
            stripeToken: token, // Pass token to the backend
        };

        try {
            setLoading(true)
            const result = await axios.post('https://quickstay-cloudproject.onrender.com/api/bookings/bookroom', bookingdetails);
            setLoading(false)
            Swal.fire('Congratulations','Your Room is booked Successfully ! Happy Day','success').then(result=>{
                window.location.href='/profile'
            })
        } catch (error) {
            setLoading(false)
            console.error('Booking failed:', error.response?.data || error.message);
           Swal.fire('Oops','Something Went wrong','error')
        }
    }

    // Handle Stripe tokenization
    function onToken(token) {
        bookRoom(token);
    }

    return (
        <div className="booking-screen-container">
            {loading ? (
                <Loading />
            ) : error ? (
                <Error />
            ) : (
                <div className="room-details-container">
                    <div className="row">
                        {/* Room Info */}
                        <div className="col-md-5 room-info">
                            <h1>{room.name}</h1>
                            <img src={room.imageurls[0]} alt="Room" className="room-image" style={{width:300,height:200}} />
                        </div>

                        {/* Booking and Payment Info */}
                        <div className="col-md-5 booking-amount-info">
                            <h1>Booking Details</h1>
                            <hr />
                            <p><strong>Name:</strong> {room.name}</p>
                            <p><strong>From Date:</strong> {fromdate}</p>
                            <p><strong>To Date:</strong> {todate}</p>
                            <p><strong>Total Days:</strong> {totaldays}</p>
                            <p><strong>Rent per Day:</strong> ₹{room.rentperday}</p>
                            <p><strong>Total Amount:</strong> ₹{totalamount}</p>
                            <div className="payment-button">
                                <StripeCheckout
                                    token={onToken}
                                    stripeKey="pk_test_51QMv6eRoxFTfOuPKxgbZbEjnBl0rHJLTkiIZgxB9RWwy9kty4xROfsH4KBsrNeD2QPi4O9AlQHq3Nqpz6PO1BWAd00gCGw83qq" // Publishable key
                                    amount={totalamount * 100} // Convert to cents
                                    name={room.name}
                                    description={`Booking for ${room.name}`}
                                    currency="INR"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Bookingscreen;

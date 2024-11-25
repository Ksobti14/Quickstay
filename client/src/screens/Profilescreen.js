import React, { useEffect, useState } from 'react';
import { Tabs, Button, message } from 'antd';
import axios from 'axios';
import Loading from '../components/Loading';
import Error from '../components/Error';
import '../index.css';

const { TabPane } = Tabs;

const Profilescreen = () => {
    const user = JSON.parse(localStorage.getItem('currentUser'));

    useEffect(() => {
        if (!user) {
            window.location.href = '/login';
        }
    }, []);

    return (
        <div className="ml-3 mt-3 profile-container">
            <Tabs defaultActiveKey="1">
                <TabPane tab="Profile" key="1">
                    <h1 className="section-title">My Profile</h1>
                    <div className="profile-details">
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Admin Status:</strong> {user.isAdmin ? 'YES' : 'NO'}</p>
                    </div>
                </TabPane>
                <TabPane tab="Bookings" key="2">
                    <MyBookings />
                </TabPane>
            </Tabs>
        </div>
    );
};

export default Profilescreen;

export function MyBookings() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                setLoading(true);
                const { data } = await axios.post('https://quickstay-cloudproject.onrender.com/api/bookings/getbookingsbyuserid', { userid: user._id });
                setBookings(data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching bookings:', err);
                setError(err);
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    const cancelBooking = async (bookingId) => {
        try {
            setLoading(true);
            await axios.delete(`https://quickstay-cloudproject.onrender.com/api/bookings/cancelbooking/${bookingId}`);
            setBookings(bookings.filter(booking => booking._id !== bookingId));
            setLoading(false);
            message.success('Booking cancelled successfully.');
        } catch (err) {
            console.error('Error cancelling booking:', err);
            setLoading(false);
            message.error('Failed to cancel booking. Please try again.');
        }
    };

    return (
        <div className="bookings-container">
            <div className="row">
                <div className="col-md-12">
                    {loading && <Loading />}
                    {error && <Error message="Failed to fetch bookings" />}
                    {bookings.length > 0 ? (
                        bookings.map((booking, index) => (
                            <div
                                key={index}
                                className={`booking-card ${booking.status === 'booked' ? 'confirmed' : 'cancelled'}`}
                            >
                                <h2>Room: {booking.room}</h2>
                                <p>
                                    <strong>Check in:</strong> {booking.fromdate}
                                    <br />
                                    <strong>Check out:</strong> {booking.todate}
                                    <br />
                                    <strong>Total Amount:</strong> ₹{booking.totalamount}
                                </p>
                                <p><strong>Status:</strong> {booking.status === 'booked' ? 'CONFIRMED' : 'CANCELLED'}</p>
                                {booking.status === 'booked' && (
                                    <Button
                                        className='btn btn-danger'
                                        onClick={() => cancelBooking(booking._id)}
                                        style={{ padding: 4 }}
                                    >
                                        Cancel Booking
                                    </Button>
                                )}
                            </div>
                        ))
                    ) : (
                        !loading && <p>No bookings found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

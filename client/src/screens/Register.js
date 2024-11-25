import React, { useState } from "react";
import "../index.css";
import Loading from '../components/Loading';
import Error from '../components/Error';
import Success from "../components/Success"; 
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom'; 

const Register = () => {
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [cpassword, setcpassword] = useState('');
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(false);
    const [success, setsuccess] = useState(false);

    const navigate = useNavigate(); 

    async function register() {
        if (!name || !email || !password || !cpassword) {
            toast.error("All fields are required.");
            return;
        }

        if (!email.endsWith("@gmail.com")) {
            toast.error("Please enter an email that ends with @gmail.com.");
            return;
        }

        if (password.length <= 5) {
            toast.error("Password must be greater than 5 characters.");
            return;
        }

        if (password !== cpassword) {
            toast.error("Passwords do not match.");
            return;
        }

        const user = { name, email, password };
  // Set loading to true before making the request

        try {
            const result = await axios.post('https://quickstay-cloudproject.onrender.com/api/users/register', user);
            toast.success('Registration Successfull');
            navigate('/login')
        }
        catch(error){
            console.log(error)
        }
    }

    return (
        <div>
            {loading && (<Loading />)}  {/* Show loading spinner if loading is true */}
            {error && (<Error />)}  {/* Show error if error state is true */}
            <ToastContainer position="top-center" autoClose={3000} />
            <div className="register-container">
                <div className="form-card">
                    {success && (<Success message='Registration Success' />)}  {/* Show success message */}
                    <h2 className="text-center mb-4">Create an Account</h2>
                    <form>
                        <div className="form-group mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input 
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setname(e.target.value)}
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input 
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setemail(e.target.value)}
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input 
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setpassword(e.target.value)}
                            />
                        </div>

                        <div className="form-group mb-4">
                            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                            <input 
                                type="password"
                                className="form-control"
                                id="confirmPassword"
                                placeholder="Re-enter your password"
                                value={cpassword}
                                onChange={(e) => setcpassword(e.target.value)}
                            />
                        </div>

                        <button type="button" className="btn btn-primary w-100" onClick={register}>
                            Register
                        </button>
                    </form>

                    <p className="text-center mt-3">
                        Already have an account? <a href="/login">Login</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;

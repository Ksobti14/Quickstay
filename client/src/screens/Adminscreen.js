import React, { useEffect, useState } from 'react'
import Loading from '../components/Loading';
import Error from '../components/Error';
import {Tabs} from 'antd';
import axios from 'axios';
const {TabPane}=Tabs
const Adminscreen = () => {
  return (
    <div className='mt-3 ml-3' style={{marginLeft:30}}>
      <h1 className='text-center' style={{fontSize:30,fontFamily:'bold'}}>Admin Panel</h1>
      <Tabs defaultActiveKey='1'>
        <TabPane tab="Bookings" key="1">
            <Bookings/>
        </TabPane>
        <TabPane tab="Rooms" key="2">
            <Rooms/>
        </TabPane>
        <TabPane tab="Add Room" key="3">
        <Addroom/>
        </TabPane>
        <TabPane tab="Users" key="4">
            <Users/>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default Adminscreen
export function Bookings(){
    const [book,setbook]=useState([]);
    const [loading, setLoading] = useState(true); // Control loading state
    const [error, setError] = useState(false); 
    useEffect(() => {
        const fetchbooking = async () => {
            try {
                const data = (await axios.get('https://quickstay-cloudproject.onrender.com/api/bookings/getallbookings')).data;
                setbook(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
                setError(true);
            }
        };
        fetchbooking();
    }, []); // Add an empty dependency array
    
    return(
        <div className='row'>
            <div className='col-md-10'>
               <h1>Bookings</h1>
               {loading&&<Loading/>}
               <table className='table table-bordered table-dark'>
                <thead className='thead-dark'>
                    <tr>
                        <th>Booking Id</th>
                        <th>User Id</th>
                        <th>Room</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {book.length&&(book.map(booking=>{
                        return <tr>
                            <td>{booking._id}</td>
                            <td>{booking.userid}</td>
                            <td>{booking.room}</td>
                            <td>{booking.fromdate}</td>
                            <td>{booking.todate}</td>
                            <td>{booking.status}</td>
                        </tr>
                    }))}
                </tbody>
               </table>
               
            </div>
        </div>
    )
}
export function Rooms(){
    const [room,setroom]=useState([]);
    const [loading, setLoading] = useState(true); // Control loading state
    const [error, setError] = useState(false); 
    useEffect(() => {
        const fetchbooking = async () => {
            try {
                const data = (await axios.get('https://quickstay-cloudproject.onrender.com/api/rooms/getallrooms')).data;
                setroom(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
                setError(true);
            }
        };
        fetchbooking();
    }, []); // Add an empty dependency array
    
    return(
        <div className='row'>
            <div className='col-md-10'>
               <h1>Rooms</h1>
               {loading&&<Loading/>}
               <table className='table table-bordered table-dark'>
                <thead className='thead-dark'>
                    <tr>
                        <th>Room Id</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Rent per day</th>
                        <th>Max Count</th>
                        <th>Phone Number</th>
                    </tr>
                </thead>
                <tbody>
                    {room.length&&(room.map(room=>{
                        return <tr>
                            <td>{room._id}</td>
                            <td>{room.name}</td>
                            <td>{room.type}</td>
                            <td>{room.rentperday}</td>
                            <td>{room.maxcount}</td>
                            <td>{room.phonenumber}</td>
                        </tr>
                    }))}
                </tbody>
               </table>
               
            </div>
        </div>
    )
}
export function Users(){
    const [users,setusers]=useState([]);
    const [loading, setLoading] = useState(true); // Control loading state
    const [error, setError] = useState(false); 
    useEffect(() => {
        const fetchbooking = async () => {
            try {
                const data = (await axios.get('https://quickstay-cloudproject.onrender.com/api/users/getallusers')).data;
                setusers(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
                setError(true);
            }
        };
        fetchbooking();
    }, [])
    return (
        <div className='row'>
      <div className='col-md-12'>
        <h1>Users</h1>
        <table className='table table-bordered table-dark'>
                <thead className='thead-dark'>
                    <tr>
                        <th>User Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>isAdmin</th>
                    </tr>
                </thead>
                <tbody>
                    {users&&(users.map(user=>{
                        return <tr>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.isAdmin?'YES':'NO'}</td>
                        </tr>
                    }))}
                </tbody>
               </table>
      </div>
        </div>
    )
}
//add room component
export function Addroom() {
    const [roomname, setRoomname] = useState('');
    const [rentperday, setRentperday] = useState('');
    const [maxcount, setMaxcount] = useState('');
    const [description, setDescription] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [type, setType] = useState('');
    const [imageurl1, setImageurl1] = useState('');
    const [imageurl2, setImageurl2] = useState('');
    const [imageurl3, setImageurl3] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async () => {
        const newRoom = {
            name:roomname,
            rentperday,
            maxcount,
            description,
            phonenumber,
            type,
            imageurls: [imageurl1, imageurl2, imageurl3],
        };

        try {
            setLoading(true);
            const result=await (await axios.post('https://quickstay-cloudproject.onrender.com/api/rooms/addroom', newRoom)).data
            console.log(result)
            setLoading(false);
            setSuccess(true);
            // Clear form
            setRoomname('');
            setRentperday('');
            setMaxcount('');
            setDescription('');
            setPhonenumber('');
            setType('');
            setImageurl1('');
            setImageurl2('');
            setImageurl3('');
        } catch (error) {
            console.error(error);
            setLoading(false);
            setError(true);
        }
    };

    return (
        <div className="row">
            <div className="col-md-6">
                <h1>Add Room</h1>
                {loading && <Loading />}
                {success && <div className="alert alert-success">Room added successfully!</div>}
                {error && <div className="alert alert-danger">Something went wrong!</div>}
                <form>
                    <input
                        type="text"
                        placeholder="Room Name"
                        className="form-control"
                        value={roomname}
                        onChange={(e) => setRoomname(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Rent per Day"
                        className="form-control"
                        value={rentperday}
                        onChange={(e) => setRentperday(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Max Count"
                        className="form-control"
                        value={maxcount}
                        onChange={(e) => setMaxcount(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Phone Number"
                        className="form-control"
                        value={phonenumber}
                        onChange={(e) => setPhonenumber(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Type"
                        className="form-control"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Image URL 1"
                        className="form-control"
                        value={imageurl1}
                        onChange={(e) => setImageurl1(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Image URL 2"
                        className="form-control"
                        value={imageurl2}
                        onChange={(e) => setImageurl2(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Image URL 3"
                        className="form-control"
                        value={imageurl3}
                        onChange={(e) => setImageurl3(e.target.value)}
                    />
                    <button
                        type="button"
                        className="btn btn-primary mt-3"
                        onClick={handleSubmit}
                    >
                        Add Room
                    </button>
                </form>
            </div>
        </div>
    );
}

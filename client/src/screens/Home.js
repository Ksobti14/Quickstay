import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import Roomrender from "../components/Roomrender";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { DatePicker } from "antd";
import "../index.css";
import moment from "moment";

const { RangePicker } = DatePicker;

const Home = () => {
  const [rooms, setrooms] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const [fromdate, setfromdate] = useState(null);
  const [todate, settodate] = useState(null);
  const [duplicaterooms,setduplicaterooms]=useState([]);
  const [searchkey,setsearchkey]=useState('');
  const [type,settype]=useState('all')
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setloading(true);
        const response = await axios.get("https://quickstay-cloudproject.onrender.com/api/rooms/getallrooms");
        setrooms(response.data);
        setduplicaterooms(response.data)
        setloading(false);
      } catch (error) {
        seterror(true);
        console.error("Error fetching rooms:", error);
        setloading(false);
      }
    };
    fetchRooms();
  }, []);

  function filterbydate(dates) {
    if (dates && dates[0] && dates[1]) {
      const isValidStartDate = moment(dates[0]).isValid();
      const isValidEndDate = moment(dates[1]).isValid();
  
      if (isValidStartDate && isValidEndDate) {
        const rawFromDate = dates[0];
        const rawToDate = dates[1];
  
        console.log("Selected From Date:", rawFromDate.toDate());
        console.log("Selected To Date:", rawToDate.toDate());
  
        setfromdate(rawFromDate);
        settodate(rawToDate);
  
        let temprooms = []; // Temporarily store filtered rooms
  
        for (const room of duplicaterooms) {
          let availability = true; // Assume room is available
  
          if (room.currentbookings && room.currentbookings.length > 0) {
            // Check for overlapping bookings
            for (const booking of room.currentbookings) {
              const bookingFromDate = moment(booking.fromdate); // Convert to Moment object
              const bookingToDate = moment(booking.todate);
  
              if (
                rawFromDate.isBetween(bookingFromDate, bookingToDate, null, "[]") ||
                rawToDate.isBetween(bookingFromDate, bookingToDate, null, "[]") ||
                bookingFromDate.isBetween(rawFromDate, rawToDate, null, "[]") ||
                bookingToDate.isBetween(rawFromDate, rawToDate, null, "[]")
              ) {
                availability = false; // If any overlap, room is unavailable
                break;
              }
            }
          }
  
          if (availability) {
            temprooms.push(room); // Add room if available
          }
        }
  
        // Update the rooms state with filtered rooms
        setrooms(temprooms);
      } else {
        console.error("Invalid dates selected!");
      }
    } else {
      console.error("Invalid input from RangePicker");
    }
  }
  function filterbysearch(){
     const temprooms=duplicaterooms.filter(room=>room.name.toLowerCase().includes(searchkey.toLowerCase()));
     setrooms(temprooms);
  }
  function filterbytype(e){
    settype(e);
    if(e!=='all'){
    const temprooms=duplicaterooms.filter(room=>room.type.toLowerCase()===e.toLowerCase());
    setrooms(temprooms)
    }
    else{
    setrooms(duplicaterooms)
  }
}
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <RangePicker
            className="custom-range-picker"
            onChange={filterbydate}
          />
        </div>
        <div className="col-md-5 custom-search-container" style={{marginBottom:20}}>
  <input
    type="text"
    className="form-control custom-search-input"
    placeholder="Search Rooms"
    value={searchkey} onChange={(e)=>{setsearchkey(e.target.value)}} onKeyUp={filterbysearch}
  />
</div>
<select className="col-md-4 selection-container" value={type} onChange={(e)=>{filterbytype(e.target.value)}}>
  <option value="all">All</option>
  <option value="delux">Delux</option>
  <option value="nondelux">Non-Delux</option>
</select>
      </div>
      <div className="row justify-content-center mt-5">
        {loading ? (
          <h1>
            <Loading />
          </h1>
        )  : (
          rooms.map((room, index) => {
            return (
              <div className="col-md-9 mt-2" key={index}>
                <Roomrender room={room} fromdate={fromdate} todate={todate} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Home;

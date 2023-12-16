import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import "./checkout.css"
import StripeContainer from '../../components/payment/StripeContainer';
import ChatWidget from "../../components/chat/chat";

const CheckoutPage = () => {
    const location = useLocation();
    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useContext(AuthContext);
    const { alldates, selectedRooms } = location.state;
    const [roomNumbers, setRoomNumbers] = useState([]);
    const [totalAmount, settotalAmount] = useState(0);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const hotelId = location.pathname.split("/")[2];
          
          const hotelData = await axios.get(`/hotels/find/${hotelId}`);
          setHotel(hotelData.data);
    
          const RoomData = await axios.get(`/hotels/room/${hotelId}`);
          const selectedRoomDetails = RoomData.data.filter((room) =>
            room.roomNumbers.some((roomNumber) => selectedRooms.includes(roomNumber._id))
          );

          const selectedRoomNumbers = selectedRoomDetails.map((room) => room.roomNumbers[0].number);
          setRoomNumbers(selectedRoomNumbers);


          const totalAmount = selectedRoomDetails.reduce((total, room) => {
            const roomPrice = room.price; // Assuming there is a 'price' property in your room data
            const nights = alldates.length - 1; // Assuming alldates is an array of timestamps
            const roomTotal = roomPrice * nights;
            return total + roomTotal;
          }, 0);
          settotalAmount(totalAmount)


  
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      };
    
      fetchData();
    }, [location]);

    // Frontend component making a request to the backend


const handlePayment = async (paymentMethodId) => {
  console.log("payment")
};



  return (
    <div className="checkout-container">
      <h1>Checkout</h1>

      {user && (
        <div className="section">
          <h2>User Details</h2>
          <p>Name: {user.username}</p>
          <p>Email: {user.email}</p>
          {/* Add other user details */}
        </div>
      )}

      {hotel && (
        <div className="section">
          <h2>Hotel Details</h2>
          <p>Name: {hotel.name}</p>
          <p>Address: {hotel.address}</p>
          <p>City: {hotel.city}</p>
          <p>Pet Facility: {hotel.petFacility}</p>
        </div>
      )}

      {selectedRooms.length > 0 && (
        <div className="section">
          <h2>Room Details</h2>
          {roomNumbers.map((roomNumber, index) => (
            <div key={index}>
              <p>Room Number: {roomNumber}</p>
            </div>
          ))}
        </div>
      )}

      {alldates && alldates.length > 0 && (
        <div className="section">
          <h2>Reservation Details</h2>
          <p>Check-In Date: {new Date(alldates[0]).toLocaleDateString()}</p>
          <p>Check-Out Date: {new Date(alldates[alldates.length - 1]).toLocaleDateString()}</p>
        </div>
      )}

      {totalAmount > 0 && (
        <div className="section">
          <h2>Total Amount</h2>
          <p>${totalAmount}</p>
        </div>
      )}

      {/* Add payment component here if needed */}

      {/* Integrate the StripeContainer component */}
      {totalAmount > 0 && (
        <div className="payment-section">
          <h2>Payment</h2>
          <StripeContainer totalAmount={totalAmount} handlePayment={handlePayment} />
        </div>
      )}

      <ChatWidget/>
    </div>
  );
};

export default CheckoutPage;
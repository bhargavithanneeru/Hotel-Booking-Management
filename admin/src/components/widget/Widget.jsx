import "./widget.scss";
import React, { useEffect, useState } from "react";
import axios from "axios";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";

const Widget = ({ type }) => {
  const [userCount, setUserCount] = useState(0);
  const [hotelCount, setHotelCount] = useState(0);
  const [roomCount, setRoomCount] = useState(0);

  const fetchData = async () => {
    try {
      const users = await axios.get("/users", {withCredentials:true} );
      const hotels = await axios.get("/hotels", {withCredentials:true} );
      const rooms = await axios.get("/rooms", {withCredentials:true} );
      

      setUserCount(users.data.length);
      setHotelCount(hotels.data.length);
      setRoomCount(rooms.data.length);
      
    } catch (error) {
      console.error("Error fetching counts:", error);
    }
  };
// console.log(userCount)
// console.log(hotelCount)
// console.log(roomCount)


  useEffect(() => {
    const fetchCounts = async () => {
      await fetchData();
    };

    fetchCounts();
  }, []); // Empty dependency array ensures useEffect runs once on mount

  const getWidgetData = () => {
    switch (type) {
      case "users":
        return {
          title: "Users",
          icon: <PersonOutlinedIcon />,
          value: userCount,
        };
      case "hotels":
        return {
          title: "Hotels",
          icon: <AccountBalanceWalletOutlinedIcon />,
          value: hotelCount,
        };
      case "rooms":
        return {
          title: "Rooms",
          icon: <ShoppingCartOutlinedIcon />,
          value: roomCount,
        };
      default:
        return {};
    }
  };

  const widgetData = getWidgetData();

  return (
    <div className="widget">
      <div className="widgetIcon">{widgetData.icon}</div>
      <div className="widgetContent">
        <div className="widgetTitle">{widgetData.title}</div>
        <div className="widgetValue">{widgetData.value}</div>
      </div>
      <KeyboardArrowUpIcon className="widgetArrow" />
    </div>
  );
};

export default Widget;


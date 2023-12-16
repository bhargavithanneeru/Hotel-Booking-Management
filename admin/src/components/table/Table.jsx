import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link, useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch"
import { useEffect, useState } from "react";

const List = () => {
  const location = useLocation()
  const path = location.pathname.split("/")[1]
  const[list, setList]= useState()
  const {data, loading, error} = useFetch("/users")


  useEffect(()=>{
    //console.log("Data from useFetch:", data);
    setList(data)
    //console.log("List from useFetch:", list);
  },[data])
  const rows = data
  ? data
      .slice() // Create a shallow copy of the array to avoid mutating the original data
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))// Sort in descending order based on isUpdated
      .slice(0, 5) // Take the first 5 users
  : [];
  
  
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Username</TableCell>
            <TableCell className="tableCell">Email</TableCell>
            <TableCell className="tableCell">Country</TableCell>
            <TableCell className="tableCell">City</TableCell>
            <TableCell className="tableCell">Phone</TableCell>
            <TableCell className="tableCell">isAdmin</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row._id}>
              <TableCell className="tableCell">{row.username}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={row.img || "https://d11a6trkgmumsb.cloudfront.net/original/3X/d/8/d8b5d0a738295345ebd8934b859fa1fca1c8c6ad.jpeg"} alt="avatar" className="image" />
                  {row.email}
                </div>
              </TableCell>
              <TableCell className="tableCell">{row.country}</TableCell>
              <TableCell className="tableCell">{row.city}</TableCell>
              <TableCell className="tableCell">{row.phone}</TableCell>
              <TableCell className="tableCell">{row.isAdmin.toString()}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;

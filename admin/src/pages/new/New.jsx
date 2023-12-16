import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({})
  const [notification, setNotification] = useState(null);

  const handleChange = e =>{
    setInfo(prev=>({...prev, [e.target.id]: e.target.value }))
  }

  const handleClick = async e =>{
    e.preventDefault()
    console.log("working")
    const data = new FormData()
    data.append("file",file)
    data.append("upload_preset","upload")
    
    try{
      const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/secloud/image/upload",
      data)
     // Log the entire response object
    console.log("Upload Response:", uploadRes);

    // Check if the status code is 400 but the response contains data
    if (uploadRes.status === 400 && uploadRes.data) {
      console.log("Successful upload:", uploadRes.data);
    } else {
      // Handle other cases
      console.log("Upload Response Data:", uploadRes.data);
    }
    

    const {url} = uploadRes.data 
    const newUser = {
      ...info,
      img : url
    }

    await axios.post("/auth/register", newUser, {withCredentials: true})
    setNotification("User created successfully!");

  } catch (err) {
    console.error("Error uploading to Cloudinary:", err);
    console.log("Cloudinary Response:", err.response); // Log the Cloudinary response
  }

  }

    
console.log(info)
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input 
                  onChange={handleChange} 
                  type={input.type} 
                  placeholder={input.placeholder} 
                  id={input.id}/>

                </div>
              ))}
              <button onClick={handleClick}>Send</button>
              {/* Notification */}
              {notification && <div className="notification">{notification}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;

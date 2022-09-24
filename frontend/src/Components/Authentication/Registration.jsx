import { React, useEffect, useState } from "react";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import {  useNavigate } from "react-router-dom";
import "./registration.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../more/Loader";
import { clearErrors, register } from "../../actions/userAction";
import MetaData from "../../more/Metadata";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Registration = () => {
  const dispatch = useDispatch();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });
  const handleChange = (name) => (e) => {
    const value = name === "avatar" ? e.target.files[0] : e.target.value;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let formData = new FormData();
      formData.append("name", user.name);
      formData.append("email", user.email);
      formData.append("password", user.password);
      formData.append("avatar", user.avatar);

      dispatch(register(formData));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate("/");
    }
  }, [dispatch, error,navigate, isAuthenticated]);

  return (
   <>
    {loading ? (
      <Loader />
    )
   : (
    
    <> 
      <MetaData title="Signup" />
    <div className="signupform">
      <div className="signupimg">
         <img src={"https://image.freepik.com/free-vector/online-wishes-list-concept-illustration_114360-3900.jpg"} alt="not found" />
      </div>
      <div style={{ maxWidth: 500, margin: "auto" }}>
    <div className="form">
      <FaceIcon />
      <input
        className="form-control"
        placeholder="Enter name"
        type="text"
        name="name"
        value={user.name}
        onChange={handleChange("name")}
      />
    </div>
   
    <div className="form">
      <MailOutlineIcon />
      <input
        className="form-control"
        placeholder="Enter email"
        type="email"
        name="email"
        value={user.email}
        onChange={handleChange("email")}
      />
    </div>
    <div className="form">
      <LockOpenIcon />

      <input
        className="form-control"
        placeholder="Enter password"
        type="password"
        name="password"
        value={user.password}
        onChange={handleChange("password")}
      />
    </div>
    <div className="registerimg">
      <input
        className="form-control"
        type="file"
        accept="image/*"
        name="avatar"
        onChange={handleChange("avatar")}
      />
    </div>
    <div className="text-center">
      <button className="signupbtn" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  </div>
    </div>
    </>
   )
  }   
   </>
  )
};

export default Registration;
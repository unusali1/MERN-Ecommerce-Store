import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom'
import Footer from "../Footer/Footer";
import MetaData from "../../more/Metadata";
import Loading from "../../more/Loader";
import "./Profile.css";
//import BottomTab from "../../more/BottomTab";

const Profile = () => {
    const navigate =  useNavigate();

const { user, loading, isAuthenticated } = useSelector((state) => state.user);

useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);

    return (
        <>
       {loading ? (<Loading />):(
        <>
       
        <div>
            <MetaData title={`${user.name}'s profile`} />
            <div className="profileContainer">
                <div style={{
                    display:"flex",
                    alignItems:"center",
                    justifyContent:"center",
                    flexDirection:"column"
                }}>
                    <h1 style={{
                        fontFamily: "Poppins,sans-serif",opacity:"1",
                        fontSize:"2vmax"
                    }}>My Profile</h1>
                    <img src={user.avatar} alt={user.name} className="profile__img" />
                   
                </div>
            </div>
            <div className="information">
                <div className="middle">
            <div className="info">
                <h4 style={{
                    padding:"0px 5px"
                }}>Full Name:</h4>
                <p>{user.name}</p>
            </div>
            <div className="info">
                <h4 style={{
                    padding:"0px 5px"
                }}>Email:</h4>
                <p>{user.email}</p>
            </div>
            <div className="info">
            <h4 style={{
                    padding:"0px 5px"
                }}>Joined On:</h4>
            <p>{String(user.createdAt).substr(0,10)}</p>
            </div> 
               
              <div className="change__info">
                  <Link to="/orders" className="settings">My Orders</Link>
                 
              </div>
        </div>  
        </div>
        </div>
        <Footer />
        {/* <BottomTab /> */}
        </>
       )}
       </>
    )
}

export default Profile
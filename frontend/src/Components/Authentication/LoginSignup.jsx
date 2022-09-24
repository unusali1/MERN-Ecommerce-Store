import { React, useEffect, useState } from "react";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { Link, useNavigate } from "react-router-dom";
import "./LoginSignup.css";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login } from "../../actions/userAction";
import MetaData from "../../more/Metadata";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const LoginSignup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error,  isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
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
          <MetaData title="Login or Signup" />
          <div className="LoginSignUpContainer">
            <div className="LoginSignUpBox">
              <div>
                <div className="login_signUp_toggle">
                  <p >LOGIN</p>
                  
                </div>
                <button ></button>
              </div>
              <form className="loginForm"  onSubmit={loginSubmit}>
                <div className="loginEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <Link to="/password/forgot">Forgot Password ?</Link>
                <input type="submit" value="Login" className="loginBtn" />
                <Link to="/">
                  <span>Login as a guest ?</span>
                </Link>
              </form>

              
            </div>
          </div>
         
        </>
      )}


export default LoginSignup;
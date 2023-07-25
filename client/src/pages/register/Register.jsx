import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

import { HiMail } from "react-icons/hi";
import { BiSolidLockAlt } from "react-icons/bi";
import { BiSolidUser } from "react-icons/bi";
import { AiFillCamera } from "react-icons/ai";

import axios from "axios";

import "./register.scss";

export default function Register() {
  const { currentUser } = useAuth();
  const [err, setErr] = useState("");
  const [message, setMessage] = useState("");
  const passwordRef = useRef();
  const rePasswordRef = useRef();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setErr("");
    setMessage("");
    if (passwordRef.current.value !== rePasswordRef.current.value)
      return setErr("Password not match");

    try {
      await axios.post("http://localhost:8800/api/auth/register", inputs);
      setMessage("Register success");
    } catch (err) {
      setErr(err.response.data);
    }
  };

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  return (
    <div className="container-auth">
      <div className="auth">
        <div className="auth_body">
          <div className="auth_body_header">
            <h3>Welcome !</h3>
            <span>Start managing finance finance and better</span>
            <span></span>
          </div>
          {err && <div className="auth_body_item_error">{err}</div>}
          {message && <div className="auth_body_item_message">{message}</div>}
          <div className="auth_body_item">
            <label htmlFor="nameSignup">
              <BiSolidUser />
            </label>
            <input
              id="nameSignup"
              name="name"
              onChange={handleChange}
              autoComplete="none"
              type="text"
              placeholder="name"
            />
          </div>
          <div className="auth_body_item">
            <label htmlFor="userNameSignup">
              <BiSolidUser />
            </label>
            <input
              name="username"
              onChange={handleChange}
              id="userNameSignup"
              autoComplete="none"
              type="text"
              placeholder="username"
            />
          </div>
          <div className="auth_body_item">
            <label htmlFor="emailSignup">
              <HiMail />
            </label>
            <input
              name="email"
              onChange={handleChange}
              id="emailSignup"
              autoComplete="none"
              type="email"
              placeholder="name@exmaple.com"
            />
          </div>
          <div className="auth_body_item">
            <label htmlFor="passwordSignup">
              <BiSolidLockAlt />
            </label>
            <input
              name="password"
              onChange={handleChange}
              id="passwordSignup"
              autoComplete="none"
              type="password"
              placeholder="Password (at least 6 characters)"
              ref={passwordRef}
            />
          </div>
          <div className="auth_body_item">
            <label htmlFor="rePasswordSignup">
              <BiSolidLockAlt />
            </label>
            <input
              name="rePassword"
              onChange={handleChange}
              id="rePasswordSignup"
              autoComplete="none"
              type="password"
              placeholder="Re Password"
              ref={rePasswordRef}
            />
          </div>
          {/* <div className="auth_body_item_password">
            <input autoComplete="none" type="checkbox" />{" "}
            <span>Agree to the terms</span>
          </div> */}
          <div className="auth_body_item_btn">
            <button className="btn btn-blue" onClick={handleClick}>
              Register
            </button>
          </div>
          <div className="auth_body_item_signup">
            <span>Do you an account ?</span> <Link to={"/login"}>Log In</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

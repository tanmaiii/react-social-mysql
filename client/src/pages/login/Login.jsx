import React, { useEffect, useRef, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

import { HiMail } from "react-icons/hi";
import { BiSolidLockAlt } from "react-icons/bi";

import "./login.scss";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login ,currentUser} = useAuth();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(inputs);
      setLoading(false);
    } catch (err) {
      setError(err.response.data);
    }
    setLoading(false);
    navigate("/");
  };

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  return (
    <div className="container-auth">
      <div className="auth">
        <form className="auth_body">
          <div className="auth_body_header">
            <h3>Welcome back !</h3>
            <span>Start managing finance finance and better</span>
            <span></span>
          </div>
          {error && <div className="auth_body_item_error">{error}</div>}
          <div className="auth_body_item">
            <label htmlFor="">
              <HiMail />
            </label>
            <input
              ref={emailRef}
              autoComplete="none"
              type="text"
              placeholder="username"
              name="username"
              onChange={handleChange}
            />
          </div>
          <div className="auth_body_item">
            <label htmlFor="">
              <BiSolidLockAlt />
            </label>
            <input
              ref={passwordRef}
              type="password"
              placeholder="At least 6 characters"
              name="password"
              onChange={handleChange}
            />
          </div>
          <div className="auth_body_item_password">
            <a to={"/auth/forgot-password"}>Forgot password ?</a>
          </div>
          <div className="auth_body_item_btn">
            <button
              disabled={loading}
              className="btn btn-blue w100"
              onClick={handleLogin}
            >
              {loading ? "loading..." : "Login"}
            </button>
          </div>
        </form>
        <div className="auth_body_item_signup">
          <span>Do you have an account ?</span>
          <Link to={"/register"}>Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

import React, {useContext} from "react";
import { Link , useNavigate} from "react-router-dom";
import { BsSun } from "react-icons/bs";
import { CiDark } from "react-icons/ci";
import { HiViewGrid } from "react-icons/hi";
import { BsSearch } from "react-icons/bs";
import { AiOutlineMessage } from "react-icons/ai";
import { IoIosNotifications } from "react-icons/io";

import avt from '../../assests/avatar.jpg'
import "./navbar.scss";
import { useDarkMode } from '../../context/darkModeContext'
import { useAuth } from "../../context/authContext";

import { useQuery } from "react-query";
import { useMutation, useQueryClient } from "react-query";

export default function Navbar() {
  const {toggle, darkMode} = useDarkMode()
  const {login, currentUser} = useAuth()
  const navigate = useNavigate()

  const queryClient = useQueryClient();
  const mutation = useMutation(
    (userId) => {
      return navigate('profile/'+userId)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["user"]);
      },
    }
  );

  const handleToProfile = () => {
    mutation.mutate(currentUser.id);
  };

  return (
    <div className="navbar">
      <div className="left">
        <Link to={"/"}>FaceBoot</Link>

        <div className="search">
          <BsSearch />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="right">
        <div className="right_item" onClick={toggle}>
          {
            darkMode ? <BsSun/> : <CiDark/> 
          }
        </div>
        <div className="right_item">
          <HiViewGrid />
        </div>
        <div className="right_item">
          <AiOutlineMessage />
        </div>
        <div className="right_item">
          <IoIosNotifications />
        </div>
        <button className="right_item user" onClick={handleToProfile}>
          <img src={ currentUser.profilePic ? '/upload/'+currentUser.profilePic : avt} alt="" />
          <span>{currentUser.name}</span>
        </button>
      </div>
    </div>
  );
}

import React from "react";
import avt from '../../assests/avatar.jpg'
import img1 from '../../assests/1.png'
import img2 from '../../assests/2.png'
import img3 from '../../assests/3.png'
import img4 from '../../assests/4.png'
import img5 from '../../assests/5.png'
import img6 from '../../assests/6.png'
import img7 from '../../assests/7.png'
import img8 from '../../assests/8.png'
import img9 from '../../assests/9.png'
import img10 from '../../assests/10.png'
import img11 from '../../assests/11.png'
import img12 from '../../assests/12.png'
import img13 from '../../assests/13.png'
import './leftBar.scss'

import {useAuth} from '../../context/authContext'

export default function LeftBar() {
  const {currentUser} = useAuth()

  return (
    <div className="leftbar">
      <div className="container">
        <div className="menu">
          <div className="user">
            <img src={ currentUser.profilePic ? '/upload/'+currentUser.profilePic : avt}  alt="" />
            <span>{currentUser.name}</span>
          </div>
          <div className="item">
            <img src={img1}  alt="" />
            <span>Friends</span>
          </div>
          <div className="item">
            <img src={img2}  alt="" />
            <span>Groups</span>
          </div>
          <div className="item">
            <img src={img3}  alt="" />
            <span>Marketplace</span>
          </div>
          <div className="item">
            <img src={img4}  alt="" />
            <span>Watch</span>
          </div>
          <div className="item">
            <img src={img5}  alt="" />
            <span>Memories</span>
          </div>
        </div>

        <hr />

        <div className="menu">
          <span className="menu_header">Your shortcuts</span>
          <div className="item">
            <img src={img6}  alt="" />
            <span>Events</span>
          </div>
          <div className="item">
            <img src={img7}  alt="" />
            <span>Gaming</span>
          </div>
          <div className="item">
            <img src={img8}  alt="" />
            <span>Gallery</span>
          </div>
          <div className="item">
            <img src={img9}  alt="" />
            <span>Videos</span>
          </div>
          <div className="item">
            <img src={img10}  alt="" />
            <span>Messages</span>
          </div>
        </div>

        <hr />

        <div className="menu">
          <span className="menu_header">Others</span>
          <div className="item">
            <img src={img11}  alt="" />
            <span>Fundraiser</span>
          </div>
          <div className="item">
            <img src={img12} alt="" />
            <span>Tutorials</span>
          </div>
          <div className="item">
            <img src={img13} alt="" />
            <span>Courses</span>
          </div>
        </div>
      </div>
    </div>
  );
}

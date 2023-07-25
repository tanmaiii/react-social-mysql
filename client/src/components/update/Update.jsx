import React, { useState, useEffect } from "react";
import "./update.scss";
import { IoMdClose } from "react-icons/io";
import { HiMail } from "react-icons/hi";
import { BiSolidLockAlt } from "react-icons/bi";
import { BiSolidUser } from "react-icons/bi";
import { AiFillCamera, AiFillPhone } from "react-icons/ai";
import { BsFillBookFill, BsLink45Deg } from "react-icons/bs";
import { FiUpload } from "react-icons/fi";
import { MdPlace } from "react-icons/md";
import avt from "../../assests/avatar.jpg";
import { makeRequest } from "../../axios";

import { useQuery } from "react-query";
import { useMutation, useQueryClient } from "react-query";

export default function Update({ setOpenUpdate, user }) {
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);

  const [texts, setTexts] = useState({
    email: user.email,
    password: user.password,
    name: user.name,
    city: user.city,
    website: user.website,
  });

  const upload = async (file) => {
    console.log(file);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const queryClient = useQueryClient();
  const mutation = useMutation(
    (user) => {
      return makeRequest.put("/users", user);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["user"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    let coverUrl; let profileUrl;
    coverUrl = cover ? await upload(cover) : user.coverPic;
    profileUrl = profile ? await upload(profile) : user.profilePic;

    mutation.mutate({ ...texts, coverPic: coverUrl, profilePic: profileUrl });
    setOpenUpdate(false);
    setCover(null)
    setProfile(null)
  };

  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };


  return (
    <div className="update">
      <div className="wrapper">
        <form>
          <div className="update_img">
            <div className="update_img_cover">
              <img
                src={cover ? URL.createObjectURL(cover) :  user.coverPic ? '/upload/'+ user.coverPic : avt}
                alt=""
              />
              <label htmlFor="inputImgCover">
                <FiUpload /> Upload photos{" "}
              </label>
              <input
                type="file"
                style={{ display: "none" }}
                name=""
                id="inputImgCover"
                onChange={(e) => setCover(e.target.files[0])}
              />
            </div>
            <div className="update_img_avt">
              <img
                src={
                  profile
                    ? URL.createObjectURL(profile)
                    : user.profilePic ? '/upload/'+ user.profilePic : avt
                }
                alt=""
              />
              <label htmlFor="inputImgAvt">
                <FiUpload />
              </label>
              <input
                type="file"
                style={{ display: "none" }}
                name=""
                id="inputImgAvt"
                onChange={(e) => setProfile(e.target.files[0])}
              />
            </div>
          </div>
          <div className="update_body">
            <div className="update_body_item">
              <label htmlFor="">
                <BiSolidUser />
              </label>
              <input
                onChange={handleChange}
                name="name"
                placeholder="name"
                autoComplete="none"
                type="text"
                defaultValue={user?.name}
              />
            </div>
            <div className="update_body_item">
              <label htmlFor="">
                <HiMail />
              </label>
              <input
                onChange={handleChange}
                name="email"
                placeholder="your email"
                autoComplete="none"
                type="text"
                defaultValue={user?.email}
              />
            </div>
            <div className="update_body_item">
              <label htmlFor="">
                <MdPlace />
              </label>
              <input
                onChange={handleChange}
                name="city"
                placeholder="your address"
                autoComplete="none"
                type="text"
                defaultValue={user?.city}
              />
            </div>
            <div className="update_body_item">
              <label htmlFor="">
                <BsLink45Deg />
              </label>
              <input
                onChange={handleChange}
                name="website"
                placeholder="your website"
                autoComplete="none"
                type="text"
                defaultValue={user?.website}
              />
            </div>
          </div>
          <button className="btn btn-update" onClick={handleClick}>
            Update
          </button>
        </form>
        <button className="btn-close" onClick={() => setOpenUpdate(false)}>
          <IoMdClose />
        </button>
      </div>
    </div>
  );
}

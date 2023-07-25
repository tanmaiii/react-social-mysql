import React, { useRef, useState, useEffect } from "react";
import "./share.scss";
import avt from '../../assests/avatar.jpg'
import { useAuth } from "../../context/authContext";
import { ImFilePicture } from "react-icons/im";
import { BiMap } from "react-icons/bi";
import { FaUserFriends } from "react-icons/fa";
import { MdOutlineClear } from "react-icons/md";
import { makeRequest } from "../../axios";

import {
  useMutation,
  useQueryClient,
  QueryClient
} from "react-query";

export default function Share() {
  const { currentUser } = useAuth();
  const inputRef = useRef();
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const queryClient = useQueryClient();

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const mutation = useMutation(
    (newPost) => {
      return makeRequest.post("/posts", newPost);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const handleClick = async (e) => {
      e.preventDefault();
      let imgUrl = "";
      if(file) imgUrl = await upload();
      mutation.mutate({desc, img: imgUrl})
      setDesc('')
      setFile(null)
  };

  const handleInput = () => {
    inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
  };

  useEffect(() => {
    if (desc.length === 0) {
      inputRef.current.style.height = "40px";
    }
  }, [desc]);

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="avt">
            <img src={ currentUser.profilePic ? '/upload/'+currentUser.profilePic : avt} alt="" />
          </div>
          <div className="input">
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="Type something..."
              onInput={handleInput}
              ref={inputRef}
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            ></textarea>
            {file && (
              <div className="img_prev">
                <img src={URL.createObjectURL(file)} alt="" />
                <button onClick={() => setFile(null)}>
                  <MdOutlineClear />
                </button>
              </div>
            )}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <div className="item">
              <input
                id="inputImg"
                type="file"
                style={{ display: "none" }}
                name=""
                onChange={(e) => setFile(e.target.files[0])}
              />
              <label htmlFor="inputImg">
                <ImFilePicture /> <span>Image</span>
              </label>
            </div>
            <div className="item">
              <input id="" type="text" style={{ display: "none" }} name="" />
              <label htmlFor="">
                <BiMap /> <span>Place</span>
              </label>
            </div>
            <div className="item">
              <input type="text" style={{ display: "none" }} name="" />
              <label htmlFor="">
                <FaUserFriends /> <span>Tag Friends</span>
              </label>
            </div>
          </div>
          <div className="right">
            <button onClick={handleClick}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
}

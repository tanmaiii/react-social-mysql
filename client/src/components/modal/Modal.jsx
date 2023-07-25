import React, { useState } from "react";
import "./modal.scss";
import avt from "../../assests/avatar.jpg";
import { Link } from "react-router-dom";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { BsChatSquare } from "react-icons/bs";
import { PiShareFatLight } from "react-icons/pi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { LiaPenSolid } from "react-icons/lia";
import { IoMdClose } from "react-icons/io";

import Comments from "../comments/Comments";
import { makeRequest } from "../../axios";
import { useQuery } from "react-query";
import { useMutation, useQueryClient } from "react-query";
import moment from "moment";
import { useAuth } from "../../context/authContext";

export default function Modal({setOpenModal , postId, handleDelete}) {
    const { currentUser } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const [countComment, setCountComment] = useState();

    const { isLoading, error, data } = useQuery(["posts", postId], () =>
    makeRequest.get("/posts/" + postId).then((res) => {
      return res.data;
    })
  );

  const { isLoading: likeIsLoading, data: likeData } = useQuery(["likes", postId], () =>
    makeRequest.get("/likes?postId=" + postId).then((res) => {
      return res.data;
    })
  );

  const queryClient = useQueryClient();

  const likeMutation = useMutation(
    (liked) => {
      if (liked) return makeRequest.delete("/likes?postId=" + postId);
      return makeRequest.post("/likes", { postId: postId });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["likes"]);
      },
    }
  );

  const handleLike = () => {
    likeMutation.mutate(likeData.includes(currentUser.id));
  };

  const handleClickDelete = () => {
    handleDelete()
    setOpenModal(false)
  }

  return (
    <div className="modal">
      {!isLoading && <div className="wrapper">
        <div className="wrapper_img">
          <img src={'/upload/'+ data[0]?.img} alt="" />
        </div>
        <div className="wrapper_info">
          <div className="wrapper_info_user">
            <Link to={`/profile/`} className="userInfo">
              <img src={'/upload/'+ data[0]?.profilePic} alt="" />
              <div className="details">
                <span className="name">{data[0].name}</span>
                <span className="date"> {moment(data[0].createdAt).fromNow()}</span>
              </div>
            </Link>
            <div className="button_more">
              {currentUser.id === data[0].userId && (
                <>
                  <button
                    className="btn-menu"
                    onClick={() => setMenuOpen(!menuOpen)}
                  >
                    <MoreHorizIcon />
                  </button>
                  {menuOpen && (
                    <div className="menu-body">
                      <button className="btn-delete" onClick={handleClickDelete}>
                        <MdOutlineDeleteOutline /> Delete
                      </button>
                      <button className="btn-update">
                        <LiaPenSolid /> Update
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="wrapper_info_content">
            <p className="content_desc">
            {data[0].desc}
            </p>
          </div>
          <div className="wrapper_info_control">
            <div className="item" onClick={handleLike}>
              {likeData?.includes(currentUser.id) ? <BiSolidLike /> : <BiLike />}
              <span>{likeData.length} Likes</span>
            </div>
            <div className="item">
              <BsChatSquare />
              <span>{countComment} Comments</span>
            </div>
            <div className="item">
              <PiShareFatLight />
              <span>Share</span>
            </div>
          </div>
          <Comments postId={postId} setCountComment={setCountComment}/>
        </div>
      </div>}
      <button className="btn-close" onClick={() => setOpenModal(false)}>
        <IoMdClose />
      </button>
    </div>
  );
}

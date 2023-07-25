import React, { useState } from "react";
import { Link } from "react-router-dom";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import { BiLike, BiSolidLike } from "react-icons/bi";
import { BsChatSquare } from "react-icons/bs";
import { PiShareFatLight } from "react-icons/pi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { LiaPenSolid } from "react-icons/lia";

import moment from "moment";
import Comments from "../comments/Comments";
import "./post.scss";
import Modal from "../modal/Modal";
import { useAuth } from "../../context/authContext";

import { makeRequest } from "../../axios";
import { useQuery } from "react-query";
import { useMutation, useQueryClient } from "react-query";

import avt from "../../assests/avatar.jpg";

export default function Post(props) {
  const [openModal, setOpenModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const { currentUser } = useAuth();
  const post = props.post;
  const userId = props.userId || null;

  const { isLoading : likeIsLoading, error, data: likeData } = useQuery(["likes", post.id], () =>
    makeRequest.get("/likes?postId=" + post.id).then((res) => {
      return res.data;
    })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (liked) => {
      if (liked) return makeRequest.delete("/likes?postId=" + post.id);
      return makeRequest.post("/likes", { postId: post.id });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["likes"]);
      },
    }
  );

  const deleteMutation = useMutation(
    (postId) => {
      return makeRequest.delete("/posts/" + postId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const handleLike = () => {
    mutation.mutate(likeData.includes(currentUser.id));
  };

  const handleDelete = () => {
    deleteMutation.mutate(post.id);
  };

  return (
    post && (
      <div className="post">
        <div className="container">
          <div className="post_container_user">
            <Link to={`/profile/${post.userId}`} className="userInfo">
              <img
                src={post.profilePic ? `../upload/${post.profilePic}` : avt}
                alt=""
              />
              <div className="details">
                <span className="name">{post.name}</span>
                {post.createdAt && (
                  <span className="date">
                    {moment(post.createdAt).fromNow()}
                  </span>
                )}
              </div>
            </Link>
            <div className="post_more">
              {currentUser.id === post.userId && (
                <>
                  <button
                    className="btn-menu"
                    onClick={() => setMenuOpen(!menuOpen)}
                  >
                    <MoreHorizIcon />
                  </button>
                  {menuOpen && (
                    <div className="menu-body">
                      <button className="btn-delete" onClick={handleDelete}>
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
          <div className="post_container_content">
            <p className="content_desc">{post.desc}</p>
            <div onClick={() => setOpenModal(true)}> 
                {post.img && <img src={"../upload/" + post.img} alt=""/>}
            </div>
          </div>
          <div className="post_container_info">
            <div className="item" onClick={handleLike}>
              {likeData?.includes(currentUser.id) ? <BiSolidLike /> : <BiLike />}
              <span>{likeData?.length} Likes</span>
            </div>
            <div
              className="item"
              onClick={() => setCommentsOpen(!commentsOpen)}
            >
              <BsChatSquare />
              <span> Comments</span>
            </div>
            <div className="item">
              <PiShareFatLight />
              <span>Share</span>
            </div>
          </div>
          {commentsOpen && <Comments postId={post.id} />}
          {openModal && <Modal setOpenModal={setOpenModal}  postId={post.id} handleDelete={handleDelete}/>}
        </div>
      </div>
    )
  );
}

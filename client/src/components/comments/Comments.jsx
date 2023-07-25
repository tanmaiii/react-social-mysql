import React, { useEffect, useState } from "react";
import "./comments.scss";
import { useAuth } from "../../context/authContext";

import { BiSolidSend } from "react-icons/bi";
import { makeRequest } from "../../axios";
import moment from "moment";
import { useQuery } from "react-query";
import { useMutation, useQueryClient } from "react-query";
import {Link} from 'react-router-dom'

import avt from '../../assests/avatar.jpg'

export default function Comments({ postId }) {
  const { currentUser } = useAuth();
  const [desc ,setDesc] = useState('')

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery(["comments"], () =>
    makeRequest.get("/comments?postId=" + postId).then((res) => {
      return res.data;
    })
  );

  const mutation = useMutation(
    (newComments) => {
      return makeRequest.post("/comments", newComments);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comments"]);
      },
    }
  );

  const handleClick =  (e) => {
    e.preventDefault();
    mutation.mutate({ desc,postId});
    setDesc('')
  };

  return (
    <div className="comments">
      <div className="comments_write">
        <img src={ currentUser.profilePic ? '/upload/'+currentUser.profilePic : avt} alt="" />
        <div className="write_input">
          <input type="text" placeholder="Write a comment..." value={desc} onChange={(e) => setDesc(e.target.value)}/>
          <button onClick={handleClick}>
            <BiSolidSend />
          </button>
        </div>
      </div>
      {isLoading
        ? "Loading..."
        : data.map((comment) => (
            <div className="comments_comment" key={comment.id}>
              <Link to={'/profile/'+comment.userId}>
              <img src={ comment.profilePic ? '/upload/'+comment.profilePic : avt} alt="" />
              </Link>
              <div className="info">
                <div className="info_content">
                  <span className="">{comment.name}</span>
                  <p>{comment.desc}</p>
                </div>
                <span className="date">{moment(comment.createdAt).fromNow()}</span>
              </div>
            </div>
          ))}
    </div>
  );
}

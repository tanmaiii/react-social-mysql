import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import "./profile.scss";
import Update from "../../components/update/Update";
import avt from "../../assests/avatar.jpg";
import Posts from "../../components/posts/Posts";
import Share from "../../components/share/Share";
import { useNavigate, useParams } from "react-router-dom";
import { makeRequest } from "../../axios";

import { MdPlace } from "react-icons/md";
import { BsFillChatDotsFill } from "react-icons/bs";
import { BsLink45Deg } from "react-icons/bs";

import { useQuery } from "react-query";
import { useMutation, useQueryClient } from "react-query";

export default function Profile() {
  const { currentUser, logout } = useAuth();
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError ]= useState(false)
  const [openUpdate, setOpenUpdate] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const userId = parseInt(id);
  const queryClient = useQueryClient();

  const getData = (userId) => {
    setIsLoading(true)
    makeRequest.get("/users/find/" + userId).then((res) => {
      return setData(res.data);
    }).catch((err) => {setError(true)})
    setIsLoading(false)
    setError(false)
  }

  useEffect(() =>{
    getData(userId)
  },[userId])

  const { isLoading: followerIsLoading, data: followerData } = useQuery(
    ["follower"],
    () =>
      makeRequest
        .get("/relationships/follower/?followedUserId=" + userId)
        .then((res) => {
          return res.data;
        })
  );

  const { isLoading: followingIsLoading, data: followingData } = useQuery(
    ["following"],
    () =>
      makeRequest
        .get("/relationships/following/?followerUserId=" + userId)
        .then((res) => {
          return res.data;
        })
  );

  const mutation = useMutation(
    (following) => {
      if (following)
        return makeRequest.delete("/relationships?userId=" + userId);
      return makeRequest.post("/relationships", { userId: userId });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["follower"]);
      },
    }
  );

  const handleFollow = () => {
    mutation.mutate(followerData.includes(currentUser.id));
  };

  const handleLogout = async () => {
    logout();
  };

  return (
    data &&(
      !isLoading && (
        <>
          <div className="profile">
            <div className="profile_imgages">
              <img
                src={data.coverPic ? `../upload/${data.coverPic}` : avt}
                alt=""
              />
            </div>
  
            <div className="profile_container">
              <div className="profile_container_avt">
                <div className="img">
                  <img
                    src={data.profilePic ? `../upload/${data?.profilePic}` : avt}
                    alt=""
                  />
                </div>
                <div className="control">
                  {userId === currentUser.id ? (
                    <>
                      <button className="btn-logout" onClick={handleLogout}>
                        Logout
                      </button>
                      <button
                        className="btn-update"
                        onClick={() => setOpenUpdate(true)}
                      >
                        Update
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="btn-chat">
                        <BsFillChatDotsFill />
                        Chat
                      </button>
                      <button className="btn-follow" onClick={handleFollow}>
                        {!followerIsLoading &&
                        followerData.includes(currentUser.id)
                          ? "Following"
                          : "Follow"}
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div className="profile_container_info">
                <span className="name">{data?.name}</span>
                <div className="place">
                  <MdPlace /> {data?.city}
                </div>
                <div className="link">
                  <BsLink45Deg /> <a href="">{data?.website}</a>
                </div>
                <div className="follow">
                  <p>
                    {!followingIsLoading && followingData.length}{" "}
                    <span>Following</span>
                  </p>
                  <p>
                    {!followerIsLoading && followerData.length}{" "}
                    <span>Followers</span>
                  </p>
                </div>
              </div>
            </div>
            {userId === currentUser.id && <Share />}
            <Posts userId={userId} />
          </div>
          {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
        </>
      )
    )
  );
}

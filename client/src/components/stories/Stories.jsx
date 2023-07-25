import React from "react";
import "./stories.scss";
import { useAuth } from "../../context/authContext";
import { GrFormAdd } from "react-icons/gr";
import AddIcon from "@mui/icons-material/Add";
import avt from '../../assests/avatar.jpg'

//TEMPORARY
const stories = [
  {
    id: 1,
    name: "John Doe",
    avt: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
  },
  {
    id: 2,
    name: "John Doe",
    avt: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
  },
  {
    id: 3,
    name: "John Doe",
    avt: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
  },
  {
    id: 4,
    name: "John Doe",
    avt: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
  },
];

export default function Stories() {
  const { currentUser } = useAuth();
  return (
    <div className="stories">
      <div className="stories_silder">
        <div className="story_user">
          <img className="story_user_img" src={ currentUser.profilePic ? '/upload/'+currentUser.profilePic : avt} alt="" />
          <div className="story_user_body">
            <button>
              <AddIcon />
            </button>
          </div>
        </div>
        {stories.map((story) => (
          <div className="story" key={story.id}>
            <img className="story_img" src={story.img} alt="" />
            <div className="story_body">
              <img className="story_body_avt" src={story.avt} alt="" />
              <span>{story.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

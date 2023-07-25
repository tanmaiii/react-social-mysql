import React from "react";
import Stories from "../../components/stories/Stories";
import Posts from "../../components/posts/Posts";
import Share from "../../components/share/Share";
import "./home.scss";
export default function Home() {
  return (
    <div className="home">
      <Stories />
      <Share />
      <Posts />
    </div>
  );
}

import React, { useEffect, useState } from "react";
import Post from "../post/Post";
import { makeRequest } from "../../axios";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";

export default function Posts({ userId }) {
  // const [data, setData] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(false);

  const { isLoading, error, data } = useQuery(["posts"], () =>
    makeRequest.get("/posts?userId=" +userId).then((res) => {
      return res.data;
    })
  );

  // const getData = async (userId) => {
  //   await makeRequest
  //     .get("/posts?userId=" + userId)
  //     .then((res) => {
  //       setIsLoading(true);
  //       return setData(res.data);
  //     })
  //     .catch((err) => {
  //       setError(true);
  //     });
  //   setIsLoading(false);
  // };


  // useEffect(() => {
  //   console.log('load lai');
  //   getData(userId);
  // }, [userId]);

  return (
    data && (
      <div className="posts">
        {error
          ? "Something went wrong!"
          : isLoading
          ? "Loading..."
          : data.map((post) => (
              <Post userId={userId} post={post} key={post.id} />
            ))}
      </div>
    )
  );
}

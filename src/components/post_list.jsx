/* eslint-disable react/prop-types */
import { useContext, useEffect } from "react";
import Post from "./post";
import WelcomeMessage from "./welcome_meassage";
import { PostListContext } from "../store/post_list_provider";
import { useLoaderData } from "react-router-dom";

const PostList = () => {
  const { fetchPost, postList } = useContext(PostListContext);
  const storedPostlist =
    localStorage.getItem("postlist") &&
    JSON.parse(localStorage.getItem("postlist"));
    console.log(storedPostlist);
  const fetchedPostList = useLoaderData(); ////This will execute the above PostLoader function to get posts.

  useEffect(() => {
    if (postList.length === 0) {
      if (storedPostlist) {   // check if postlist exists on the localStorage.
        fetchPost(storedPostlist);
        console.log("fetching postlist from localStorage");
      }else {
        console.log("Fetching posts for the first time");
        fetchPost(fetchedPostList);
      }
    } else {
      console.log("Post list already populated, not fetching again");
    }
  }, [fetchedPostList, fetchPost]);
  console.log("postList", postList);

  return (
    <>
      {postList.length === 0 && <WelcomeMessage />}
      {postList.map((post, idx) => (
        <Post post={post} idx={idx} key={idx}></Post>
      ))}
    </>
  );
};

export const PostLoader = async () => {
  try {
    const response = await fetch("https://dummyjson.com/posts");
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    const data = await response.json();
    return data.posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return []; // Return an empty array if there's an error
  }
};

export default PostList;

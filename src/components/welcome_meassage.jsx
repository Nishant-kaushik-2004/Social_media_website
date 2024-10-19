/* eslint-disable react/prop-types */
import { useContext } from "react";
import { PostLoader } from "./post_list";
import { PostListContext } from "../store/post_list_provider";

const WelcomeMessage = () => {
  const { fetchPost } = useContext(PostListContext);
  const handleOnGetPost = async () => {
    fetchPost(await PostLoader());
  };
  return (
    <center>
      <h2 className="welcome_msg">Currently there are no posts to show ! </h2>
      <button
        type="button"
        className="btn btn-primary get-post-btn"
        onClick={() => {
          handleOnGetPost();
        }}
      >
        Get post from server
      </button>
    </center>
  );
};

export default WelcomeMessage;

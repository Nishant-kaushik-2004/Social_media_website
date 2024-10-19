/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { MdDelete } from "react-icons/md";
import { BiSolidLike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";
import { useContext } from "react";
import { PostListContext } from "../store/post_list_provider";
const Post = ({ post,idx}) => {
  const { deletePost } = useContext(PostListContext);
  return (
    <div className="card post-card">
      <div className="card-body">
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text">{post.body}</p>
        <span
          className="position-absolute top-0 start-100 translate-middle badge rounded-pill  bg-danger delete-btn"
          onClick={() => {
            deletePost(idx);
            console.log("clicked");
          }}
        >
          <MdDelete />
        </span>
        {post.tags.map((hashtag,idx) => (
          <span key={idx} className="badge text-bg-primary tags">{`#${hashtag}`}</span>
        ))}
        <div className="alert alert-success reactions" role="alert">
          {post.reactions?.likes||0}
          <BiSolidLike className="like-btn"/> {post.reactions?.dislikes||0}
          <BiSolidDislike className="like-btn"/>
        </div>
      </div>
    </div>
  );
};

export default Post;

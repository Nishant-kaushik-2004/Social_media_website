/* eslint-disable react/prop-types */
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { PostListContext } from "../store/post_list_provider";

const CreatePost = () => {
  const { addPost,setActiveTab } = useContext(PostListContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); // useForm hook
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    console.log(formData);
    try {
      const response = await fetch("https://dummyjson.com/posts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const post = await response.json();
      console.log(post);
      post.tags = post.tags?.split(" ") || [];
      console.log(post);
      addPost(post);
      
      // After successful post, redirect to homepage
      setActiveTab("Home");
      return navigate("/");
    } catch (error) {
      console.error("Error while posting:", error);
      return { error: "Failed to create post" };
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="create-post">
        <div className="mb-3">
          <label htmlFor="userId" className="form-label">
            Enter your user Id here
          </label>
          <input
            type="number"
            className="form-control"
            id="userId"
            placeholder="user Id"
            name="userId"
            {...register("userId", { required: "User Id is required" })} // Register the input
          />
          {errors.userId && (
            <span className="text-danger">{errors.userId.message}</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Post Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="How are you feeling today..."
            name="title"
            {...register("title", { required: "Title is required" })} // Register the input
          />
          {errors.title && (
            <span className="text-danger">{errors.title.message}</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="body" className="form-label">
            Post Content
          </label>
          <textarea
            rows={4}
            type="text"
            className="form-control"
            id="body"
            placeholder="Tell us more about it"
            name="body"
            {...register("body", { required: "Post content is required" })} // Register the input
          />
          {errors.body && (
            <span className="text-danger">{errors.body.message}</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="tags" className="form-label">
            Enter your hashtags here
          </label>
          <input
            type="text"
            className="form-control"
            id="tags"
            placeholder="Enter tags followed by space"
            name="tags"
            {...register("tags")}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          post
        </button>
      </form>
    </>
  );
};
// export async function FormAction(data) {
//   console.log(data);
//   const formData = await data.request.formData();
//   const postData = Object.fromEntries(formData);
//   postData.tags = postData.tags.split(" ");

//   try {
//     const response = await fetch("https://dummyjson.com/posts/add", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(postData),
//     });

//     const post = await response.json();
//     console.log(post);
//     data.context.addPost(post);
//     // After successful post, redirect to homepage
//     return redirect("/");
//   } catch (error) {
//     console.error("Error while posting:", error);
//     return { error: "Failed to create post" };
//   }
// }

export default CreatePost;

import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import CreatePost from "./components/create_post";
import PostList, { PostLoader } from "./components/post_list.jsx";
import PostListProvider from "./store/post_list_provider.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <PostList />, loader: PostLoader },
      {
        path: "/create-post",
        element: <CreatePost />,
        // action: FormAction,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PostListProvider>
      <RouterProvider router={router} />
    </PostListProvider>
  </React.StrictMode>
);

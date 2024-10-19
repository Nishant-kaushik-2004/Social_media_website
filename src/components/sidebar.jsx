/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Link } from "react-router-dom";
import { PostListContext } from "../store/post_list_provider";

const Sidebar = () => {
  const { activeTab, setActiveTab } = useContext(PostListContext);
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-4 text-bg-dark sidebar"
      style={{ width: "180px" }}
    >
      <span className="fs-4 text-center">Sidebar</span>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li>
          <Link
            to="/"
            aria-current="page"
            className={`nav-link text-white ${
              activeTab === "Home" && "active"
            }`}
            onClick={()=>{handleTabChange("Home")}}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/create-post"
            className={`nav-link text-white ${
              activeTab === "CreatePost" && "active"
            }`}
            onClick={()=>{handleTabChange("CreatePost")}}
          >
            Create Post
          </Link>
        </li>
      </ul>
      <hr />
    </div>
  );
};

export default Sidebar;

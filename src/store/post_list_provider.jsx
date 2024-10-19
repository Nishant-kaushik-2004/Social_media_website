/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  createContext,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from "react";

export const PostListContext = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
  fetchPost: () => {},
  activeTab: "",
  setActiveTab: () => {},
});

const postListReducer = (currPostList, action) => {
  let newPostList = currPostList;
  if (action.type === "DELETE_ITEM") {
    if (currPostList.length === 1) {
      localStorage.setItem("postlist", JSON.stringify([]));
    }
    newPostList = currPostList.filter((post, idx) => idx !== action.payload);
  } else if (action.type === "ADD_ITEM") {
    newPostList = [action.payload, ...currPostList];
  } else if (action.type === "FETCH_POSTLIST") {
    newPostList = action.payload.fetchedPostList;
  }
  return newPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(postListReducer, []);

  // Get the saved activeTab from localStorage or default to "Home"
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("activeTab") || "Home";
  });

  useEffect(() => {
    if (postList.length !== 0) {
      localStorage.setItem("postlist", JSON.stringify(postList));
    }
  }, [postList]);

  // Save the activeTab to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  const addPost = (post) => {
    const postAddition = {
      type: "ADD_ITEM",
      payload: post,
    };
    dispatchPostList(postAddition);
  };

  const deletePost = useCallback(
    (idx) => {
      const postDeletion = {
        type: "DELETE_ITEM",
        payload: idx,
      };
      dispatchPostList(postDeletion);
    },
    [dispatchPostList]
  );
  const fetchPost = useCallback((fetchedPostList) => {
    const getPostsFromServer = {
      type: "FETCH_POSTLIST",
      payload: { fetchedPostList },
    };
    dispatchPostList(getPostsFromServer);
  }, []);

  return (
    <PostListContext.Provider
      value={{
        postList,
        addPost,
        deletePost,
        fetchPost,
        activeTab,
        setActiveTab,
      }}
    >
      {children}
    </PostListContext.Provider>
  );
};

export default PostListProvider;

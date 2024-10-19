import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"; // it is necessary to put App.css import after bootstrap import show that we can overwrite it.
import Header from "./components/header";
import Footer from "./components/footer";
import Sidebar from "./components/sidebar";
import { Outlet } from "react-router-dom";
import PostListProvider from "./store/post_list_provider";

function App() {
  return (
    <PostListProvider>
    <div className="app-container">
      <Sidebar></Sidebar>
      <div className="content">
        <Header></Header>
        <Outlet></Outlet>
        {/* {selectedTab === "Home" ? (     
            <PostList></PostList>
          ) : (
            <CreatePost  setSelectedTab={setSelectedTab}></CreatePost>
          )} */}
        {/* this(conditional rendering) is actually a better way to render the above Postlist and CreatePostList components but the problem was useEffect function inside PostList component executes once in every rerenders(fetching initial posts every time when selectedTab state changes to Home) which we dont want here.to solve this problem we shifted the useEffect function to store(post_list_provider) */}
        <Footer></Footer>
      </div>
    </div>
    </PostListProvider>
  );
}

export default App;

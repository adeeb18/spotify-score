import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Search from "./pages/Search";
import Song from "./pages/Song";
import Album from "./pages/Album";
import Artist from "./pages/Artist";
import About from "./pages/About";
import ViewReviews from "./pages/ViewReviews";
import CreateReview from "./pages/CreateReview";
import Leaderboard from "./pages/Leaderboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import './App.css';
import MyReviews from "./pages/MyReviews";
import UpdateReview from "./pages/UpdateReview";
import UserProfile from "./pages/UserProfile";

function App() {
  
  return (
    <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route path="/search" element={<Search/>}/>
            <Route exact path="/song" element={<Song/>}/>
            <Route path="/song/reviews" element={<ViewReviews/>}/>
            <Route path="/song/create-review" element={<CreateReview/>}/>
            <Route path="/album" element={<Album/>}/>
            <Route path="/artist" element={<Artist/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/leaderboard" element={<Leaderboard/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/profile/reviews" element={<MyReviews/>}/>
            <Route path="/song/update-review" element={<UpdateReview/>}/>
            <Route path="/profile" element={<UserProfile/>}/>
          </Routes>
    </BrowserRouter>
  );
}

export default App;

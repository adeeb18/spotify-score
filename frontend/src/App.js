import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Search from "./pages/Search";
import Song from "./pages/Song";
import Album from "./pages/Album";
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
            <Route exact path="/spotify-score" element={<Home/>}/>
            <Route path="/spotify-score/search" element={<Search/>}/>
            <Route exact path="/spotify-score/song" element={<Song/>}/>
            <Route path="/spotify-score/song/reviews" element={<ViewReviews/>}/>
            <Route path="/spotify-score/song/create-review" element={<CreateReview/>}/>
            <Route path="/spotify-score/album" element={<Album/>}/>
            <Route path="/spotify-score/about" element={<About/>}/>
            <Route path="/spotify-score/leaderboard" element={<Leaderboard/>}/>
            <Route path="/spotify-score/register" element={<Register/>}/>
            <Route path="/spotify-score/login" element={<Login/>}/>
            <Route path="/spotify-score/profile/reviews" element={<MyReviews/>}/>
            <Route path="/spotify-score/song/update-review" element={<UpdateReview/>}/>
            <Route path="/spotify-score/profile" element={<UserProfile/>}/>
          </Routes>
    </BrowserRouter>
  );
}

export default App;

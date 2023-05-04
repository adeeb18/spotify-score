import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SideBar from "./components/SideBar/SideBar";
import NavBar from "./components/NavBar";
import { Box, Container, Typography, Button, Divider} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import StyledRating from "./components/StyledRating";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

function MyReview(props){
    const handleDelete = () => {
        console.log(props.id);
        const payload = {"user_id":props.user, "id":props.id, "type":props.type}
        const url = 'http://localhost:8000/deleteReview'
        axios.delete(url, {data: payload})
        .then(response => console.log(response))
        .catch(error => console.error(error));
    }
    return(
        <Box className="d-flex flex-column align-items-start" sx={{width:"100%", color:"#C8C7C7",px:"4rem", py:"2rem", alignItems:"center", background:"#4e4f4f", borderRadius:2, my:3}}>
            <Box className="d-flex"  sx={{gap:"2rem"}}> 
                <Box sx={{minWidth:"25%"}}>
                    <Typography variant="h4">{localStorage.getItem("username")}</Typography>
                    <Typography marginLeft="3%">Style: {props.style}</Typography>
                    <Typography marginLeft="3%">Mood: {props.mood}</Typography>
                    <Typography marginLeft="3%">{(props.rec) ? "Would Recommend" : "Would Not Recommend"}</Typography>
                </Box>
                <Box className="mt-2">
                    <Box className="d-flex justify-content-between align-items-center" sx={{width:"100%"}}>
                        <StyledRating
                            defaultValue={5}
                            value={(Number(props.rating)/25)}
                            precision={0.5}
                            icon={<FavoriteIcon/>}
                            emptyIcon={<FavoriteBorderIcon/>}
                            readOnly
                        />
                        <Typography marginLeft="25vw"> {(props.created).substring(0, 10)}</Typography>
                    </Box>
                    <Typography width="100%">{props.thoughts}</Typography>
                </Box>
            </Box>
            <Box className="d-flex" sx={{gap:"1rem", ml:0.6}}>
                <Button href="/song/update-review" onClick={localStorage.setItem("rID", props.id)}variant="contained" sx={{color:"#191414", maxWidth:"30%"}} style={{backgroundColor:"#1DB954"}}>Edit</Button>
                <Button onClick={handleDelete} variant="contained" sx={{color:"#191414", maxWidth:"30%"}} style={{backgroundColor:"#bd2d2d"}}>Delete</Button>
            </Box>
        </Box>
    );
}

const MyReviews = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const url = 'http://localhost:8000/getUserReviews'
        const id = localStorage.getItem("id");
        const payload = {user_id: id}
        axios.post(url, payload)
                .then(response =>  setData(response.data))
                .catch(error => console.error(error));
    }, []);

    // const reviewTemplate = (user, rating, style, mood, created, thoughts, rec, keyVal)
    const body = data.map((item, index) => (
    <MyReview key={index} user={item.user_id} rating={item.num_rating} 
            style={item.style} mood={item.mood} created = {item.time_created}
            thoughts = {item.overall_thoughts} rec={item.would_recommend} 
            type={"song"} genre = {item.genre} id={item.id}/>
    ));

    return (
        <Box className="d-flex">
            <SideBar/>
            <Box className="main" sx={{flex:5}}>
                <NavBar/>
                <Container className="mt-2">
                    <Box className="d-flex flex-column align-items-center" sx={{marginBottom:"1em"}}>
                        <Button
                            variant="contained"
                            component={Link}
                            to="/spotify-score/song/create-review"
                            startIcon={<FavoriteIcon/>}
                            sx={{color:"#191414", maxWidth:"30%"}}
                            style={{backgroundColor:"#1DB954"}}
                        >
                            <Typography variant="h6" textTransform="none">
                                Leave a Review
                            </Typography>
                        </Button>
                    </Box>
                    <Divider sx={{background:"white", mb:0.5, width:'100%'}}/>
                    <Typography
                            variant="h3"
                            color="#C8C7C7"
                            marginBottom="2rem"
                            fontWeight="700"
                            textAlign="center"
                            fontStyle={"italic"}
                        >
                            Reviews
                    </Typography>
                    {body}
                </Container>
            </Box>
        </Box>
    );
}

export default MyReviews;

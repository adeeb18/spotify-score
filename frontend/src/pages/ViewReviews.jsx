import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SongCard from "./components/SongCard";
import ReviewCard from "./components/ReviewCard";
import SideBar from "./components/SideBar/SideBar";
import NavBar from "./components/NavBar";
import { Box, Container, Typography, Button, Divider} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import StyledRating from "./components/StyledRating";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { styled } from "@mui/system";

function Review(props){
    return(
        <Box className="d-flex" sx={{width:"100%", color:"#C8C7C7",px:"4rem", py:"2rem", alignItems:"center", background:"#4e4f4f", borderRadius:2, my:3}}>
            <Box sx={{minWidth:"25%"}}>
                <Typography variant="h4">{props.user}</Typography>
                <Typography>Style: {props.style}</Typography>
                <Typography>Mood: {props.mood}</Typography>
                <Typography>{(props.rec == "Yes")? "Would Recommend" : "Would Not Recommend"}</Typography>
            </Box>
            <Box className="mt-2">
                <Box className="d-flex justify-content-between">
                    <StyledRating
                        defaultValue={5}
                        value={(props.rating)}
                        precision={0.5}
                        icon={<FavoriteIcon/>}
                        emptyIcon={<FavoriteBorderIcon/>}
                        sx={{mb:"0.5rem"}}
                        readOnly
                    />
                    <Typography className="align-self-end">{props.created}</Typography>
                </Box>
                <Typography width="100%">{props.thoughts}</Typography>
            </Box>
        </Box>
    );
}

const ViewReviews = () => {
    const [data, setData] = useState([]);
    let count = 0;

    useEffect(() => {
        const url = 'http://localhost:8000/users/getAllReviews'
            axios.get(url)
                .then(response =>  setData(response.data))
                .catch(error => console.error(error));
    }, []);

    // const reviewTemplate = (user, rating, style, mood, created, thoughts, rec, keyVal)
    const body = data.map((item, index) => (
    <Review key={index} user={item.user_id} rating={item.num_rating} 
            style={item.style} mood={item.mood} created = {item.time_created}
            thoughts = {item.overall_thoughts} rec={item.would_recommend}/>
    ));
    return (
        <Box className="d-flex">
            <SideBar/>
            <Box className="main" sx={{flex:5}}>
                <NavBar/>
                <Container className="mt-2">
                    <Box className="d-flex flex-column align-items-center" sx={{marginBottom:"1em"}}>
                        <SongCard/>
                        <Button
                            variant="contained"
                            component={Link}
                            to="/song/create-review"
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

export default ViewReviews;

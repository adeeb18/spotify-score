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

const ViewReviews = () => {
    let body;
    let count = 0;

    useEffect(() => {
        const url = 'http://localhost:8000/users/getAllReviews'
            axios.get(url)
                .then(response => parseReviews(response.data))
                .catch(error => console.error(error));
    }, []);

    const parseReviews = (data) =>{
        while(count < data.length){
            count += 1;
        }
    }

    const reviewTemplate = (user, rating, style, mood, created, thoughts) =>{
        let rate = Number(rating) / 20;
        return ([
            <Box key={0} className="d-flex" sx={{width:"100%", color:"#C8C7C7",px:"4rem", py:"2rem", alignItems:"center", background:"#4e4f4f", borderRadius:2}}>
                <Box sx={{minWidth:"25%"}}>
                    <Typography variant="h4">{user}</Typography>
                    <Typography>Style: {style}</Typography>
                    <Typography>Mood: {mood}</Typography>
                    <Typography>Would Recommend</Typography>
                </Box>
                <Box className="mt-2">
                    <Box className="d-flex justify-content-between">
                        <StyledRating
                            defaultValue={5}
                            value={(rate)}
                            precision={0.5}
                            icon={<FavoriteIcon/>}
                            emptyIcon={<FavoriteBorderIcon/>}
                            sx={{mb:"0.5rem"}}
                            readOnly
                        />
                        <Typography>{created}</Typography>
                    </Box>
                    <Typography width="100%">{thoughts}</Typography>
                </Box>
            </Box>,
            <Divider key={1} sx={{background:"white", mb:0.5, width:'100%'}}/>
        ]);
    }

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
                        
                </Container>
            </Box>
        </Box>
    );
}

export default ViewReviews;

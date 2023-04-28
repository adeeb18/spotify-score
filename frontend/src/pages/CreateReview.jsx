import { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Container, Typography, TextField, Button } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SendIcon from "@mui/icons-material/Send";
import SideBar from "./components/SideBar/SideBar";
import SongCard from "./components/SongCard";
import StyledRating from "./components/StyledRating";
import NavBar from "./components/NavBar";

const CreateReview = () => {
    let [rating, setRating] = useState(0);
    let [reviewText, setReviewText] = useState("");

    const handleChange = (event) => {
        switch(event.target.name) {
            case "ratingInput":
                setRating(event.target.value);
                break;
            case "textInput":
                setReviewText(event.target.value);
                break;
        }
    }

    return (
        <Box className="d-flex">
            <SideBar/>
            <Box className="main" sx={{flex:5}}>
                <NavBar/>
                <Container className="mt-2">
                    <Container sx={{mb:"6em"}}>
                        <Typography
                            variant="h3"
                            color="#1DB954"
                            marginBottom="2rem"
                            fontWeight="700"
                            textAlign="center"
                        >
                            Create Review
                        </Typography>
                        <SongCard/>
                    </Container>
                    
                    <Container sx={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                        <StyledRating
                            name="ratingInput"
                            onChange={handleChange}
                            defaultValue={rating}
                            value={rating}
                            precision={0.5}
                            icon={<FavoriteIcon/>}
                            emptyIcon={<FavoriteBorderIcon/>}
                            sx={{mb:"1rem"}}
                        />
                        <TextField
                            name="textInput"
                            onChange={handleChange}
                            label="What do you think about this song?"
                            rows={6}
                            fullWidth={true}
                            variant="filled"
                            multiline
                            sx={{backgroundColor:"#ffffff", mb:"3rem"}}
                        />
                        <Button
                            variant="contained"
                            component={Link}
                            to="/song"
                            startIcon={<SendIcon/>}
                            sx={{marginBottom:"3em", color:"#191414"}}
                            style={{backgroundColor:"#1DB954"}}
                        >
                            <Typography variant="h6" textTransform="none">
                                Post Review
                            </Typography>
                        </Button>
                    </Container>
                </Container>
            </Box>
        </Box>
    );
}

export default CreateReview;

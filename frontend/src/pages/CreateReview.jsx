import { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Container, Typography, TextField, Button, RadioGroup, FormControlLabel, Radio, Divider } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SendIcon from "@mui/icons-material/Send";
import SideBar from "./components/SideBar/SideBar";
import SongCard from "./components/SongCard";
import StyledRating from "./components/StyledRating";
import NavBar from "./components/NavBar";
import ArrowForward from '@mui/icons-material/ArrowForwardIos';

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
                <Container className="d-flex flex-column align-items-center mt-2">
                    <Container sx={{mb:"2em"}}>
                        <Typography
                            variant="h5"
                            color="#1DB954"
                            marginBottom="2rem"
                            marginLeft="3.3vw"
                            fontWeight="700"
                        >
                            Song/Album Name - Artist Name -- Review
                        </Typography>
                        <SongCard/>
                    </Container>
                    
                    <Box 
                        className="d-flex flex-column align-items-start"
                        sx={{
                            minWidth:"65vw", mb:"3rem"
                        }}
                    >
                        <Box className="d-flex align-items-center">
                            <Typography color="#C8C7C7" variant="h6">Rating:</Typography>
                            <StyledRating
                                name="ratingInput"
                                onChange={handleChange}
                                defaultValue={rating}
                                value={rating}
                                precision={0.5}
                                icon={<FavoriteIcon/>}
                                emptyIcon={<FavoriteBorderIcon/>}
                                sx={{mt:"0.3rem", ml:"1rem"}}
                            />
                        </Box>
                        <Divider sx={{background:"white", mb:0.5, width:'100%'}}/>
                        <Box>
                            <Typography color="#C8C7C7" variant="h6">This song makes me feel...</Typography>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                sx={{
                                    color:"#C8C7C7",
                                    '& .MuiSvgIcon-root:not(.MuiSvgIcon-root ~ .MuiSvgIcon-root)':{
                                            color: '#C8C7C7',
                                    },
                                    '& .MuiSvgIcon-root + .MuiSvgIcon-root': {
                                        color: 'green',
                                    },
                                }}
                            >
                                <FormControlLabel value="Happy" control={<Radio />} label="Happy" />
                                <FormControlLabel value="Excited" control={<Radio />} label="Excited" />
                                <FormControlLabel value="Good" control={<Radio />} label="Good" />
                                <FormControlLabel value="Sad" control={<Radio />} label="Sad" />
                                <FormControlLabel value="Calm" control={<Radio />} label="Calm" />
                                <FormControlLabel value="Optimistic" control={<Radio />} label="Optimistic" />
                                <FormControlLabel value="Angry " control={<Radio />} label="Angry " />
                                <FormControlLabel value="Bad" control={<Radio />} label="Bad" />
                                <FormControlLabel value="Annoyed" control={<Radio />} label="Annoyed" />
                                <FormControlLabel value="Irritated" control={<Radio />} label="Irritated" />
                            </RadioGroup>
                        </Box>
                        <Divider sx={{background:"white", mb:2, width:'100%'}}/>
                        <TextField
                            name="textInput"
                            onChange={handleChange}
                            label="What style do you think this song is?"
                            rows={6}
                            fullWidth={true}
                            variant="filled"
                            multiline
                            sx={{backgroundColor:"#ffffff", mb:"1rem", maxHeight:"3rem"}}
                        />
                        <Divider sx={{background:"white", mb:2, width:'100%'}}/>
                        <TextField
                            name="textInput"
                            onChange={handleChange}
                            label="What did you think about this song?"
                            rows={6}
                            fullWidth={true}
                            variant="filled"
                            multiline
                            sx={{backgroundColor:"#ffffff", mb:"1rem"}}
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
                    </Box>
                </Container>
            </Box>
        </Box>
    );
}

export default CreateReview;

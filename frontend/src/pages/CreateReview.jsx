import { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Container, Typography, TextField, Button, RadioGroup, FormControlLabel, 
         Radio, Divider, Select, MenuItem, FormControl } from "@mui/material";
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
    let [mood, setMood] = useState("Happy")
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
                            minWidth:"65vw", mb:"3rem", px:"0rem"
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
                            <FormControl sx={{minWidth:250}} variant="outlined">
                                <Select
                                    //error={monthError}
                                    //helperText={monthHelper}
                                    id="moodInput"
                                    name="moodInput"
                                    value={mood}
                                    onChange={handleChange}
                                    sx={{color:"black", background:"#FFFFFF", mb:1}}
                                >
                                    <MenuItem value={"Happy"}>Happy</MenuItem>
                                    <MenuItem value={"Frustrated"}>Frustrated</MenuItem>
                                    <MenuItem value={"Sad"}>Sad</MenuItem>
                                    <MenuItem value={"Irritated"}>Irritated </MenuItem>
                                    <MenuItem value={"Excited"}>Excited</MenuItem>
                                    <MenuItem value={"Good"}>Good</MenuItem>
                                    <MenuItem value={"Loving"}>Loving</MenuItem>
                                    <MenuItem value={"Silly"}>Silly</MenuItem>
                                    <MenuItem value={"Optmisitic"}>Optimistic</MenuItem>
                                    <MenuItem value={"Angry"}>Angry</MenuItem>
                                    <MenuItem value={"Annoyed"}>Annoyed</MenuItem>
                                    <MenuItem value={"Bad"}>Bad</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Divider sx={{background:"white", mb:2, width:'100%'}}/>
                        <Box>
                            <Typography color="#C8C7C7" variant="h6">Would you reccommend this song?</Typography>
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
                                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                <FormControlLabel value="No" control={<Radio />} label="No" />
                            </RadioGroup>
                        </Box>
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

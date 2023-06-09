import { useState, useEffect} from "react";
import { Box, Container, Typography, TextField, Button, RadioGroup, FormControlLabel, 
         Radio, Divider, Select, MenuItem, FormControl } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SendIcon from "@mui/icons-material/Send";
import SideBar from "./components/SideBar/SideBar";
import SongCard from "./components/SongCard";
import AlbumCard from "./components/AlbumCard";
import StyledRating from "./components/StyledRating";
import NavBar from "./components/NavBar";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";

const UpdateReview = () => {
    let [rating, setRating] = useState(Number(0));
    let [uMood, setMood] = useState("Happy");
    let [rec, setRec] = useState(true);
    let [uStyle, setStyle] = useState("");
    let [reviewText, setReviewText] = useState("");
    let [reviewID, setReviewID] = useState("");
    let [uType, setType] = useState("");
    let [songData, setSongData] = useState(null);
    let [albumData, setAlbumData] = useState(null);
    let [songVal, setSongVal] = useState(null);
    let [albumVal, setAlbumVal] = useState(null);
    const [searchParams] = useSearchParams();

    const fetchAlbumData = () => {
        fetch(`https://lws3v1re05.execute-api.us-east-1.amazonaws.com/dev/api/v1/spotify/album/${searchParams.get("id")}`)
            .then((response) => response.json())
            .then((data) => {
                handleData(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }
    
    const fetchSongData = () => {
        fetch(`https://lws3v1re05.execute-api.us-east-1.amazonaws.com/dev/api/v1/spotify/track/${searchParams.get("id")}`)
            .then((response) => response.json())
            .then((data) => {
                handleSData(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const handleData = (inVal) => {
        setAlbumData(inVal);
        setAlbumVal(<AlbumCard
            id={inVal.id}
            name={inVal.name}
            artist={inVal.artists[0].name}
            imageUrl={inVal.images[0].url}
        />);
    }
    const handleSData = (inVal) => {
        setSongData(inVal);
        setSongVal(<SongCard
            id={inVal["id"]}
            song={inVal["name"]}
            artist={inVal["artists"][0]["name"]}
            imageUrl={inVal["album"]["images"][0]["url"]}
        />);
    }

    useEffect(() => {
        const url = 'https://lws3v1re05.execute-api.us-east-1.amazonaws.com/dev/api/v1/users/getUserReviews'
        const id = localStorage.getItem("id");
        const payload = {user_id: id}
        axios.post(url, payload)
                .then(response =>  setData(response.data))
                .catch(error => console.error(error));
    }, []);

    const setData = (data) => {
        for(let i = 0; i < data.length; i++){
            let curr = data[i];
            if(curr.id == localStorage.getItem("rID")){
                setReviewID(curr.id);
                setRating(Number(Number(curr.num_rating)/20));
                setMood(curr.mood);
                setRec(curr.would_recommend);
                setStyle(curr.style);
                setReviewText(curr.overall_thoughts);
                setType(curr.item_type);
            }
        }
        if(uType == "song"){
            fetchSongData();
        }
        else{
            fetchAlbumData();
        }
    }
    const handleChange = (event) => {
        switch(event.target.name) {
            case "ratingInput":
                setRating(event.target.value);
                console.log(rating);
                break;
            case "moodInput":
                setMood(event.target.value);
                break;
            case "recInput":
                setRec(event.target.value);
                break;
            case "styleInput":
                setStyle(event.target.value);
                break;
            case "reviewInput":
                setReviewText(event.target.value);
                break;
        }
    }

    const handleSubmit = () => {
        let rate = (rating * 20).toString();
        let uid = localStorage.getItem("id");
        const payload = {type:uType, user_id:uid, id:reviewID, genre:"test", num_rating:rate, overall_thoughts:reviewText, style: uStyle, mood: uMood, would_recommend: rec}
        const url = 'https://lws3v1re05.execute-api.us-east-1.amazonaws.com/dev/api/v1/users/editSongReview'
        axios.put(url, payload)
        .then(response => console.log(response))
        .catch(error => console.error(error));
    }

    const saveReview = (response, uid) => {
        if(response < 1){
            setReviewID(uid);
        }
        else{
            let val = (Number(uid) + Number(response)).toString();
            console.log(val);
            setReviewID(val);
        }
        let rate = (rating * 20).toString();
        const payload = {type:uType, user_id:uid, id:reviewID, genre:"test", num_rating:rate, overall_thoughts:reviewText, style: uStyle, mood: uMood, would_recommend: rec}
        const url = 'https://lws3v1re05.execute-api.us-east-1.amazonaws.com/dev/api/v1/users/createReview'
        axios.post(url, payload)
        .then(response => console.log(response))
        .catch(error => console.error(error));
    }

    const val = ({uType} === "song") ? songVal : albumVal;

    return (
        <Box className="d-flex">
            <SideBar/>
            <Box className="main" sx={{flex:5}}>
                <NavBar/>
                <Container className="d-flex flex-column align-items-center mt-2">
                    <Container sx={{mb:"2em"}}>
                        <Typography
                            variant="h3"
                            color="#1DB954"
                            marginY="1rem"
                            marginLeft="3.3vw"
                            fontWeight="700"
                            textAlign="center"
                        >
                            Edit Review
                        </Typography>
                        
                    </Container>
                    {val}
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
                                    name="moodInput"
                                    value={uMood}
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
                            <Typography color="#C8C7C7" variant="h6">Would you recommend this song?</Typography>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="recInput"
                                onChange={handleChange}
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
                                <FormControlLabel value={true} control={<Radio />} label="Yes" />
                                <FormControlLabel value={false} control={<Radio />} label="No" />
                            </RadioGroup>
                        </Box>
                        <TextField
                            name="styleInput"
                            onChange={handleChange}
                            label={uStyle}
                            rows={6}
                            fullWidth={true}
                            variant="filled"
                            multiline
                            sx={{backgroundColor:"#ffffff", mb:"1rem", maxHeight:"3rem"}}
                        />
                        <Divider sx={{background:"white", mb:2, width:'100%'}}/>
                        <TextField
                            name="reviewInput"
                            onChange={handleChange}
                            label={reviewText}
                            rows={6}
                            fullWidth={true}
                            variant="filled"
                            multiline
                            sx={{backgroundColor:"#ffffff", mb:"1rem"}}
                        />
                        <Button
                            variant="contained"
                            onClick={handleSubmit}
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

export default UpdateReview;

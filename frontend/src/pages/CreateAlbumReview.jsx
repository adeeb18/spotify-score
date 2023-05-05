import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Box, Container, Typography, TextField, Button, RadioGroup, FormControlLabel, 
         Radio, Divider, Select, MenuItem, FormControl, Dialog, DialogTitle, DialogContentText, DialogContent, DialogActions} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SendIcon from "@mui/icons-material/Send";
import SideBar from "./components/SideBar/SideBar";
import AlbumCard from "./components/AlbumCard";
import StyledRating from "./components/StyledRating";
import NavBar from "./components/NavBar";
import axios from "axios";

const CreateAlbumReview = () => {
    const [searchParams] = useSearchParams();
    const [exist, setExist] = useState(false);
    const [done, setDone] = useState(false);

    let [rating, setRating] = useState(Number(0));
    let [uMood, setMood] = useState("Happy");
    let [rec, setRec] = useState("true");
    let [uStyle, setStyle] = useState("");
    let [reviewText, setReviewText] = useState("");
    let [reviewID, setReviewID] = useState("");
    let [albumData, setalbumData] = useState(null);

    /*VALIDATION STATES*/
    let [styleError, setStyleError] = useState(false);
    let [styleHelper, setStyleHelper] = useState("");
    let [textError, setTextError] = useState(false);
    let [textHelper, setTextHelper] = useState("");

    const fetchAlbumData = () => {
        fetch(`https://lws3v1re05.execute-api.us-east-1.amazonaws.com/dev/api/v1/spotify/album/${searchParams.get("id")}`)
            .then((response) => response.json())
            .then((data) => {
                setalbumData(data);
                setReviewID(searchParams.get("id"));
            })
            .catch((error) => {
                console.error(error);
            });
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
            case "styleInput":{
                if((event.target.value) == undefined || (event.target.value) == ""){
                    setStyleError(true);
                    setStyleHelper("Style is required");
                }
                else{
                    setStyle(event.target.value);
                    setStyleError(false);
                    setStyleHelper("");
                }
            }break;
            case "reviewInput":{
                if((event.target.value) == undefined || (event.target.value) == ""){
                    setTextError(true);
                    setTextHelper("Style is required");
                }
                else{
                    setReviewText(event.target.value);
                    setTextError(false);
                    setTextHelper("");
                }
            }break;
        }
    }

    const handleSubmit = () => {
        if(uStyle != "" && reviewText != "" && reviewID != null){
            const url = 'https://lws3v1re05.execute-api.us-east-1.amazonaws.com/dev/api/v1/users/getUserReviews'
            const id = localStorage.getItem("id");
            const payload = {user_id: id}
            axios.post(url, payload)
                .then(response => saveReview(response.data, id))
                .catch(error => console.error(error));
        }
        else{
            alert("Fill out missing fields");
        }
    }

    const saveReview = (data, uid) => {
        for(let i = 0; i < data.length; i++){
            if(data[i].id == reviewID){
                setExist(true);
            }
        }
        if(!exist){
            let rate = (rating * 20).toString();
            const payload = {type:"album", user_id:Number(uid), id:reviewID, genre:"notGiven", num_rating:rate, overall_thoughts:reviewText, style:uStyle, mood:uMood, would_recommend:rec}
            const url = 'https://lws3v1re05.execute-api.us-east-1.amazonaws.com/dev/api/v1/users/createReview'
            axios.post(url, payload)
            .then(response => console.log(response))
            .catch(error => console.error(error));
            setDone(true);
        }
    }

    useEffect(() => {
        fetchAlbumData();
    }, []);

    const handleExist = () => {
        setExist(false);
    }

    const handleDone = () => {
        setDone(false);
    }

    return (
        <Box className="d-flex">
            <SideBar/>
            <Box className="main" sx={{flex:5}}>
                <NavBar/>
                <Container className="d-flex flex-column align-items-center mt-2">
                    <Container sx={{mb:"2em"}}>
                        {albumData && <AlbumCard
                            id={albumData["id"]}
                            name={albumData["name"]}
                            artist={albumData["artists"][0]["name"]}
                            imageUrl={albumData["images"][0]["url"]}
                        />}
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
                            <Typography color="#C8C7C7" variant="h6">This album makes me feel...</Typography>
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
                            <Typography color="#C8C7C7" variant="h6">Would you recommend this album?</Typography>
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
                                <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                <FormControlLabel value="false" control={<Radio />} label="No" />
                            </RadioGroup>
                        </Box>
                        <TextField
                            error={styleError}
                            helperText={styleHelper}
                            name="styleInput"
                            onChange={handleChange}
                            label="What style do you think this album is?"
                            rows={6}
                            fullWidth={true}
                            variant="filled"
                            sx={{backgroundColor:"#ffffff", mb:"1rem"}}
                        />
                        <Divider sx={{background:"white", mb:2, width:'100%'}}/>
                        <TextField
                            error={textError}
                            helperText={textHelper}
                            name="reviewInput"
                            onChange={handleChange}
                            label="What did you think about this album?"
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
                    <Dialog
                        PaperProps={{
                            style:{
                                backgroundColor:"#555",
                            }
                        }}
                        open={exist}
                        onClose={handleExist}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title" sx={{color:"#C8C7C7"}}>
                        {"You already reviewed this album!"}
                        </DialogTitle>
                        <DialogActions>
                        <Button sx={{color:"#1a9f48"}}onClick={handleExist} href="/profile/reviews" autoFocus>
                            Edit Review
                        </Button>
                        <Button sx={{color:"#bf4b4b"}}onClick={handleExist} autoFocus>
                            Cancel
                        </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        PaperProps={{
                            style:{
                                backgroundColor:"#555",
                            }
                        }}
                        open={done}
                        onClose={handleDone}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title" sx={{color:"#C8C7C7"}}>
                        {"Your review has successfully been created!"}
                        </DialogTitle>
                        <DialogActions>
                        <Button sx={{color:"#1a9f48"}}onClick={handleExist} href="/profile/reviews" autoFocus>
                            View Review
                        </Button>
                        <Button sx={{color:"#1a9f48"}}onClick={handleExist} href="/" autoFocus>
                            New Review
                        </Button>
                        </DialogActions>
                    </Dialog>
                </Container>
            </Box>
        </Box>
    );
}

export default CreateAlbumReview;

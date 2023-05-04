import { Link, useSearchParams } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SongCard from "./components/SongCard";
import SideBar from "./components/SideBar/SideBar";
import NavBar from "./components/NavBar";
import { Box, Container, Typography, Button, Divider} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import StyledRating from "./components/StyledRating";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

function Review(props){
    const [temp, setTemp] = useState("");
    
    const getUsername = (id) => {
        const url = 'http://localhost:8000/getSingleUser'
        const payload = {user_id: id,}
        axios.post(url, payload)
            .then(response => {
                const toSend = JSON.stringify(response.data);
                const splitIt = toSend.split("\"");
                const val = splitIt[7];
                setTemp(val);
            })
            .catch(
                error => console.error(error));
        return temp;
    }

    return(
        <Box className="d-flex" sx={{width:"100%", color:"#C8C7C7",px:"4rem", py:"2rem", alignItems:"center", background:"#4e4f4f", borderRadius:2, my:3}}>
            <Box sx={{minWidth:"25%"}}>
                <Typography variant="h4">{getUsername(props.user)}</Typography>
                <Typography>Style: {props.style}</Typography>
                <Typography>Mood: {props.mood}</Typography>
                <Typography>{(props.rec == "Yes")? "Would Recommend" : "Would Not Recommend"}</Typography>
            </Box>
            <Box>
                <Box className="d-flex justify-content-between">
                    <StyledRating
                        defaultValue={5}
                        value={(Number(props.rating)/25)}
                        precision={0.5}
                        icon={<FavoriteIcon/>}
                        emptyIcon={<FavoriteBorderIcon/>}
                        readOnly
                    />
                    <Typography marginLeft="10vw" className="align-self-end">{props.created}</Typography>
                </Box>
                <Typography width="100%">{props.thoughts}</Typography>
            </Box>
        </Box>
    );
}

const ViewReviews = () => {
    const [searchParams] = useSearchParams();
    const [data, setData] = useState([]);
    let [songData, setSongData] = useState(null);
    let count = 0;

    const fetchSongData = () => {
        fetch(`http://localhost:8080/track/${searchParams.get("id")}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setSongData(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    useEffect(() => {
        fetchSongData();
        const url = 'http://localhost:8000/getAllReviews'
            axios.get(url)
                .then(response => parseData(response.data))
                .catch(error => console.error(error));
    }, []);

    const parseData = (inData) =>{
        let tryIt = [];
        for(let i = 0; i < inData.length; i++){
            if(inData[i].id === searchParams.get("id")){
                console.log(inData[i].id);
                tryIt.push(inData[i]);
           }
        }
        setData(tryIt);
    }
    console.log(data[0]);

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
                        {songData && <SongCard
                            id={songData["id"]}
                            song={songData["name"]}
                            artist={songData["artists"][0]["name"]}
                            imageUrl={songData["album"]["images"][0]["url"]}
                        />}
                        {songData && <Button
                            variant="contained"
                            component={Link}
                            to={{ pathname: "/song/create-review", search:"?id=" + songData["id"] }}
                            startIcon={<FavoriteIcon/>}
                            sx={{marginBottom:"8rem", color:"#191414"}}
                            style={{backgroundColor:"#1DB954"}}
                        >
                            <Typography variant="h6" textTransform="none">
                                Leave a Review
                            </Typography>
                        </Button>}
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

import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import { Box, Container, Button, Typography, Divider } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SongCard from "./components/SongCard";
import AlbumCard from "./components/AlbumCard";
import SideBar from "./components/SideBar/SideBar";
import ReviewCard from "./components/ReviewCard";
import NavBar from "./components/NavBar";

const Song = () => {
    const [searchParams] = useSearchParams();
    let [songData, setSongData] = useState(null);

    const fetchSongData = () => {
        fetch(`http://localhost:8080/track/${searchParams.get("id")}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(searchParams.get("id"));
                console.log(data);
                setSongData(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    useEffect(() => {
        fetchSongData();
    }, []);

    return (
        <Box className="d-flex">
            <SideBar/>
            <Box className="main" sx={{flex:5}}>
                <NavBar/>
                <Container className="mt-2">
                    <Container sx={{marginBottom:"1em"}}>
                        <Typography
                            variant="h3"
                            color="#1DB954"
                            marginBottom="2rem"
                            fontWeight="700"
                            textAlign="center"
                        >
                            Song Score
                        </Typography>
                        {songData && <SongCard
                            id={songData["id"]}
                            song={songData["name"]}
                            artist={songData["artists"][0]["name"]}
                            imageUrl={songData["album"]["images"][0]["url"]}
                        />}
                    </Container>

                    <Box className="d-flex flex-column align-items-center" sx={{marginBottom:"1em"}}>
                        <Box className="d-flex justify-content-center" sx={{width:"80%", mb:"4rem", gap:"2rem"}}>
                            {songData && <Button
                                variant="contained"
                                component={Link}
                                to={{ pathname: "/song/create-review", search:"?id=" + songData["id"] }}
                                startIcon={<FavoriteIcon/>}
                                sx={{color:"#191414"}}
                                style={{backgroundColor:"#1DB954"}}
                            >
                                <Typography variant="h6" textTransform="none">
                                    Leave a Review
                                </Typography>
                            </Button>}
                            {songData && <Button
                                variant="contained"
                                component={Link}
                                to={{pathname: "/song/reviews", search:"?id=" + songData["id"]}}
                                startIcon={<VisibilityIcon/>}
                                sx={{color:"#191414"}}
                                style={{backgroundColor:"#1DB954"}}
                            >
                                <Typography variant="h6" textTransform="none">
                                    View All Reviews
                                </Typography>
                            </Button>}
                        </Box>
                        <Divider sx={{background:"white", mb:"1rem", width:'100%'}}/>
                        <Container sx={{mb:"4rem"}}>
                            <Typography
                                variant="h3"
                                color="#1DB954"
                                marginBottom="2rem"
                                fontWeight="700"
                                textAlign="center"
                            >
                                Album
                            </Typography>
                            {songData && <AlbumCard
                                id={songData["album"]["id"]}
                                name={songData["album"]["name"]}
                                artist={songData["album"]["artists"][0]["name"]}
                                renderImage={false}
                            />}
                        </Container>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
}

export default Song;

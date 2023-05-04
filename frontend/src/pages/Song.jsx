import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import { Box, Container, Button, Typography } from "@mui/material";
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
        fetch(`http://127.0.0.1:8000/track/${searchParams.get("id")}`)
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

                    <Container sx={{mb:"8rem"}}>
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

                    <Container sx={{mb:"1rem"}}>
                        <Typography
                            variant="h3"
                            color="#1DB954"
                            marginBottom="1rem"
                            fontWeight="700"
                            textAlign="center"
                        >
                            Featured Reviews
                        </Typography>
                        <Carousel
                            indicatorContainerProps={{style:{marginTop:"1.5rem"}}}
                            navButtonsProps={{style:{marginLeft:"3rem", marginRight:"3rem"}}}
                            sx={{mb:"1rem"}}
                        >
                            <ReviewCard/>
                            <ReviewCard/>
                            <ReviewCard/>
                            <ReviewCard/>
                            <ReviewCard/>
                        </Carousel>
                    </Container>

                    {songData && <Button
                        variant="contained"
                        component={Link}
                        to={{pathname: "/song/reviews", search:"?id=" + songData["id"]}}
                        startIcon={<VisibilityIcon/>}
                        sx={{marginBottom:"8rem", color:"#191414"}}
                        style={{backgroundColor:"#1DB954"}}
                    >
                        <Typography variant="h6" textTransform="none">
                            View All Reviews
                        </Typography>
                    </Button>}

                </Container>
            </Box>
        </Box>
    );
}

export default Song;

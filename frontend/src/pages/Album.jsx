import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SideBar from "./components/SideBar/SideBar";
import AlbumCard from "./components/AlbumCard";
import SongCard from "./components/SongCard";
import ReviewCard from "./components/ReviewCard";
import NavBar from "./components/NavBar";

const Album = () => {
    const [searchParams] = useSearchParams();
    let [albumData, setAlbumData] = useState(null);

    const fetchAlbumData = () => {
        fetch(`http://localhost:8080/album/${searchParams.get("id")}`)
            .then((response) => response.json())
            .then((data) => {
                setAlbumData(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const renderSongCards = () => {
        let songCards = [];

        for (let i = 0; i < albumData["tracks"]["items"].length; ++i) {
            let song = albumData["tracks"]["items"][i];
            console.log(song);
            songCards.push(
                <SongCard
                    id={song["id"]}
                    song={song["name"]}
                    artist={song["artists"][0]["name"]}
                    renderImage={false}
                />
            );
        }

        return songCards;
    }

    useEffect(() => {
        fetchAlbumData();
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
                            Album Score
                        </Typography>
                        {albumData && <AlbumCard
                            id={albumData["id"]}
                            name={albumData["name"]}
                            artist={albumData["artists"][0]["name"]}
                            imageUrl={albumData["images"][0]["url"]}
                        />}
                    </Container>
                    <Button
                        variant="contained"
                        component={Link}
                        to="/spotify-score/song/create-review"
                        startIcon={<FavoriteIcon/>}
                        sx={{marginBottom:"8rem", color:"#191414"}}
                        style={{backgroundColor:"#1DB954"}}
                    >
                        <Typography variant="h6" textTransform="none">
                            Leave a Review
                        </Typography>
                    </Button>

                    <Container sx={{mb:"8rem"}}>
                        <Typography
                            variant="h3"
                            color="#1DB954"
                            marginBottom="2rem"
                            fontWeight="700"
                            textAlign="center"
                        >
                            Songs
                        </Typography>
                        {albumData && renderSongCards()}
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

                    <Button
                        variant="contained"
                        component={Link}
                        to="/spotify-score/song/reviews"
                        startIcon={<VisibilityIcon/>}
                        sx={{marginBottom:"8rem", color:"#191414"}}
                        style={{backgroundColor:"#1DB954"}}
                    >
                        <Typography variant="h6" textTransform="none">
                            View All Reviews
                        </Typography>
                    </Button>
                </Container>
            </Box>
        </Box>
    );
}

export default Album;

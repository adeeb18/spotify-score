import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Divider, Container, Typography, Box, Button } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SideBar from "./components/SideBar/SideBar";
import AlbumCard from "./components/AlbumCard";
import SongCard from "./components/SongCard";
import NavBar from "./components/NavBar";

const Album = () => {
    const [searchParams] = useSearchParams();
    let [albumData, setAlbumData] = useState(null);

    const fetchAlbumData = () => {
        fetch(`http://localhost:8080/album/${searchParams.get("id")}`)
            .then((response) => response.json())
            .then((data) => {
                setAlbumData(data);
                console.log(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const renderSongCards = () => {
        let songCards = [];

        for (let i = 0; i < albumData["tracks"]["items"].length; ++i) {
            let song = albumData["tracks"]["items"][i];
            songCards.push(
                <SongCard
                    key={i}
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
                    <Box className="d-flex flex-column align-items-center" sx={{marginBottom:"1em"}}>
                        <Box className="d-flex justify-content-center" sx={{width:"80%", mb:"4rem", gap:"2rem"}}>
                            {albumData && <Button
                                variant="contained"
                                component={Link}
                                to={{ pathname: "/album/create-review", search:"?id=" + albumData["id"] }}
                                startIcon={<FavoriteIcon/>}
                                sx={{color:"#191414"}}
                                style={{backgroundColor:"#1DB954"}}
                            >
                                <Typography variant="h6" textTransform="none">
                                    Leave a Review
                                </Typography>
                            </Button>}
                            {albumData && <Button
                                variant="contained"
                                component={Link}
                                to={{pathname: "/album/reviews", search:"?id=" + albumData["id"]}}
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
                    </Box>
                    

                    

                    
                </Container>
            </Box>
        </Box>
    );
}

export default Album;

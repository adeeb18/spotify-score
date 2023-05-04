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
import ArtistCard from "./components/ArtistCard";
import NavBar from "./components/NavBar";

const Artist = () => {
    const [searchParams] = useSearchParams();
    let [artistData, setArtistData] = useState(null);
    let [artistAlbumsData, setArtistAlbumsData] = useState(null);

    const fetchArtistData = () => {
        fetch(`https://lws3v1re05.execute-api.us-east-1.amazonaws.com/dev/api/v1/spotify/artist/${searchParams.get("id")}`)
            .then((response) => response.json())
            .then((data) => {
                setArtistData(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const fetchArtistAlbumsData = () => {
        fetch(`https://lws3v1re05.execute-api.us-east-1.amazonaws.com/dev/api/v1/spotify/artists/${searchParams.get("id")}/albums`)
            .then((response) => response.json())
            .then((data) => {
                setArtistAlbumsData(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const renderAlbumCards = () => {
        let albumCards = [];

        for (let i = 0; i < artistAlbumsData["items"].length; ++i) {
            let album = artistAlbumsData["items"][i];
            albumCards.push(
                <AlbumCard
                    id={album["id"]}
                    song={album["name"]}
                    artist={album["artists"][0]["name"]}
                    imageUrl={album["images"][0]["url"]}
                />
            );
        }

        return albumCards;
    }

    useEffect(() => {
        fetchArtistData();
        fetchArtistAlbumsData();
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
                            Artist
                        </Typography>
                        {artistData && <ArtistCard
                            id={artistData["id"]}
                            name={artistData["name"]}
                            imageUrl={artistData["images"][0]["url"]} 
                        />}
                    </Container>
                    <Container sx={{mb:"8rem"}}>
                        <Typography
                            variant="h3"
                            color="#1DB954"
                            marginBottom="2rem"
                            fontWeight="700"
                            textAlign="center"
                        >
                            Albums
                        </Typography>
                        {artistAlbumsData && renderAlbumCards()}
                    </Container>
                </Container>
            </Box>
        </Box>
    );
}

export default Artist;

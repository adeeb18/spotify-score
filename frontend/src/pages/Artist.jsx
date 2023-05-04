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
    let [topTracks, setTopTracks] = useState(null);


    const fetchArtistData = () => {
        fetch(`http://localhost:8080/artist/${searchParams.get("id")}`)
            .then((response) => response.json())
            .then((data) => {
                setArtistData(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const fetchArtistAlbumsData = () => {
        fetch(`http://localhost:8080/artists/${searchParams.get("id")}/albums`)
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
        let last = "";

        for (let i = 0; i < artistAlbumsData["items"].length; ++i) {
            let album = artistAlbumsData["items"][i];
            if (last != album["name"]) {
                albumCards.push(
                    <AlbumCard
                        key={i}
                        id={album["id"]}
                        name={album["name"]}
                        artist={album["artists"][0]["name"]}
                        imageUrl={album["images"][0]["url"]}
                    />
                );
            }

            last = album["name"];
        }

        return albumCards;
    }
    const renderTopTrackCards = () => {
        let trackCards = [];
        let last = "";

        for (let i = 0; i < Math.min(topTracks["tracks"].length, 5); ++i) {
            let track = topTracks["tracks"][i];
            if (last != track["name"]) {
                trackCards.push(
                    <SongCard
                        key={i}
                        id={track["id"]}
                        song={track["name"]}
                        artist={track["artists"][0]["name"]}
                        imageUrl={track["album"]["images"][0]["url"]}
                    />
                );
            }

            last = track["name"];
        }

        return trackCards;
    }
    const fetchTopTracks = () => {
        fetch(`http://localhost:8080/artists/${searchParams.get("id")}/toptracks`)
            .then((response) => response.json())
            .then((data) => {
                setTopTracks(data);
                console.log(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    useEffect(() => {
        fetchArtistData();
        fetchArtistAlbumsData();
        fetchTopTracks();
    }, []);


    return (
        <Box className="d-flex">
            <SideBar />
            <Box className="main" sx={{ flex: 5 }}>
                <NavBar />
                <Container className="mt-2">
                    <Container sx={{ marginBottom: "1em" }}>
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
                    <Container sx={{ mb: "8rem" }}>
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
                    <Container sx={{ mb: "8rem" }}>
                        <Typography
                            variant="h3"
                            color="#1DB954"
                            marginBottom="2rem"
                            fontWeight="700"
                            textAlign="center"
                        >
                            Top Tracks
                        </Typography>
                        {topTracks && renderTopTrackCards()}
                    </Container>
                </Container>
            </Box>
        </Box>
    );
}

export default Artist;

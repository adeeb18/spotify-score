import './Home/Home.css';
import { useState } from "react";
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';

import Carousel from "react-material-ui-carousel";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import SideBar from "./components/SideBar/SideBar";
import FootNote from "./components/FootNote"
import SongCard from "./components/SongCard";
import ArtistCard from "./components/ArtistCard";
import AlbumCard from "./components/AlbumCard";
import { height } from "@mui/system";
import NavBar from './components/NavBar';
import axios from 'axios';


const Home = () => {
    let [searchInput, setSearchInput] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const handleChange = (event) => {
        setSearchInput(event.target.value);
    }

    let [data, setData] = useState([]);

    const handleSearch = (event) => {
        event.preventDefault(); // prevent the default form submission
        // send the search input to the API endpoint
        fetch(`https://lws3v1re05.execute-api.us-east-1.amazonaws.com/dev/api/v1/spotify/search/${searchInput}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data); // do something with the response data
                setSearchResults(data['responses'])
            })
            .catch((error) => {
                console.error(error); // handle errors
            });
    }

    const renderCards = () => {
        let cards = [];

        for(let i = 0; i < searchResults.length; ++i) {
            console.log(searchResults[i]);
            if (searchResults[i].type == "artist") {
                cards.push(
                    <ArtistCard
                        id={searchResults[i].id}
                        name={searchResults[i].name}
                        imageUrl={searchResults[i].image_url}
                    />
                );
            }
            else if (searchResults[i].type == "track") {
                cards.push(
                    <SongCard
                        id={searchResults[i].id}
                        song={searchResults[i].name}
                        artist={searchResults[i].artists[0]}
                        imageUrl={searchResults[i].image_url}
                    />
                );
            }
            else if(searchResults[i].type == "album") {
                cards.push(
                    <AlbumCard
                        id={searchResults[i].id}
                        name={searchResults[i].name}
                        artist={searchResults[i].artist}
                        imageUrl={searchResults[i].image_url}
                    />
                );
            }
        }

        return cards;
    }

    return (
        <Box className="main d-flex">
                <SideBar/>
                <Box sx={{flex:5}}>
                    <NavBar/>
                    <Container>
                        <Typography
                            variant="h3"
                            color="#1DB954"
                            marginBottom="1rem"
                            fontWeight="700"
                            marginTop="1rem"
                            textAlign="center"
                        >
                            Search
                        </Typography>
                        <Typography
                            variant="h6"
                            color="#ffffff"
                            marginBottom="2rem"
                            textAlign="center"
                        >
                            Enter a song, album, or artist below to share your thoughts about
                            your favorite music!
                        </Typography>
                        <Paper component="form" onSubmit={handleSearch} 
                            sx={{ p: "0px 4px", display:"flex", alignItems:"center", borderRadius:3}}
                        >
                            <InputBase
                                className="searchBox"
                                placeholder="What kind of music do you like?"
                                onChange={handleChange}
                                sx={{ paddingLeft: "1rem", width: "40rem", height: "4rem" }}
                            />
                            <IconButton type="submit">
                                <SearchIcon/>
                            </IconButton>
                        </Paper>
                    </Container>
                    {searchResults.length > 0 && (
                        <Container
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                position: "relative",
                                height: "30rem",
                                overflowY: "scroll",
                            }}
                        >
                            {renderCards()}
                        </Container>
                    )}
                    <Container
                        sx={{
                            paddingTop:'4rem'
                        }}
                    >
                        <Typography
                            variant="h3"
                            color="#1DB954"
                            textAlign="center"
                            fontWeight="700"
                            mb="1rem"
                        >
                            Featured
                        </Typography>
                        <Typography
                            variant="h6"
                            color="#ffffff"
                            textAlign="center"
                            mb="1rem"
                        >
                            Check Out Some Recent Fan-Favorites
                        </Typography>
                        <Carousel
                            indicatorContainerProps={{ style: { marginTop: "1.5rem" } }}
                            navButtonsProps={{
                                style: { marginLeft: "3rem", marginRight: "3rem" },
                            }}
                        >
                            <SongCard />
                            <SongCard />
                            <SongCard />
                            <SongCard />
                            <SongCard />
                        </Carousel>
                    </Container>
                    <FootNote/>
                </Box>
            </Box>
    );
};

export default Home;

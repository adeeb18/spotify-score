import './Home.css';
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
import NavBar from "../components/NavBar/NavBar";
import FootNote from "../components/FootNote"
import SongCard from "../components/SongCard";
import ArtistCard from "../components/ArtistCard";
import { height } from "@mui/system";


const Home = () => {
    let [searchInput, setSearchInput] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const handleChange = (event) => {
        setSearchInput(event.target.value);
    };

    const handleSearch = (event) => {
        event.preventDefault(); // prevent the default form submission
        // send the search input to the API endpoint
        fetch(`http://127.0.0.1:8000/artistid/${searchInput}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data); // do something with the response data
                setSearchResults(data['artists'])
            })
            .catch((error) => {
                console.error(error); // handle errors
            });
    };

    return (
        <Box className="main"sx={{ display: "flex" }}>
                <NavBar/>
                <Box sx={{flex:5}}>
                    <Container
                    >
                        <Typography
                            variant="h3"
                            color="#1DB954"
                            marginBottom="1rem"
                            fontWeight="700"
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
                        <Paper component="form" onSubmit={handleSearch} sx={{ p: "0px 4px" }}>
                            <InputBase
                                placeholder="What kind of music do you like?"
                                onChange={handleChange}
                                sx={{ paddingLeft: "1rem", width: "30rem", height: "4rem" }}
                            />
                            <IconButton type="submit">
                                <SearchIcon />
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
                            {searchResults.map((result) => (
                                <ArtistCard
                                    artist={result.name}
                                    imageUrl={result.image_url}
                                    song = ''
                                />
                            ))}
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

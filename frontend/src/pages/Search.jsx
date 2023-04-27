import { useState } from "react";
import { Form, useSearchParams } from "react-router-dom";
import { Box, Container, Typography, Button, ButtonGroup, Paper, InputBase, IconButton} from "@mui/material";
import SideBar from "./components/SideBar/SideBar";
import NavBar from "./components/NavBar/NavBar";
import SongCard from "./components/SongCard";
import AlbumCard from "./components/AlbumCard";
import SearchIcon from "@mui/icons-material/Search";
import ArtistCard from "./components/ArtistCard";

const Search = () => {
    const [searchParams] = useSearchParams();
    let [type, setType] = useState("songs");

    const handleClick = (type) => {
        setType(type);
    }

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
        <Box className="d-flex">
            <SideBar/>
            <Box className="main" sx={{flex:5}}>
                <NavBar/>
                <Container className="mt-2">
                    <Box className="my-3">
                        <Paper component="form" onSubmit={handleSearch} 
                            sx={{ p: "0px 4px", display:"flex", alignItems:"center", borderRadius:3, marginX:"4rem"}}
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
                    </Box>
                    <Typography variant="h4" color="#1DB954" mb="1rem" mx="4rem">
                        Search Results for "{searchParams.get("q")}"
                    </Typography>
                    <ButtonGroup variant="text" sx={{marginBottom:"1rem", marginX:"4rem"}}>
                        <Button
                            name="songsButton"
                            variant={type==="songs" ? "contained" : "text"}
                            onClick={() => handleClick("songs")}
                            sx={{width:"15ch"}}
                        >
                            Songs
                        </Button>
                        <Button
                            name="albumsButton"
                            variant={type==="albums" ? "contained" : "text"}
                            onClick={() => handleClick("albums")}
                            sx={{width:"15ch"}}
                        >
                            Albums
                        </Button>
                    </ButtonGroup>
                    {type == "songs" && 
                        <Container>
                            <SongCard/>
                            <SongCard/>
                            <SongCard/>
                            <SongCard/>
                            <SongCard/>
                            <SongCard/>
                            <SongCard/>
                            <SongCard/>
                            <SongCard/>
                            <SongCard/>
                        </Container>
                    }
                    {type == "albums" && 
                        <Container>
                            <AlbumCard/>
                            <AlbumCard/>
                            <AlbumCard/>
                            <AlbumCard/>
                            <AlbumCard/>
                            <AlbumCard/>
                            <AlbumCard/>
                            <AlbumCard/>
                            <AlbumCard/>
                            <AlbumCard/>
                        </Container>
                    }
                </Container>
            </Box>
            
        </Box>
    );
}

export default Search;

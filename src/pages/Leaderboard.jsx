import { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import NavBar from "./components/NavBar";
import SongCard from "./components/SongCard";
import AlbumCard from "./components/AlbumCard";

const Leaderboard = () => {
    let [type, setType] = useState("songs");
    let [sort, setSort] = useState("Top-Rated");

    const handleClick = (type) => {
        setType(type);
    }

    const handleChange = (event) => {
        setSort(event.target.value);
    }

    return (
        <Container>
            <NavBar/>
            <Container sx={{
                position:"absolute",
                left:"50%",
                transform:"translate(-50%,8rem)",
                display:"flex",
                flexDirection:"column",
                alignItems:"center",
                justifyContent:"center"
            }}>
                <Typography
                    variant="h3"
                    color="#1DB954"
                    marginBottom="3rem"
                    fontWeight="700"
                    textAlign="center"
                >
                    Leaderboard
                </Typography>
                <ButtonGroup variant="text" sx={{marginBottom:"1rem"}}>
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
                <Box sx={{minWidth:"10ch", marginBottom:"3rem"}}>
                    <FormControl fullWidth>
                        <Select
                            value={sort}
                            onChange={handleChange}
                            sx={{backgroundColor:"#ffffff", height:"2rem"}}
                        >
                            <MenuItem value="Top-Rated">Top-Rated</MenuItem>
                            <MenuItem value="Hottest">Hottest</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Typography
                    variant="h6"
                    color="#ffffff"
                    marginBottom="1rem"
                    textAlign="center"
                >
                    The {sort} {type==="songs" ? "Songs" : "Albums"}
                </Typography>
                {
                    type === "songs" &&
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
                {
                    type === "albums" &&
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
        </Container>
    );
}

export default Leaderboard;

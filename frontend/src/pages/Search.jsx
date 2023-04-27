import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import SideBar from "./components/SideBar/SideBar";
import SongCard from "./components/SongCard";
import AlbumCard from "./components/AlbumCard";

const Search = () => {
    const [searchParams] = useSearchParams();
    let [type, setType] = useState("songs");

    const handleClick = (type) => {
        setType(type);
    }

    return (
        <Container>
            <SideBar/>
            <Container style={{
                position:"absolute",
                left:"50%",
                transform:"translate(-50%,8rem)",
                display:"flex",
                flexDirection:"column",
                alignItems:"center",
                justifyContent:"center"
            }}>
                <Typography variant="h4" color="#1DB954" mb="1rem">
                    Search Results for "{searchParams.get("q")}"
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
        </Container>
    );
}

export default Search;

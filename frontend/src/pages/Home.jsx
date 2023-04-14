import { useState } from "react";
import { Link } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase"
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import NavBar from "./components/NavBar";
import SongCard from "./components/SongCard";

const Home = () => {
    let [searchInput, setSearchInput] = useState("");

    const handleChange = (event) => {
        setSearchInput(event.target.value);
    }

    return (
        <Container>
            <NavBar/>
            <Container sx={{
                position:"absolute",
                top:"50%",
                left:"50%",
                transform:"translate(-50%,-50%)",
            }}>
                <Container sx={{
                    display:"flex",
                    flexDirection:"column",
                    alignItems:"center",
                    marginBottom:"8rem"
                }}>
                    <Typography variant="h3" color="#1DB954" marginBottom="1rem" fontWeight="700">
                        Search
                    </Typography>
                    <Typography variant="h6" color="#ffffff" marginBottom="2rem" textAlign="center">
                        Enter a song, album, or artist below to share your thoughts about your favorite music!
                    </Typography>
                    <Paper component="form" sx={{p:"0px 4px"}}>
                        <InputBase placeholder="What kind of music do you like?" onChange={handleChange} sx={{paddingLeft:"1rem", width:"30rem", height:"4rem"}}/>
                        <IconButton
                            component={Link}
                            to={{
                                pathname:"/search",
                                search:"?q=" + searchInput
                            }}
                        >
                            <SearchIcon/>
                        </IconButton>
                    </Paper>
                </Container>
                <Container>
                    <Typography variant="h3" color="#1DB954" textAlign="center" fontWeight="700" mb="1rem">
                        Featured
                    </Typography>
                    <Typography variant="h6" color="#ffffff" textAlign="center" mb="1rem">
                        Check Out Some Recent Fan-Favorites
                    </Typography>
                    <Carousel
                        indicatorContainerProps={{style:{marginTop:"1.5rem"}}}
                        navButtonsProps={{style:{marginLeft:"3rem", marginRight:"3rem"}}}
                    >
                        <SongCard/>
                        <SongCard/>
                        <SongCard/>
                        <SongCard/>
                        <SongCard/>
                    </Carousel>
                </Container>
            </Container>
        </Container>
    );
}

export default Home;

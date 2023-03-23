import { Link } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SongCard from "./components/SongCard";
import AlbumCard from "./components/AlbumCard";
import NavBar from "./components/NavBar";
import ReviewCard from "./components/ReviewCard";

const Song = () => {
    return (
        <Container>
            <NavBar/>
            <Container style={{
                position:"absolute",
                left:"50%",
                transform:"translate(-50%,8rem)",
                display:"flex",
                flexDirection:"column",
                alignItems:"center",
                justifyContent:"center"
            }}>
                <Container sx={{marginBottom:"1em"}}>
                    <Typography
                        variant="h3"
                        color="#1DB954"
                        marginBottom="2rem"
                        fontWeight="700"
                        textAlign="center"
                    >
                        Song Score
                    </Typography>
                    <SongCard/>
                </Container>

                <Button
                    variant="contained"
                    component={Link}
                    to="/song/create-review"
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
                        Album
                    </Typography>
                    <AlbumCard renderImage={false}/>
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
                    to="/song/reviews"
                    startIcon={<VisibilityIcon/>}
                    sx={{marginBottom:"8rem", color:"#191414"}}
                    style={{backgroundColor:"#1DB954"}}
                >
                    <Typography variant="h6" textTransform="none">
                        View All Reviews
                    </Typography>
                </Button>

            </Container>
        </Container>
    );
}

export default Song;

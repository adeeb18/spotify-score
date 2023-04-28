import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SongCard from "./components/SongCard";
import ReviewCard from "./components/ReviewCard";
import SideBar from "./components/SideBar/SideBar";
import NavBar from "./components/NavBar";
import { Box, Container, Typography, Button} from "@mui/material";

const ViewReviews = () => {
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
                            All Reviews
                        </Typography>
                        <SongCard/>
                    </Container>
                    
                    <Button
                        variant="contained"
                        component={Link}
                        to="/song/create-review"
                        startIcon={<FavoriteIcon/>}
                        sx={{marginBottom:"3em", color:"#191414", marginLeft:"4rem"}}
                        style={{backgroundColor:"#1DB954"}}
                    >
                        <Typography variant="h6" textTransform="none">
                            Leave a Review
                        </Typography>
                    </Button>
                    <ReviewCard/>
                    <ReviewCard/>
                    <ReviewCard/>
                    <ReviewCard/>
                    <ReviewCard/>
                    <ReviewCard/>
                    <ReviewCard/>
                    <ReviewCard/>
                    <ReviewCard/>
                    <ReviewCard/>
                </Container>
            </Box>
        </Box>
    );
}

export default ViewReviews;

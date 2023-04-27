import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SongCard from "./components/SongCard";
import ReviewCard from "./components/ReviewCard";
import SideBar from "./components/SideBar/SideBar";

const ViewReviews = () => {
    return (
        <Container>
            <SideBar/>
            <Container sx={{
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
                        All Reviews
                    </Typography>
                    <SongCard/>
                </Container>
                
                <Button
                    variant="contained"
                    component={Link}
                    to="/song/create-review"
                    startIcon={<FavoriteIcon/>}
                    sx={{marginBottom:"3em", color:"#191414"}}
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
        </Container>
    );
}

export default ViewReviews;

import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StyledRating from "./StyledRating";

const ArtistCard = ({ artist = 'This is the Song Name', song = 'This is the Artist Name', imageUrl = '/logo192.png', renderImage = true }) => {
    return (
        <Container>
            <Card sx={{ m: "1rem 1rem", background: "#2c2c2c" }}>
                <CardActionArea component={Link} to={{ pathname: "/song" }} sx={{ p: "1rem 2rem", display: "flex" }}>
                    {renderImage && <CardContent>
                        <CardMedia height="100" component="img" image={imageUrl} sx={{ objectFit: "contain" }} />
                    </CardContent>}
                    <CardContent>
                        <Typography variant="h5" color="#ffffff">
                            {artist}
                        </Typography>
                        <Typography variant="body2" color="#bbbbbb">
                            {song}
                        </Typography>
                    </CardContent>
                    <CardContent sx={{ textAlign: "center" }}>
                        <StyledRating
                            defaultValue={5}
                            value={2.5}
                            precision={0.5}
                            icon={<FavoriteIcon />}
                            emptyIcon={<FavoriteBorderIcon />}
                            readOnly
                        />
                        <Typography variant="body1" color="#ffffff">
                            (1000)
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Container>
    );
}

export default ArtistCard;

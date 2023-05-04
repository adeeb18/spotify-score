import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";

const ArtistCard = ({ id = "", name = 'This is the Artist Name', imageUrl = '/logo192.png', renderImage = true }) => {
    return (
        <Container>
            <Card sx={{ m: "1rem 1rem", background: "#2c2c2c" }}>
                <CardActionArea component={Link} to={{ pathname: "/artist", search: "?id=" + id }} sx={{ p: "1rem 2rem", display: "flex", flexDirection:"row", justifyContent:"flex-start" }}>
                    {renderImage && <CardContent>
                        <CardMedia height="100px" component="img" image={imageUrl} sx={{ objectFit: "contain" }} />
                    </CardContent>}
                    <CardContent>
                        <Typography variant="body1" color="#1DB954">
                            Artist
                        </Typography>
                        <Typography variant="h5" color="#ffffff">
                            {name}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Container>
    );
}

export default ArtistCard;

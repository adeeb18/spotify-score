import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StyledRating from "./StyledRating";

const AlbumCard = ({renderImage = true}) => {
    return (
        <Container>
            <Card sx={{m:"1rem 1rem", background:"#2c2c2c"}}>
                <CardActionArea component={Link} to={{pathname:"/album"}} sx={{p:"1rem 2rem", display:"flex"}}>
                    {renderImage && <CardContent>
                        <CardMedia height="100" component="img" image="/logo192.png" sx={{objectFit:"contain"}}/>
                    </CardContent>}
                    <CardContent>
                        <Typography variant="h5" color="#ffffff">
                            This is the Album Name
                        </Typography>
                        <Typography variant="body2" color="#bbbbbb">
                            This is the Artist
                        </Typography>
                    </CardContent>
                    <CardContent sx={{textAlign:"center"}}>
                        <Typography variant="body1" color="#1DB954" fontWeight="700" sx={{mb:"0.25rem"}}>
                            User Score
                        </Typography>
                        <StyledRating
                            defaultValue={5}
                            value={2.5}
                            precision={0.5}
                            icon={<FavoriteIcon/>}
                            emptyIcon={<FavoriteBorderIcon/>}
                            readOnly
                        />
                        <Typography variant="body1" color="#ffffff">
                            (1000)
                        </Typography>
                    </CardContent>
                    <CardContent sx={{textAlign:"center"}}>
                        <Typography variant="body1" color="#1DB954" fontWeight="700" sx={{mb:"0.25rem"}}>
                            Song Score
                        </Typography>
                        <StyledRating
                            defaultValue={5}
                            value={2.5}
                            precision={0.5}
                            icon={<FavoriteIcon/>}
                            emptyIcon={<FavoriteBorderIcon/>}
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

export default AlbumCard;

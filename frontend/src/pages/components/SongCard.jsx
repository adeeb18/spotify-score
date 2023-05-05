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
import { useState, useEffect } from "react";
import axios from "axios";


const SongCard = (props, {renderImage = true}) => {
    let [sRating, setRating] = useState(0);
    useEffect(() => {
        const url = 'https://lws3v1re05.execute-api.us-east-1.amazonaws.com/dev/api/v1/users/getAverageScore'
        const payload = {id: props.id}
            axios.post(url, payload)
                .then(response => parseData(response))
                .catch(error => console.error(error));
    }, []);
    const parseData = (response) =>{
        if(response.status == 200){
            setRating(Number(Number(response.data)/20));
        }
    }
    return (
        <Container>
            <Card sx={{ m: "1rem 1rem", background: "#2c2c2c" }}>
                <CardActionArea component={Link} to={{ pathname: "/song", search:"?id=" + props.id }} sx={{ p: "1rem 2rem", display: "flex", flexDirection: "row", justifyContent: "flex-start" }}>
                    {renderImage && <CardContent sx={{ width: "100" }}>
                        <CardMedia height="100" component="img" image={props.imageUrl} sx={{ objectFit: "contain" }} />
                    </CardContent>}
                    <CardContent sx={{width:"50%"}}>
                        <Typography variant="body1" color="#1DB954">
                            Song
                        </Typography>
                        <Typography variant="h5" color="#ffffff">
                            {props.song}
                        </Typography>
                        <Typography variant="body1" color="#bbbbbb">
                            {props.artist}
                        </Typography>
                    </CardContent>
                    <CardContent sx={{ textAlign: "center" }}>
                        <StyledRating
                            defaultValue={5}
                            value={sRating}
                            precision={0.5}
                            icon={<FavoriteIcon />}
                            emptyIcon={<FavoriteBorderIcon />}
                            readOnly
                        />
                        <Typography variant="body1" color="#ffffff">
                            {"(" + (sRating*20).toString() + ")"}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Container>
    );
}

export default SongCard;

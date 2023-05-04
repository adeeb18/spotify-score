import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StyledRating from "./StyledRating";

const ReviewCard = () => {
    return (
        <Container>
            <Card sx={{m:"1rem 1rem", background:"#2c2c2c"}}>
                <CardActionArea component={Link} to={{pathname:"/spotify-score/song"}} sx={{p:"1rem 2rem", display:"flex"}}>
                    <CardContent sx={{textAlign:"center"}}>
                        <StyledRating
                            defaultValue={5}
                            value={2.5}
                            precision={0.5}
                            icon={<FavoriteIcon/>}
                            emptyIcon={<FavoriteBorderIcon/>}
                            sx={{mb:"0.5rem"}}
                            readOnly
                        />
                        <Typography variant="h6" color="#ffffff" mb="0.5rem">
                            Reviewer Name
                        </Typography>
                        <Typography variant="body2" color="#bbbbbb">
                            mm/dd/yyyy
                        </Typography>
                    </CardContent>
                    <CardContent>
                        <Typography variant="body1" color="#ffffff">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pharetra vel turpis nunc eget lorem. Amet porttitor eget dolor morbi. Eu consequat ac felis donec et. Malesuada bibendum arcu vitae elementum curabitur vitae nunc. Faucibus nisl tincidunt eget nullam non. In eu mi bibendum neque egestas congue quisque egestas. Hendrerit gravida rutrum quisque non tellus orci. Nunc sed id semper risus in hendrerit gravida. Sollicitudin ac orci phasellus egestas tellus. Urna duis convallis convallis tellus id interdum velit laoreet.
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Container>
    );
}

export default ReviewCard;

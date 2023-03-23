import styled from "@mui/material/styles/styled";
import Rating from "@mui/material/Rating";

const StyledRating = styled(Rating)({
    "& .MuiRating-iconEmpty": {
        color:"#bbbbbb"
    },
    "& .MuiRating-iconFilled": {
        color:"#1DB954"
    },
    "& .MuiRating-iconHover": {
        color:"#1ed760"
    }
});

export default StyledRating;
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const NavBar = () => {
    return (
        <AppBar sx={{bgcolor:"#2c2c2c"}}>
            <Container maxWidth={false}>
                <Toolbar>
                    <Typography
                        component={Link}
                        to="/"
                        variant="h5"
                        color="#1DB954"
                        sx={{
                            fontWeight:700,
                            textDecoration:"none"
                        }}
                    >
                        Spotify Score
                    </Typography>
                    <Button component={Link} to="/" sx={{color:"#ffffff", marginLeft:"3rem"}}>
                        <Typography sx={{fontWeight:700, textTransform:"none"}}>
                            Search
                        </Typography>
                    </Button>
                    <Button component={Link} to="/leaderboard" sx={{color:"#ffffff", marginLeft:"3rem"}}>
                        <Typography sx={{fontWeight:700, textTransform:"none"}}>
                            Leaderboard
                        </Typography>
                    </Button>
                    <Button component={Link} to="/about" sx={{color:"#ffffff", marginLeft:"3rem"}}>
                        <Typography sx={{fontWeight:700, textTransform:"none"}}>
                            About
                        </Typography>
                    </Button>
                    <Button component={Link} to="/register" sx={{color:"#ffffff", marginLeft:"3rem"}}>
                        <Typography sx={{fontWeight:700, textTransform:"none"}}>
                            Register
                        </Typography>
                    </Button>
                    <Button component={Link} to="/login" sx={{color:"#ffffff", marginLeft:"3rem"}}>
                        <Typography sx={{fontWeight:700, textTransform:"none"}}>
                            Log In
                        </Typography>
                    </Button>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default NavBar;

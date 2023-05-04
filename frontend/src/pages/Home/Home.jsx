import { Box } from "@mui/system";
import { Typography, Container } from "@mui/material";
import SideBar from "../components/SideBar/SideBar";
import NavBar from "../components/NavBar";

const HomePage = () => {
    return (
        <Box className="d-flex"> 
            <SideBar/>
            <Box className="main" sx={{flex:5}}>
                <NavBar/>
                <Container sx={{marginTop:"1rem"}}>
                    <Typography
                        variant="h3"
                        color="#1DB954"
                        marginBottom="2rem"
                        fontWeight="700"
                        textAlign="center"
                    >
                        Welcome to Spotify Score!
                    </Typography>
                    <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '30vh' }}>
                        <Typography variant="h6" color="#ffffff" marginBottom="1rem">
                            A centralized way to review Spotify songs and albums.
                        </Typography>
                        <Typography variant="h6" color="#ffffff" marginBottom="6rem">
                            To get started, navigate along the tabs to the right.
                        </Typography>
                    </div>
                </Container>
            </Box>
        </Box>
    );
}

export default HomePage;

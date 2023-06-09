import { Box } from "@mui/system";
import { Typography, Container } from "@mui/material";
import SideBar from "./components/SideBar/SideBar";
import NavBar from "./components/NavBar";

const About = () => {
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
                        About
                    </Typography>
                    <Typography variant="h6" color="#ffffff" marginBottom="1rem">
                        Spotify Score seeks to further engage the Spotify community by providing a way for users to publicly share their thoughts and opinions on songs they listen to. Spotify Score acts as a music rating site where each album and individual song has its own ratings page. Users are able to write reviews and provide their own subjective optinion on new releases, past projects, and recently discovered songs.
                    </Typography>
                    <Typography variant="h6" color="#ffffff" marginBottom="6rem">
                        Spotify Score was developed as the web application group project for the "Special Topics: Internet Computing" (CIS4930) course at the University of Florida.
                    </Typography>
                    <Typography
                        variant="h3"
                        color="#1DB954"
                        marginBottom="3rem"
                        fontWeight="700"
                        textAlign="center"
                    >
                        Developers
                    </Typography>
                    <Typography variant="h6" color="#ffffff" marginBottom="1rem" textAlign="center">
                        Emmanuel Mora
                    </Typography>
                    <Typography variant="h6" color="#ffffff" marginBottom="1rem" textAlign="center">
                        Kevin Cen
                    </Typography>
                    <Typography variant="h6" color="#ffffff" marginBottom="1rem" textAlign="center">
                        Carrima Hewitt
                    </Typography>
                    <Typography variant="h6" color="#ffffff" marginBottom="1rem" textAlign="center">
                        Adeeb Rashid
                    </Typography>
                    <Typography variant="h6" color="#ffffff" marginBottom="1rem" textAlign="center">
                        Lukas Vaiciunas
                    </Typography>
                </Container>
            </Box>
        </Box>
    );
}

export default About;

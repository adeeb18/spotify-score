import './Navbar.css';
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ScoreLogo from "../../../images/score.png";
import Box from '@mui/material/Box';

const NavBar = () => {
    return (
        <AppBar
                sx={{flex:1, backgroundColor:"#121212"}}
                    position="sticky"
                >
                    <Toolbar>
                    <List sx={{display: "flex", flexDirection:"column", justifyContent:"space-between"}}>
                        <Box sx={{display: "flex", gap:1, alignItems:"center", justifyContent:"center"}}>
                            <img src={ScoreLogo} alt="Logo" className="logo"></img>
                            <Typography variant="h6" noWrap component="div">
                                Spotify Score
                            </Typography>
                        </Box>
                        <ListItemButton href="/" 
                            sx={{backgroundColor:"#151515", minHeight:60, minWidth:200, textAlign:"center", borderRadius:2, mt:1}}>
                            <ListItemText primary={'Home'} />
                        </ListItemButton>
                        <ListItemButton href="/search" 
                            sx={{backgroundColor:"#151515", minHeight:60, minWidth:200, textAlign:"center", borderRadius:2, mt:1}}>
                            <ListItemText primary={'Search'} />
                        </ListItemButton>
                        <ListItemButton href="/leaderboard"
                            sx={{backgroundColor:"#151515", minHeight:60, minWidth:200, textAlign:"center", borderRadius:2, mt:1}}>
                            <ListItemText primary={'Leaderboard'} />
                        </ListItemButton>
                        <ListItemButton href="/about"
                            sx={{backgroundColor:"#151515", minHeight:60, minWidth:200, textAlign:"center", borderRadius:2, mt:1}}>
                            <ListItemText primary={'About'} />
                        </ListItemButton>
                        <ListItemButton href="/register"
                            sx={{backgroundColor:"#151515", minHeight:60, minWidth:200, textAlign:"center", borderRadius:2, mt:1}}>
                            <ListItemText primary={'Register'} />
                        </ListItemButton>
                        <ListItemButton href="/login"
                            sx={{backgroundColor:"#151515", minHeight:60, minWidth:200, textAlign:"center", borderRadius:2, mt:1}}>
                            <ListItemText primary={'Log In'} />
                        </ListItemButton>
                    </List>
                    </Toolbar>
        </AppBar>
    );
}

export default NavBar;

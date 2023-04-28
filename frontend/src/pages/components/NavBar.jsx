/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { AppBar, Toolbar, Typography, Box, Button} from '@mui/material';
import { css } from "@emotion/react";
import {useLocation} from "react-router-dom";

const NavBar = () => {
    const currPage = useLocation();

    const initializePage = () =>{
        if(currPage.pathname === "/"){
            return "Home";
        }
        else if(currPage.pathname === "/search"){
            return "Search";
        }
        else if(currPage.pathname === "/song"){
            return "Song";
        }
        else if(currPage.pathname === "/song/reviews"){
            return "Reviews";
        }
        else if(currPage.pathname === "/song/create-review"){
            return "Create Review";
        }
        else if(currPage.pathname === "/album"){
            return "Album";
        }
        else if(currPage.pathname === "/about"){
            return "About";
        }
        else if(currPage.pathname === "/leaderboard"){
            return "Leaderboard";
        }
        else if(currPage.pathname === "/SignUp"){
            return "SignUp";
        }
        else if(currPage.pathname === "/Log In"){
            return "Log In";
        }
    }

    const pageName = initializePage();
    
    return (
        <AppBar 
            sx={{position:"sticky", backgroundColor:"rgba(41,41,41,1)"}}
        >
            <Toolbar className="d-flex justify-content-between">
                <Box>
                    <Typography 
                        href="/"
                        css={css`
                            :hover {
                                cursor:pointer;
                                color: white;
                            }
                        `}
                        sx={{color:"#c8c7c7"}}
                    >
                        {pageName}
                    </Typography>
                </Box>
                <Box>
                    <Button href="/SignUp" sx={{textTransform:"none", color:"white", marginRight:1}}>Sign Up</Button>
                    <Button href="/login" sx={{textTransform:"none", backgroundColor:"white", color:"black", borderRadius:5}} variant="contained">Log In</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;

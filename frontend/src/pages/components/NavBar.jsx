/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Button} from '@mui/material';
import { css } from "@emotion/react";
import {useLocation} from "react-router-dom";
import axios from 'axios';

const NavBar = () => {
    const currPage = useLocation();
    let [user, setUser] = useState([]);
    let [check, setCheck] = useState(false);
    

    const getUser = () => { /*Temp PHP get until server is up*/
        if(!check){
            const url = 'http://localhost:8000';
            axios.get(url).then(res => {
                setUser(res.data.split("\n"));
            });
            setCheck(true);
        }
    }

    const initializePage = () =>{
        getUser();
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
        else if(currPage.pathname === "/register"){
            return "Register";
        }
        else if(currPage.pathname === "/login"){
            return "Log In";
        }
    }

    const pageName = initializePage();

    const LoggedOut = (
        <Box>
            <Button href="/register" sx={{textTransform:"none", color:"white", marginRight:1}}>Register</Button>
            <Button href="/login" sx={{textTransform:"none", backgroundColor:"white", color:"black", borderRadius:5}} variant="contained">Log In</Button>
        </Box>
    );
    const LoggedIn = (
        <Box>
            <Button href="/login" sx={{textTransform:"none", backgroundColor:"white", color:"black", borderRadius:5}} variant="contained">{user[0]}</Button>
        </Box>
    );
    
    const NavLeft = (user[0] == "No user") ? LoggedOut : LoggedIn;
    
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
                {NavLeft}
                    
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;

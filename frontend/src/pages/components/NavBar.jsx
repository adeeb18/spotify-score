/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Button, Menu, MenuItem} from '@mui/material';
import { css } from "@emotion/react";
import {useLocation} from "react-router-dom";
import axios from 'axios';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

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

    const [auth, setAuth] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const LoggedOut = (
        <Box>
            <Button href="/register" sx={{textTransform:"none", color:"white", marginRight:1}}>Register</Button>
            <Button 
                href="/login" 
                sx={{textTransform:"none", backgroundColor:"white", color:"black", borderRadius:5}} 
                variant="contained"
                css={css`
                    :hover {
                    background-color: #2e8b57;
                    }
                `}
            >
                    Log In
            </Button>
        </Box>
    );
    const LoggedIn = (
        <Box>
            <Button 
                sx={{textTransform:"none", backgroundColor:"white", color:"black", borderRadius:5, paddingRight:0.5}} 
                variant="contained"
                onClick={handleMenu}
                css={css`
                    :hover {
                    background-color: #2e8b57;
                    }
                `}
            >
                {user[0]} <ArrowDropDownIcon/>
            </Button>
            <Menu
                sx={{marginTop: "6vh"}}
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My Reviews</MenuItem>
                <MenuItem onClick={handleClose}>Log Out</MenuItem>
            </Menu>
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

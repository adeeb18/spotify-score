/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Box, Button, Menu, MenuItem, Link} from '@mui/material';
import { css } from "@emotion/react";
import {useLocation, useNavigate} from "react-router-dom";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchBar from './SearchBar';
import axios from 'axios';

const NavBar = () => {
    /*PAGE LOCATION */
    const currPage = useLocation();
    let [user, setUser] = useState("");
    let [check, setCheck] = useState(false);

    useEffect(() => {
        const id = localStorage.getItem("id");
        if(id != undefined){
            const url = 'https://lws3v1re05.execute-api.us-east-1.amazonaws.com/dev/api/v1/users/getUserReviews'
            const payload = {user_id: id}
            axios.post(url, payload)
                    .then(response => handleLogin(response))
                    .catch(error => console.error(error));
        }
    }, []);

    const handleLogin = (response) => {
        console.log(response.data);
        if(response.status == 200){
            if(!check || user==""){
                const loggedInUser = localStorage.getItem("username");
                if (loggedInUser != "" && loggedInUser != undefined) {
                    setUser(loggedInUser);
                    setCheck(true);
                }
            }
        }
        else{
            handleLogout();
        }
    }

    const handleLogout= () => {
        localStorage.clear();
        setUser("");
    }

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
        else if(currPage.pathname === "/register"){
            return "Register";
        }
        else if(currPage.pathname === "/login"){
            return "Log In";
        }
    }

    const pageName = initializePage();

    const LoggedOut = (
        <Box className="d-flex align-items-center">
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

    /*USER INFORMATION*/
    const [auth, setAuth] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

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
                {user} <ArrowDropDownIcon/>
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
                <Box className="d-flex flex-column">
                    <Button href="/profile" onClick={handleClose} >Profile</Button>
                    <Button href="/profile/reviews" className="menu">My Reviews</Button>
                    <Button className="menu" onClick={handleLogout}>Log Out</Button>
                </Box>
            </Menu>
        </Box>
    );

    /*DYNAMIC UI FIELDS*/
    const NavLeft = (user == "") ? LoggedOut : LoggedIn;
    
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
                <SearchBar/>
                {NavLeft}
                    
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;

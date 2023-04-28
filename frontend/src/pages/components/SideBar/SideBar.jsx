/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import './SideBar.css';
import { AppBar, Toolbar, Typography, List, ListItemButton, ListItemText, Box } from '@mui/material';
import ScoreLogo from "../../../images/logo.png";
import { css } from "@emotion/react";
import axios from 'axios';

const SideBar = () => {
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
    getUser();

    const LoggedOut = (
        <ListItemButton
            href="/"
            className="mb-3"
            css={css`
                :hover {
                background-color: #2e8b57;
                }
            `}
            sx={{backgroundColor:"#151515", minHeight:"10vh", minWidth:200, textAlign:"center", borderRadius:2, mt:1}}>
            <ListItemText primary={'Home'} />
        </ListItemButton>
    );
    const LoggedIn = (
        <Box className="d-flex flex-column">
            <ListItemButton
                href="/"
                className="mb-2"
                css={css`
                    :hover {
                    background-color: #2e8b57;
                    }
                `}
                sx={{backgroundColor:"#151515", minHeight:"10vh", minWidth:200, textAlign:"center", borderRadius:2, mt:1}}>
                <ListItemText primary={'Home'} />
            </ListItemButton>
            <ListItemButton
                href="/song/create-review"
                className="mb-2"
                css={css`
                    :hover {
                    background-color: #2e8b57;
                    }
                `}
                sx={{backgroundColor:"#151515", minHeight:"10vh", minWidth:200, textAlign:"center", borderRadius:2, mt:1}}>
                <ListItemText primary={'New Review'} />
            </ListItemButton>
        </Box>
    );
    
    const SideTop = (user[0] == "No user") ? LoggedOut : LoggedIn;
    return (
        <AppBar
            sx={{flex:1, background: "#070707"}}
            position="sticky"
        >
            <Toolbar>
            <List className="flex flex-column justify-content-between">
                <Box sx={{display: "flex", gap:1, alignItems:"center", justifyContent:"center"}}>
                    <img src={ScoreLogo} alt="Logo" className="logo"></img>
                    <Typography variant="h6" noWrap component="div">
                        Spotify Score
                    </Typography>
                </Box>
                {SideTop}
                <ListItemButton 
                    href="/search" 
                    className="mb-3"
                    css={css`
                        :hover {
                        background-color: #2e8b57;
                        }
                    `}
                    sx={{backgroundColor:"#151515", minHeight:"10vh", minWidth:200, textAlign:"center", borderRadius:2, mt:1}}>
                    <ListItemText primary={'Search'} />
                </ListItemButton>
                <ListItemButton 
                    href="/leaderboard"
                    className="mb-3"
                    css={css`
                        :hover {
                        background-color: #2e8b57;
                        }
                    `}
                    sx={{backgroundColor:"#151515", minHeight:"10vh", minWidth:200, textAlign:"center", borderRadius:2, mt:1}}>
                    <ListItemText primary={'Leaderboard'} />
                </ListItemButton>
                <ListItemButton 
                    href="/"
                    className="mb-3"
                    css={css`
                        :hover {
                        background-color: #2e8b57;
                        }
                    `}
                    sx={{backgroundColor:"#151515", minHeight:"10vh", minWidth:200, textAlign:"center", borderRadius:2, mt:1}}>
                    <ListItemText primary={'Explore'} />
                </ListItemButton>
                <ListItemButton 
                    href="/song/reviews"
                    className="mb-3"
                    css={css`
                        :hover {
                        background-color: #2e8b57;
                        }
                    `}
                    sx={{backgroundColor:"#151515", minHeight:"10vh", minWidth:200, textAlign:"center", borderRadius:2, mt:1}}>
                    <ListItemText primary={'Reviews'} />
                </ListItemButton>
                <ListItemButton 
                    href="/about"
                    className="mb-3"
                    css={css`
                        :hover {
                        background-color: #2e8b57;
                        }
                    `}
                    sx={{backgroundColor:"#151515", minHeight:"10vh", minWidth:200, textAlign:"center", borderRadius:2, mt:1}}>
                    <ListItemText primary={'About'} />
                </ListItemButton>
            </List>
            </Toolbar>
        </AppBar>
    );
}

export default SideBar;

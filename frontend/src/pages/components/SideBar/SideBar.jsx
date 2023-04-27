/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import './SideBar.css';
import { useState } from 'react';
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, List, ListItemButton, ListItemText, Box } from '@mui/material';
import ScoreLogo from "../../../images/logo.png";
import { style } from '@mui/system';
import { css } from "@emotion/react";

const SideBar = () => {
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
                        <ListItemButton 
                            href="/" 
                            css={css`
                                :hover {
                                background-color: #2e8b57;
                                }
                            `}
                            sx={{backgroundColor:"#151515", minHeight:60, minWidth:200, textAlign:"center", borderRadius:2, mt:1}}>
                            <ListItemText primary={'Home'} />
                        </ListItemButton>
                        <ListItemButton 
                            href="/search" 
                            css={css`
                                :hover {
                                background-color: #2e8b57;
                                }
                            `}
                            sx={{backgroundColor:"#151515", minHeight:60, minWidth:200, textAlign:"center", borderRadius:2, mt:1}}>
                            <ListItemText primary={'Search'} />
                        </ListItemButton>
                        <ListItemButton 
                            href="/leaderboard"
                            css={css`
                                :hover {
                                background-color: #2e8b57;
                                }
                            `}
                            sx={{backgroundColor:"#151515", minHeight:60, minWidth:200, textAlign:"center", borderRadius:2, mt:1}}>
                            <ListItemText primary={'Leaderboard'} />
                        </ListItemButton>
                        <ListItemButton 
                            href="/about"
                            css={css`
                                :hover {
                                background-color: #2e8b57;
                                }
                            `}
                            sx={{backgroundColor:"#151515", minHeight:60, minWidth:200, textAlign:"center", borderRadius:2, mt:1}}>
                            <ListItemText primary={'About'} />
                        </ListItemButton>
                        <ListItemButton 
                            href="/register"
                            css={css`
                                :hover {
                                background-color: #2e8b57;
                                }
                            `}
                            sx={{backgroundColor:"#151515", minHeight:60, minWidth:200, textAlign:"center", borderRadius:2, mt:1}}>
                            <ListItemText primary={'Register'} />
                        </ListItemButton>
                        <ListItemButton 
                            href="/login"
                            css={css`
                                :hover {
                                background-color: #2e8b57;
                                }
                            `}
                            sx={{backgroundColor:"#151515", minHeight:60, minWidth:200, textAlign:"center", borderRadius:2, mt:1}}>
                            <ListItemText primary={'Log In'} />
                        </ListItemButton>
                    </List>
                    </Toolbar>
        </AppBar>
    );
}

export default SideBar;

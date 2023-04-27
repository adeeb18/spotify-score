/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Box, Container, Button} from '@mui/material';
import ScoreLogo from "../../../images/logo.png";
import { style } from '@mui/system';
import { css } from "@emotion/react";

const NavBar = () => {
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
                    >Home</Typography>
                </Box>
                <Box>
                    <Button href="/register" sx={{textTransform:"none", color:"white", marginRight:1}}>Sign Up</Button>
                    <Button href="/login" sx={{textTransform:"none", backgroundColor:"white", color:"black", borderRadius:5}} variant="contained">Log In</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;

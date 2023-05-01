/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { Link } from "react-router-dom";
import { Box,Typography, FormControl, InputAdornment, IconButton, Button, TextField} from "@mui/material";
import {VisibilityOff, Visibility} from "@mui/icons-material";
import LoginIcon from "@mui/icons-material/Login";
import SideBar from "./components/SideBar/SideBar";
import NavBar from "./components/NavBar";
import { css } from "@emotion/react";
import axios from 'axios';

const Login = () => {
    /*INPUT STATES */
    let [user, setUsername] = useState("");
    let [pass, setPassword] = useState("");
    let [showPassword, setShowPassword] = useState(false);
    /*VALIDATION STATES*/
    let [userError, setUserError] = useState(false);
    let [userHelper, setUserHelper] = useState("");
    let [passwordError, setPasswordError] = useState(false);
    let [passwordHelper, setPasswordHelper] = useState("");

    const handleChange = (event) => {
        switch(event.target.name) {
            case "usernameInput":{
                if((event.target.value) == undefined || (event.target.value) == ""){
                    setUserError(true);
                    setUserHelper("Username is required");
                }
                else{
                    setUsername(event.target.value);
                    setUserError(false);
                    setUserHelper("");
                }
            }break;
            case "passwordInput":{
                if((event.target.value) == undefined || (event.target.value) == ""){
                    setPasswordError(true);
                    setPasswordHelper("Password is required");
                }
                else{
                    setPassword(event.target.value);
                    setPasswordError(false);
                    setPasswordHelper("");
                }
            }break;
        }
    }

    const handleSubmit = () => {
        const url = 'http://localhost:8000/users/login'
        const payload = {username: user, password: pass}
        axios.post(url, payload)
            .then(response => console.log(response))
            .catch(error => console.error(error));
    }

    const handleClickShowPassword = () => {
        setShowPassword((show) => !show);
    }

    return (
        <Box className="d-flex">
            <SideBar/>
            <Box className="main" sx={{flex:5}}>
                <NavBar/>
                <Box className="d-flex flex-column align-items-center mt-1 py-3" sx={{paddingX:"10vw"}}>
                    <Box 
                        className="d-flex flex-column align-items-center" 
                        sx={{width:"40vw",backgroundColor:"rgba(41,41,41,1)", padding:"2rem"}}
                    >
                        <Typography
                            variant="h4"
                            color="#1DB954"
                            fontWeight="700"
                            textAlign="center"
                        >
                            WELCOME BACK
                        </Typography>
                        
                        <Typography
                            variant="h6"
                            color="#C8C7C7"
                            marginBottom="6rem"
                            fontWeight="700"
                            textAlign="center"
                        >
                            Log In
                        </Typography>

                        <Box width="100%"><Typography textAlign="left" marginLeft={0.5} marginBottom={1}>Username</Typography></Box>
                        <FormControl sx={{width:"100%", mb:"2rem"}} variant="outlined">
                            <TextField 
                                error={userError}
                                helperText={userHelper}
                                id="usernameInput"
                                name="usernameInput"
                                onChange={handleChange}
                                variant="outlined"
                                sx={{input: { color:"#C8C7C7" },}}
                            />
                        </FormControl>

                        <Box className="d-flex justify-content-between align-items-center" width="100%">
                            <Typography textAlign="left" marginLeft={0.5} marginBottom={1}>Password</Typography>
                            <Typography color="#B6B5B5" fontSize={12} marginBottom={1}>Forgot password?</Typography>
                        </Box>
                        <FormControl sx={{width:"100%", mb:"2rem"}} variant="outlined">
                            <TextField
                                error={passwordError}
                                helperText={passwordHelper}
                                name="passwordInput"
                                onChange={handleChange}
                                type={showPassword ? "text" : "password"}
                                InputProps={{
                                    endAdornment:(
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={handleClickShowPassword}
                                                edge="end"
                                                sx={{color:"#A09F9F"}}
                                            >
                                                {showPassword ? <Visibility/> : <VisibilityOff/>}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                                variant="outlined"
                                sx={{input: { color:"#C8C7C7" },}}
                            />
                        </FormControl>

                        <Button
                            variant="contained"
                            component={Link}
                            onClick={handleSubmit}
                            to="/"
                            startIcon={<LoginIcon/>}
                            sx={{color:"#191414"}}
                            style={{backgroundColor:"#1DB954"}}
                        >
                            <Typography variant="h6" textTransform="none">
                                Log In
                            </Typography>
                        </Button>
                        <Box className="d-flex">
                            <Typography color="#B6B5B5" fontSize={12} marginTop={1.2}>New to SpotifyScore?</Typography>
                            <Button 
                                href="/register" 
                                sx={{textTransform:"none", color:"#1a9f48"}}
                                css={css`
                                    :hover {
                                        cursor: pointer;
                                        color: #c97a1a;
                                        background:transparent;
                                    }
                                `}
                            >
                                Register
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default Login;

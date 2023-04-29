/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { Link } from "react-router-dom";
import { Box,Typography, FormControl, InputAdornment, IconButton, Button, 
         TextField, Select, MenuItem, Menu, useRadioGroup} from "@mui/material";
import {VisibilityOff, Visibility} from "@mui/icons-material";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import SideBar from "./components/SideBar/SideBar";
import NavBar from "./components/NavBar";
import { css } from "@emotion/react";
import axios from "axios";

const SignUp = () => {
    let [user, setUsername] = useState("");
    let [pass, setPassword] = useState("");
    let [date, setDOB] = useState("");
    let [month, setMonth] = useState("");
    let [day, setDay] = useState("");
    let [year, setYear] = useState("");
    let [showPassword, setShowPassword] = useState(false);
    let [errorState, setError] = useState(false);
    let [helper, setHelper] = useState("");

    const handleChange = (event) => {
        switch(event.target.name) {
            case "usernameInput":
                setUsername(event.target.value);
                break;
            case "passwordInput":
                setPassword(event.target.value);
                break;
            case "monthInput":
                setMonth(event.target.value);
                break;
            case "dayInput":
                setDay(event.target.value);
                break;
            case "yearInput":
                setYear(event.target.value);
                break;
        }
    }

    const handleClickShowPassword = () => {
        setShowPassword((show) => !show);
    }

    const handleValidation = () => {

    }

    const getDOB = () => {
        if(Number(month) < 10){setMonth("0"+ month);}
        const dob = year + "-" + month + "-" + day;
        setDOB(dob);
    }

    const handleSubmit = () => {
        //set dob
        getDOB();
        const url = 'http://localhost:8000/users/createUser'
        const payload = {user_id: null, username: user, password: pass, dob: date, date_created: null}
        axios.post(url, payload)
            .then(response => console.log(response))
            .catch(error => console.error(error));
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
                            WELCOME
                        </Typography>

                        <Typography
                            variant="h6"
                            color="#C8C7C7"
                            marginBottom="6rem"
                            fontWeight="700"
                            textAlign="center"
                        >
                            Sign Up
                        </Typography>

                        <Box width="100%"><Typography textAlign="left" marginLeft={0.5} marginBottom={1}>Username</Typography></Box>
                        <FormControl sx={{width:"100%", mb:"2rem"}} variant="outlined">
                            <TextField 
                                error={errorState}
                                helperText={helper}
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
                                id="passwordInput"
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

                        <Box width="100%"><Typography textAlign="left" marginLeft={0.5} marginBottom={1}>Date of birth</Typography></Box>
                        <Box width="100%" className="d-flex justify-content-evenly mb-4">
                            <Box>
                                <Typography textAlign="left" color="#c7c9c9">Month</Typography>
                                <FormControl sx={{minWidth:150}} variant="outlined">
                                    <Select
                                        id="monthInput"
                                        name="monthInput"
                                        value={month}
                                        onChange={handleChange}
                                        sx={{input: { color:"#C8C7C7" },}}
                                    >
                                        <MenuItem value={1}>January</MenuItem>
                                        <MenuItem value={2}>February</MenuItem>
                                        <MenuItem value={3}>March</MenuItem>
                                        <MenuItem value={4}>April</MenuItem>
                                        <MenuItem value={5}>May</MenuItem>
                                        <MenuItem value={6}>June</MenuItem>
                                        <MenuItem value={7}>July</MenuItem>
                                        <MenuItem value={8}>August</MenuItem>
                                        <MenuItem value={9}>September</MenuItem>
                                        <MenuItem value={10}>October</MenuItem>
                                        <MenuItem value={11}>November</MenuItem>
                                        <MenuItem value={12}>December</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box>
                                <Typography textAlign="left" marginLeft={0.5} marginBottom={0} color="#c7c9c9">Day</Typography>
                                <FormControl sx={{width:50}} variant="outlined">
                                    <TextField 
                                        id="dayInput"
                                        name="dayInput"
                                        onChange={handleChange}
                                        variant="outlined"
                                        sx={{input: { color:"#C8C7C7", textAlign:"center"},}}
                                    />
                                </FormControl>
                            </Box>
                            <Box>
                                <Typography textAlign="left" marginLeft={0.5} marginBottom={0} color="#c7c9c9">Year</Typography>
                                <FormControl sx={{width:100}} variant="outlined">
                                    <TextField 
                                        id="yearInput"
                                        name="yearInput"
                                        onChange={handleChange}
                                        variant="outlined"
                                        sx={{input: { color:"#C8C7C7", textAlign:"center"},}}
                                    />
                                </FormControl>
                            </Box>
                        </Box>

                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                            startIcon={<HowToRegIcon/>}
                            sx={{color:"#191414"}}
                            style={{backgroundColor:"#1DB954"}}
                        >
                            <Typography variant="h6" textTransform="none">
                                SignUp
                            </Typography>
                        </Button>
                        <Box className="d-flex">
                            <Typography color="#B6B5B5" fontSize={12} marginTop={1.2}>Already have an account?</Typography>
                            <Button 
                                href="/login" 
                                sx={{textTransform:"none", color:"#1a9f48"}}
                                css={css`
                                    :hover {
                                        cursor: pointer;
                                        color: #c97a1a;
                                        background:transparent;
                                    }
                                `}
                            >
                                Log In
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default SignUp;

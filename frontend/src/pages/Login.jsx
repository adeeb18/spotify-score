import { useState } from "react";
import { Link } from "react-router-dom";
import { Box,Typography, FormControl, OutlinedInput, InputLabel, InputAdornment, IconButton, Button, TextField} from "@mui/material";
import {VisibilityOff, Visibility} from "@mui/icons-material";
import LoginIcon from "@mui/icons-material/Login";
import SideBar from "./components/SideBar/SideBar";
import NavBar from "./components/NavBar";


const Login = () => {
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    let [showPassword, setShowPassword] = useState(false);

    const handleChange = (event) => {
        switch(event.target.name) {
            case "usernameInput":
                setUsername(event.target.value);
                break;
            case "passwordInput":
                setPassword(event.target.value);
                break;
        }
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
                                id="usernameInput"
                                name="usernameInput"
                                onChange={handleChange}

                                //label="Username" 
                                variant="outlined"
                                sx={{
                                    "& .MuiOutlinedInput-root":{
                                        "& > fieldset": {borderColor: "#C8C7C7"}
                                    },
                                    "& .MuiOutlinedInput-root:hover": {
                                        "& > fieldset": {borderColor: "#1DB954"}
                                    },
                                    "& .MuiOutlinedInput-root.Mui-focused": {
                                        "& > fieldset": {borderColor: "#1DB954"}
                                    },
                                    width: "100%"
                                }} 
                            />
                        </FormControl>

                        <Box className="d-flex justify-content-between align-items-center" width="100%">
                            <Typography textAlign="left" marginLeft={0.5} marginBottom={1}>Password</Typography>
                            <Typography color="#B6B5B5" fontSize={12} marginBottom={1}>Forgot password</Typography>
                        </Box>
                        <FormControl sx={{width:"100%", mb:"2rem"}} variant="outlined">
                            <TextField
                                id="passwordInput"
                                name="passwordInput"
                                onChange={handleChange}
                                type={showPassword ? "text" : "password"}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                //label="Username" 
                                variant="outlined"
                                sx={{
                                    "& .MuiOutlinedInput-root":{
                                        "& > fieldset": {borderColor: "#C8C7C7"}
                                    },
                                    "& .MuiOutlinedInput-root:hover": {
                                        "& > fieldset": {borderColor: "#1DB954"}
                                    },
                                    "& .MuiOutlinedInput-root.Mui-focused": {
                                        "& > fieldset": {borderColor: "#1DB954"}
                                    },
                                    width: "100%"
                                }} 
                            />
                        </FormControl>

                        <Button
                            variant="contained"
                            component={Link}
                            to="/"
                            startIcon={<LoginIcon/>}
                            sx={{color:"#191414"}}
                            style={{backgroundColor:"#1DB954"}}
                        >
                            <Typography variant="h6" textTransform="none">
                                Log In
                            </Typography>
                        </Button>
                        <Box class="d-flex">
                            <Typography color="#B6B5B5" fontSize={12} marginTop={1}>New to SpotifyScore?</Typography>
                            <Typography marginLeft={0.5} color="#1a9f48" fontWeight="bold" fontSize={12} marginTop={1}>Sign Up</Typography>
                        </Box>
                        
                    </Box>

                </Box>
            </Box>
        </Box>
    );
}

export default Login;

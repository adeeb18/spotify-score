import { useState } from "react";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import NavBar from "./components/NavBar";

const Register = () => {
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
        <Container>
            <NavBar/>
            <Container sx={{
                position:"absolute",
                top:"50%",
                left:"50%",
                transform:"translate(-50%,-50%)",
                display:"flex",
                flexDirection:"column",
                alignItems:"center",
                justifyContent:"center"
            }}>
                <Typography
                    variant="h3"
                    color="#1DB954"
                    marginBottom="6rem"
                    fontWeight="700"
                    textAlign="center"
                >
                    Register
                </Typography>

                <FormControl sx={{width:"30ch", mb:"1rem"}} variant="filled">
                    <InputLabel htmlFor="usernameInput">Username</InputLabel>
                    <OutlinedInput
                        id="usernameInput"
                        name="usernameInput"
                        onChange={handleChange}
                        sx={{backgroundColor:"#ffffff"}}
                    />
                </FormControl>

                <FormControl sx={{width:"30ch", mb:"6rem"}} variant="filled">
                    <InputLabel htmlFor="passwordInput">Password</InputLabel>
                    <OutlinedInput
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
                        sx={{backgroundColor:"#ffffff"}}
                    />
                </FormControl>

                <Button
                    variant="contained"
                    component={Link}
                    to="/"
                    startIcon={<HowToRegIcon/>}
                    sx={{marginBottom:"6em", color:"#191414"}}
                    style={{backgroundColor:"#1DB954"}}
                >
                    <Typography variant="h6" textTransform="none">
                        Register
                    </Typography>
                </Button>

            </Container>
        </Container>
    );
}

export default Register;

import { Typography, Button } from "@mui/material"
import { Box } from "@mui/system"
import { useState, useEffect } from "react"
import NavBar from "./components/NavBar"
import SideBar from "./components/SideBar/SideBar"
import axios from "axios"

const UserProfile = () => {
    let [reviews, setReviews] = useState(0);

    useEffect(() => {
        const url = 'http://localhost:8000/users/getUserReviews'
        const id = localStorage.getItem("id");
        const payload = {user_id: id}
        axios.post(url, payload)
                .then(response =>  setReviews(response.data))
                .catch(error => console.error(error));
    }, []);

    const handleDelete = () => {

    }

    return (
        <Box className="main d-flex">
            <SideBar/>
            <Box sx={{flex:5}}>
                <NavBar/>
                <Box sx={{mt:3, textAlign:"center"}}>
                    <Typography
                        variant="h3"
                    >
                        {localStorage.getItem("username")}
                    </Typography>
                    <Typography>User ID: {localStorage.getItem("id")}</Typography>
                    <Typography>Reviews: {reviews.length}</Typography>
                    <Box className="d-flex flex-column align-items-center" sx={{gap:"2rem"}}>
                        <Button 
                            variant="contained" 
                            sx={{mt:1, minWidth:"20vw", maxWidth:"30vw", borderRadius:2}} 
                            style={{backgroundColor:"#1DB954"}}
                        >View Reviews</Button>
                        <Button 
                            onClick={handleDelete} 
                            href="/" variant="contained" 
                            sx={{ minWidth:"20vw", maxWidth:"30vw", borderRadius:2}} 
                            style={{backgroundColor:"#bd2d2d"}}
                        >Delete Account</Button>
                        <Typography>*Use Profile Menu to log out.</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default UserProfile;
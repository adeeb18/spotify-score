import { Typography, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions} from "@mui/material"
import { Box } from "@mui/system"
import { useState, useEffect } from "react"
import NavBar from "./components/NavBar"
import SideBar from "./components/SideBar/SideBar"
import axios from "axios"

const UserProfile = () => {
    let [reviews, setReviews] = useState(0);
    let [del, setDel] = useState(false);

    useEffect(() => {
        const url = 'http://localhost:8000/getUserReviews'
        const id = localStorage.getItem("id");
        const payload = {user_id: id}
        axios.post(url, payload)
                .then(response =>  setReviews(response.data))
                .catch(error => console.error(error));
    }, []);

    const handleDelete = () => {
        const uID = localStorage.getItem("id");
        const payload = {"user_id": uID}
        const url = 'http://localhost:8000/deleteUser'
        axios.delete(url, {data: payload})
        .then(response => confirmDelete(response))
        .catch(error => console.error(error));
    }

    const confirmDelete = (response) => {
        localStorage.clear();
        setDel(false);
        if(response.status == 200){
            alert("Account Deleted Successfully");
        }
    }
    
    const handleClose = () =>{
        setDel(false);
    }

    const setDialog = () => {
        setDel(true);
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
                            onClick={setDialog} 
                            variant="contained" 
                            sx={{ minWidth:"20vw", maxWidth:"30vw", borderRadius:2}} 
                            style={{backgroundColor:"#bd2d2d"}}
                        >Delete Account</Button>
                        <Typography>*Use Profile Menu to log out.</Typography>
                    </Box>
                </Box>
            </Box>
                <Dialog
                    PaperProps={{
                        style:{
                            backgroundColor:"#555",
                        }
                    }}
                    open={del}
                    onClose={handleDelete}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title" sx={{color:"#C8C7C7"}}>
                    {"Are You Sure?"}
                    </DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description" sx={{color:"#C8C7C7"}}>
                        Deleting your account means you can no longer retrieve it or any of your reviews.
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button href="/" sx={{color:"#1a9f48"}} onClick={handleDelete} autoFocus>
                            Yes
                        </Button>
                        <Button sx={{color:"#bd2d2d"}}onClick={handleClose} autoFocus>
                            No
                        </Button>
                    </DialogActions>
                </Dialog>
        </Box>
    )
}

export default UserProfile;
import { Typography, Box } from '@mui/material';

const FootNote = () => {
    return (
        <Box 
            sx={{
                mt: 2,
                height:40, 
                backgroundColor:"#151515", 
                color:"#5a5a5a", 
                display:"flex", 
                justifyContent:"center", 
                alignItems:"center",
                }}>
            <Typography>Spotify Score &copy; 2023. Emmanuel Mora, Kevin Cen, Carrima Hewitt, Adeeb Rashid, Lukas Vaiciunas</Typography>
        </Box>
    );
}

export default FootNote;

import { Box, Button, Fab, Grid, Paper, Typography } from "@mui/material";
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import Footer from "../footer/Footer";
import Link from "next/link";
import './home.css'
import { getFromLocalStorage } from "../helper/loacalSorage";

const HomePage = () => {
    return (<Box sx={{
        width: "98.7vw",
        // overflowX:"hidden",
        height: "100vh",
        backgroundImage: "url('/image/landing.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",

    }}>
        <Box component="article" sx={{ display: "grid", justifyContent: "center", alignItems: "center", paddingTop: "200px" }}>
            <Typography
                variant="subtitle1"
                sx={{
                    maxWidth: 600,
                    fontSize: "1.2rem",
                    lineHeight: 1.6,
                    color: "rgba(255,255,255,0.9)",
                    mb: 4,
                    textShadow: "1px 1px 8px rgba(0,0,0,0.5)",
                }}
            >
                Rejuvenate your mind, body and soul with our signature treatments.
                Experience true relaxation with natural therapies and a peaceful
                atmosphere.
            </Typography>
              <Button  variant="contained" color="secondary"> 
            <Link href={ getFromLocalStorage("user") ? "/products":"/login"}>EXPLORE OUR SERVICES</Link>
            </Button>
        </Box>
      <Box sx={{paddingTop:"150px"}}><Footer /></Box>  
    
    </Box >)

}

export default HomePage;
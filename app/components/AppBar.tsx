"use client"
import * as React from "react";
import { AccountCircle } from "@mui/icons-material";
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import YardIcon from '@mui/icons-material/Yard';
import Link from "next/link";

const NavBar = () => {

    const [mounted,isMounted] = useState(false);
    useEffect(()=>{
      isMounted(true);
    },[])

    return (  
        <Box sx={{ flexGrow: 1 }}>
        {mounted && 
        <AppBar className="sticky" color="info" >
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                >
                    {/* <MenuIcon /> */}
                    <YardIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                The Golden Lotus Spa
                </Typography>
                <Box sx={{display:"flex",alignItems:"center",gap:"20px"}}>

                <Link className="hover:text-blue-800" href="/">Home</Link>
                <Link href="/signup">Sign Up</Link>
               { localStorage.getItem("user") ? <Link  href="/login">Sign In</Link> : <Link  href="/login">Sign out</Link> } 
                </Box>
                <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                // onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Toolbar>

        </AppBar>
         }
        
        </Box>
    )
}

export default NavBar;
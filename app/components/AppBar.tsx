"use client"
import * as React from "react";
import { AccountCircle } from "@mui/icons-material";
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import YardIcon from '@mui/icons-material/Yard';
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from 'next/navigation'
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";


const NavBar = () => {

  const [mounted, isMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const router = useRouter();

  const menuItems = ["Home", "Sign In", "Sign Up", "Contact"];
  useEffect(() => {
    isMounted(true);
  }, [])


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavClick = (item: string) => {
    console.log(`${item} clicked`);
    if(item== "Sign In"){
      router.push("/login");
    }else if(item== "Sign Up"){
      router.push("/signup");
    }else if(item== "Home"){
      router.push("/");
    }
  }


  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
       Menu
      </Typography>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );


  return (
    <Box sx={{ flexGrow: 1 }}>
      {mounted &&
      <>
        <AppBar component="nav" className="sticky" color="info" >
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
              The World Lotus Spa
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {menuItems.map((item) => (
                <Button onClick={()=>{handleNavClick(item)} } key={item} sx={{ color: "#fff" }}>
                  {item}
                </Button>
              ))}
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
            {/* Hamburger (Mobile) */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          </Toolbar>

        </AppBar>
        <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{ display: { xs: "block", sm: "none" } }}
      >
        {drawer}
      </Drawer>
        </>
      }

    </Box>
  )
}

export default NavBar;
"use client";
import { Box,Typography, Link, IconButton, Grid } from "@mui/material";
import { Facebook, Instagram, Twitter, YouTube, LocationOn, Call, Email } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#1b1b1b",
        color: "white",
        py: 6,
        mt:5,
        px: { xs: 2, sm: 6, md: 12 },
      }}
    >
      <Grid container spacing={4}>
        {/* ======= Company Info ======= */}
        <Grid size={4}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
            The Golden Lotus Spa
          </Typography>
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.8 }}>
            Escape to tranquility — indulge in our soothing massages, rejuvenating facials, and peaceful ambience crafted for your wellbeing.
          </Typography>
        </Grid>

        {/* ======= Services ======= */}
        <Grid size={4}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
            Our Services
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Link href="#" color="inherit" underline="hover">Aromatherapy</Link>
            <Link href="#" color="inherit" underline="hover">Massage Therapy</Link>
            <Link href="#" color="inherit" underline="hover">Facial Treatments</Link>
            <Link href="#" color="inherit" underline="hover">Steam & Sauna</Link>
            <Link href="#" color="inherit" underline="hover">Yoga & Wellness</Link>
          </Box>
        </Grid>

        {/* ======= Contact Info ======= */}
        <Grid size={4}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
            Contact Us
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <LocationOn sx={{ mr: 1, color: "#c19a6b" }} />
            <Typography variant="body2">The Golden Lotus Spa, Hyderabad, Telangana</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Call sx={{ mr: 1, color: "#c19a6b" }} />
            <Typography variant="body2">+91 7660875030</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Email sx={{ mr: 1, color: "#c19a6b" }} />
            <Typography variant="body2">praveenDanewar@gmail.com</Typography>
          </Box>
        </Grid>

        {/* ======= Social Media ======= */}
        <Grid size={4}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
            Follow Us
          </Typography>
          <Box>
            <IconButton href="#" sx={{ color: "white" }}>
              <Facebook />
            </IconButton>
            <IconButton href="#" sx={{ color: "white" }}>
              <Instagram />
            </IconButton>
            <IconButton href="#" sx={{ color: "white" }}>
              <Twitter />
            </IconButton>
            <IconButton href="#" sx={{ color: "white" }}>
              <YouTube />
            </IconButton>
          </Box>
        </Grid>
      </Grid>

      {/* ======= Bottom Bar ======= */}
      <Box
        sx={{
          borderTop: "1px solid rgba(255,255,255,0.2)",
          textAlign: "center",
          mt: 4,
          pt: 2,
        }}
      >
        <Typography variant="body2" color="rgba(255,255,255,0.6)">
          © {new Date().getFullYear()} Serenity Spa. All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;

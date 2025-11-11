"use client"
import Image from "next/image";
import Login from "./login/page";
import { useEffect, useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import Products from "./products/page";
import HomePage from "./components/home/Home";
import Footer from "./components/footer/Footer";

export default function Home() {
   const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  return (
    <div style={{width:"95vw"}}>
      {isClient ? <div><HomePage /></div> : <CircularProgress />}
    </div>
  );
}

"use client"

import { Box, Button, Paper, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { useDispatch } from "react-redux";
import { register } from "../components/redux/slicess/ProductSlice";
import { useRouter } from "next/navigation";

const Register = () => {

    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const dispatch = useDispatch<any>();
    const router = useRouter();
 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debugger
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
    const handleSubmit = () => {
          
           dispatch(register(formData)).then((resp:any)=>{

                if(resp?.payload?.error){
                  alert("Please Enter Valid Details")
                }else{
                    router.push("/login")
                }
           })

    }


    

    return (
        <div className="flex items-center justify-center min-h-screen login-container">
            <Paper className="w-full p-8 max-w-md shadow-md bg-white dark:bg-gray-800 login-card">
                <Typography className="text-center pb-3 text-white font-normal" variant="h4">Register</Typography>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <Box sx={{ display: "flex", justifyContent: "center", gap: "10px", flexDirection: "column" }}>
                        <TextField
                            fullWidth
                            className="mb-4 text-white"
                            label="User Name"
                            size="small"
                            name="name"
                            variant="outlined"
                            value={formData.name}
                            onChange={handleChange}
                        // InputProps={{ className: "text-gray-800 dark:text-white" }}
                        />

                         <TextField
                            fullWidth
                            size="small"
                            label="User Email"
                            name="email"
                            type="text"
                            variant="outlined"
                            value={formData.email}
                            onChange={handleChange}
                        // InputProps={{ className: "text-gray-800 dark:text-white" }}
                        />
                        
                        <TextField
                            fullWidth
                            size="small"
                            label="User Password"
                            name="password"
                            type="password"
                            variant="outlined"
                            value={formData.password}
                            onChange={handleChange}
                        // InputProps={{ className: "text-gray-800 dark:text-white" }}
                        />
                       
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className="!bg-blue-600 hover:!bg-blue-700 py-2 font-medium text-white signup-btn"
                        >
                            Sign Up
                        </Button>
                    </Box>
                </form>
            </Paper>
        </div>
    )
}

export default Register
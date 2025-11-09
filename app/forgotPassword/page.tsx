"use client"
import { Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { forgetPassword } from "../components/redux/slicess/ProductSlice";
import React, { useEffect, useState } from "react";
import SnackBarComponent from "../components/sanckBarCom/SnackBarCompoent";

const ForgotPassword = () => {

    const dispatch = useDispatch<any>();
    const [formData, setFormData] = useState({ email: "" });
    const [snackBarobj, setsnackBarobj] = React.useState({
        open: false,
        message: ''
    });

    const [isClient, setIsClient] = useState(false);

     useEffect(() => {
    setIsClient(true);
  }, []);

    const handleClick = () => {
        // setsnackBarobj(true);
        setsnackBarobj({ ...snackBarobj, open: true });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        // Handle forgot password submission logic here
        e.preventDefault();
        if (formData.email) {
            handleClick();
            dispatch(forgetPassword(formData)).then((resp: any) => {
                console.log(resp, "forgot response");
                setsnackBarobj({ open: true, message: resp?.payload?.message });

            })
        }else{
            setsnackBarobj({ open: true, message: "Please Enter Email" });
        }

    }


    return (
        <div className="login-container">
            {!isClient ? null :  <Paper style={{background:"transparent"}} className="w-full p-8 max-w-md shadow-md bg-white dark:bg-gray-800 login-card">
                <Typography className="text-center pb-3 text-white font-normal" variant="h4">Forgot Password</Typography>
                <Typography style={{color:"black"}} variant="body1">Enter the email address associated with your account and we will send you a link to reset your password.</Typography>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            value={formData.email}
                            name="email"
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            type="email"
                            placeholder="Enter you email" >

                        </TextField>
                        <Button size="small" variant="contained" type="submit">Submit</Button>
                    </Stack>

                </form>
            </Paper> }
           
            <SnackBarComponent
                snackBarobj={snackBarobj}
                setsnackBarobj={setsnackBarobj}
            />

        </div>
    )
}

export default ForgotPassword;
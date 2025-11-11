"use client"
import React, { useState } from "react";
import { Box, Button, TextField, Typography, Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { resetPassword } from "../components/redux/slicess/ProductSlice";
import { useSearchParams } from "next/navigation";



const ResetPassword = () => {
    const [formData, setFormData] = useState({
        token : "",
        confirmPassword: "",
        newPassword: "",
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch<any>();
    const searchParams = useSearchParams();
    const token = searchParams.get('token')
    

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (!formData.confirmPassword || !formData.newPassword) {
            setError("Please fill in all fields");
            setMessage("");
            return;
        }

        if (formData.confirmPassword !== formData.newPassword) {
            setError("Passwords do not match");
            setMessage("");
            return;
        }
        setFormData({ ...formData, "token": token || "" });
        dispatch(resetPassword(formData)).then((resp: any) => {
            if (resp?.payload?.error) {
                setError("Error resetting password");
                setMessage("");
            } else {
                setMessage("Password reset successful!");
                setError("");
            }
        });

        setMessage("Form submitted. Implement API call here.");
        setError("");
    };

    return (
        <Box maxWidth={400} mx="auto" mt="10%" p={3} boxShadow={3}>
            <Typography variant="h5" mb={2} textAlign="center">
                Reset Password
            </Typography>
            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <TextField
                        label="New Password"
                        name="newPassword"
                        type="password"
                        value={formData.newPassword}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Confirm Password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        fullWidth
                        autoFocus
                    />
                    {error && (
                        <Typography color="error" variant="body2">
                            {error}
                        </Typography>
                    )}
                    {message && (
                        <Typography color="primary" variant="body2">
                            {message}
                        </Typography>
                    )}
                    <Button variant="contained" type="submit" fullWidth>
                        Submit
                    </Button>
                </Stack>
            </form>
        </Box>
    );
};

export default ResetPassword;

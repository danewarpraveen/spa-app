"use client";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import "./login.css";
import { useDispatch } from "react-redux";
import { doLogin } from "../components/redux/slicess/ProductSlice";
import { useRouter } from 'next/navigation'
const Login = () => {
  const [form, setForm] = useState<any>({ name: "", password: "" });
  const dispatch = useDispatch<any>();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const [ isValid,setIsValid ] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    dispatch(doLogin(form)).then((res: any) => {
      console.log(res?.payload, "dtaaaaaaaa");
      if (res?.payload?.token) {
        localStorage.setItem("token",res?.payload.token);
        localStorage.setItem("user", JSON.stringify(res?.payload.username));
        router.push("/products")
        setIsValid(false);
      } else {
        setIsValid(true);
        console.log("Invalid credentials");
      }
    })
    e.preventDefault();

    console.log(form);
  };

  return (
    <div className="login-container">
      <Paper
        elevation={6}
        className="login-card"
      >
        <Typography
          variant="h5"
          component="h1"
          className="login-title"
        >
          Welcome Back
        </Typography>
        <Typography
          variant="body2"
          align="center"
          className="login-subtitle"
        >
          Please login to continue
        </Typography>

        <form onSubmit={handleSubmit} className="space-y-6 mt-5">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "15px",
              flexDirection: "column",
            }}
          >
            <TextField
              fullWidth
              label="User Name"
              size="small"
              name="name"
              variant="outlined"
              value={form.name}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              size="small"
              label="Password"
              name="password"
              type="password"
              variant="outlined"
              value={form.password}
              onChange={handleChange}
            />
            {isValid && <Typography color="error" variant="subtitle1">Plase Enter Valid Credentials</Typography>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="login-btn"
            >
              Sign In
            </Button>
          </Box>
        </form>
         <Typography
          variant="body2"
          // align="center"
          className="mt-10 pt-3"

        >
          <a href="/forgotPassword" >
            Forgot Password
          </a>
        </Typography>
           
        <Typography
          variant="body2"
          align="center"
          className="mt-10 text-gray-600 dark:text-gray-300"

        >
          Don’t have an account?{" "}
          <a href="/signup" className="signup-link">
            Sign up
          </a>
        </Typography>
      </Paper>
    </div>
  );
}


export default Login;

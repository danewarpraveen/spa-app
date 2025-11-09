"use client"
import { Box, Button, Paper, TextField, Typography } from "@mui/material";

const ForgotPassword=()=>{
    return(
        <div className="login-container">
            <Paper className="w-full p-8 max-w-md shadow-md bg-white dark:bg-gray-800 login-card">
                <Typography className="text-center pb-3 text-white font-normal" variant="h4">Forgot Password</Typography>
                 <Typography className="text-white" variant="body1">Enter the email address associated with your account and we will send you a link to reset your password.</Typography>
                  <form onSubmit={()=>console.log()
                  }>
                    <Box>

                        <TextField 
                         fullWidth
                          size="small"
                          variant="outlined"
                          type="email" 
                          placeholder="Enter you email" >

                          </TextField>
                          <Button type="submit">Submit</Button>
                    </Box>

                  </form>
            </Paper>
        </div>
    )
}

export default ForgotPassword ;
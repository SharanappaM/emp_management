import React, { useState } from 'react'
import { Box, Button, Card, Stack, TextField } from "@mui/material"
import axios from "axios"

const Loginpage = () => {
    const [values, setValues] = useState({
        email: "",
        password: ""
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5050/auth/adminlogin", values)
            .then(res => console.log(res))
            .catch(error => console.log(error))



    }
    return (
        <Box>
            <Card sx={{
                width: "50%",
                padding: "5%",
                ml: "20%",
                bgcolor: "#ebdef0"
            }}>
                <form action="" onSubmit={handleSubmit}>
                    <Stack
                        component="form"

                        spacing={2}
                        noValidate
                        autoComplete="off"

                    >
                        <h3>Login</h3>
                        <TextField
                            id="filled-hidden-label-normal"
                            label="Email"
                            variant="standard"
                            type='text'
                            fullWidth
                            onChange={(e) => setValues({ ...values, email: e.target.value })}
                        />
                        <TextField
                            id="filled-hidden-label-normal"
                            label="Password"
                            variant="standard"
                            type='password'
                            fullWidth
                            onChange={(e) => setValues({ ...values, password: e.target.value })}

                        />


                    </Stack>

                    <Button type='submit' sx={{ mt: 2 }} color='primary' variant='contained' >Submit</Button>


                </form>
            </Card>

        </Box>
    )
}

export default Loginpage

import React, { useState } from 'react'
import { Box, Button, Card, Stack, Tab, Tabs, TextField, Typography, } from "@mui/material"
import axios from "axios"
import { useNavigate } from "react-router-dom"



const Loginpage = () => {



    const [loginValue, setLoginvalue] = React.useState('admin');

    const handleChange = (event, newValue) => {
        setLoginvalue(newValue);
    };


    const [values, setValues] = useState({
        email: "",
        password: ""
    })
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    axios.defaults.withCredentials = true; // store cookies in 

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5050/auth/adminlogin", values)
            .then(res => {
                if (res.data.loginStatus) {
                    navigate("/dashboard")
                } else {
                    setError(res.data.error)
                }
            })
            .catch(error => console.log(error))



    }
    const handleSubmitEmp = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5050/emplyoee/emplyoeeLogin", values)
            .then(res => {
                if (res.data.loginStatus) {
                    navigate("/employeePage")
                } else {
                    setError(res.data.error)
                }
            })
            .catch(error => console.log(error))



    }
    return (
        <Box>

            <Tabs
                value={loginValue}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="secondary tabs example"
            >
                <Tab value="admin" label="Admin Login" />
                <Tab value="emp" label="Emplyoee Login" />
                {/* <Tab value="three" label="Item Three" /> */}
            </Tabs>

            {
                loginValue === "admin" && (
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
                                <Typography> {error && error}</Typography>
                                <h3>Admin Login</h3>
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

                )
            }
            {
                loginValue === "emp" && (
                    <Card sx={{
                        width: "50%",
                        padding: "5%",
                        ml: "20%",
                        bgcolor: "#ebdef0"
                    }}>
                        <form action="" onSubmit={handleSubmitEmp}>
                            <Stack
                                component="form"

                                spacing={2}
                                noValidate
                                autoComplete="off"

                            >
                                <Typography> {error && error}</Typography>
                                <h3>Emplyoee Login</h3>
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

                )
            }


        </Box>
    )
}

export default Loginpage

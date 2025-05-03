import React, { useEffect, useState } from 'react'
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

    //   const navigate = useNavigate()
    //   axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:5050/verify')
            .then(result => {
                if (result.data.Status) {
                    if (result.data.role === "admin") {
                        navigate('/dashboard')
                    } else {
                        navigate('/empdetails/' + result.data.id)
                    }
                } else {
                    navigate('/')

                }
            }).catch(err => console.log(err))
    }, [])




    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5050/auth/adminlogin", values)
            .then(res => {
                if (res.data.loginStatus) {
                    localStorage.setItem("valid", true)
                    navigate("/dashboard")
                } else {
                    setError(res.data.error)
                }
            })
            .catch(error => console.log(error))



    }
    const handleSubmitEmp = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5050/emplyoee/employeeLogin", values)
            .then(res => {
                if (res.data.loginStatus) {
                    localStorage.setItem("valid", true)
                    navigate("/empdetails/" + res.data.id)
                } else {
                    setError(res.data.error)
                }
            })
            .catch(error => console.log(error))



    }
    return (
        // <Box>

        //     <Card sx={{
        //         width: "50%",
        //         padding: "5%",
        //         ml: "20%",
        //         bgcolor: "#ebdef0"
        //     }}>
        //         <form action="" onSubmit={handleSubmit}>
        //             <Stack
        //                 component="form"

        //                 spacing={2}
        //                 noValidate
        //                 autoComplete="off"

        //             >
        //                 <Typography> {error && error}</Typography>
        //                 <h3> Login</h3>
        //                 <TextField
        //                     id="filled-hidden-label-normal"
        //                     label="Email"
        //                     variant="standard"
        //                     type='text'
        //                     fullWidth
        //                     onChange={(e) => setValues({ ...values, email: e.target.value })}
        //                 />
        //                 <TextField
        //                     id="filled-hidden-label-normal"
        //                     label="Password"
        //                     variant="standard"
        //                     type='password'
        //                     fullWidth
        //                     onChange={(e) => setValues({ ...values, password: e.target.value })}


        //                 />


        //             </Stack>

        //             <Button type='submit' sx={{ mt: 2 }} color='primary' variant='contained' >Submit</Button>


        //         </form>
        //     </Card>


        // </Box>


        <Box
        sx={{
            minHeight: '100vh',
            backgroundImage: 'url(https://static.vecteezy.com/system/resources/previews/007/490/829/non_2x/digital-technology-and-engineering-digital-telecoms-concept-hi-tech-futuristic-technology-background-illustration-vector.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 2,
          }}
      >
        <Card
          sx={{
            width: 400,
            padding: 4,
            boxShadow: 4,
            borderRadius: 3,
            bgcolor: 'background.paper',
          }}
        >
          <Typography variant="h5" fontWeight={600} textAlign="center" gutterBottom>
            Welcome Back 👋
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center" mb={3}>
            Please login to your account
          </Typography>
  
          {error && (
            <Typography color="error" textAlign="center" mb={2}>
              {error}
            </Typography>
          )}
  
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                label="Email"
                variant="outlined"
                type="email"
                fullWidth
                size="small"
                onChange={(e) => setValues({ ...values, email: e.target.value })}
              />
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                size="small"
                onChange={(e) => setValues({ ...values, password: e.target.value })}
              />
  
              <Button type="submit" variant="contained" size="large" color="primary" fullWidth>
                Login
              </Button>
            </Stack>
          </form>
  
          <Typography variant="body2" textAlign="center" mt={2}>
            Don’t have an account? <Button size="small">Sign Up</Button>
          </Typography>
        </Card>
      </Box>
    )
}

export default Loginpage

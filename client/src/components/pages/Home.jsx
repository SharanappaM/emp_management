import { Box, Button, Card, Grid, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'

const Home = () => {
  const [totalCategorys, setTotalCategorys] = useState(0)
  const [totalEmployess, setTotalEmployess] = useState(0)
  const [totalSalary, setTotalSalary] = useState(0)
  const [listofAdminData, setListOfAdminData] = useState([])


  const columns = [
    {
      name: 'SL No',
      selector: (row, index) => index + 1,
      sortable: true,
      width: "150px"
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
      width: "150px"
    },
    {
      name: 'Action',
      selector: (row) => (
        <div>
          {/* <Button onClick={() => handelEditEmp(row.id)}>Edit</Button> */}
          <Button variant='contained' color='info'>Edit</Button>
          <Button variant='contained' color='error' sx={{ml:3}}>Delete</Button>
        </div>
      ),
      sortable: true,
      width: "auto"
    },
  ]


  const getData = () => {
    axios.get("http://localhost:5050/auth/listEmployees")
      .then(res => {
        const employees = res.data.result;
        const totalSalary = employees.reduce((sum, employee) => sum + employee.salary, 0); // Sum up the salaries
        setTotalEmployess(employees.length)
        setTotalSalary(totalSalary)
      }).catch(err => {
        console.log(err);

      })
  }

  const getAdminData = () => {

    axios.get("http://localhost:5050/auth/getAdmins")
      .then(res => {
        const adminsData = res.data.result;
        setListOfAdminData(adminsData)

      }).catch(err => {
        console.log(err);

      })
  }

  useEffect(() => {
    getData();
    getAdminData();
  }, [])
  return (
    <>
      <Box>
        <Typography variant='h5' pt={2}>Admin Dashboard</Typography>

        <Grid container spacing={2} pt={2}>
          <Grid item xs={6} md={5} lg={4}>
            <Card sx={{ padding: 5 }}>
              <Typography variant='h6'>Admins</Typography>
              <Typography variant='h6'>2</Typography>

            </Card>
          </Grid>
          <Grid item xs={6} md={2} lg={4}>
            <Card sx={{ padding: 5 }}>
              <Typography variant='h6'>Employess</Typography>
              <Typography variant='h6'>{totalEmployess}</Typography>

            </Card>

          </Grid>
          <Grid item xs={6} md={2} lg={4}>
            <Card sx={{ padding: 5 }}>
              <Typography variant='h6'>Total Salray </Typography>
              <Typography variant='h6'> Rs .{totalSalary}</Typography>

            </Card>

          </Grid>

        </Grid>



      </Box>

      <Box>
        <Typography variant='h6' mt={2}>List of Admins</Typography>
        <Card sx={{width:"60%", mt:"20px"}}>
          <DataTable
            columns={columns}
            data={listofAdminData}

          />
        </Card>


      </Box>
    </>
  )
}

export default Home

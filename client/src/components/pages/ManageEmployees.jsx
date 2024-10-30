import { Avatar, Box, Button, Card, FormControl, IconButton, InputLabel, List, ListItem, ListItemButton, MenuItem, Modal, Select, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DataTable from 'react-data-table-component';
import AddIcon from '@mui/icons-material/Add';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ManageEmployees = () => {

  const [openAddEmployees, setOpenAddEmployees] = useState(false)
  const [openEditEmployees, setOpenEditEmployees] = useState(false)
  const [empId, setEmpId] = useState(null)
  const [addEmployeFoarmData, setAddEmployeFoarmData] = useState({
    name: null,
    email: null,
    password: null,
    salary: null,
    address: null,
    category_id: null,
    emp_image: null

  })
  const [employeesList, setEmployeesList] = useState([])

  
  const [editEmployeFoarmData, setEditEmployeFoarmData] = useState({
    name: null,
    email: null,
    salary: null,
    address: null,
    category_id: null,


  })

  

  const getEmployeesList = () => {
    axios.get("http://localhost:5050/auth/listEmployees")
      .then(res => {
        console.log(res.data);
        setEmployeesList(res.data.result)
     
        
        // setEditEmployeFoarmData({
        //   name: res.data.result[0].name,
        //   email: res.data.result[0].email,
        //   salary: res.data.result[0].salary,
        //   address: res.data.result[0].address,
        //   category_id: res.data.result[0].category_id,
        // })

      }).then(err => {
        console.log(err);

      })
  }

  const [categoryList, setCategoryList] = useState([])

  const getCategoryList = () => {
    axios.get("http://localhost:5050/auth/listCategorys")
      .then(res => {
        console.log(res.data);
        setCategoryList(res.data.result)

      }).then(err => {
        console.log(err);

      })
  }

  useEffect(() => {
    getEmployeesList()
    getCategoryList()
  }, [openAddEmployees, openEditEmployees])

  const handelAddCategorySubmit = (e) => {
    e.preventDefault()

    const newFormData = new FormData();
    newFormData.append("name", addEmployeFoarmData.name)
    newFormData.append("email", addEmployeFoarmData.email)
    newFormData.append("password", addEmployeFoarmData.password)
    newFormData.append("salary", addEmployeFoarmData.salary)
    newFormData.append("address", addEmployeFoarmData.address)
    newFormData.append("category_id", addEmployeFoarmData.category_id)
    newFormData.append("emp_image", addEmployeFoarmData.emp_image)


    axios.post("http://localhost:5050/auth/addEmployees", newFormData)
      .then(res => {
        if (res.data.status) {
          setOpenAddEmployees(false)
          console.log(res.data.msg);
          toast.success(res.data.msg)

        } else {
          alert(res.data.error);

        }

      }).then(err => {
        console.log(err);

      })
  }
  const handelEditCategorySubmit = (e) => {
    e.preventDefault()



    axios.put("http://localhost:5050/auth/editEmployees/" + empId, editEmployeFoarmData)
      .then(res => {
        if (res.data.status) {
          setOpenEditEmployees(false)
          console.log(res.data.msg);
          toast.success(res.data.msg)

        } else {
          alert(res.data.error);

        }

      }).then(err => {
        console.log(err);

      })
  }

  const handelEditEmp = (employeesList) => {
    setEmpId(employeesList)
    setOpenEditEmployees(true)
  }



  const columns = [
    {
      name: 'SL No',
      selector: (row, index) => index + 1,
      sortable: true,
      width: "150px"
    },
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
      width: "150px"
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
      width: "auto"
    },
    {
      name: 'Salary',
      selector: row => row.salary,
      sortable: true,
      width: "auto"
    },
    {
      name: 'Address',
      selector: row => row.address,
      sortable: true,
      width: "auto"
    },
    {
      name: 'Category Id',
      selector: row => row.category_id,
      sortable: true,
      width: "auto"
    },
    {
      name: 'Iamge',
      selector: (row) => (
        <div>
         <Avatar alt="Remy Sharp" src={`http://localhost:5050/images/${row.emp_image}`} />
          {/* <img  width="50px" alt="" /> */}
        </div>
      ),
      sortable: true,
      width: "auto"
    },
    {
      name: 'Action',
      selector: (row) => (
        <div>
          <Button onClick={() => handelEditEmp(row.id)}>Edit</Button>
          <Button onClick={() => handelDeleteEmp(row.id)} >Delete</Button>
        </div>
      ),
      sortable: true,
      width: "auto"
    },


  ]

  const handelDeleteEmp = (employeesList) => {

    axios.delete("http://localhost:5050/auth/employees/" + employeesList)
      .then(res => {
        if (res.data.status) {
          window.location.reload();
          console.log(res.data.msg);
          toast.success(res.data.msg)

        } else {
          alert(res.data.msg + "delete");

        }

      }).then(err => {
        console.log(err);

      })
  }


  return (
    <div>

      <div>
        <ToastContainer position='bottom-right' />
      </div>



      <br />

      <Button color='success' variant="contained" startIcon={<AddIcon />} onClick={() => setOpenAddEmployees(true)}>
        Add Employee
      </Button>
      <br />
      <br />




      <Modal
        open={openAddEmployees}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box display="flex" justifyContent="space-between">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add Employeses
            </Typography>
            <IconButton color='error' onClick={() => setOpenAddEmployees(false)} >
              <CancelIcon />
            </IconButton>
          </Box>

          <form action="" onSubmit={handelAddCategorySubmit}>
            <Box>
              <TextField
                id="filled-hidden-label-normal"
                label="Name"
                variant="standard"
                type='text'
                fullWidth
                
                onChange={(e) => setAddEmployeFoarmData({ ...addEmployeFoarmData, name: e.target.value })}
              />
              <TextField
                id="filled-hidden-label-normal"
                label="Email"
                variant="standard"
                type='text'
                fullWidth
                onChange={(e) => setAddEmployeFoarmData({ ...addEmployeFoarmData, email: e.target.value })}
              />
              <TextField
                id="filled-hidden-label-normal"
                label="Password"
                variant="standard"
                type='text'
                fullWidth
                onChange={(e) => setAddEmployeFoarmData({ ...addEmployeFoarmData, password: e.target.value })}
              />
              <TextField
                id="filled-hidden-label-normal"
                label="Salray"
                variant="standard"
                type='text'
                fullWidth
                onChange={(e) => setAddEmployeFoarmData({ ...addEmployeFoarmData, salary: e.target.value })}
              />
              <TextField
                id="filled-hidden-label-normal"
                label="Address"
                variant="standard"
                type='text'
                fullWidth
                onChange={(e) => setAddEmployeFoarmData({ ...addEmployeFoarmData, address: e.target.value })}
              />

              <FormControl fullWidth variant="standard"  >
                <InputLabel id="demo-simple-select-standard-label"> Category</InputLabel>
                <Select
                  onChange={(e) => setAddEmployeFoarmData({ ...addEmployeFoarmData, category_id: e.target.value })}
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  // value={age}
                  // onChange={handleChange}
                  label="Category"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {
                    categoryList.map((item, index) => (
                      <MenuItem value={item.id}>{item.name}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>

              <br />
              <InputLabel id="demo-simple-select-standard-label">Select Image </InputLabel>
              <input type="file" name='emp_image' onChange={(e) => setAddEmployeFoarmData({ ...addEmployeFoarmData, emp_image: e.target.files[0] })} />
              <br />

              <Button type='submit' sx={{ mt: 2 }} color='primary' variant='contained' >Submit</Button>
            </Box>

          </form>


        </Box>
      </Modal>



      <Modal
        open={openEditEmployees}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box display="flex" justifyContent="space-between">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Edit Employese
            </Typography>
            <IconButton color='error' onClick={() => setOpenEditEmployees(false)} >
              <CancelIcon />
            </IconButton>
          </Box>

          <form action="" onSubmit={handelEditCategorySubmit}>
            <Box>
              <TextField
                id="filled-hidden-label-normal"
                label="Name"
                variant="standard"
                type='text'
                value={editEmployeFoarmData.name}
                fullWidth
                onChange={(e) => setEditEmployeFoarmData({ ...editEmployeFoarmData, name: e.target.value })}
              />
              <TextField
                id="filled-hidden-label-normal"
                label="Email"
                variant="standard"
                type='text'
                fullWidth
                onChange={(e) => setEditEmployeFoarmData({ ...editEmployeFoarmData, email: e.target.value })}
              />

              <TextField
                id="filled-hidden-label-normal"
                label="Salray"
                variant="standard"
                type='text'
                fullWidth
                onChange={(e) => setEditEmployeFoarmData({ ...editEmployeFoarmData, salary: e.target.value })}
              />
              <TextField
                id="filled-hidden-label-normal"
                label="Address"
                variant="standard"
                type='text'
                fullWidth
                onChange={(e) => setEditEmployeFoarmData({ ...editEmployeFoarmData, address: e.target.value })}
              />

              <FormControl fullWidth variant="standard"  >
                <InputLabel id="demo-simple-select-standard-label"> Category</InputLabel>
                <Select
                  onChange={(e) => setEditEmployeFoarmData({ ...editEmployeFoarmData, category_id: e.target.value })}
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  // value={age}
                  // onChange={handleChange}
                  label="Category"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {
                    categoryList.map((item, index) => (
                      <MenuItem value={item.id}>{item.name}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>



              <Button type='submit' sx={{ mt: 2 }} color='primary' variant='contained' >Submit</Button>
            </Box>

          </form>


        </Box>
      </Modal>


      <Card>
        <DataTable
          title="Employees List"
          columns={columns}
          data={employeesList}
        />
      </Card>


    </div>
  )
}

export default ManageEmployees


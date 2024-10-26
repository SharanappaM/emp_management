import { Box, Button, IconButton, List, ListItem, ListItemButton, Modal, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const Category = () => {

    const [openAddCategory, setOpenAddCategory] = useState(false)
    const [category, setCategory] = useState(null)

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
        getCategoryList()
    }, [openAddCategory])

    const handelAddCategorySubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:5050/auth/addCategory", category)
            .then(res => {
                if (res.data.status) {
                    setOpenAddCategory(false)
                    console.log(res.data.msg);
                    toast.success(res.data.msg)

                } else {
                    alert(res.data.error);

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

            <Button onClick={() => setOpenAddCategory(true)}>Add Category</Button>




            <Modal
                open={openAddCategory}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box display="flex" justifyContent="space-between">
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Add Category
                        </Typography>
                        <IconButton color='error' onClick={() => setOpenAddCategory(false)} >
                            <CancelIcon />
                        </IconButton>
                    </Box>

                    <form action="" onSubmit={handelAddCategorySubmit}>
                        <Box>
                            <TextField
                                id="filled-hidden-label-normal"
                                label="Category"
                                variant="standard"
                                type='text'
                                fullWidth
                                onChange={(e) => setCategory({ ...category, category: e.target.value })}
                            />

                            <Button type='submit' sx={{ mt: 2 }} color='primary' variant='contained' >Submit</Button>
                        </Box>

                    </form>


                </Box>
            </Modal>


            <Box sx={{
                width:"50%",
                bgcolor:"lightgray",
                minHeight:"10vh",
                // overflow:"auto"
            }}>
                <Typography variant='h5'>Categort List</Typography>
                <List disablePadding >
                    {categoryList.map((item, index) => (
                        // <li key={index}>{item.name}</li>
                        <ListItemButton>
                            <ListItem>{item.name}</ListItem>
                        </ListItemButton>

                    ))}
                </List>
            </Box>


        </div>
    )
}

export default Category
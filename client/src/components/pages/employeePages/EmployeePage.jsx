import { AppBar, Box, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import * as React from 'react';
import PropTypes from 'prop-types';
import { Outlet, useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SchemaIcon from '@mui/icons-material/Schema';
import Groups2Icon from '@mui/icons-material/Groups2';
import ContactsIcon from '@mui/icons-material/Contacts';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import LightModeIcon from '@mui/icons-material/LightMode';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DehazeIcon from '@mui/icons-material/Dehaze';
const drawerWidth = 240;

function EmployeePage(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);
    const navigate = useNavigate();

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const drawer = (
        <div>
            <h3 style={{marginLeft:"60px", color:"purple"}}>EMP.com</h3>
            {/* <Divider /> */}
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate("/dashboard")}>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItemButton>

                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate("/dashboard/manageEmployees")}>

                        <ListItemIcon>

                            <Groups2Icon />
                        </ListItemIcon>
                        <ListItemText primary="Manage Emp" />
                    </ListItemButton>

                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate("/dashboard/category")}>
                        <ListItemIcon>
                            <SchemaIcon />
                        </ListItemIcon>
                        <ListItemText primary="Category" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <ContactsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Profiles" />
                    </ListItemButton>
                </ListItem>

            </List>
        </div>
    );

    // Remove this const when copying and pasting into your project.
    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
            color='secondary'
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <DehazeIcon/>
                    </IconButton>

                    <Box  display="flex" justifyContent="flex-end" width="100%">
                        <IconButton color='inherit' onClick={()=>navigate("/")} ><LogoutIcon /></IconButton>
                        <IconButton color='inherit'><SettingsIcon /></IconButton>
                        <IconButton color='inherit'><LightModeIcon /></IconButton>
                        <IconButton color='inherit'><NotificationsIcon /></IconButton>
                        <IconButton color='inherit'><AccountCircleIcon /></IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Box mt={5}>
                    <Outlet />
                </Box>

            </Box>
        </Box>
    );
}

EmployeePage.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * Remove this when copying and pasting into your project.
     */
    window: PropTypes.func,
};

export default EmployeePage;

 

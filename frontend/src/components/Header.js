import React, { useState } from 'react'
import { AppBar, Button, Toolbar, Typography, Box, Tabs, Tab } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store';
const Header = () => {
    const dispath = useDispatch();
    const isLoggedIn = useSelector((state) => state.isLoggedIn);

    const [value, setValue] = useState();
    return (
        <AppBar
            position='sticky'
            sx={{ background: "linear-gradient(90deg, rgba(117,192,203,0.8687850140056023) 0%, rgba(128,128,223,0.8519782913165266) 35%, rgba(101,153,163,1) 100%)" }}>
            <Toolbar>
                <Typography variant='h4'>VivekBlogs</Typography>
                {isLoggedIn && (<Box display="flex" marginLeft={'auto'} marginRight='auto'>
                    <Tabs
                        textColor='inherit'
                        value={value}
                        onChange={(e, val) => setValue(val)}>
                        <Tab LinkComponent={Link}
                            to="/blogs" label="All Blogs" />
                        <Tab LinkComponent={Link}
                            to="/myBlogs" label="My Blogs" />
                        <Tab LinkComponent={Link}
                            to="/blogs/add" label="Add Blogs" />

                    </Tabs>
                </Box>)}
                <Box display="flex" marginLeft="auto">
                    {!isLoggedIn && (
                        <>
                            {" "}
                            <Button
                                LinkComponent={Link} to="/auth"
                                variant='contained'
                                sx={{ margin: 1, borderRadius: 10 }}
                                color="secondary">

                                Login
                            </Button>

                            <Button
                                LinkComponent={Link} to="/auth"
                                variant='contained'
                                sx={{ margin: 1, borderRadius: 10 }}
                                color="secondary">
                                Signup
                            </Button >
                        </>
                    )}
                    {isLoggedIn && (<Button
                        onClick={() => dispath(authActions.logout())}
                        LinkComponent={Link}
                        to="/auth"
                        variant='contained'
                        sx={{ margin: 1, borderRadius: 10 }}
                        color="secondary">
                        Logout
                    </Button>)}

                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
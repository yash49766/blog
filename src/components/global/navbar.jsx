import React, { useState, useEffect } from 'react';
import {
    AppBar, Box, Toolbar, IconButton, Typography,
    Drawer, List, ListItem, ListItemText, Link as MuiLink
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme, useMediaQuery } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
// import Logo from '/logo.png'; // adjust path as needed

const navLinks = [
    { label: 'Blog', href: '/' },
    { label: 'Find an Idea', href: '/find-an-idea' },
    { label: 'Starting Up', href: '/starting-up' },
    { label: 'Marketing', href: '/marketing' },
    { label: 'Latest', href: '/latest' },
];

function Navbar() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeLink, setActiveLink] = useState('');
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const toggleDrawer = (open) => () => setDrawerOpen(open);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <AppBar position="sticky" sx={{ color: '#000', backgroundColor: 'white' }}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    {/* Left: Logo */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {/*<img src={Logo} alt="Logo" style={{ height: 32, marginRight: 20 }} />*/}
                        LOGo
                    </Box>

                    {/* Center: Full Nav for Desktop */}
                    {!isMobile && (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: 6,
                                px: 5,
                                py: 2,
                                // backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                // borderRadius: '16px',
                                // boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                                backdropFilter: 'blur(10px)',
                                position: 'sticky',
                                top: 0,
                                zIndex: 1000,
                                // border: '1px solid rgba(0, 0, 0, 0.05)',
                            }}
                        >
                            {navLinks.map(({ label, href }) => (
                                <MuiLink
                                    key={label}
                                    component={RouterLink}
                                    to={href}
                                    underline="none"
                                    onClick={() => setActiveLink(label)}
                                    sx={{
                                        position: 'relative',
                                        fontWeight: 600,
                                        fontSize: '1rem',
                                        letterSpacing: '0.5px',
                                        color: scrolled ? '#000' : '#000',
                                        px: 1,
                                        py: 0.5,
                                        transition: 'color 0.3s ease',
                                        '&:hover': {
                                            color: '#1976d2',
                                        },
                                        '&::after': {
                                            content: '""',
                                            position: 'absolute',
                                            left: 0,
                                            bottom: 0,
                                            height: '2px',
                                            width: activeLink === label ? '100%' : '0',
                                            backgroundColor: '#1976d2',
                                            transition: 'width 0.3s ease',
                                        },
                                        '&:hover::after': {
                                            width: '100%',
                                        },
                                    }}
                                >
                                    {label}
                                </MuiLink>
                            ))}
                        </Box>
                    )}


                    {/* Right: Icons */}
                    <Box display="flex" alignItems="center" gap={2}  sx={{ display: { xs: 'flex', md: 'none' } }}>

                        <IconButton sx={{ color: '#000' }} onClick={toggleDrawer(true)}>
                            <MenuIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Drawer */}
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                ModalProps={{ keepMounted: true }}
                PaperProps={{
                    sx: {
                        width: 330,
                        p: 0,
                        position: 'fixed',
                        right: 0,
                        boxShadow: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                    },
                }}
            >
                <IconButton
                    onClick={toggleDrawer(false)}
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        backgroundColor: '#000000',
                        color: 'white',

                        width: 36,
                        height: 36,
                        fontSize: 18,
                        zIndex: 1,
                    }}
                >
                    ×
                </IconButton>

                <Box display="flex" alignItems="center" mt={6} mb={3} ml={2}>
                    {/*<Box component="img" src={Logo} alt="Logo" sx={{ width: 75, height: 75, mr: 1 }} />*/}

                    <Box>
                        <Box sx={{ fontWeight: 700, color: 'black', fontSize: '30px', lineHeight: 1 }}>
                            LOGo
                        </Box>

                    </Box>
                </Box>

                <List sx={{ flexGrow: 1, paddingBottom: 0 }}>
                    {navLinks.map(({ label, href }) => (
                        <ListItem
                            button
                            key={label}
                            component={RouterLink}
                            to={href}
                            onClick={() => {
                                setActiveLink(label);
                                toggleDrawer(false)();
                            }}
                            sx={{
                                px: 3,
                                borderLeft: activeLink === label ? '4px solid #000000' : 'none',
                                backgroundColor: activeLink === label ? 'rgba(0,0,0,0.05)' : 'transparent',
                            }}
                        >
                            <ListItemText
                                primary={label}
                                primaryTypographyProps={{
                                    fontWeight: 600,
                                    color: 'black',
                                }}
                            />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </>
    );
}

export default Navbar;

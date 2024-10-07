'use client'
import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Button, Drawer, List, ListItem, ListItemText, Container, Stack } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../assets/logo.png';
import AnimatedButton from '@/lib/animatated/animatedButton';
import useUserInfo from '@/hooks/userUserInfo';
import Loading from '../loading/loading';
import { useSelector } from 'react-redux';
import { logoutUser } from '@/services/actions/logoutUser';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const Navbar = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [showNavbar, setShowNavbar] = useState(true); // To control navbar visibility
    const [lastScrollY, setLastScrollY] = useState(0);  // To track the last scroll position
    const isLoading = useSelector((state: any) => state.loading.isLoading);
    const userInfo = useUserInfo();
    const router = useRouter();

    // Function to toggle the drawer
    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    // Function to close the drawer when a link is clicked
    const handleLinkClick = () => {
        setIsDrawerOpen(false);
    };

    // Function to handle logout
    const handleLogOut = () => {
        logoutUser(router);
        toast.success('User logged out!!')
    };

    // Scroll handler
    const handleScroll = () => {
        if (window.scrollY > lastScrollY) {
            // Scrolling down
            setShowNavbar(false);
        } else {
            // Scrolling up
            setShowNavbar(true);
        }
        setLastScrollY(window.scrollY);
    };

    // Set up scroll event listener
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    const menuItems = [
        { text: 'Home', link: '/' },
        { text: 'About Us', link: '/about' },
        { text: 'Success Story', link: '/success-story' },
        { text: 'Freelancing', link: '#freelancing' },
        { text: 'Contact', link: '/contact' },
    ];

    if (userInfo.email) {
        menuItems.push({ text: 'Dashboard', link: '/dashboard' });
    }
    if (userInfo.role ==='student') {
        menuItems.splice(2,1)
        menuItems.push({ text: 'My Courses', link: '/dashboard/student/my-course' });
    }

    return (
        <Container>
            {/* Conditionally show/hide the navbar based on scroll */}
            <Stack
                py={4}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                    display: showNavbar ? 'flex' : 'none', // Show/hide navbar based on scroll
                    transition: 'transform 0.3s ease', // Add smooth transition for the hide/show effect
                }}
            >
                {/* Logo */}
                <Typography variant="h6" component={Link} href="/">
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Image src={logo} alt="logo" />
                    </motion.div>
                </Typography>

                {/* Desktop Menu */}
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    gap={4}
                    sx={{ display: { xs: 'none', md: 'flex' } }}
                >
                    {menuItems.map((item) => (
                        <motion.div key={item.text} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Typography sx={{ fontWeight: 700 }} color="inherit" component={Link} href={item.link}>
                                {item.text}
                            </Typography>
                        </motion.div>
                    ))}
                    {isLoading ? (
                        <Loading />
                    ) : (
                        userInfo?.role ? (
                            <AnimatedButton onClick={handleLogOut} name="Logout" />
                        ) : (
                            <Typography sx={{ fontWeight: 700 }} color="inherit">
                                <Link href="/login">Login</Link>
                            </Typography>
                        )
                    )}
                </Stack>

                {/* Mobile Menu Icon */}
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ display: { xs: 'block', md: 'none' } }}
                    onClick={toggleDrawer}
                >
                    <MenuIcon />
                </IconButton>

                {/* Mobile Drawer */}
                <Drawer
                    PaperProps={{
                        style: {
                            width: 300, // Set your custom width here
                        },
                    }}
                    anchor="right"
                    open={isDrawerOpen}
                    onClose={toggleDrawer}
                >
                    <Box display="flex" justifyContent="center" alignItems="center" margin={8}>
                        <List sx={{ width: 250 }}>
                            {menuItems.map((item) => (
                                <motion.div key={item.text} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                    <Typography
                                        sx={{ fontWeight: 700, fontSize: '20px', textDecoration: 'none', marginTop: '40px' }}
                                        color="inherit"
                                        component={Link}
                                        href={item.link}
                                        onClick={handleLinkClick}
                                    >
                                        {item.text}
                                    </Typography>
                                </motion.div>
                            ))}
                            {isLoading ? (
                                <Loading />
                            ) : (
                                userInfo?.role && (
                                    <Button sx={{ marginTop: '20px', marginBottom: '20px' }}>Logout</Button>
                                )
                            )}
                            <AnimatedButton name="Browse Course" />
                        </List>
                    </Box>
                </Drawer>
            </Stack>
        </Container>
    );
};

export default Navbar;

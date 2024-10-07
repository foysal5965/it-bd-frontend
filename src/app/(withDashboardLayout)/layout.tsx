'use client';

import { useEffect, useState } from 'react';
import {
    Box, CssBaseline, Drawer, List, ListItem, ListItemIcon, ListItemText, AppBar, Toolbar, Typography, IconButton, Collapse,
    Button,
} from '@mui/material';
import { Class, Group, Inbox, Menu, Person, School, ExpandLess, ExpandMore, Category, Create, Update } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { getUserInfo, isLoggedIn } from '@/services/authService';
import Loading from '@/components/shared/loading/loading';
import Link from 'next/link';
import logo from '@/assets/logo.png'
import Image from 'next/image';
import AnimatedButton from '@/lib/animatated/animatedButton';
import { logoutUser } from '@/services/actions/logoutUser';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

const drawerWidth = 240;

const menuItems: any = {
    student: [
        { text: 'My Courses', icon: <Class />, href: '/dashboard/student/my-course' },
        {
            text: 'Profile',
            icon: <Person />,
            submenu: [
                { text: 'View Profile', href: '/dashboard/view' },
                { text: 'Edit Profile', href: '/dashboard/edit' },
                { text: 'Change Password', href: '/dashboard/change-password' },
            ],
        },

    ],
    admin: [
        {
            text: 'Course Category', icon: <Category />, submenu: [
                { text: 'Categories', icon: <Category />, href: '/dashboard/admin/courseCategory' },
                { text: 'Create Category', icon: <Create />, href: '/dashboard/admin/courseCategory/create' }
            ]
        },
        {
            text: 'Courses', icon: <Class />, submenu: [
                { text: 'Course', icon: <Class />, href: '/dashboard/admin/course' },
                { text: 'Create Course', icon: <Create />, href: '/dashboard/admin/course/create' }
            ]
        },
        { text: 'Students', icon: <Group />, href: '/dashboard/admin/student' },
        {
            text: 'Profile',
            icon: <Person />,
            submenu: [
                { text: 'View Profile', href: '/dashboard/view' },
                { text: 'Edit Profile', href: '/dashboard/edit' },
                { text: 'Change Password', href: '/dashboard/change-password' },
            ],
        },
    ],
    super_admin: [
        {
            text:'Admin', icon:<SupervisorAccountIcon/>, submenu:[
                {text:'Admins', href:'/dashboard/super-admin/admin'},
                {text:'Create admin', href:'/dashboard/super-admin/admin/create'},
            ]
        },

        {
            text: 'Course Category', icon: <Category />, submenu: [
                { text: 'Categories', icon: <Category />, href: '/dashboard/admin/courseCategory' },
                { text: 'Create Category', icon: <Create />, href: '/dashboard/admin/courseCategory/create' }
            ]
        },
        {
            text: 'Courses', icon: <Class />, submenu: [
                { text: 'Course', icon: <Class />, href: '/dashboard/admin/course' },
                { text: 'Create Course', icon: <Create />, href: '/dashboard/admin/course/create' }
            ]
        },
        { text: 'Students', icon: <Group />, href: '/dashboard/admin/student' },
        {
            text: 'Profile',
            icon: <Person />,
            submenu: [
                { text: 'View Profile', href: '/dashboard/view' },
                { text: 'Edit Profile', href: '/dashboard/edit' },
                { text: 'Change Password', href: '/dashboard/change-password' },
            ],
        },
    ],
    // Add more roles here if needed
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [role, setRole] = useState<'student' | 'admin' | 'super_admin' | null>(null);
    const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null); // Track the open menu index for dropdown
    const [showLogo, setShowLogo] = useState(true);
    const [lastScrollPos, setLastScrollPos] = useState(0);
    const router = useRouter();

    const handleLogOut = () => {
        logoutUser(router);
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleMenuClick = (index: number) => {
        // Toggle the dropdown menu
        setOpenMenuIndex(openMenuIndex === index ? null : index);
    };

    useEffect(() => {
        const checkAuthStatus = async () => {
            const LoggedIn = isLoggedIn();
            if (!LoggedIn) {
                router.push('/login');
                return;
            }

            const { role } = getUserInfo() as any;
            if (role) {
                setRole(role);
                setIsLoading(false);
            }
        };

        checkAuthStatus();
    }, [router]);
    // Scroll event listener to handle logo show/hide
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
            if (currentScrollPos > lastScrollPos) {
                // Scrolling down
                setShowLogo(false);
            } else {
                // Scrolling up
                setShowLogo(true);
            }
            setLastScrollPos(currentScrollPos);
        };

        window.addEventListener('scroll', handleScroll);

        // Cleanup event listener on unmount
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollPos]);
    if (isLoading) {
        return <Loading />;
    }

    if (!role || !menuItems[role]) {
        return <Typography variant="h6">Unauthorized access</Typography>;
    }

    const contentVariants = {
        hidden: { opacity: 0, x: '100vw' },
        visible: {
            opacity: 1,
            x: 0,
            transition: { type: 'spring', stiffness: 80, damping: 20 },
        },
        exit: { opacity: 0, x: '-100vw', transition: { ease: 'easeInOut' } },
    };

    const drawer = (
        <div>
            <Toolbar />
            <List>
                {menuItems[role].map((item: any, index: number) => (
                    <div key={item.text}>
                        <ListItem

                            onClick={() => (item.submenu ? handleMenuClick(index) : null)}
                            component={item.submenu ? 'div' : Link}
                            href={item.submenu ? undefined : item.href}
                            passHref
                            sx={{ display: 'flex', justifyContent: 'space-between' }}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                            {item.submenu ? (openMenuIndex === index ? <ExpandLess /> : <ExpandMore />) : null}
                        </ListItem>

                        {item.submenu && (
                            <Collapse in={openMenuIndex === index} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {item.submenu.map((subitem: any) => (
                                        <Link href={subitem.href} passHref key={subitem.text}>
                                            <ListItem
                                                sx={{ pl: 4 }}

                                                component={motion.li}
                                                whileHover={{ scale: 1.05 }}
                                            >
                                                <ListItemText primary={subitem.text} />
                                            </ListItem>
                                        </Link>
                                    ))}
                                </List>
                            </Collapse>
                        )}
                    </div>
                ))}
            </List>

            <Button  sx={{
                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', // Gradient color
                borderRadius: '15px', // Rounded button
                padding: '10px 20px',
                color: '#fff', // Text color
                fontSize: '15px',
                fontWeight: 'bold',
                marginLeft:'30px',
                width:'150px' // Initial shadow

            }} onClick={handleLogOut}>Logout</Button>
        </div>
    );

    return (
        <Box sx={{ display: 'flex' }}>


            {/* AppBar */}
            {
                showLogo && (
                    <AppBar

                        sx={{
                            width: { md: `calc(100% - ${drawerWidth}px)` },
                            ml: { md: `${drawerWidth}px`, backgroundColor: 'rgba(255, 255, 255, 0.2)' },
                        }}
                    >
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                onClick={handleDrawerToggle}
                                sx={{ mr: 2, display: { md: 'none' } }}
                            >
                                <Menu />
                            </IconButton>
                            <Link href='/'><Image src={logo} alt='logo' /></Link>
                        </Toolbar>
                    </AppBar>
                )
            }


            {/* Drawer/Sidebar */}
            <Box
                component="nav"
                sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
                aria-label="mailbox folders"
            >
                {/* Mobile drawer */}
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>

                {/* Permanent drawer */}
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>

            {/* Main content */}
            <Box
                component={motion.main}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={contentVariants}
                sx={{
                    flexGrow: 1,
                    p: { xs: 2, md: 3 }, // Adjust padding based on screen size
                    width: { md: `calc(100% - ${drawerWidth}px)` },
                }}
            >
                <Toolbar />

                {children}
            </Box>
        </Box>
    );
};

export default DashboardLayout;

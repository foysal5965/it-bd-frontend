
'use client'
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import AnimatedButton from "@/lib/animatated/animatedButton";
import banner from "@/assets/banner.jpg";
import { motion } from 'framer-motion';
import Link from "next/link";


const HeroSection = () => {
    return (
        <Container>
            <Box
                sx={{// Full viewport height
                    // height:'440px',
                    display: 'flex',
                    alignItems: 'center', // Vertically center content
                    justifyContent: 'center', // Horizontally center content
                    background: 'linear-gradient(135deg, rgba(254, 240, 230, 0.1) 30%, rgba(255, 142, 83, 0.1) 90%)', // Gradient background
                    text: 'black',
                    padding:'20px',
                    marginTop:'20px',
                    marginBottom:'40px',
                    borderRadius:'20px'
                    
                }}
            >
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                    {/* Left Section: Hero Text */}
                    <Grid item xs={12} md={6}>
                        <motion.div
                            initial={{ opacity: 0, x: -100 }} // Initial state
                            animate={{ opacity: 1, x: 0 }} // Final state
                            transition={{ duration: 1, ease: 'easeInOut' }} // Animation timing
                        >
                            <Typography component="p" fontSize='20px' fontWeight='bold'>
                                Unlish Your Potential
                            </Typography>
                            <Typography fontSize='43px' color="#212529" fontWeight='bold'>                   Become an IT Pro &
                            </Typography>
                            <Typography fontSize='43px' color="#212529" fontWeight='bold'>
                                Rule The <Typography component='span'
                                    sx={{
                                        background: 'linear-gradient(45deg, #FE6B8B, #FF8E53)', // Gradient colors
                                        WebkitBackgroundClip: 'text', // Ensures gradient applies only to text
                                        WebkitTextFillColor: 'transparent', // Makes the text itself transparent
                                        fontSize: '40px', // Customize the font size
                                        fontWeight: 'bold', // Customize the font weight
                                    }}
                                >                       Digital World
                                </Typography>
                                <Typography sx={{ my: 2, fontSize: '16px' }}>
                                    With a vision to turn manpower into assets, Creative IT Institute is ready to enhance your learning experience with skilled mentors and updated curriculum. Pick your desired course from more than 30 trendy options.
                                </Typography>
                                <Box sx={{ display: "flex", gap: 2 }}>
                                    <Link href={'/courses'}>
                                    <AnimatedButton name='Browse Course' />
                                    </Link>

                                    <AnimatedButton name='Join Free Seminer' variant='contained' />
                                </Box>
                            </Typography>

                        </motion.div>
                    </Grid>

                    {/* Right Section: Image or Illustration */}
                    <Grid item xs={12} md={6}>
                        <motion.div
                            initial={{ opacity: 0, x: 100 }} // Initial state
                            animate={{ opacity: 1, x: 0 }} // Final state
                            transition={{ duration: 1, ease: 'easeInOut' }} // Animation timing
                        >
                            <Image
                                src={banner}
                                alt="hero image"
                                
                            />
                        </motion.div>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default HeroSection;





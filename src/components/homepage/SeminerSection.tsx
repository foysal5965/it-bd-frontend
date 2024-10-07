'use client'
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import AnimatedButton from "@/lib/animatated/animatedButton";
import seminer from "@/assets/seminar.jpeg";
import { motion } from 'framer-motion';
const SeminerSection = () => {
  return (
    <Container>
            <Box
                sx={{
                    height: '100vh', // Full viewport height
                    display: 'flex',
                    alignItems: 'center', // Vertically center content
                    justifyContent: 'center', // Horizontally center content
                    background: 'linear-gradient(135deg, rgba(254, 240, 230, 0.1) 30%, rgba(255, 142, 83, 0.1) 90%)', // Gradient background
                    padding: '16px',
                    text: 'black',
                    marginTop:10,
                    marginBottom:10,
                    borderRadius:'30px'
                }}
            >
                <Grid container spacing={4} alignItems="center" justifyContent="center">
                    {/* Left Section: Hero Text */}
                    <Grid item xs={12} md={6}>
                        <motion.div
                            initial={{ opacity: 0, x: -100 }} // Initial state
                            animate={{ opacity: 1, x: 0 }} // Final state
                            transition={{ duration: 1, ease: 'easeInOut' }} // Animation timing
                        >
                            
                            <Typography fontSize='43px' color="#212529" fontWeight='bold'>Join Our Free Seminers
                            </Typography>
                            <Typography fontSize='43px' color="#212529" fontWeight='bold'>
                                 
                                <Typography sx={{ my: 2, fontSize: '16px' }}>
                                Need guidelines to choose a suitable course? Join our free seminars to consult with our experts, they will guide you to pick the course that matches your interest and discuss the career prospects.
                                </Typography>
                                <Box sx={{ display: "flex", gap: 2 }}>
                                    <AnimatedButton name='Free Seminer Schedule' />
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
                                src={seminer}
                                alt="hero image"
                                
                            />
                        </motion.div>
                    </Grid>
                </Grid>
            </Box>
        </Container>
  )
};

export default SeminerSection;

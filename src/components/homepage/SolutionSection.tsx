'use client'
import { Grid, Container, Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";
import lifetime from "@/assets/icons/lifetime.png"
import placement from "@/assets/icons/placement.png"
import videos from "@/assets/icons/vedios.png"

const containerVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring",
            stiffness: 50,
            damping: 20,
            staggerChildren: 0.3,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
};

const SolutionSection = () => {
    return (
        <Container>
            <Box sx={{ flexGrow: 1, py: 5, marginTop: '50px' }}>
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <Typography align="center" component='h1' sx={{ fontSize: '40px', fontWeight: 'bold' }}>Exclusive Solutions that Set Us Apart</Typography>
                    <Box sx={{ color: '#605f62', paddingTop: '15px', paddingBottom: '58px' }} fontWeight={400}>
                        <Typography align="center">Our aim is to make your learning experience the best possible by providing you with additional facilities</Typography>
                        <Typography align="center">that will help you to grow without bounds.</Typography>
                    </Box>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={6} md={4}>
                            <motion.div variants={itemVariants}>
                                <Box
                                    sx={{
                                        p: 5,
                                        borderRadius: 2,
                                        background: 'linear-gradient(135deg, rgba(254, 240, 230, 0.1) 30%, rgba(255, 142, 83, 0.1) 90%)',
                                    }}
                                >
                                    <Image src={lifetime} alt="lifetime" />
                                    <Typography variant="h5" fontSize='22px' fontWeight='bold' paddingTop='12px' paddingBottom='16px' gutterBottom>
                                        Lifetime Support
                                    </Typography>
                                    <Typography color="#605f62">

                                        Creative IT and its students share a lifetime bond. We strengthen our bond with you by providing lifelong support that helps you overcome any problem in your career path even after completing your course. Our expert support team ensures 24-hour service to all of our students. The personalized feedback that you receive from us, helps you grow, every day.
                                    </Typography>
                                </Box>
                            </motion.div>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <motion.div variants={itemVariants}>
                                <Box
                                    sx={{
                                        p: 5,
                                        borderRadius: 2,
                                        background: 'linear-gradient(135deg, rgba(254, 240, 230, 0.1) 30%, rgba(255, 142, 83, 0.1) 90%)',
                                    }}
                                >
                                    <Image src={placement} alt="placement" />
                                    <Typography variant="h5" fontSize='22px' fontWeight='bold' paddingTop='12px' paddingBottom='16px' gutterBottom>
                                        Career Placement Support
                                    </Typography>
                                    <Typography color="#605f62">
                                        Our career placement department is ready to help you find a lucrative job. We ensure your resume gets into the hands of the right hiring manager.  So far this department has helped more than 16000 students to find jobs in competitive global platforms. Promising a better future, we have successfully raised the job placement rate to 66% in 2023.
                                    </Typography>
                                </Box>
                            </motion.div>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <motion.div variants={itemVariants}>
                                <Box
                                    sx={{
                                        p: 5,
                                        borderRadius: 2,
                                        background: 'linear-gradient(135deg, rgba(254, 240, 230, 0.1) 30%, rgba(255, 142, 83, 0.1) 90%)',
                                    }}
                                >
                                    <Image src={videos} alt="lifetime" />
                                    <Typography variant="h5" fontSize='22px' fontWeight='bold' paddingTop='12px' paddingBottom='16px' gutterBottom>
                                        Class Videos
                                    </Typography>
                                    <Typography color="#605f62">
                                        No need to worry if you miss a topic in the class. We record most of our classes so that students who miss a session can still get the information they need. They can watch the videos again and again until they understand the topic thoroughly. Our motto is to provide you a flexible learning experience to gradually improve your competence.
                                    </Typography>
                                </Box>
                            </motion.div>
                        </Grid>
                    </Grid>
                </motion.div>
            </Box>
        </Container>
    );
};

export default SolutionSection;

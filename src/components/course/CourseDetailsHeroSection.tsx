
'use client'
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import AnimatedButton from "@/lib/animatated/animatedButton";
import banner from "@/assets/banner.jpg";
import { motion } from 'framer-motion';
import { useState } from "react";
import AdmissionModal from "../modal/AddminssionModal";
import { getUserInfo } from "@/services/authService";
import { useUserQuery } from "@/redux/api/userApi";
import { useSelector } from "react-redux";
import useUserInfo from "@/hooks/userUserInfo";
import { useStudentQuery } from "@/redux/api/studentApi";
import Link from "next/link";
import SeminerModal from "../modal/SeminerModal";


interface User {
    role?: string
}
const CourseDetailsHeroSection = ({ course, user }: any) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [seminerModal, setSeminerModal]= useState(false)
    let student = {}
    const query = { email: user.email }
    const { data: studenInfo, isLoading } = useStudentQuery({ ...query })
    if (Array.isArray(studenInfo)) {
        student = (studenInfo[0]); // Log the first element of the course array if it's an array
    }

    const handleOpen = () => {
        setModalOpen(true);
    };

    const handleClose = () => {
        setModalOpen(false);
    };
    const handleSeminerOpen = () => {
        setSeminerModal(true);
    };

    const handleSeminerModalClose = () => {
        setSeminerModal(false);
    };

    // Sample user and course information




    return (
        <Container>
            <Box
                sx={{// Full viewport height
                    marginTop: '32px',
                    marginBottom: '52px',
                    display: 'flex',
                    alignItems: 'center', // Vertically center content
                    justifyContent: 'center', // Horizontally center content
                    background: 'linear-gradient(135deg, rgba(254, 240, 230, 0.1) 30%, rgba(255, 142, 83, 0.1) 90%)', // Gradient background
                    text: 'black',
                    padding: '10px'

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
                            <Typography component="p" fontSize='20px' fontWeight='700'>
                                Acquire the Skills, Enhance Your Career With
                            </Typography>
                            <Typography fontSize='35px' color="#212529" fontWeight='bold'>{course?.courseName}
                            </Typography>


                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '8px',
                                justifyContent: 'start',
                                alignItems: 'center',
                                marginTop: '28px',
                                marginBottom: '32px'
                            }}>
                                <Box
                                    sx={{
                                        border: '1px solid #e0e0e0',
                                        borderRadius: '8px',
                                        padding: '16px',
                                        textAlign: 'center',
                                        backgroundColor: '#f9f9f9',
                                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', height: '85px',
                                        width: '136px'
                                    }}
                                >
                                    <Typography>
                                        Duration
                                    </Typography>
                                    <Typography fontSize='25px' fontWeight={700}>{course.duration}</Typography>
                                </Box>
                                <Box
                                    sx={{
                                        border: '1px solid #e0e0e0',
                                        borderRadius: '8px',
                                        padding: '16px',
                                        textAlign: 'center',
                                        backgroundColor: '#f9f9f9',
                                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', height: '85px',
                                        width: '136px'
                                    }}
                                >
                                    <Typography >
                                        Lectures
                                    </Typography>
                                    <Typography fontSize='25px' fontWeight={700}>{course.lectures}</Typography>
                                </Box>
                                <Box
                                    sx={{
                                        border: '1px solid #e0e0e0',
                                        borderRadius: '8px',
                                        padding: '16px',
                                        textAlign: 'center',
                                        backgroundColor: '#f9f9f9',
                                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                        height: '85px',
                                        width: '136px'
                                    }}
                                >
                                    <Typography >
                                        Projects
                                    </Typography>
                                    <Typography fontSize='25px' fontWeight={700}>{course.projects}+</Typography>
                                </Box>
                            </Box>
                            <Typography fontSize='43px' color="#212529" fontWeight='bold'>

                                <Typography sx={{ my: 2, fontSize: '16px' }}>
                                    {course?.courseOverView}
                                </Typography>
                                <Box sx={{ display: "flex", gap: 2 }}>
                                    {
                                        user?.role === "STUDENT" ? <Box>
                                            <AnimatedButton
                                                varient='contaiend'
                                                name='Admission'
                                                onClick={handleOpen}
                                            />

                                            <AdmissionModal
                                                open={modalOpen}
                                                handleClose={handleClose}
                                                userInfo={student}
                                                courseInfo={course}
                                            />
                                        </Box> : <Link href='/login'><AnimatedButton
                                            varient='contaiend'
                                            name='Admission'
                                            onClick={handleOpen}
                                        /></Link>
                                    }


                                    <Box>
                                        <AnimatedButton name='Join Free Seminer' varient='contained' onClick={handleSeminerOpen} />
                                        <SeminerModal
                                            open={seminerModal}
                                            handleClose={handleSeminerModalClose}
                                        />

                                    </Box>
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
                                style={{ borderRadius: '20px' }}
                                src={course.image}
                                alt="hero image"
                                width={740}
                                height={420}

                            />
                        </motion.div>
                    </Grid>
                </Grid>
            </Box>

            <Box marginBottom={8}>
                <Typography align="center" fontSize='42px' fontWeight={700}>Course Overview</Typography>
                <Typography align="center">Marketing through digital platforms has become a trendy topic in today’s world. Most of the people navigate online before buying any product. As a result, digital marketing has turned into a smart business strategy capable of drawing potential buyers by product promotion. This upwarding trend of online marketing might hit the mark of 786.2 billion dollar by 2026, estimated the global industry analysts. If you are keen to learn about online marketing strategies, or want to expand your business reach, enroll in this course now.</Typography>
            </Box>


            <Box sx={{ padding: 4, backgroundColor: '#f3f4f6', marginBottom: '30px' }}>
                <Typography variant="h4" align="center" sx={{ marginBottom: 4, fontWeight: 'bold' }}>
                    Course Curriculum
                </Typography>
                <Grid container spacing={2}>
                    {course?.courseCurriculum?.map((item: any, index: any) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Box
                                    sx={{
                                        padding: 2,
                                        //   backgroundColor: '#fff',
                                        borderRadius: 2,
                                        boxShadow: 2,
                                        textAlign: 'center',
                                        transition: 'transform 0.2s',
                                        '&:hover': {
                                            transform: 'scale(1.05)',
                                            boxShadow: 4,
                                        },
                                    }}
                                >
                                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                        {item}
                                    </Typography>
                                </Box>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
};

export default CourseDetailsHeroSection;





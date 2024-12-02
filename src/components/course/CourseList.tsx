import React from 'react';
import { Box, Button, Card, CardContent, Container, Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import AnimatedButton from '@/lib/animatated/animatedButton';
import Loading from '../shared/loading/loading';

type CourseListProps = {
  courses: { id: string; courseName: string; image: string; courseFee: number,data:any }[];
  isLoading: any,
  
};

const CourseList = ({ courses, isLoading }:any) => {
  
  if (isLoading) {
    return <Loading />
  }
  return (
    <Container>
      <Box
      >
        <Grid container justifyContent='center' spacing={2}>
          {courses?.data?.map((course:any) => (
            <Grid item xs={12} sm={6} md={4} key={course.id}>
              <Link href={`courses/${course.id}`}>
                <motion.div

                  whileHover={{ scale: 0.95 }}
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card sx={{ maxWidth: 400, borderRadius: '10px', overflow: 'hidden', marginTop: '28px' }}>
                    <CardContent>
                      <Box
                        sx={{
                          width: '100%',
                          height: 200, // Adjust the height as needed
                          position: 'relative', // To work with the fill layout
                        }}
                      >
                        <Image
                          src={course?.image}  // Your course image
                          alt="course image"
                          layout="responsive"
                          width={400}
                          height={300}
                          objectFit="cover"// Ensures the image covers the box with no distortion
                        />
                      </Box>

                      <Box mt={2}>
                        <Typography sx={{ color: 'red', fontWeight: '700' }}>All Course</Typography>
                        <Typography
                          component='p'
                          fontWeight={600}
                          fontSize={18}

                        >
                          {course.courseName}
                        </Typography>

                      </Box>
                      <Box sx={{
                        display: 'flex',
                        direction: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}>
                        <Typography sx={{ fontWeight: '700', fontSize: '16px' }}>
                          Course Fee {course.courseFee} BDT
                        </Typography>
                        <Link href={`courses/${course.id}`}><Button disabled={isLoading} variant='outlined' sx={{
                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', // Gradient color
                borderRadius: '15px', // Rounded button
                padding: '10px 20px',
                color: '#fff', // Text color
                fontSize: '15px',
                fontWeight: 'bold', // Initial shadow
                
              }}>Enroll Now</Button></Link>
                        {/* <AnimatedButton variant='outlined' name='Enroll Now'/> */}
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default CourseList;

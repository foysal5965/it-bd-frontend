// components/ImageTextCard.js
'use client'
import { Card, CardContent, Typography, Button, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import { Box } from '@mui/system';
import Image from 'next/image';
import { useMyCourseQuery } from '@/redux/api/studentErolledCourseApi';
import Loading from '@/components/shared/loading/loading';
import AnimatedButton from '@/lib/animatated/animatedButton';

const ImageTextCard = () => {
    const query = {}
    const { data: courses, isLoading } = useMyCourseQuery({ ...query })
    if (isLoading) {
        return <Loading />
    }
    return (
        <>
            {
                courses?.map((course: any) => (
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                        style={{ maxWidth: '900px', margin: '20px auto' }}
                    >
                        <Card
                            sx={{
                                display: 'flex',
                                flexDirection: { xs: 'column', md: 'row' },
                                borderRadius: '15px',
                                overflow: 'hidden',
                                boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                            }}
                        >
                            {/* Left Side: Image */}
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                style={{ position: 'relative', width: '100%', maxWidth: '400px' }}
                            >
                                <Image
                                    src={course?.course?.image}// Update the path to your image
                                    alt="Card Image"
                                    layout="responsive"
                                    width={400}
                                    height={300}
                                    objectFit="cover"
                                />
                            </motion.div>

                            {/* Right Side: Text and Action Button */}
                            <CardContent
                                sx={{
                                    flex: '1',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    padding: '20px',
                                    backgroundColor: '#ffffff',
                                }}
                            >
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2, duration: 0.8 }}
                                >
                                    <Typography fontWeight={700} fontSize='30px' gutterBottom>
                                        {course?.course?.courseName}
                                    </Typography>
                                    <Typography fontWeight={500} fontSize='20px'  color="textSecondary" paragraph>
                                        IT Bangladesh
                                    </Typography>
                                    
                                    <Button
                                            component={motion.button}
                                            type="submit"
                                            variant="contained"
                                            size='small'
                                            
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            sx={{
                                                mt: 2,
                                                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                                                // padding: '10px 8px',
                                                color: '#fff',
                                                fontWeight: 'bold',
                                                borderRadius: '5px',
                                                display:'flex',
                                                justifyContent:'end'
                                            }}
                                        >
                                            Continue Course
                                        </Button>
                                </motion.div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))
            }
        </>
    );
};

export default ImageTextCard;

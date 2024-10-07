'use client';

import { Box, Button, Card, CardContent, Container, Grid, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AnimatedButton from '@/lib/animatated/animatedButton';
import { Category } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import Loading from '@/components/shared/loading/loading';

interface DataItem {
    image: string;
    categoryName: string;
}

const CourseCategory = ({ data }: any) => {
    return (
        <Container>
            <Box
                sx={{
                    margin: '80px 0px',
                    textAlign: 'center',
                }}
            >
                <Box
                    sx={{
                        textAlign: 'center',
                    }}
                >
                    <Typography variant="h4">Explore all the courses</Typography>
                </Box>

                <Stack direction='row' justifyContent='center' spacing={2} mt={5}>
                    {data?.data?.map((category: any) => (
                        <Grid item xs={12} sm={6} md={2} key={category.id}>
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                initial={{ x: '-100vw' }} // Start from outside the viewport (left side)
                                animate={{ x: 0 }}        // Animate to the default position (center)
                                transition={{ type: 'spring', stiffness: 60 }} // Smooth spring animation
                            >
                                <Card>
                                    <CardContent>
                                        <Box
                                            component={Link}
                                            href={`/department/${category.id}`}
                                            sx={{
                                                flex: 1,
                                                width: '100%', // Make it take the full width
                                                textAlign: 'center',
                                                padding: '8px',
                                                '& img': {
                                                    width: '140px',
                                                    height: '70px',
                                                    margin: '0 auto',
                                                },
                                            }}
                                        >
                                            <Image
                                                src={category?.image}
                                                width={100}
                                                height={100}
                                                alt='specialty icon'
                                            />
                                        </Box>
                                        <Box>
                                            <Stack
                                                component='p'
                                                fontWeight={600}
                                                fontSize={18}
                                                mt={2}
                                            >
                                                {category.categoryName}
                                            </Stack>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </Grid>
                    ))}
                </Stack>
                
            </Box>
        </Container>
    );
};

export default CourseCategory;

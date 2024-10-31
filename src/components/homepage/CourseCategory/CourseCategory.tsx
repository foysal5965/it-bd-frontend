'use client';

import { Box, Card, CardContent, Container, Grid, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AnimatedButton from '@/lib/animatated/animatedButton';
import { Category } from '@mui/icons-material';

interface DataItem {
  image: string;
  categoryName: string;
}

const CourseCategory = ({ data }: any) => {
  return (
    <Container>
      <Box sx={{ margin: '80px 0px', textAlign: 'center' }}>
        <Typography variant="h4">Explore all the courses</Typography>

        <Grid container spacing={3} mt={5} justifyContent="center">
          {data?.data?.map((category: any) => (
            <Grid item xs={12} sm={6} md={4} lg={2} key={category.id}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Card
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '200px', // Set a fixed height for all cards
                    textAlign: 'center',
                    borderRadius:'20px'
                  }}
                >
                  <CardContent>
                    <Box
                      component={Link}
                      href={`/department/${category.id}`}
                      
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        padding:'15px 15px 15px 15px'
                      }}
                    >
                      <Image
                        src={category?.image}
                        alt="specialty icon"
                        width={60}
                        height={30}
                        style={{
                          objectFit: 'contain',
                        }}
                      />
                    </Box>
                    <Stack component="p" fontWeight={600} fontSize={18} mt={2}>
                      {category.categoryName}
                    </Stack>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default CourseCategory;

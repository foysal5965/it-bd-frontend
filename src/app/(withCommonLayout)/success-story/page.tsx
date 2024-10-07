'use client';

import React from 'react';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import { motion } from 'framer-motion';

// Sample success stories data
const successStories = [
  {
    title: 'Transforming Careers through Coding',
    description:
      'John was a high school teacher who switched to a career in software development after completing our coding bootcamp. Now, he is a full-stack developer at a leading tech company.',
  },
  {
    title: 'From Retail to Data Science',
    description:
      'Emily was working in retail when she decided to upskill in data science. After finishing our program, she landed a job as a data analyst and loves her new career.',
  },
  {
    title: 'Building a Future in Digital Marketing',
    description:
      'Tom transitioned from a traditional marketing role to digital marketing after our comprehensive course. He now works with several top brands to improve their online presence.',
  },
  {
    title: 'Success in UI/UX Design',
    description:
      'Sara turned her passion for design into a career after taking our UI/UX course. She now designs user-friendly applications and enjoys her creative work every day.',
  },
];

const SuccessStoryPage = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        padding: '2rem 0',
        backgroundColor: '#f7f7f7', // Light background color
      }}
    >
      <Typography
        component={motion.h1}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        variant="h3"
        align="center"
        gutterBottom
        sx={{ color: '#FF7E5F' }}
      >
        Success Stories
      </Typography>
      <Typography
        component={motion.p}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        align="center"
        sx={{ marginBottom: '2rem' }}
      >
        Hear from our amazing alumni who transformed their careers with us.
      </Typography>

      <Grid container spacing={3}>
        {successStories.map((story, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }} // Delayed animation for staggered effect
            >
              <Paper
                elevation={3}
                sx={{
                  padding: '1.5rem',
                  borderRadius: 2,
                  backgroundColor: '#fff',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Subtle shadow
                  '&:hover': {
                    boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)', // Enhanced shadow on hover
                    transform: 'scale(1.02)', // Slight scale effect on hover
                    transition: 'all 0.3s ease-in-out',
                  },
                }}
              >
                <Typography variant="h6" gutterBottom sx={{ color: '#FF7E5F' }}>
                  {story.title}
                </Typography>
                <Typography variant="body1">
                  {story.description}
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SuccessStoryPage;

'use client';

import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Grid2 as Grid, Paper } from '@mui/material';
import { motion } from 'framer-motion';

const CreateAdminPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({ name: '', email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Reset errors on input change
  };

  const validateForm = () => {
    const newErrors = { name: '', email: '', password: '' };
    let isValid = true;

    if (!formData.name) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      // Submit form data to your API or service
      console.log('Admin data submitted:', formData);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        padding: '2rem 0',
      }}
    >
      <Typography
        component={motion.h1}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        variant="h4"
        align="center"
        gutterBottom
        sx={{ color: '#FF7E5F' }}
      >
        Create Admin
      </Typography>

      <Paper
        elevation={3}
        sx={{
          padding: '2rem',
          borderRadius: 2,
          backgroundColor: '#fff',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid xs={12}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
                />
              </motion.div>
            </Grid>

            <Grid xs={12}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <TextField
                  label="Email"
                  variant="outlined"
                  type="email"
                  fullWidth
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </motion.div>
            </Grid>

            <Grid xs={12}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <TextField
                  label="Password"
                  variant="outlined"
                  type="password"
                  fullWidth
                  required
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                />
              </motion.div>
            </Grid>

            <Grid xs={12}>
              <motion.div
                initial={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    padding: '1rem',
                    backgroundColor: '#FF7E5F',
                    '&:hover': {
                      backgroundColor: '#FF6F3C',
                    },
                  }}
                >
                  Create Admin
                </Button>
              </motion.div>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default CreateAdminPage;

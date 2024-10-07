'use client';

import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Grid, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { modifyPayload } from '@/utils/modifyPayload';
import { registerAdmin } from '@/services/actions/registerAdmin';
import { toast } from 'sonner';
interface Admin {
    name: string;
    email: string;
    contactNumber: string;
    address: string;
}

interface FormData {
    admin:Admin;
    password: string;
}

// 1. Create the Zod validation schema
const validationSchema = z.object({
    admin: z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email address"),
        contactNumber: z.string().min(10, "Contact number must be at least 10 digits"),
        address: z.string().min(1, "Address is required"),
    }),
    password: z.string().min(6, "Password must be at least 6 characters"),
});
const CreateAdminPage = () => {
    const router = useRouter()
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(validationSchema),
    });

const [error, setError]= useState('')
    const handleRegister = async (values: FieldValues) => {
        const data = modifyPayload(values);
        // console.log(data);

        try {
            const res = await registerAdmin(data);

            if (res?.data?.id) {
                toast.success(res?.message);
                router.push('/dashboard/super-admin/admin')
            }
            setError(res.message)
        } catch (err: any) {
            
        }
    };

    


   

    // const validateForm = () => {
    //     const newErrors = { name: '', email: '', password: '' };
    //     let isValid = true;

    //     if (!formData.name) {
    //         newErrors.name = 'Name is required';
    //         isValid = false;
    //     }

    //     if (!formData.email) {
    //         newErrors.email = 'Email is required';
    //         isValid = false;
    //     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    //         newErrors.email = 'Email is invalid';
    //         isValid = false;
    //     }

    //     if (!formData.password) {
    //         newErrors.password = 'Password is required';
    //         isValid = false;
    //     }

    //     setErrors(newErrors);
    //     return isValid;
    // };

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
                <form onSubmit={handleSubmit(handleRegister)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
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
                                    size='small'
                                    {...register("admin.name")}
                                    error={!!errors.admin?.name}
                                    helperText={errors.admin?.name?.message}
                                />
                            </motion.div>
                        </Grid>

                        <Grid item xs={12}>
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
                                    
                                    size='small'
                                    {...register("admin.email")}
                                    error={!!errors.admin?.email}
                                    helperText={errors.admin?.email?.message}
                                />
                            </motion.div>
                        </Grid>

                        <Grid item xs={12}>
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
                                    
                                    size='small'
                                    {...register("password")}
                                    error={!!errors.password}
                                    helperText={errors?.password?.message}
                                />
                            </motion.div>
                        </Grid>
                        <Grid item xs={12}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <TextField
                                    label="Contact Number"
                                    variant="outlined"
                                    type="text"
                                    fullWidth
                                    required
                                    
                                    size='small'
                                    {...register("admin.contactNumber")}
                                    error={!!errors.admin?.contactNumber}
                                    helperText={errors?.admin?.contactNumber?.message}
                                />
                            </motion.div>
                        </Grid>
                        <Grid item xs={12}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <TextField
                                    label="Address"
                                    variant="outlined"
                                    type="text"
                                    fullWidth
                                    required
                                    
                                    size='small'
                                    {...register("admin.address")}
                                    error={!!errors.admin?.address}
                                    helperText={errors?.admin?.address?.message}
                                />
                            </motion.div>
                        </Grid>
                       
                        <Grid item xs={12}>
                            <motion.div
                                initial={{ scale: 0.9 }}
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.5 }}
                            > <Typography fontWeight={700} color='red' align='center' sx={{
                            marginBottom:'8px'
                            }}>{error? error : ''}</Typography>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                    sx={{
                                        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', // Gradient color
                                        borderRadius: '15px', // Rounded button
                                        padding: '10px 20px',
                                        color: '#fff', // Text color
                                        fontSize: '15px',
                                        fontWeight: 'bold', // Initial shadow

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

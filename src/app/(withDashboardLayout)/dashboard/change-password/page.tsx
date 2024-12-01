'use client'
import { Box, Button, TextField, Typography, Container, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useChangePasswordMutation } from '@/redux/api/authApi';

import { z } from 'zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Loading from '@/components/shared/loading/loading';

const changePasswordSchema = z.object({
    currentPassword: z
        .string()
        .min(8, 'Current password must be at least 8 characters long')
        .nonempty('Current password is required'),

    newPassword: z
        .string()
        .min(8, 'New password must be at least 8 characters long')

        .regex(/[a-z]/, 'New password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'New password must contain at least one digit')
        .nonempty('New password is required'),


});



const ChangePassword = () => {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [changePassword, { isLoading }] = useChangePasswordMutation(); // Destructure the mutation result properly
    const [error, setError] = useState('')
    const router = useRouter()

    // Initialize react-hook-form with Zod validation
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        // resolver: zodResolver(changePasswordSchema),
    });

    const handleChangePassword = async (data: FieldValues) => {

        const { oldPassword, newPassword } = data;
        const changePasswordData = { oldPassword, newPassword };
        try {
            if (data.newPassword !== data.confirmNewPassword) {
                setError('Confirm password is not correct!')
            } else {
                const res = await changePassword(changePasswordData)
    
                if (res?.data) {
                    toast.success(res?.data?.data?.message)
                    reset();
                    router.push('/login') // Optionally reset the form after successful password change
                } else if (res?.error) {
                    setError('Current password is incorrect!')
                }
            }


        } catch (err) {

        }
    };

    const formVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };
    // if (isLoading) {
    //     return <Loading />
    // }
    return (
        <Container maxWidth="sm">
            <Box
                component={motion.div}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={{
                    hidden: { opacity: 0, scale: 0.9 },
                    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
                }}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                }}
            >
                <Typography
                    component={motion.h1}
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    variant="h4"
                    sx={{ mb: 4 }}
                >
                    Change Password
                </Typography>


                <Box
                    component={motion.form}
                    onSubmit={handleSubmit(handleChangePassword)}
                    initial="hidden"
                    animate="visible"
                    variants={formVariants}
                    // Correctly link the form submit handler
                    sx={{ width: '100%' }}
                >
                    {/* Current Password */}
                    <motion.div whileFocus={{ scale: 1.05 }}>
                        <TextField
                            label="Current Password"
                            variant="outlined"
                            type={showCurrentPassword ? 'text' : 'password'}
                            fullWidth
                            required
                            sx={{ mb: 3 }}
                            {...register('oldPassword')} // Use react-hook-form register
                            error={!!errors.oldPassword}
                            helperText={errors.oldPassword ? (errors.oldPassword.message as string) : undefined} // Ensure it's either a string or undefined
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                            edge="end"
                                        >
                                            {showCurrentPassword ? <Visibility />:<VisibilityOff /> }
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </motion.div>

                    {/* New Password */}
                    <motion.div whileFocus={{ scale: 1.05 }}>
                        <TextField
                            label="New Password"
                            variant="outlined"
                            type={showNewPassword ? 'text' : 'password'}
                            fullWidth
                            required
                            sx={{ mb: 3 }}
                            {...register('newPassword')}
                            error={!!errors.newPassword}
                            helperText={errors.newPassword ? (errors.newPassword.message as string) : undefined} // Ensure it's either a string or undefined
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                            edge="end"
                                        >
                                            {showNewPassword ? <Visibility />:<VisibilityOff />  }
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </motion.div>

                    {/* Confirm Password */}
                    <motion.div whileFocus={{ scale: 1.05 }}>
                        <TextField
                            label="Confirm New Password"
                            variant="outlined"
                            type={showConfirmPassword ? 'text' : 'password'}
                            fullWidth
                            required
                            sx={{ mb: 3 }}
                            {...register('confirmNewPassword')} // Register the confirm password field
                            // error={!!errors.confirmNewPassword} // Set error state
                            // helperText={errors.confirmNewPassword ? (errors.confirmNewPassword.message as string) : undefined} // Ensure it's either a string or undefined // Display error message
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() =>
                                                setShowConfirmPassword(!showConfirmPassword)
                                            }
                                            edge="end"
                                        >
                                            {showConfirmPassword ? <Visibility />:<VisibilityOff /> }
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                    </motion.div>
                    <Typography sx={{
                        marginBottom: '8px',
                        fontWeight: '700px',
                        color: 'red'
                    }}>{error ? error : ''}</Typography>
                    {/* Submit Button */}
                    <Box
                        component={motion.div}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={isLoading}
                            sx={{
                                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                                borderRadius: '15px',
                                padding: '10px 20px',
                                color: '#fff',
                                fontSize: '15px',
                                fontWeight: 'bold',
                            }}
                            fullWidth
                        >
                            Change Password
                        </Button>
                    </Box>
                </Box>

            </Box>
        </Container>
    );
};

export default ChangePassword;

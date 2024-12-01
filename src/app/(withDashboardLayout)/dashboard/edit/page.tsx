'use client'
import React, { useState } from 'react';
import { Box, Button, TextField, Avatar, Grid, Paper, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { FieldValues, useForm } from 'react-hook-form';
import useUserInfo from '@/hooks/userUserInfo';
import { useAdminQuery } from '@/redux/api/adminApi';
import { useStudentQuery } from '@/redux/api/studentApi';
import Loading from '@/components/shared/loading/loading';
import { modifyPayload } from '@/utils/modifyPayload';
import { useUpdateMYProfileMutation } from '@/redux/api/myProfileApi';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
interface User {
    name: string;
    email: string;
    profilePhoto?: string; // Mark it as optional
    address: string;
    contactNumber: string;
    bio:string
}
const EditProfilePage = () => {
    // State for the uploaded image and its preview
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const {
        register,
        handleSubmit,
        setValue, control,
        formState: { errors },
        reset
    } = useForm();
    const router = useRouter()
    const [updateMyProfile, { isLoading }] = useUpdateMYProfileMutation()
    const logedinUserInfo = useUserInfo();

    let adminquery = {};
    let studentQuery = {};

    // Call both hooks unconditionally, but use `skip` to control whether they execute
    if (logedinUserInfo?.role === 'super_admin' || logedinUserInfo?.role === 'admin') {
        adminquery = { email: logedinUserInfo.email };
    }

    if (logedinUserInfo?.role === 'student') {
        studentQuery = { email: logedinUserInfo.email };
    }

    const { data: adminData, isLoading: isAdminLoading } = useAdminQuery({ ...adminquery });
    const { data: studentData, isLoading: isStudentLoading } = useStudentQuery({ ...studentQuery });
    // Loading state
    if (isAdminLoading || isStudentLoading) {
        return <Loading />;
    }
    let user: User = {
        name: '',
        email: '',
        address: '',
        contactNumber: '',
        bio:''
    };

    // Set user data based on role
    if (adminData?.data && Array.isArray(adminData?.data) && adminData?.data?.length > 0) {
        user = adminData?.data[0]; // Assume adminData[0] has the User structure
    } else if (studentData?.data && Array.isArray(studentData?.data) && studentData?.data.length > 0) {
        user = studentData?.data[0]; // Assume studentData[0] has the User structure
    }






    // Handle image upload and preview
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; // Safely access files array
        if (file) {
            setImage(file); // Store the File object
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result as string); // Store the base64 preview
            };
            reader.readAsDataURL(file); // Convert the file to a base64-encoded URL
        }
    };

    // Handle form submission
    const handleEditProfile = async (data: FieldValues) => {
        const values = {
            ...data,
            file: image
        }
        const formData = modifyPayload(values);

        try {
            const res = await updateMyProfile(formData)
            if (res.data.data.id) {
                toast.success('profile updated successfuly!!')
                router.push('/dashboard/view')
            }
        } catch {

        }
    };

    return (
        <Box
            component={motion.div}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            sx={{ padding: { xs: 2, md: 4 }, maxWidth: '800px', margin: '0 auto' }}
        >
            <Typography component="h1" variant="h4" align="center" sx={{ mb: 4 }}>
                Edit Profile
            </Typography>

            <Paper elevation={3} sx={{ padding: { xs: 3, md: 4 }, marginBottom: 4 }}>
                <form onSubmit={handleSubmit(handleEditProfile)}>
                    {/* Avatar and Image Upload */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 3 }}>
                        <Avatar
                            src={user.profilePhoto || '/path-to-avatar.jpg'} // Fallback if no image is uploaded
                            alt={user.name}
                            sx={{ width: { xs: 100, md: 120 }, height: { xs: 100, md: 120 }, marginBottom: 2 }}
                        />
                        <Button
                            component="label"
                            variant="contained"
                            sx={{
                                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', // Gradient color
                                borderRadius: '15px', // Rounded button
                                padding: '10px 20px',
                                color: '#fff', // Text color
                                fontSize: '15px',
                                fontWeight: 'bold', // Initial shadow

                            }}
                        >
                            Upload New Image
                            <input type="file" hidden accept="image/*" onChange={handleImageChange} />
                        </Button>
                    </Box>

                    {/* Form Fields */}
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Name"
                                variant="outlined"
                                defaultValue={user?.name}
                                error={!!errors.name}
                                helperText={errors.name ? String(errors.name.message) : ''}
                                {...register('name')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Contact Number" variant="outlined"
                                defaultValue={user.contactNumber}
                                error={!!errors.contactNumber}
                                helperText={errors.contactNumber ? String(errors.contactNumber.message) : ''}
                                {...register('contactNumber')} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Location"
                                defaultValue={user.address}
                                error={!!errors.address}
                                helperText={errors.address ? String(errors.address.message) : ''}
                                {...register('address')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Bio"
                            defaultValue={user?.bio}
                                error={!!errors.bio}
                                helperText={errors.bio ? String(errors.bio.message) : ''}
                                {...register('bio')}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button sx={{
                                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', // Gradient color
                                borderRadius: '15px', // Rounded button
                                padding: '10px 20px',
                                color: '#fff', // Text color
                                fontSize: '15px',
                                fontWeight: 'bold', // Initial shadow

                            }} type="submit" variant="contained" fullWidth disabled={isLoading}>
                                Save Changes
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Box>
    );
};

export default EditProfilePage;

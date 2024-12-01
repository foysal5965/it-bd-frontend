// Import necessary libraries
'use client'
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Grid, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useAddCourseCategoryWithFormDataMutation, useGetCourseCategoryQuery, useUpdateCourseCategoryMutation } from '@/redux/api/courseCategory.api';
import { modifyPayload } from '@/utils/modifyPayload';
import { toast } from 'sonner';
import { IGenericErrorMessage } from '@/types';
import { useRouter } from 'next/navigation';
type CourseCategoryErrorResponse = {
    data: string;
    statusCode: number;
    message: string;
  };
  type TParams = {
    params: {
      categoryId: string;
    };
  };
const CourseCategoryUpdate = ({ params }: TParams) => {
    const [categoryName, setCategoryName] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [error, setError] = useState('')
    const router = useRouter();

  const id = params?.categoryId;
  const { data, isLoading } = useGetCourseCategoryQuery(id)
  const [updateDoctor] = useUpdateCourseCategoryMutation()

    // Handle file input change
    const handleImageUpload = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    // Handle form submission with Redux mutation
    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (categoryName && image) {
            const values = {
                categoryName: categoryName, // include the categoryName
                file: image,               // include the image file
            };

            const formData = modifyPayload(values);


            try {
                // Call Redux mutation to add the course category
                // const res = await useUpdateCourseCategoryMutation({id, formData})
                
                // // if (res?.data?.id) {
                // //     toast.success('Category created Successfuly')
                // //     // Reset form after success
                // //     setCategoryName('');
                // //     setImage(null);
                // //     setImagePreview(null);
                // // } else if (res.error) {
                // //     const errorResponse = res.error as CourseCategoryErrorResponse;
                // //     setError(errorResponse?.data || 'An unknown error occurred.');
                // // }

            } catch (error) {
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Create Course Category
                </Typography>
                
                <Typography fontWeight={400} color='red' align="center" gutterBottom>
                    {error? error : ''}
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        {/* Category Name */}
                        <Grid item xs={12}>
                            <TextField
                                label="Category Name"
                                variant="outlined"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                                required
                            />
                        </Grid>

                        {/* Image Upload */}
                        <Grid item xs={12}>
                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                justifyContent="center"
                                border="1px dashed #ccc"
                                padding={2}
                                borderRadius={2}
                            >
                                {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        style={{ width: "100%", height: "auto", marginBottom: 16 }}
                                    />
                                ) : (
                                    <CloudUploadIcon style={{ fontSize: 48, color: "#ccc" }} />
                                )}
                                <Button sx={{
                                    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', // Gradient color
                                    borderRadius: '15px', // Rounded button
                                    padding: '10px 20px',
                                    color: '#fff', // Text color
                                    fontSize: '15px',
                                    fontWeight: 'bold', // Initial shadow

                                }} variant="contained" component="label">
                                    Upload Image
                                    <input
                                        type="file"
                                        hidden
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                    />
                                </Button>
                            </Box>
                        </Grid>

                        {/* Submit Button */}
                        <Grid item xs={12}>
                            <motion.div whileHover={{ scale: 1.05 }}>
                                <Button sx={{
                                    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', // Gradient color
                                    borderRadius: '15px', // Rounded button
                                    padding: '10px 20px',
                                    color: '#fff', // Text color
                                    fontSize: '15px',
                                    fontWeight: 'bold', // Initial shadow

                                }}
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                    disabled={isLoading} // Disable button while loading
                                >
                                    {isLoading ? 'Creating...' : 'Create Category'}
                                </Button>
                            </motion.div>
                        </Grid>
                    </Grid>
                </form>

              
            </Paper>
        </motion.div>
    );
};

export default CourseCategoryUpdate;

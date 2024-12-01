'use client'
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Grid, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Autocomplete } from '@mui/material';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, useForm } from 'react-hook-form';
import { useAddCourseCategoryWithFormDataMutation, useCourseCategoryQuery } from '@/redux/api/courseCategory.api';
import Loading from '@/components/shared/loading/loading';
import { modifyPayload } from '@/utils/modifyPayload';
import { toast } from 'sonner';
import { useAddCourseWithFormDataMutation } from '@/redux/api/courseApi';
import CourseCategoryField from '@/components/Forms/CourseCategoryFeild';
import { ErrorResponse } from '../../courseCategory/create/page';


// Define Zod Schema
const courseSchema = z.object({
  courseName: z.string().min(1, 'Course Name is required'),
  duration: z.string().min(1, 'Duration is required'),
  lectures: z.number().min(1, 'Lectures must be a positive number'),
  projects: z.number().min(0, 'Projects must be a non-negative number'),
  courseOverView: z.string().min(1, 'Course Overview is required'),
  courseCurriculum: z.array(z.string()).nonempty('At least one curriculum item is required'),
  courseFee: z.number().min(0, 'Course Fee must be a non-negative number'),
  categoryId: z.string().min(1, 'Category is required'),
});



const CreateCourse = () => {
  const [image, setImage] = useState<File | null>(null); // For image upload
  const [imagePreview, setImagePreview] = useState<string | null>(null); // Image preview
  const [category, setCategory] = useState<{ id: string, categoryName: string } | null>(null);
  const [error, setError] = useState('')
  // Initialize react-hook-form with Zod validation
  const {
    register,
    handleSubmit,
    setValue, control,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(courseSchema),
  });
  //get course categories
  const query: Record<string, any> = {};
  const { data: courseCategories, isLoading } = useCourseCategoryQuery({ ...query })
  const [addCourseWithFormData, { isLoading: addIsLoading }] = useAddCourseWithFormDataMutation()
  
  // Update the form value when a category is selected
  const handleCategoryChange = (categoryId: any) => {
    setValue('categoryId', categoryId); // Update the form with selected 
  };
  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Handle form submission
  const handleCreateCourse = async (data: FieldValues) => {

    const values = {
      courseName: data.courseName,
      duration: data.duration,
      projects: data.projects,
      lectures: data.lectures,
      courseOverView: data.courseOverView,
      courseCurriculum: data.courseCurriculum,
      courseFee: data.courseFee,
      categoryId: data.categoryId,
      file: image
    }
    const formData = modifyPayload(values);
    
    try {
      const res = await addCourseWithFormData(formData)
      
      if (res?.data?.data?.id) {
        toast.success('Course Created Successfuly')
        reset()
        setImage(null)
        setImagePreview(null)
      } else {
        const errorResponse = res.error as ErrorResponse;
        setError(errorResponse?.data || 'An unknown error occurred.');
      }
    } catch (error) {
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Create Course
        </Typography>
        <Typography fontWeight={400} color='red' align="center" gutterBottom>
                    {error? error : ''}
                </Typography>
        <form onSubmit={handleSubmit(handleCreateCourse)}>
          <Grid container spacing={3}>
            {/* Course Name */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Course Name"
                variant="outlined"
                error={!!errors.courseName}
                helperText={errors.courseName ? String(errors.courseName.message) : ''}
                {...register('courseName')}
              />
            </Grid>

            {/* Duration */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Duration (e.g., 6 weeks)"
                variant="outlined"
                error={!!errors.duration}
                helperText={errors.courseName ? String(errors?.duration?.message) : ''}
                {...register('duration')}
              />
            </Grid>

            {/* Lectures */}
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Lectures"
                variant="outlined"
                type="number"
                error={!!errors.lectures}
                helperText={errors.courseName ? String(errors?.lectures?.message) : ''}
                {...register('lectures', { valueAsNumber: true })}
              />
            </Grid>

            {/* Projects */}
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Projects"
                variant="outlined"
                type="number"
                error={!!errors.projects}
                helperText={errors.courseName ? String(errors?.projects?.message) : ''}
                {...register('projects', { valueAsNumber: true })}
              />
            </Grid>

            {/* Course Overview */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                label="Course Overview"
                variant="outlined"
                error={!!errors.courseOverView}
                helperText={errors.courseName ? String(errors?.courseOverView?.message) : ''}
                {...register('courseOverView')}
              />
            </Grid>

            {/* Course Curriculum */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                label="Course Curriculum (comma separated)"
                variant="outlined"
                error={!!errors.courseCurriculum}
                helperText={errors.courseName ? String(errors?.courseCurriculum?.message) : ''}
                onChange={(e) =>
                  setValue(
                    'courseCurriculum',
                    e.target.value.split(',').map((item) => item.trim())
                  )
                }
              />
            </Grid>

            {/* Course Fee */}
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Course Fee"
                variant="outlined"
                type="number"
                error={!!errors.courseFee}
                helperText={errors.courseName ? String(errors?.courseFee?.message) : ''}
                {...register('courseFee', { valueAsNumber: true })}
              />
            </Grid>

            {/* Category */}
            <Grid item xs={6}>
              <CourseCategoryField
                label="Course Category"
                name="categoryId"
                onChange={handleCategoryChange}
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
                    style={{ width: '100%', height: 'auto', marginBottom: 16 }}
                  />
                ) : (
                  <CloudUploadIcon style={{ fontSize: 48, color: '#ccc' }} />
                )}
                <Button sx={{
                  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', // Gradient color
                  borderRadius: '15px', // Rounded button
                  padding: '10px 20px',
                  color: '#fff', // Text color
                  fontSize: '15px',
                  fontWeight: 'bold', // Initial shadow

                }} variant="contained" component="label">
                  Upload Course Image
                  <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
                </Button>
              </Box>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', // Gradient color
                    borderRadius: '15px', // Rounded button
                    padding: '10px 20px',
                    color: '#fff', // Text color
                    fontSize: '15px',
                    fontWeight: 'bold', // Initial shadow

                  }}
                  disabled={addIsLoading} // Disable button while loading
                >
                  {addIsLoading ? 'Creating...' : 'Create Category'}
                </Button>
              </motion.div>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </motion.div>
  );
};

export default CreateCourse;

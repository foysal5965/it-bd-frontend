import React, { useState } from 'react';
import { Box, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Container, Stack, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import { useAddStudentEnrolledCourseMutation } from '@/redux/api/studentErolledCourseApi';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { useInitialPaymentMutation } from '@/redux/api/paymentApi';
import { useRouter } from 'next/navigation';

const AdmissionModal = ({ open, handleClose, userInfo, courseInfo }: any) => {
  // console.log(courseInfo)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setValue, control,
    formState: { errors },
    reset
  } = useForm();
  const [addStudentEnrolledCourse, isLoading] = useAddStudentEnrolledCourseMutation();
  const [initialPayment] = useInitialPaymentMutation()
  const handelEnrollCourse = async () => {
    const enrolledCourseData = {
      studentId: userInfo.id,
      courseId: courseInfo.id
    }


    try {
      const res = await addStudentEnrolledCourse(enrolledCourseData).unwrap();
      // console.log(res)
      if (res.id) {
        toast.success('Enrolled successfuly')
        const response = await initialPayment(res.id).unwrap();
        if (response.paymentUrl) {
          router.push(response.paymentUrl)
        }
      }
    } catch {

    }
  }
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        component: motion.div,
        initial: { scale: 0.8 },
        animate: { scale: 1 },
        exit: { scale: 0 },
        transition: { type: 'spring', stiffness: 300 },
      }}
    >

      <DialogContent sx={{ backgroundColor: '#f3f4f6' }}>
        <Stack sx={{
          position: 'absolute',
          top: '15px',  // adjust as needed
          right: '15px'
        }}>
          <IconButton onClick={handleClose}>
            <CloseSharpIcon />
          </IconButton>

        </Stack>
        <Container
          component={motion.div}
          maxWidth="xs"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}

          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            // mt: 2,
            padding: '10px',
          }}
        >

          <Typography
            variant="h4"
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center', color: '#333' }}
          >
            Give valid information
          </Typography>

          <Box
            component={motion.form}
            onSubmit={handleSubmit(handelEnrollCourse)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            sx={{
              width: '100%',
              mt: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <motion.div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }}>
              <TextField
                label="Name"
                variant="outlined"
                type="text"
                size='small'
                fullWidth
                defaultValue={userInfo.name}
              // {...register("email")}
              // error={!!errors.email}
              // helperText={errors.email?.message}
              />
            </motion.div>

            {/* Email Input */}
            <motion.div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }}>
              <TextField
                label="Phone Number"
                variant="outlined"
                type="text"
                size='small'
                fullWidth
                defaultValue={userInfo.contactNumber}
              // {...register("email")}
              // error={!!errors.email}
              // helperText={errors.email?.message}
              />
            </motion.div>

            {/* Password Input */}
            <motion.div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.6, duration: 0.5 }}>
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                size='small'
                fullWidth
                defaultValue={userInfo.email}
              // {...register("password")}
              // error={!!errors.password}
              // helperText={errors.password?.message}
              />
            </motion.div>
            <motion.div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.6, duration: 0.5 }}>
              <TextField
                label="Your wanted course"
                type="text"
                variant="outlined"
                size='small'
                fullWidth
                defaultValue={courseInfo.courseName}
              // {...register("password")}
              // error={!!errors.password}
              // helperText={errors.password?.message}
              />
            </motion.div>





            {/* Register Button */}
            <Button
              component={motion.button}
              type="submit"
              variant="contained"

              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              sx={{
                mt: 2,
                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                padding: '10px 0',
                color: '#fff',
                fontWeight: 'bold',
                borderRadius: '5px',
              }}
              onClick={handleClose}
            >
              Enroll Now
            </Button>



          </Box>


        </Container>

      </DialogContent>
      {/* <DialogActions sx={{ backgroundColor: '#e3f2fd' }}>
        <Button onClick={handleClose} color="error">
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleClose}>
          Enroll
        </Button>
      </DialogActions> */}
    </Dialog>
  );
};
export default AdmissionModal
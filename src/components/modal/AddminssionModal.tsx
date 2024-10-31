'use client'
import { Box, Button, Typography, Dialog, DialogContent, Stack, IconButton, TextField, Container, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import { useAddStudentEnrolledCourseMutation } from '@/redux/api/studentErolledCourseApi';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { useInitialPaymentMutation } from '@/redux/api/paymentApi';
import { useRouter } from 'next/navigation';

const AdmissionModal = ({ open, handleClose, userInfo, courseInfo }: any) => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [addStudentEnrolledCourse, { isLoading: enrolledLoading }] = useAddStudentEnrolledCourseMutation();
  const [initialPayment, { isLoading: initLoading }] = useInitialPaymentMutation();

  const handelEnrollCourse = async () => {
    const enrolledCourseData = {
      studentId: userInfo.id,
      courseId: courseInfo.id,
    };

    try {
      const res = await addStudentEnrolledCourse(enrolledCourseData).unwrap();
      if (res?.data?.id) {
        toast.success('Enrolled successfully');
        const response = await initialPayment(res?.data?.id).unwrap();
        if (response?.data?.paymentUrl) {
          router.push(response?.data?.paymentUrl);
        }
      }
    } catch {
      toast.error('Enrollment failed');
    }
  };

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
        <Stack sx={{ position: 'absolute', top: '15px', right: '15px' }}>
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
          sx={{ alignItems: 'center', justifyContent: 'center', padding: '10px' }}
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
            sx={{ width: '100%', mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}
          >
            <TextField
              label="Name"
              variant="outlined"
              type="text"
              size="small"
              fullWidth
              defaultValue={userInfo.name}
            />
            <TextField
              label="Phone Number"
              variant="outlined"
              type="text"
              size="small"
              fullWidth
              defaultValue={userInfo.contactNumber}
            />
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              size="small"
              fullWidth
              defaultValue={userInfo.email}
            />
            <TextField
              label="Your wanted course"
              type="text"
              variant="outlined"
              size="small"
              fullWidth
              defaultValue={courseInfo.courseName}
            />

            {/* Enroll Now Button */}
            <Button
              sx={{
                mt: 2,
                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                padding: '10px 0',
                color: '#fff',
                fontWeight: 'bold',
                borderRadius: '5px',
              }}
              component={motion.button}
              type="submit"
              variant="contained"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={enrolledLoading || initLoading}  // Disable button when loading
            >
              {enrolledLoading || initLoading ? (
                <CircularProgress size={24} sx={{ color: '#fff' }} />
              ) : (
                'Enroll Now'
              )}
            </Button>
          </Box>
        </Container>
      </DialogContent>
    </Dialog>
  );
};

export default AdmissionModal;

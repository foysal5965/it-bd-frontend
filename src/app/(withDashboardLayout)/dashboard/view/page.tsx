'use client';
import React from 'react';
import { Box, Typography, Avatar, Grid, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import useUserInfo from '@/hooks/userUserInfo';
import { useAdminQuery } from '@/redux/api/adminApi';
import Loading from '@/components/shared/loading/loading';
import { useStudentQuery } from '@/redux/api/studentApi';

interface User {
  name: string;
  email: string;
  profilePhoto?: string; // Mark it as optional
  address: string;
  bio:string
}

const ProfilePage = () => {
  const logedinUserInfo = useUserInfo();

  let adminquery = {};
  let studentQuery = {};

  // Call both hooks unconditionally, but use `skip` to control whether they execute
  if (logedinUserInfo?.role === 'super_admin') {
    adminquery = { email: logedinUserInfo.email  };
  }

  if (logedinUserInfo?.role === 'student') {
    studentQuery = { email: logedinUserInfo.email };
  }

  const { data: adminData, isLoading: isAdminLoading } = useAdminQuery(adminquery, { skip: !adminquery });
  const { data: studentData, isLoading: isStudentLoading } = useStudentQuery(studentQuery, { skip: !studentQuery });

  // Loading state
  if (isAdminLoading || isStudentLoading) {
    return <Loading />;
  }

  let user: User = {
    name: '',
    email: '',
    address: '',
    bio:''
  };

  // Set user data based on role
  if (adminData && Array.isArray(adminData) && adminData.length > 0) {
    user = adminData[0]; // Assume adminData[0] has the User structure
  } else if (studentData && Array.isArray(studentData) && studentData.length > 0) {
    user = studentData[0]; // Assume studentData[0] has the User structure
  }
console.log(user)
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      sx={{ padding: { xs: 2, md: 4 }, maxWidth: '900px', margin: '0 auto' }}
    >
      {/* Avatar and Name Section */}
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          marginBottom: 4,
          textAlign: 'center'
        }}
        component={motion.div}
        whileHover={{ scale: 1.05 }}
      >
        <Avatar
          src={user?.profilePhoto ?? '/default-avatar.jpg'} // Fallback to a default avatar
          alt={user.name}
          sx={{
            width: { xs: 100, md: 150 },
            height: { xs: 100, md: 150 },
            margin: '0 auto',
            marginBottom: 2,
          }}
        />
        <Typography
          component={motion.h1}
          variant="h4"
          whileHover={{ color: '#1976d2' }}
        >
          {user.name || 'No name available'}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {user.address || 'No address available'}
        </Typography>
      </Paper>

      {/* Profile Details Section */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper
            elevation={2}
            sx={{ padding: 2 }}
            component={motion.div}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Typography variant="h6">Email</Typography>
            <Typography variant="body1">{user.email || 'No email available'}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper
            elevation={2}
            sx={{ padding: 2 }}
            component={motion.div}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Typography variant="h6">Location</Typography>
            <Typography variant="body1">{user.address || 'No address available'}</Typography>
          </Paper>
        </Grid>
        <Grid item  sm={12}>
          <Paper
            elevation={2}
            sx={{ padding: 2 }}
            component={motion.div}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Typography variant="h6">Bio</Typography>
            <Typography variant="body1">{user.bio || 'No bio available'}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;

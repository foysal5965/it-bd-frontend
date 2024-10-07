'use client'
import { useState } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import {z} from 'zod'
const validationSchema = z.object({
  email: z.string().email('Please enter a valid email address!'),
});
const ForgetPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, y: -50, transition: { ease: 'easeInOut' } },
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    // Here you would typically handle the form submission logic.
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {!submitted ? (
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              p: 3,
              border: '1px solid',
              borderColor: 'grey.300',
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <Typography
              variant="h5"
              component={motion.h5}
              sx={{ mb: 2 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Forgot Password
            </Typography>
            <TextField
              variant="outlined"
              label="Email Address"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2 }}
              required
              inputProps={{
                'aria-label': 'email',
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              component={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300 }}
              sx={{ mt: 1 }}
            >
              Reset Password
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              p: 3,
              border: '1px solid',
              borderColor: 'grey.300',
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <Typography
              variant="h6"
              component={motion.h6}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Check your email for the reset link
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setSubmitted(false)}
              component={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300 }}
              sx={{ mt: 2 }}
            >
              Resend Email
            </Button>
          </Box>
        )}
      </motion.div>
    </Container>
  );
};

export default ForgetPasswordPage;

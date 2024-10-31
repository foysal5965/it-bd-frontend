'use client'
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import { motion } from 'framer-motion';

const ContactPage = () => {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring', stiffness: 50, delay: 0.2 },
    },
  };

  const buttonHover = {
    scale: 1.05,
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
    transition: { duration: 0.3 },
  };

  return (
    <Container 
      maxWidth="sm"
      component={motion.div}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      sx={{ my: 5 }}
    >
      {/* Page Title */}
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Contact Us
      </Typography>
      {/* Description */}
      <Typography variant="body1" align="center" paragraph>
        We’d love to hear from you! Please fill out the form below.
      </Typography>

      {/* Contact Form */}
      <Box
        component="form"
        display="flex"
        flexDirection="column"
        gap={3}
      >
        {/* Name Field */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <TextField 
            label="Name" 
            variant="outlined" 
            fullWidth 
            required 
          />
        </motion.div>

        {/* Email Field */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <TextField 
            label="Email" 
            type="email" 
            variant="outlined" 
            fullWidth 
            required 
          />
        </motion.div>

        {/* Message Field */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <TextField 
            label="Message" 
            variant="outlined" 
            fullWidth 
            multiline 
            rows={4} 
            required 
          />
        </motion.div>

        {/* Submit Button with hover effect */}
        <Box>
          <motion.div whileHover={buttonHover}>
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
              Send Message
            </Button>
          </motion.div>
        </Box>
      </Box>
    </Container>
  );
};

export default ContactPage;

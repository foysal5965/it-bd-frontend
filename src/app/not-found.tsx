'use client'
import AnimatedButton from '@/lib/animatated/animatedButton';
import { Box, Button, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import Link from 'next/link';

const NotFoundPage = () => {
  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0, x: '-100vw' },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring', stiffness: 120 },
    },
    exit: {
      opacity: 0,
      x: '100vw',
      transition: { ease: 'easeInOut' },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.1,
      transition: { yoyo: Infinity, duration: 0.3 },
    },
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
      }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <Typography
          variant="h1"
          component={motion.h1}
          sx={{ fontSize: '6rem', fontWeight: 'bold', mb: 2 }}
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          404
        </Typography>
        <Typography
          variant="h6"
          component={motion.h6}
          sx={{ mb: 4 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Oops! The page you're looking for doesn't exist.
        </Typography>

        <Box
          component={motion.div}
          variants={buttonVariants}
          whileHover="hover"
        >
          <Link href="/" passHref>
            <AnimatedButton name='Go Back Home'/>
              
            
          </Link>
        </Box>
      </motion.div>
    </Container>
  );
};

export default NotFoundPage;

import React from 'react';
import { Button } from '@mui/material';
import { motion } from 'framer-motion';
interface AnimatedButton{
  name:string;
  varient?: any;
  onClick?: any
}
const AnimatedButton = ({name,varient, onClick}:AnimatedButton) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.1, // Enlarge the button on hover
        backgroundColor: 'rgba(255, 255, 255, 0.2)', // Change color on hover
        // boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.4)', // Add shadow
      }}
      whileTap={{ scale: 0.9 }} // Shrink the button on tap/click
      transition={{ type: 'spring', stiffness: 300 }} // Animation settings
    >
      <Button
      onClick={onClick}
      variant= {varient? varient : "contained"}
        sx={{
          background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', // Gradient color
          borderRadius: '15px', // Rounded button
          padding: '10px 20px',
          color: '#fff', // Text color
          fontSize: '15px',
          fontWeight: 'bold', // Initial shadow
          
        }}
      >
        {name}
      </Button>
    </motion.div>
  );
};

export default AnimatedButton;

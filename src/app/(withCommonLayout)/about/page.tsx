'use client'
import { Container, Grid, Box, Typography, Avatar, Button } from "@mui/material";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};
const initData = [
  { studenNo: 70000, text: 'Students received career counseling' },
  { studenNo: 3000, text: 'Women got IT training on full free scholarship' },
  { studenNo: 3000, text: 'Students get online internship facility' },
  { studenNo: 200, text: 'Physically challenged people received IT training' },
  { studenNo: 1000, text: 'Financially deprived got IT scholarship' },
  { studenNo: 5000, text: 'Polytechnics are attached for training' },
  { studenNo: 100, text: 'Senior citizens got scholarships in IT' },
  { studenNo: 30, text: 'Trendy courses for professional training' }
]
const brachData = [
  { officeName: 'Head Office', address: 'Momtaz Plaza (4th Floor) Opposite of Labaid Hospital House#7, Road#4, Dhanmondi, Dhaka 1205, Bangladesh' },
  { officeName: 'Campus 2', address: 'Meher Plaza (3rd, 4th floor) House#13/A, Road#5 Dhanmondi, Dhaka - 1205, Bangladesh' },
  { officeName: 'Chittagong Branch', address: '9 No, Kapasgola Road (4th Floor), Chawk Bazar, Telpotti More, Chattogram 4203, Bangladesh' },
  { officeName: 'Uttara Branch', address: 'Rajuk Rajiv Cosmo Shopping Complex (7th Floor) House # 71, Road # 5, Sector # 7 Azampur Bus Stand, Uttara Dhaka-1230' },
  { officeName: 'Mirpur Branch', address: 'El Mercado, Lift # 4, 114 Begum Rokeya Ave, Dhaka 1216 (Opposite of Metro Rail Pillar P256)' }
]

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } },
};

const AboutPage = () => {
  return (
    <Container>
      <motion.div initial="hidden" animate="visible" variants={containerVariants}>

        <motion.div variants={itemVariants}>
          <Typography variant="h3" color="#cf0000" fontWeight='bold' gutterBottom>
            About Us
          </Typography>
          <Typography variant="body1" color="#605f62" width='800px' paragraph>
            Creative IT is an institution where empowering the community with an excellent standard of learning is what we desire. We endeavour for the continuous improvement of our leaders who will work to construct a better future. We will continue to share our knowledge for contributing to the success of individuals and to serve society in the best interest.
          </Typography>
        </motion.div>



        {/* Our Branches Section */}
        <Box sx={{ my: 8 }}>
          <motion.div variants={itemVariants}>
            <Typography gutterBottom sx={{ color: '#1f1e1e', fontSize: '32px', fontWeight: 'bold' }}>
              Our Branches
            </Typography>
          </motion.div>
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <Grid container spacing={4} sx={{ mt: 4 }}>
              {brachData.map((branch, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <motion.div variants={itemVariants}>
                    <Box
                      sx={{
                        p: 3,
                        textAlign: 'center',
                        background: 'linear-gradient(135deg, rgba(254, 240, 230, 0.1) 30%, rgba(255, 142, 83, 0.1) 90%)',

                        borderRadius: '15px',
                        padding: '18px 26px'
                      }}
                    >
                      <Typography variant="h6" color="#000000" paddingBottom='14px' fontSize='22px' fontWeight='bold'>{branch.officeName}</Typography>
                      <Typography fontWeight='bold' color="#605f62">{branch.address}</Typography>
                    </Box>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Box>

        {/* Prominent Initiatives Section */}
        <Box sx={{ my: 8 }}>
          <motion.div variants={itemVariants}>
            <Typography fontWeight='bold' fontSize='35px' color="#1f1e1e" paddingBottom='35px' gutterBottom sx={{}}>
              Prominent Initiatives
            </Typography>
          </motion.div>
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <Grid container spacing={4} sx={{ mt: 4 }}>
              {initData.map((initiative, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <motion.div variants={itemVariants}>
                    <Box
                      sx={{
                        p: 3,
                        textAlign: 'center',
                        background: 'linear-gradient(135deg, rgba(254, 240, 230, 0.1) 30%, rgba(255, 142, 83, 0.1) 90%)',

                        borderRadius: '15px',
                        padding: '18px 26px'
                      }}
                    >
                      <Typography variant="h6" color="#cf0000" fontSize='30px' fontWeight='bold'>{initiative.studenNo}+</Typography>
                      <Typography fontWeight='bold' color="#1f1e1e">{initiative.text}</Typography>
                    </Box>
                  </motion.div>
                </Grid>
              ))}

            </Grid>
          </motion.div>
        </Box>
      </motion.div>
    </Container>
  );
};

export default AboutPage;

'use client';

import React, { useState } from 'react';
import {
  Box,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Grid,
  Button,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useCourseCategoryQuery, useUpdateCourseCategoryMutation } from '@/redux/api/courseCategory.api';
import { useDebounced } from '@/redux/hook';
import Loading from '@/components/shared/loading/loading';
import Link from 'next/link';

interface CourseCategory {
  id: number;
  name: string;
  description: string;
}

const CourseCategoryPage: React.FC = () => {

  const [searchTerm, setSearchTerm] = useState<string>("");
  const query: Record<string, any> = {};
  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });
  if (!!debouncedTerm) {
    query["searchTerm"] = searchTerm;
  }
const {data:courseCategory, isLoading}= useCourseCategoryQuery({...query})
const [updateCourseCategory, {isLoading:updateLoading}]= useUpdateCourseCategoryMutation()
if(isLoading){
  return <Loading/>
}

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Course Categories
      </Typography>
      <TextField
        label="Search Categories"
        variant="outlined"
        fullWidth
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Grid container>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {courseCategory?.data.map((category:any) => (
                  <motion.tr
                    key={category.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                  >
                    <TableCell>{category?.categoryName}</TableCell>
                    <TableCell>
                      <Link href={`/dashboard/admin/courseCategory/edit/${category.id}`}><Button variant="outlined" color="primary" sx={{ mr: 1 }}>
                        Update
                      </Button></Link>
                      <Button variant="outlined" color="error">
                        Delete
                      </Button>
                    </TableCell>
                  </motion.tr>
                ))}
                {courseCategory?.data.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      No categories found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CourseCategoryPage;

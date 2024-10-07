// pages/StudentPage.tsx
'use client'
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TextField,
  Box,
} from '@mui/material';
import { motion } from 'framer-motion';
import Loading from '@/components/shared/loading/loading';
import { useStudentQuery } from '@/redux/api/studentApi';
import { useDebounced } from '@/redux/hook';

type Student = {
  id: string;
  name: string;
  email: string;
  course: string;
};

const StudentPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const query: Record<string, any> = {};
  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });
  if (!!debouncedTerm) {
    query["searchTerm"] = searchTerm;
  }
  const { data: students, isLoading } = useStudentQuery({...query});
  

  if (isLoading) {
    return <Loading />;
  }

  

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Typography variant="h4" gutterBottom align="center">
        Student List
      </Typography>

      {/* Search Input */}
      <Box display="flex" justifyContent="center" marginBottom={2}>
        <TextField
          label="Search by Name or Email"
          variant="outlined"
          fullWidth
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: '300px' }} // Set the width of the search input
        />
      </Box>

      <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Course</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students?.data?.map((student: Student) => (
              <motion.tr
                key={student.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.course}</TableCell>
              </motion.tr>
            ))}
            {students?.data?.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No students found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </motion.div>
  );
};

export default StudentPage;

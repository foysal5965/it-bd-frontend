'use client'
import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Typography, IconButton } from "@mui/material";
import Loading from "@/components/shared/loading/loading";
import { useCourseQuery } from "@/redux/api/courseApi"; // Ensure this imports correctly
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDebounced } from "@/redux/hook";

export type Course = {
  id: string;
  courseName: string;
  duration: string;
  lectures: number;
  projects: number;
  courseFee: number;
  categoryId: string;
  image: string;
};

const CoursePage = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const query: Record<string, any> = {};
  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });
  if (!!debouncedTerm) {
    query["searchTerm"] = searchTerm;
  }
  
 
  const { data:courses, isLoading } = useCourseQuery({...query})

 
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Course List
      </Typography>

      {/* Search Input */}
      <TextField
        label="Search Courses"
        variant="outlined"
        fullWidth
        onChange={(e) => setSearchTerm(e.target.value)}
        size="small"
        placeholder="search doctors"
        sx={{ marginBottom: 2 }}
      />

      {/* Course Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Course Name</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Lectures</TableCell>
              <TableCell>Projects</TableCell>
              <TableCell>Course Fee</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.data.length > 0 ? (
              courses?.data.map((course: Course) => (
                <TableRow key={course.id}>
                  <TableCell>{course.courseName}</TableCell>
                  <TableCell>{course.duration}</TableCell>
                  <TableCell>{course.lectures}</TableCell>
                  <TableCell>{course.projects}</TableCell>
                  <TableCell>${course.courseFee}</TableCell>
                  <TableCell>
                    <IconButton aria-label="update" color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" color="secondary">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No courses found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CoursePage;

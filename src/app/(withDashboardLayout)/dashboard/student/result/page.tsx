'use client';

import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";
import { useGetMyResultsQuery } from "@/redux/api/resultApi";

ChartJS.register(BarElement, CategoryScale, LinearScale);
interface StudentResult {
  id: string;
  examId: string;
  exam: {
    id: string;
    title: string;
    status: string;
  };
  score: number;
  studentId: string;
  student: {
    id: string;
    name: string;
    email: string;
  };
  createdAt: string; // ISO string for DateTime
  updatedAt: string; // ISO string for DateTime
}

const ResultsPage = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const { data, isLoading, isError } = useGetMyResultsQuery({});

  // Handle loading and error states
  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Typography variant="h6" color="error">
          Failed to load results.
        </Typography>
      </Box>
    );
  }

  const examData = data?.data || [];

  // Prepare data for the chart
  const labels = examData.map((exam:any) => exam.exam.title);
  const scores = examData.map((exam:any) => exam.score);
  const chartData = {
    labels,
    datasets: [
      {
        label: "Scores",
        data: scores,
        backgroundColor: "rgba(63, 81, 181, 0.8)", // MUI primary color
      },
    ],
  };

  return (
    <Box
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
      }}
      component={motion.div}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Title */}
      <Typography variant={isMobile ? "h5" : "h4"} textAlign="center">
        Student Exam Results
      </Typography>

      {/* Chart */}
      <Box
        sx={{
          width: "100%",
          maxWidth: isMobile ? "90%" : "70%",
          boxShadow: 3,
          borderRadius: 2,
          p: 2,
          background: "#f5f5f5",
        }}
        component={motion.div}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Bar data={chartData} />
      </Box>

      {/* Table */}
      <TableContainer component={Paper} sx={{ maxWidth: "90%", boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Exam Title</TableCell>
              <TableCell align="center">Score</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {examData.map((exam:StudentResult, index: number) => (
              <TableRow
                key={exam.id}
                component={motion.tr}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.2 }}
              >
                <TableCell>{exam.exam.title}</TableCell>
                <TableCell align="center">{exam.score}</TableCell>
                <TableCell align="center">{exam.exam.status}</TableCell>
                <TableCell align="center">
                  {new Date(exam.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ResultsPage;

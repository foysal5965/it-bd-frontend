'use client'
import {
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Stack,
} from "@mui/material";
import { Visibility, Edit, Delete, Add } from "@mui/icons-material";
import { motion } from "framer-motion";
import Link from "next/link";
import { useContestsQuery } from "@/redux/api/contestApi";
import { useState } from "react";
import { useDebounced } from "@/redux/hook";

const contests = [
  {
    id: 1,
    name: "Code Challenge 2024",
    description: "Solve coding problems to win prizes!",
    startTime: "2024-12-01 10:00 AM",
    endTime: "2024-12-15 11:59 PM",
    rewards: "Top 3 winners get $1000 each!",
  },
  {
    id: 2,
    name: "UI/UX Design Contest",
    description: "Showcase your design skills in this exciting contest.",
    startTime: "2024-12-05 9:00 AM",
    endTime: "2024-12-20 6:00 PM",
    rewards: "Win gift vouchers and recognition!",
  },
];

const ContestTableAdmin = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
  const query: Record<string, any> = {};
  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });
  if (!!debouncedTerm) {
    query["searchTerm"] = searchTerm;
  }
    const {data}= useContestsQuery({...query})
  const handleAction = (action: string, id: number) => {
    
    // Implement action logic here (delete, update, view)
  };

  return (
    <Box
      sx={{
        p: 3,
        minHeight: "100vh",
        bgcolor: "background.paper",
      }}
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography
          component={motion.h1}
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          variant="h4"
        >
          Manage Contests
        </Typography>
        <Link href='/dashboard/admin/contest/create'>
        Create Contest
        </Link>
      </Stack>
      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Contest Name</strong>
              </TableCell>
              <TableCell>
                <strong>Description</strong>
              </TableCell>
              <TableCell>
                <strong>Start Time</strong>
              </TableCell>
              <TableCell>
                <strong>End Time</strong>
              </TableCell>
              <TableCell>
                <strong>Rewards</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.data?.map((contest:any) => (
              <TableRow
                key={contest.id}
                component={motion.tr}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <TableCell>{contest.name}</TableCell>
                <TableCell>{contest.description}</TableCell>
                <TableCell>{contest.startTime}</TableCell>
                <TableCell>{contest.endTime}</TableCell>
                <TableCell>{contest.rewards}</TableCell>
                <TableCell align="center">
                  <Stack direction="row" spacing={1} justifyContent="center">
                    <IconButton
                      color="primary"
                      onClick={() => handleAction("view", contest.id)}
                      component={motion.button}
                      whileHover={{ scale: 1.2 }}
                    >
                      <Visibility />
                    </IconButton>
                    <IconButton
                      color="info"
                      onClick={() => handleAction("update", contest.id)}
                      component={motion.button}
                      whileHover={{ scale: 1.2 }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleAction("delete", contest.id)}
                      component={motion.button}
                      whileHover={{ scale: 1.2 }}
                    >
                      <Delete />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ContestTableAdmin;

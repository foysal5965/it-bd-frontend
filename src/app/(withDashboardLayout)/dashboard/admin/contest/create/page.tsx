"use client";

import React, { useState } from "react";
import { Box, TextField, Button, Typography, Stack, Alert } from "@mui/material";
import { motion } from "framer-motion";
import { useAddContestMutation } from "@/redux/api/contestApi";
import { useRouter } from "next/navigation";

const CreateContest = () => {
  const [contestData, setContestData] = useState({
    name: "",
    description: "",
    startTime: "",
    endTime: "",
    rules: "",
    rewards: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [addContest] = useAddContestMutation();
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter()

  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {};

    if (!contestData.name.trim()) newErrors.name = "Contest name is required.";
    if (!contestData.description.trim()) newErrors.description = "Description is required.";
    if (!contestData.startTime) newErrors.startTime = "Start time is required.";
    if (!contestData.endTime) newErrors.endTime = "End time is required.";
    if (contestData.startTime && contestData.endTime && contestData.startTime >= contestData.endTime) {
      newErrors.startTime = "Start time must be before end time.";
      newErrors.endTime = "End time must be after start time.";
    }

    return newErrors;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContestData({ ...contestData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear the error for the specific field
  };

  const formatDateToISOString = (date: string) => {
    const parsedDate = new Date(date);
    return parsedDate.toISOString(); // Converts to the format "2024-11-29T04:10:00.000Z"
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formattedData = {
      ...contestData,
      startTime: formatDateToISOString(contestData.startTime),
      endTime: formatDateToISOString(contestData.endTime),
    };

    try {
      await addContest(formattedData).unwrap();
      setSuccessMessage("Contest created successfully!");
      setContestData({
        name: "",
        description: "",
        startTime: "",
        endTime: "",
        rules: "",
        rewards: "",
      });
      router.push('/dashboard/admin/contest')
    } catch (error) {
      setSuccessMessage("Failed to create contest. Please try again.");
    }
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        p: 2,
        bgcolor: "background.paper",
        boxShadow: 3,
      }}
    >
      <Typography
        component={motion.h1}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        variant="h4"
        gutterBottom
        textAlign="center"
      >
        Create a Contest
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: "100%",
          maxWidth: 600,
          bgcolor: "white",
          p: 3,
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        {successMessage && (
          <Alert severity={successMessage.includes("successfully") ? "success" : "error"} sx={{ mb: 2 }}>
            {successMessage}
          </Alert>
        )}

        <Stack spacing={3}>
          <TextField
            label="Contest Name"
            name="name"
            fullWidth
            required
            error={!!errors.name}
            helperText={errors.name}
            value={contestData.name}
            onChange={handleInputChange}
          />
          <TextField
            label="Description"
            name="description"
            fullWidth
            required
            multiline
            rows={3}
            error={!!errors.description}
            helperText={errors.description}
            value={contestData.description}
            onChange={handleInputChange}
          />
          <TextField
            label="Start Time"
            name="startTime"
            type="datetime-local"
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
            error={!!errors.startTime}
            helperText={errors.startTime}
            value={contestData.startTime}
            onChange={handleInputChange}
          />
          <TextField
            label="End Time"
            name="endTime"
            type="datetime-local"
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
            error={!!errors.endTime}
            helperText={errors.endTime}
            value={contestData.endTime}
            onChange={handleInputChange}
          />
          <TextField
            label="Rules"
            name="rules"
            fullWidth
            multiline
            rows={3}
            value={contestData.rules}
            onChange={handleInputChange}
          />
          <TextField
            label="Rewards"
            name="rewards"
            fullWidth
            value={contestData.rewards}
            onChange={handleInputChange}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            component={motion.button}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Create Contest
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default CreateContest;

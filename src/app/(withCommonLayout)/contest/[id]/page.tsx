"use client";

import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  MenuItem,
  Button,
  Stack,
  Avatar,
} from "@mui/material";
import { motion } from "framer-motion";
import { registerContestPerticipent } from "@/services/actions/contestPerticipentRegistration";
import { modifyPayload } from "@/utils/modifyPayload";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const tShirtSizes = ["S", "M", "L", "XL", "XXL"];
const experienceLevels = [
  {value:'NONE', level: "0 months"},
  {value:'ONE_TO_SIX', level: "1-6 months"},
  {value:'SIX_TO_TWELVE', level: "6-12 months"},
  {value:'MORE_THAN_TWELVE', level: "More than 12 months"}
];

const RegisterContest = ({params}:any) => {
const contestId = params.id
const router = useRouter()
  // const [registerPerticipent] = useRegisterPerticipentMutation();
 
    
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    isStudent: "",
    jobExperience: "",
    tShirtSize: "",
    image: null,
    permissionLetter: "",
    instituteName:""
  });
  const [picturePreview, setPicturePreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      setFormData({ ...formData, [name]: file });

      // Generate a preview URL for the picture
      if (name === "image") {
        const previewUrl = URL.createObjectURL(file);
        setPicturePreview(previewUrl);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // const data = new FormData();
    // data.append("name", formData.name);
    // data.append("email", formData.email);
    // data.append("isStudent", formData.isStudent);
    // data.append("jobExperience", formData.jobExperience);
    // data.append("tShirtSize", formData.tShirtSize);

    // if (formData.image) {
    //   data.append("image", formData.image);
    // }

    // data.append("permissionLetter", formData.permissionLetter);
    const perticipentData = {
      name: formData.name,
      email: formData.email,
      isStudent: formData.isStudent,
      jobExperience: formData.jobExperience,
      tShirtSize: formData.tShirtSize,
      permissionLetter: formData.permissionLetter,
      contestId,
      instituteName: formData.instituteName,
      file: formData.image,
    }
    const data = modifyPayload(perticipentData);
    try {
      // const response = await registerPerticipent(data);
      const response = await registerContestPerticipent(data)
      
      if (response.success === true) {
        toast.success('Thank you for participat. wait for confirmation')
        router.push('/')
        setFormData({
          name: "",
          email: "",
          isStudent: "",
          jobExperience: "",
          tShirtSize: "",
          image: null,
          permissionLetter: "",
          instituteName:''
        });
        setPicturePreview(null);
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: "100%",
          maxWidth: "500px",
          padding: "20px",
          bgcolor: "white",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h4" sx={{ mb: 4, textAlign: "center" }}>
          Register for Contest
        </Typography>

        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          variant="outlined"
          sx={{ mb: 3 }}
        />

        <TextField
          fullWidth
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          variant="outlined"
          sx={{ mb: 3 }}
        />

        <TextField
          fullWidth
          select
          label="Are you a student?"
          name="isStudent"
          value={formData.isStudent}
          onChange={handleChange}
          variant="outlined"
          sx={{ mb: 3 }}
        >
          <MenuItem value="YES">Yes</MenuItem>
          <MenuItem value="NO">No</MenuItem>
        </TextField>
        <TextField
          fullWidth
          label="Current/Previous Institute Name"
          name="instituteName"
          value={formData.instituteName}
          onChange={handleChange}
          variant="outlined"
          sx={{ mb: 3 }}
        />
        <TextField
          fullWidth
          select
          label="Job Experience"
          name="jobExperience"
          value={formData.jobExperience}
          onChange={handleChange}
          variant="outlined"
          sx={{ mb: 3 }}
        >
          {experienceLevels.map((e) => (
            <MenuItem key={e.value} value={e.value}>
              {e.level}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          select
          label="T-Shirt Size"
          name="tShirtSize"
          value={formData.tShirtSize}
          onChange={handleChange}
          variant="outlined"
          sx={{ mb: 3 }}
        >
          {tShirtSizes.map((size, index) => (
            <MenuItem key={index} value={size}>
              {size}
            </MenuItem>
          ))}
        </TextField>

        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
          <Avatar
            src={picturePreview || ""}
            alt="Participant Picture"
            sx={{ width: 56, height: 56 }}
          />
          <Button variant="contained" sx={{
                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', // Gradient color
                borderRadius: '15px', // Rounded button
                padding: '10px 20px',
                color: '#fff', // Text color
                fontSize: '15px',
                fontWeight: 'bold', // Initial shadow
                
              }} component="label">
            Upload Picture
            <input
              type="file"
              name="image"
              accept="image/*"
              hidden
              onChange={handleFileChange}
            />
          </Button>
        </Stack>

        <TextField
          fullWidth
          label="Permission Letter Link"
          name="permissionLetter"
          value={formData.permissionLetter}
          onChange={handleChange}
          variant="outlined"
          sx={{ mb: 4 }}
        />

        <Button
          fullWidth
          type="submit"
          variant="contained"
          size="large"
          sx={{
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', // Gradient color
            borderRadius: '15px', // Rounded button
            padding: '10px 20px',
            color: '#fff', // Text color
            fontSize: '15px',
            fontWeight: 'bold', // Initial shadow
            
          }}
        >
          Submit
        </Button>
      </Box>
    </motion.div>
  );
};

export default RegisterContest;

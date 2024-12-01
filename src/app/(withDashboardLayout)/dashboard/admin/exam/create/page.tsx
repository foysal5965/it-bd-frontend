'use client';
import React, { useState } from "react";
import {
    Container,
    TextField,
    Button,
    IconButton,
    Box,
    Grid,
    Typography,
    MenuItem,
    Avatar,
} from "@mui/material";
import { AddCircle, RemoveCircle, PhotoCamera } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useCourseQuery } from "@/redux/api/courseApi";
import { useAddExamWithFormDataMutation } from "@/redux/api/examApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const CreateExam = () => {
    const [selectedCourse, setSelectedCourse] = useState("");
    const [examTitle, setExamTitle] = useState("");
    const [examTime, setExamTime] = useState(0);
    const router = useRouter()

    const [questions, setQuestions] = useState([
        { questionText: "", options: ["", "", "", ""], correctOption: "", image: "" as string | File },
    ]);

    const { data: courses, isLoading } = useCourseQuery({});
    const [addExamWithFormData, { isLoading: addLoading, isSuccess, isError }] = useAddExamWithFormDataMutation();

    const addQuestion = () => {
        setQuestions([...questions, { questionText: "", options: ["", "", "", ""], correctOption: "", image: "" as string | File }]);
    };

    const removeQuestion = (index: number) => {
        const newQuestions = [...questions];
        newQuestions.splice(index, 1);
        setQuestions(newQuestions);
    };

    const handleQuestionChange = (index: number, value: string) => {
        const newQuestions = [...questions];
        newQuestions[index].questionText = value;
        setQuestions(newQuestions);
    };

    const handleOptionChange = (qIndex: number, optIndex: number, value: string) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].options[optIndex] = value;
        setQuestions(newQuestions);
    };

    const handleCorrectOptionChange = (qIndex: number, value: string) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].correctOption = value;
        setQuestions(newQuestions);
    };

    const handleImageUpload = (qIndex: number, file: File) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].image = file; // Store the File object
        setQuestions(newQuestions);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("courseId", selectedCourse);
        formData.append("title", examTitle);
        formData.append("time", String(examTime));

        const questionsWithoutImages = questions.map(({ image, ...rest }) => rest);
        formData.append("questions", JSON.stringify(questionsWithoutImages));

        questions.forEach((question, index) => {
            if (question.image instanceof File) {
                formData.append(`questionImages[${index}]`, question.image); // Append the image file
            }
        });

        try {
            const response = await addExamWithFormData(formData);
            
            if (response.data.data.id) {
                toast.success(response.data.message)
                router.push('/dashboard/admin/exam')
            }
            if (response.error) {
                console.error("Failed to create exam:", response.error);
            } else {
              
            }
        } catch (error) {
            console.error("Failed to create exam:", error);
        }
    };

    return (
        <Container maxWidth="md">
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    p: 4,
                    mt: 4,
                    bgcolor: "background.paper",
                    borderRadius: 2,
                    boxShadow: 2,
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Create New Exam
                </Typography>

                {/* Course Selection */}
                <TextField
                    select
                    label="Select Course"
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                >
                    {courses?.data?.map((course: any) => (
                        <MenuItem key={course.id} value={course.id}>
                            {course.courseName}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    label="Exam Title"
                    variant="outlined"
                    fullWidth
                    value={examTitle}
                    onChange={(e) => setExamTitle(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Exam Time"
                    variant="outlined"
                    type="number"
                    fullWidth
                    value={examTime}
                    onChange={(e) => setExamTime(Number(e.target.value))}
                    sx={{ mb: 2 }}
                />

                {questions.map((question, qIndex) => (
                    <motion.div
                        key={qIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Box
                            sx={{
                                mb: 4,
                                p: 3,
                                borderRadius: 2,
                                boxShadow: 1,
                                bgcolor: "background.default",
                            }}
                        >
                            <Typography variant="h6">Question {qIndex + 1}</Typography>
                            <TextField
                                label="Question Text"
                                variant="outlined"
                                fullWidth
                                value={question.questionText}
                                onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                                sx={{ mt: 2, mb: 3 }}
                            />

                            <Grid container spacing={2}>
                                {question.options.map((option, optIndex) => (
                                    <Grid item xs={12} sm={6} key={optIndex}>
                                        <TextField
                                            label={`Option ${optIndex + 1}`}
                                            variant="outlined"
                                            fullWidth
                                            value={option}
                                            onChange={(e) => handleOptionChange(qIndex, optIndex, e.target.value)}
                                        />
                                    </Grid>
                                ))}
                            </Grid>

                            {/* Correct Answer Field */}
                            <TextField
                                select
                                label="Correct Answer"
                                value={question.correctOption}
                                onChange={(e) => handleCorrectOptionChange(qIndex, e.target.value)}
                                fullWidth
                                sx={{ mt: 2 }}
                            >
                                {question.options.map((option, optIndex) => (
                                    <MenuItem key={optIndex} value={option}>
                                        Option {optIndex + 1}: {option}
                                    </MenuItem>
                                ))}
                            </TextField>

                            {/* Image Upload Section */}
                            <Box sx={{ mt: 3, display: 'flex', alignItems: 'center' }}>
                                <Button
                                    variant="contained"
                                    component="label"
                                    sx={{
                                        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', // Gradient color
                                        borderRadius: '15px', // Rounded button
                                        padding: '10px 20px',
                                        color: '#fff', // Text color
                                        fontSize: '15px',
                                        fontWeight: 'bold', // Initial shadow

                                    }}
                                    startIcon={<PhotoCamera />}
                                >
                                    Upload Image
                                    <input
                                        type="file"
                                        accept="image/*"
                                        hidden
                                        onChange={(e) => {
                                            if (e.target.files && e.target.files[0]) {
                                                handleImageUpload(qIndex, e.target.files[0]);
                                            }
                                        }}
                                    />
                                </Button>

                                {/* Image Preview */}
                                {question.image instanceof File ? (
                                    <Avatar
                                        src={URL.createObjectURL(question.image)}
                                        sx={{ width: 200, height: 200, ml: 2 }}
                                        alt={`Question ${qIndex + 1} Image`}
                                    />
                                ) : question.image ? (
                                    <Avatar
                                        src={question.image}
                                        sx={{ width: 56, height: 56, ml: 2 }}
                                        alt={`Question ${qIndex + 1} Image`}
                                    />
                                ) : null}
                            </Box>

                            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                                <IconButton
                                    color="secondary"
                                    onClick={() => removeQuestion(qIndex)}
                                    disabled={questions.length === 1}
                                >
                                    <RemoveCircle />
                                </IconButton>
                                <Button variant="outlined" sx={{
                                    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', // Gradient color
                                    borderRadius: '15px', // Rounded button
                                    padding: '10px 20px',
                                    color: '#fff', // Text color
                                    fontSize: '15px',
                                    fontWeight: 'bold', // Initial shadow

                                }} onClick={addQuestion}>
                                    <AddCircle sx={{ mr: 1 }} /> Add Question
                                </Button>
                            </Box>
                        </Box>
                    </motion.div>
                ))}

                <Button variant="contained" sx={{
                    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', // Gradient color
                    borderRadius: '15px', // Rounded button
                    padding: '10px 20px',
                    color: '#fff', // Text color
                    fontSize: '15px',
                    fontWeight: 'bold', // Initial shadow

                }} fullWidth type="submit" >
                    Create Exam
                </Button>
            </Box>
        </Container>
    );
};

export default CreateExam;

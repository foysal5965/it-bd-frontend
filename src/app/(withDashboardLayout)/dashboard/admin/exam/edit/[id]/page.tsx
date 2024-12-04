'use client';
import React, { useEffect, useState } from "react";
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
import { useGetSingleExamQuery, useUpdateExamMutation } from "@/redux/api/examApi";
import { FieldValues, useForm } from "react-hook-form";
import CourseField from "@/components/Forms/CourseField";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const UpdateExam = ({ params }: any) => {
    const {
        register,
        handleSubmit,
        setValue, control,
        formState: { errors },
        reset
    } = useForm();
    const router = useRouter()
    const [questions, setQuestions] = useState([
        { questionText: "", options: ["", "", "", ""], correctOption: "", image: "" as string | File },
    ]);

    const { data: courses, isLoading: coursesLoading } = useCourseQuery({});
    const { data: examData, isLoading: examLoading } = useGetSingleExamQuery(params.id);
    const [updateExam, { isLoading: updateLoading }] = useUpdateExamMutation()
    const id = params.id


    useEffect(() => {
        if (examData) {

            setQuestions(examData.data.questions.map((question: { options: any; }) => ({
                ...question,
                options: normalizeOptions(question.options), // Normalize options to strings
            })) || []);
        }
    }, [examData]);

    const addQuestion = () => {
        setQuestions([...questions, { questionText: "", options: ["", "", "", ""], correctOption: "", image: "" as string | File }]);
    };

    const removeQuestion = (index: number) => {
        const newQuestions = [...questions];
        newQuestions.splice(index, 1);
        setQuestions(newQuestions);
    };
    const normalizeOptions = (options: any) => {
        return options.map((option: { optionText: any; }) => {
            // Assuming option can be a string or an object
            if (typeof option === 'string') {
                return option; // If it's already a string, return it
            } else if (option && typeof option === 'object' && option.optionText) {
                return option.optionText; // Return the optionText if it's an object
            }
            return ""; // Return empty string as a fallback
        });
    };
    const handleQuestionChange = (index: number, value: string) => {
        // Make a shallow copy of the questions array
        const newQuestions = [...questions];

        // Make a deep copy of the specific question object
        const updatedQuestion = {
            ...newQuestions[index],
            questionText: value, // Update the question text
        };

        // Replace the specific question with the updated question
        newQuestions[index] = updatedQuestion;

        // Update the state with the new array
        setQuestions(newQuestions);
    };


    const handleOptionChange = (qIndex: number, optIndex: number, value: string) => {
        const newQuestions = [...questions];
        const updatedQuestion = {
            ...newQuestions[qIndex],
            options: [...newQuestions[qIndex].options], // Deep copy options array
        };

        // Update the specific option to a string
        updatedQuestion.options[optIndex] = value; // Directly use the string value

        // Replace the specific question with the updated question
        newQuestions[qIndex] = updatedQuestion;

        // Update the state with the new array
        setQuestions(newQuestions);
    };



    const handleCorrectOptionChange = (qIndex: number, value: string) => {
        const newQuestions = [...questions];
        const updatedQuestion = {
            ...newQuestions[qIndex],
            correctOption: value, // Set the correct option as a string
        };
        newQuestions[qIndex] = updatedQuestion;
        setQuestions(newQuestions);
    };

    const handleCourseChange = (courseId: any) => {
        setValue('courseId', courseId); // Update the form with selected 
    };


    const handleImageUpload = (qIndex: number, file: File) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].image = file; // Store the File object
        setQuestions(newQuestions);
    };

    const handleUpdateExam = async (data: FieldValues) => {
       
        const formData = new FormData();
        formData.append("courseId", data.courseId);
        formData.append("title", data.title);
        formData.append("time", String(data.time));

        const questionsWithoutImages = questions.map(({ image, ...rest }) => rest);
        formData.append("questions", JSON.stringify(questionsWithoutImages));

        questions.forEach((question, index) => {
            if (question.image instanceof File) {
                formData.append(`questionImages[${index}]`, question.image); // Append the image file

            }
        });

        try {
            const response = await updateExam({ id, formData })
            console.log(response)
            if (response.data.success === true) {
                toast.success(response.data.message)
                router.push('/dashboard/admin/exam')
            }
        } catch {

        }
    };

    // Loading States
    if (coursesLoading || examLoading) {
        return <Typography variant="h6">Loading...</Typography>;
    }

    return (
        <Container maxWidth="md">
            <Box
                component="form"
                onSubmit={handleSubmit(handleUpdateExam)}
                sx={{
                    p: 4,
                    mt: 4,
                    bgcolor: "background.paper",
                    borderRadius: 2,
                    boxShadow: 2,
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Update Exam
                </Typography>

                {/* Course Selection */}
                <CourseField
                    defaultValue={examData.data.courseId}
                    label="Course"
                    name="courseId"

                    onChange={handleCourseChange}
                />

                <TextField
                    label="Exam Title"
                    variant="outlined"
                    fullWidth
                    defaultValue={examData.data.title}
                    sx={{ mb: 2 }}
                    {...register('title')}
                />
                <TextField
                    label="Exam Time"
                    variant="outlined"
                    type="number"
                    fullWidth
                    defaultValue={examData.data.time}
                    sx={{ mb: 2 }}
                    {...register('time')}
                />

                {/* Render questions from the `questions` state */}
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
                                value={question.questionText} // Change from defaultValue to value
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
                                            value={option} // Change from defaultValue to value
                                            onChange={(e) => handleOptionChange(qIndex, optIndex, e.target.value)}
                                        />
                                    </Grid>
                                ))}
                            </Grid>

                            {/* Correct Answer Field */}
                            <TextField
                                select
                                label="Correct Answer"
                                value={question.correctOption} // Bind to the correctOption
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
                                    startIcon={<PhotoCamera />}
                                    sx={{
                                        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', // Gradient color
                                        borderRadius: '15px', // Rounded button
                                        padding: '10px 20px',
                                        color: '#fff', // Text color
                                        fontSize: '15px',
                                        fontWeight: 'bold', // Initial shadow
                                        
                                      }}
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
                                <Button  sx={{
                                        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', // Gradient color
                                        borderRadius: '15px', // Rounded button
                                        padding: '10px 20px',
                                        color: '#fff', // Text color
                                        fontSize: '15px',
                                        fontWeight: 'bold', // Initial shadow
                                        
                                      }}   onClick={addQuestion}>
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
                    Update Exam
                </Button>
            </Box>
        </Container>
    );
};

export default UpdateExam;







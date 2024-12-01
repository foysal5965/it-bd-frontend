'use client';

import React, { useEffect, useState } from 'react';
import {
    Container,
    Typography,
    Button,
    Card,
    CardContent,
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
    Box,
    Modal,
    CircularProgress,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useGetMyExamQuery } from '@/redux/api/examApi';
import { useAddResultMutation } from '@/redux/api/resultApi';

const ExamPage = () => {
    const router = useRouter();
    const { data, isLoading, isError } = useGetMyExamQuery({});
    const [selectedOptions, setSelectedOptions] = useState({});
    const examDurationInMinutes = data?.data?.time;
    const [remainingTime, setRemainingTime] = useState(0);
    const examId = data?.data?.id;
    const [disqualified, setDisqualified] = useState(
        () => localStorage.getItem(`disqualified_${examId}`) === 'true'
    );
    const [examStarted, setExamStarted] = useState(
        () => localStorage.getItem(`examStarted_${examId}`) === 'true'
    );
    const [openResultModal, setOpenResultModal] = useState(false);
    const [score, setScore] = useState();
    const [examSubmitted, setExamSubmitted] = useState(
        () => localStorage.getItem(`examSubmitted_${examId}`) === 'true'
    );
    
    const [addResult] = useAddResultMutation();
    // Redirect if the exam is already submitted
    useEffect(() => {
        if (examSubmitted && score === 0) {
            // If exam is already submitted but no score yet, prevent redirect
            return;
        }
    
        if (examSubmitted) {
            router.push(`/dashboard/student/result`);
        }
    }, [examSubmitted, score, router]);
    

    // Initialize Exam
    useEffect(() => {
        if (examDurationInMinutes && data?.data?.questions?.length > 0 && !examStarted) {
            const startTime = new Date();
            localStorage.setItem(`examStartTime_${examId}`, startTime.toISOString());
            localStorage.setItem(`examStarted_${examId}`, 'true');
            setExamStarted(true);
            setDisqualified(false);
            localStorage.removeItem(`disqualified_${examId}`);
        }
    }, [examDurationInMinutes, examStarted, data, examId]);

    // Timer Logic
    useEffect(() => {
        if (examDurationInMinutes && data?.data?.questions?.length > 0) {
            const storedStartTime = localStorage.getItem(`examStartTime_${examId}`);
            const startTime = storedStartTime
                ? new Date(storedStartTime)
                : new Date();
            const elapsedTime = Math.floor(
                (new Date().getTime() - new Date(startTime).getTime()) / 1000
            );
            const totalExamTimeInSeconds = examDurationInMinutes * 60;
            const remaining = Math.max(
                totalExamTimeInSeconds - elapsedTime,
                0
            );
            setRemainingTime(remaining);
            if (remaining === 0) {
                handleSubmit();
            }
        }
    }, [examDurationInMinutes, data, examId]);

    // Countdown Timer
    useEffect(() => {
        if (remainingTime > 0 && data?.data?.questions?.length > 0) {
            const timer = setInterval(() => {
                setRemainingTime((prev) => {
                    if (prev === 0) {
                        clearInterval(timer);
                        handleSubmit();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [remainingTime, data]);

    // Disqualification Logic
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden && examStarted && !disqualified) {
                disqualifyUser();
            }
        };

        const handleBeforeUnload = (e:any) => {
            e.preventDefault();
            e.returnValue = '';
            if (examStarted && !disqualified) {
                disqualifyUser();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [examStarted, disqualified]);

    const disqualifyUser = () => {
        setDisqualified(true);
        localStorage.setItem(`disqualified_${examId}`, 'true');
        localStorage.removeItem(`examStartTime_${examId}`);
        alert('You have been disqualified for leaving the exam!');
        setExamSubmitted(true);
    };

    const formatTime = (seconds:any) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };
//@ts-ignore
    const handleOptionChange = (questionId, optionId) => {
        setSelectedOptions((prev) => ({
            ...prev,
            [questionId]: optionId,
        }));
    };

    const calculateScore = () => {
        let calculatedScore = 0;
    
        data?.data?.questions?.forEach((question:any) => {
            //@ts-ignore
            const selectedOptionId = selectedOptions[question.id]; // The ID of the selected option
            const selectedOption = question.options.find(
                (option:any) => option.id === selectedOptionId
            ); 
    
            if (selectedOption?.optionText === question.correctOption) {
                calculatedScore += 1;
            }
        });
    
        return calculatedScore;
    };
    

    const handleSubmit = async () => {
        
    
        // Calculate the score before marking the exam as submitted
        const calculatedScore = calculateScore();
        //@ts-ignore
        setScore(calculatedScore);  // Update the score in the state
    
        try {
            // Submit the result to the API
            const resultData = {
                examId: data.data.id,
                score: calculatedScore,
            };
            await addResult(resultData).unwrap();
    
            // Open the result modal to show the score
            setOpenResultModal(true);
    
            // Clear the exam-related data from localStorage
            localStorage.removeItem(`examStartTime_${examId}`);
            localStorage.removeItem(`examStarted_${examId}`);
            localStorage.removeItem(`disqualified_${examId}`);
            // if (examSubmitted) return;
            // Redirect to the result page
            router.push(`/dashboard/student/result`);
    
            // Mark the exam as submitted *after* the result is processed
            setExamSubmitted(true);
            localStorage.setItem(`examSubmitted_${examId}`, 'true');  // Mark exam as submitted
    
        } catch (error) {
            console.error('Error submitting result:', error);
        }
    };
    
    

    const handleCloseModal = () => {
        setOpenResultModal(false);
    };

    // Loading State
    if (isLoading) {
        return (
            <Container maxWidth="md" style={{ marginTop: '20px' }}>
                <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
                    <CircularProgress />
                </Box>
            </Container>
        );
    }

    // Error State
    if (isError || !data?.data?.questions?.length) {
        return (
            <Container maxWidth="md" style={{ marginTop: '20px' }}>
                <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
                    <Typography variant="h6" color="error">
                        No exam data available. Please try again later.
                    </Typography>
                </Box>
            </Container>
        );
    }

    // Main Component
    if (examSubmitted) {
        return null;  // Don't show exam content if already submitted
    }

    return (
        <Container maxWidth="md" style={{ marginTop: '20px' }}>
            <Typography variant="h4" align="center" gutterBottom>
                Exam Page
            </Typography>
            <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
                <Typography variant="h6" color="error">
                    Time Remaining: {formatTime(remainingTime)}
                </Typography>
            </Box>
            {disqualified && (
                <Typography variant="h6" color="error" align="center">
                    You have been disqualified!
                </Typography>
            )}
            {data?.data?.questions.map((question:any) => (
                <motion.div
                    key={question.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                >
                    <Card variant="outlined" style={{ marginBottom: '20px' }}>
                        <CardContent>
                            <Typography variant="h5" gutterBottom>
                                {question.questionText}
                            </Typography>
                            {question.image && (
                                <img
                                    src={question.image}
                                    alt="Question visual"
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        borderRadius: '8px',
                                        marginBottom: '10px',
                                    }}
                                />
                            )}
                            <FormControl component="fieldset">
                                <RadioGroup
                                    aria-label={question.questionText}
                                    //@ts-ignore
                                    value={selectedOptions[question.id] || ''}
                                    onChange={(e) =>
                                        handleOptionChange(question.id, e.target.value)
                                    }
                                >
                                    {question.options.map((option:any) => (
                                        <FormControlLabel
                                            key={option.id}
                                            value={option.id}
                                            control={<Radio />}
                                            label={option.optionText}
                                        />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
            <Box display="flex" justifyContent="center" mt={2}>
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={remainingTime === 0 || disqualified}
                >
                    Submit Exam
                </Button>
            </Box>
            <Modal
                open={openResultModal}
                onClose={handleCloseModal}
                aria-labelledby="result-modal-title"
                aria-describedby="result-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        borderRadius: '8px',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Typography id="result-modal-title" variant="h6" component="h2">
                        Exam Results
                    </Typography>
                    <Typography id="result-modal-description" sx={{ mt: 2 }}>
                        Your Score: {score}/{data?.data?.questions.length}
                    </Typography>
                    <Box display="flex" justifyContent="center" mt={3}>
                        <Button variant="contained" color="primary" onClick={handleCloseModal}>
                            Close
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Container>
    );
};

export default ExamPage;

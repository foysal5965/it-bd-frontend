'use client'
import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Card, CardContent, FormControl, RadioGroup, FormControlLabel, Radio, Box, Modal, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import { useGetMyExamQuery } from '@/redux/api/examApi';

const ExamPage = () => {
    const query = {};
    const { data, isLoading, isError } = useGetMyExamQuery({ ...query }); // Capture loading and error states

    const [selectedOptions, setSelectedOptions] = useState({});
    const examDurationInMinutes = data?.data?.time;
    const [openResultModal, setOpenResultModal] = useState(false);
    const [score, setScore] = useState(0);
    const [examSubmitted, setExamSubmitted] = useState(false);
    const [remainingTime, setRemainingTime] = useState(0);

    useEffect(() => {
        if (examDurationInMinutes) {
            setRemainingTime(examDurationInMinutes * 60); // Set exam time from data
        }
    }, [examDurationInMinutes]);

    useEffect(() => {
        if (remainingTime > 0) {
            const timer = setInterval(() => {
                setRemainingTime((prev) => {
                    if (prev === 0) {
                        clearInterval(timer);
                        handleSubmit(); // Auto-submit when time runs out
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000); // Update every second

            return () => clearInterval(timer); // Cleanup interval on component unmount
        }
    }, [remainingTime]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleOptionChange = (questionId, optionId) => {
        setSelectedOptions((prev) => ({
            ...prev,
            [questionId]: optionId
        }));
    };

    const calculateScore = () => {
        let calculatedScore = 0;
        data?.data?.questions?.forEach((question) => {
            if (selectedOptions[question.id] === question.correctOption) {
                calculatedScore += 1;
            }
        });
        return calculatedScore;
    };

    const handleSubmit = () => {
        const calculatedScore = calculateScore();
        setScore(calculatedScore);
        setOpenResultModal(true); // Open the result modal
        setExamSubmitted(true);   // Mark exam as submitted
    };

    const handleCloseModal = () => {
        setOpenResultModal(false);
    };

    // Show loading state if data is being fetched
    if (isLoading) {
        return (
            <Container maxWidth="md" style={{ marginTop: '20px' }}>
                <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
                    <CircularProgress />
                </Box>
            </Container>
        );
    }

    // Show error state if there's an error fetching the data
    if (isError || !data?.data?.questions) {
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

            {data?.data?.questions.map((question) => (
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
                                        marginBottom: '10px'
                                    }}
                                />
                            )}
                            <FormControl component="fieldset">
                                <RadioGroup
                                    value={selectedOptions[question.id] || ''}
                                    onChange={(e) => handleOptionChange(question.id, e.target.value)}
                                >
                                    {question.options.map((option) => (
                                        <FormControlLabel
                                            key={option.id}
                                            value={option.optionText}
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
                    sx={{
                        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', // Gradient color
                        borderRadius: '15px', // Rounded button
                        padding: '10px 20px',
                        color: '#fff', // Text color
                        fontSize: '15px',
                        fontWeight: 'bold',
                    }}
                    onClick={handleSubmit}
                    disabled={remainingTime === 0}
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

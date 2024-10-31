// src/components/SingleExamView.tsx
'use client'
import React, { useEffect, useState } from 'react';
import {
    Container,
    Paper,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Divider,
} from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';
import CheckIcon from '@mui/icons-material/Check';
import { useGetSingleExamQuery } from '@/redux/api/examApi';

// Define the shape of a question
interface Question {
    id: string;
    questionText: string;
    options: string[];
    correctOption: string;
}

// Define the shape of an exam
interface Exam {
    id: string;
    title: string;
    courseName: string;
    questions: Question[];
}

const SingleExamView: React.FC = ({ params }:any) => {
    
    const [exam, setExam] = useState<Exam | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
const query = {id:params.id}
   const {data, isLoading}= useGetSingleExamQuery(params.id)
   
   console.log(data?.data)
   

    // Motion variant for animations
    const variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    if (isLoading) {
        return <Typography variant="h6">Loading...</Typography>;
    }

   

    return (
        <Container>
            <Paper style={{ padding: '16px', marginBottom: '16px' }}>
                <Typography variant="h4">{data?.data?.title}</Typography>
                {/* <Typography variant="subtitle1">Course: {exam.courseName}</Typography> */}
            </Paper>
            <List>
                {data?.data?.questions.map((question:any) => (
                    <motion.div
                        key={question.id}
                        initial="hidden"
                        animate="visible"
                        variants={variants}
                        transition={{ duration: 0.5 }}
                    >
                        <ListItem>
                            <ListItemText primary={question.questionText} />
                        </ListItem>
                        <Divider />
                        <List>
                            {question.options.map((option:any) => (
                                <ListItem >
                                    <ListItemIcon>
                                        <CheckIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={option.optionText} />
                                </ListItem>
                            ))}
                        </List>
                    </motion.div>
                ))}
            </List>
        </Container>
    );
};

export default SingleExamView;

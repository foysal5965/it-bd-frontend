'use client';
import React, { useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel,
    Button, Paper, TextField, FormControl, Select, MenuItem, Grid, useMediaQuery
} from '@mui/material';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useExamsQuery, useUpdateExamStatusMutation } from '@/redux/api/examApi';
import { useDebounced } from '@/redux/hook';
import ExamStatusSelect from '@/components/Forms/ExamStatusSelect';

// Define the shape of an exam
export interface Exam {
    course: any;
    id: string;
    title: string;
    courseName: string;
    status: string; // e.g., 'Active', 'Inactive'
}

const STATUS_OPTIONS = [
    'DRAFT', 'PUBLISHED', 'CLOSED', 'ACTIVE'
];

const ExamTable: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const query: Record<string, any> = {};
    const debouncedTerm = useDebounced({ searchQuery: searchTerm, delay: 600 });

    if (debouncedTerm) {
        query['searchTerm'] = searchTerm;
    }

    const { data, isLoading } = useExamsQuery({ ...query });
    const [updateExamStatus] = useUpdateExamStatusMutation()
    const isSmallScreen = useMediaQuery('(max-width:600px)');

    const variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };
const handleUpdateExamStatus = async({ id, status }: { id: string; status: string })=>{
    const response = await updateExamStatus({id, status})
    console.log(response)
}
    return (
        <>
            {/* Search Input */}
            <TextField
                label="Search Exams"
                variant="outlined"
                fullWidth
                onChange={(e) => setSearchTerm(e.target.value)}
                size="small"
                placeholder="Search Exams"
                sx={{ marginBottom: 2 }}
            />

            <TableContainer component={Paper}>
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={variants}
                    transition={{ duration: 0.5 }}
                >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <TableSortLabel>Exam Name</TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel>Course Name</TableSortLabel>
                                </TableCell>
                                {!isSmallScreen && (
                                    <TableCell>
                                        <TableSortLabel>Status</TableSortLabel>
                                    </TableCell>
                                )}
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={isSmallScreen ? 3 : 4} align="center">
                                        Loading...
                                    </TableCell>
                                </TableRow>
                            ) : (
                                data?.data?.map((exam: Exam) => (
                                    <TableRow key={exam.id}>
                                        <TableCell>{exam.title}</TableCell>
                                        <TableCell>{exam.course.courseName}</TableCell>
                                        {!isSmallScreen && (
                                            <TableCell>
                                                <ExamStatusSelect exam={exam} STATUS_OPTIONS={STATUS_OPTIONS} handleUpdateExamStatus={handleUpdateExamStatus}/>
                                            </TableCell>
                                        )}
                                        <TableCell align="right">
                                            <Grid container spacing={1} justifyContent="flex-end">
                                                <Grid item>
                                                    <Link href={`/dashboard/admin/exam/view-exam/${exam.id}`}>
                                                        <Button
                                                            variant="contained"
                                                            sx={{
                                                                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                                                                borderRadius: '15px',
                                                                padding: '8px 16px',
                                                                color: '#fff',
                                                                fontSize: '12px',
                                                                fontWeight: 'bold',
                                                            }}
                                                        >
                                                            View
                                                        </Button>
                                                    </Link>
                                                </Grid>
                                                <Grid item>
                                                    <Link href={`/dashboard/admin/exam/edit/${exam.id}`}>
                                                        <Button
                                                            variant="contained"
                                                            sx={{
                                                                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                                                                borderRadius: '15px',
                                                                padding: '8px 16px',
                                                                color: '#fff',
                                                                fontSize: '12px',
                                                                fontWeight: 'bold',
                                                            }}
                                                        >
                                                            Update
                                                        </Button>
                                                    </Link>
                                                </Grid>
                                                <Grid item>
                                                    <Button
                                                        variant="contained"
                                                        sx={{
                                                            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                                                            borderRadius: '15px',
                                                            padding: '8px 16px',
                                                            color: '#fff',
                                                            fontSize: '12px',
                                                            fontWeight: 'bold',
                                                        }}
                                                    >
                                                        Delete
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </motion.div>
            </TableContainer>
        </>
    );
};

export default ExamTable;

'use client'
import CourseList from "@/components/course/CourseList";
import Loading from "@/components/shared/loading/loading";
import { useCourseQuery } from "@/redux/api/courseApi";
import { useCourseCategoryQuery } from "@/redux/api/courseCategory.api";
import { Typography, Paper, Box } from '@mui/material';
import { motion } from 'framer-motion';
const CoursePage = ({params}:any) => {
    const query ={categoryId: params.id}
   
    const { data: courses, isLoading } = useCourseQuery({...query})
   
    if(isLoading){
      return <Loading/>
    }
  return (
   
      <>
      <Typography variant="h4" align="center" gutterBottom>
        Courses
      </Typography>
      <CourseList courses={courses} isLoading={isLoading} />
      </>
    
  )
};

export default CoursePage;

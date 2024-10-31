'use client'
import CourseDetailsHeroSection from '@/components/course/CourseDetailsHeroSection';
import Loading from '@/components/shared/loading/loading';
import useUserInfo from '@/hooks/userUserInfo';
import { useCourseQuery } from '@/redux/api/courseApi';
import { useUserQuery } from '@/redux/api/userApi';
import { getUserInfo } from '@/services/authService';
import { Box, Typography, Button, Grid, List, ListItem, ListItemText, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { useState } from 'react';



const CourseDetails = ({params}:any) => {
   let course ={}
    const query= {id: params.id}
    const{data, isLoading}= useCourseQuery({...query})
     if (Array.isArray(data?.data)) {
        course=(data?.data[0]);
    } 
    let user={}
    const userInfo = useUserInfo()
    const query2 = {email:userInfo?.email}
    const{data:userData}= useUserQuery({...query2})
    
    if (Array.isArray(userData?.data)) {
        user=(userData?.data[0]); // Log the first element of the course array if it's an array
    } 
    if(isLoading){
        return <Loading/>
    }
    
  

  return (
    <CourseDetailsHeroSection course={course} user={user}/>
  );
};

export default CourseDetails;

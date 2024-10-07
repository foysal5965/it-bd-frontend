'use client'
import { Course } from "@/app/(withDashboardLayout)/dashboard/admin/course/page";
import CourseList from "@/components/course/CourseList";
import Loading from "@/components/shared/loading/loading";
import { useCourseQuery } from "@/redux/api/courseApi";
import { useDebounced } from "@/redux/hook";
import { Container, TextField } from "@mui/material";
import { useEffect, useState } from "react";

const CoursePage = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const query: Record<string, any> = {};
    const debouncedTerm = useDebounced({
      searchQuery: searchTerm,
      delay: 600,
    });
    if (!!debouncedTerm) {
      query["searchTerm"] = searchTerm;
    }
    const { data: courses, isLoading } = useCourseQuery({ ...query })
    
    if (isLoading) {
        return <Loading />
    }
    return (
        <div>
    
            <CourseList courses={courses} isLoading={isLoading}></CourseList>
        </div>
    )
};

export default CoursePage;

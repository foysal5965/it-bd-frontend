'use client'
import CourseDetailsHeroSection from "@/components/course/CourseDetailsHeroSection";
import Loading from "@/components/shared/loading/loading";
import useUserInfo from "@/hooks/userUserInfo";
import { useGetSingleCourseQuery } from "@/redux/api/courseApi";
import { useUserQuery } from "@/redux/api/userApi";

const SingleCoursePage = ({params}:any) => {

    const {data, isLoading} = useGetSingleCourseQuery(params.courseId)
   
    let user ={}
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
    <div>
      <CourseDetailsHeroSection course={data?.data} user={user}/>
    </div>
  )
};

export default SingleCoursePage;

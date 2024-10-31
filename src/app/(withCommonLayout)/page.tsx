'use client'
import { Category } from "@/components/homepage/CourseCategory/Category";
import CourseCategory from "@/components/homepage/CourseCategory/CourseCategory";
import HeroSection from "@/components/homepage/HeroSection";
import SeminerSection from "@/components/homepage/SeminerSection";
import SolutionSection from "@/components/homepage/SolutionSection";
import Loading from "@/components/shared/loading/loading";
import { useSelector } from "react-redux";

const HomePage = () => {
  const isLoading = useSelector((state: any) => state.loading.isLoading);
  if(isLoading){
      return <Loading/>
  }
  return (
    <>
      <HeroSection/>
      <Category/>
      <SolutionSection/>
      <SeminerSection/>
    </>
  )
};

export default HomePage;

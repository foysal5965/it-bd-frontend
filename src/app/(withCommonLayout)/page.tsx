'use client'
import { Category } from "@/components/homepage/CourseCategory/Category";
import CourseCategory from "@/components/homepage/CourseCategory/CourseCategory";
import HeroSection from "@/components/homepage/HeroSection";
import SeminerSection from "@/components/homepage/SeminerSection";
import SolutionSection from "@/components/homepage/SolutionSection";

const HomePage = () => {
   
  return (
    <>
      <HeroSection/>
      {/* <CourseCategory data={null} /> */}
      <Category/>
      <SolutionSection/>
      <SeminerSection/>
    </>
  )
};

export default HomePage;

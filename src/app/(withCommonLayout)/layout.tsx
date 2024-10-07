'use client'
import Footer from "@/components/shared/footer/Footer";
import Loading from "@/components/shared/loading/loading";
import Navbar from "@/components/shared/navbar/Navbar";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";

const CommonLayoutPage = ({ children }: { children: React.ReactNode }) => {
    const isLoading = useSelector((state: any) => state.loading.isLoading);
    if(isLoading){
        return <Loading/>
    }
    return (
        <>
            <Navbar></Navbar>
            <Box className="min-h-screen">{children}</Box>
            <Footer></Footer>
        </>
    )
};

export default CommonLayoutPage;

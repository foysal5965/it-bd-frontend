"use client";

import React, { useState, useEffect } from "react";
import { Box, Typography, Container } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import AnimatedButton from "@/lib/animatated/animatedButton";
import image1 from "@/assets/contest/guy-071024.png";
import image2 from "@/assets/contest/slide2.png";

const ContestCarousel = ({params}:any) => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://itbd-backend.vercel.app/api/v1/contest")
      .then((response) => response.json())
      .then((data) => {
        setData(data.data);
        setLoading(false);
      });
  }, []);

  const now = new Date(); // Current time

  // Filter contests with endTime greater than now
  const activeContests = data.filter(
    //@ts-ignore
    (contest) => new Date(contest.endTime) > now
  );

  useEffect(() => {
    if (activeContests.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % activeContests.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [activeContests]);

  const slideVariants = {
    enter: { x: "100%", opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
  };

  const defaultImages = [image1.src, image2.src]; // Default image URLs

  if (loading) {
    return (
      <Container>
        <Typography variant="h6" textAlign="center" mt={4}>
          Loading contests...
        </Typography>
      </Container>
    );
  }

  if (activeContests.length === 0) {
    return (
      <Container>
        <Typography variant="h4" textAlign="center" mt={6}>
          No active contests at the moment. Please check back later!
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.default",
        }}
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={currentIndex}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.8 }}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "20px",
            }}
          >
            <Typography fontWeight={700} fontSize={34}>
              Join the Contest!
            </Typography>
            {/* Text and Image Wrapper */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                justifyContent: "center",
                textAlign: { xs: "center", md: "left" },
                width: "100%",
                maxWidth: "1200px",
                gap: 4,
              }}
            >
              {/* Text Section */}
              <Box sx={{ flex: 1 }}>
                <Typography variant="h3" sx={{ mb: 2 }}>
                  {activeContests[currentIndex].name}
                </Typography>
                <Typography variant="h6" sx={{ mb: 3, px: { xs: 2, md: 0 } }}>
                  {activeContests[currentIndex].description}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Start:</strong>{" "}
                  {new Date(
                    activeContests[currentIndex].startTime
                  ).toLocaleString()}
                </Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>
                  <strong>End:</strong>{" "}
                  {new Date(
                    activeContests[currentIndex].endTime
                  ).toLocaleString()}
                </Typography>
                <Box sx={{display:'flex'}}>
                <Link href={`/contest/${activeContests[currentIndex].id}`}>
                  <AnimatedButton name="Register Now!" variant="contained" />
                </Link>
                </Box>
              </Box>

              {/* Image Section */}
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <motion.img
                  src={
                    activeContests[currentIndex].image ||
                    defaultImages[currentIndex % defaultImages.length]
                  }
                  alt={activeContests[currentIndex].name}
                  style={{
                    width: "100%",
                    maxWidth: "500px",
                    height: "auto",
                    borderRadius: "10px",
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.8 }}
                />
              </Box>
            </Box>
          </motion.div>
        </AnimatePresence>
      </Box>
    </Container>
  );
};

export default ContestCarousel;

'use client'

import { Typography, Button, Toolbar, Grid, Box } from "@mui/material";
import Link from "next/link";
import { SignIn } from "@clerk/nextjs";
import { Monoton } from 'next/font/google';
import { motion } from 'framer-motion';
import React from "react";
import Image from 'next/image';
import {useRouter} from 'next/navigation';

const monoton = Monoton({subsets: ['latin'], weight: ['400']});
const pulseVariants = {
  pulse: {
    scale: [1, 1.1, 1],
    opacity: [1, 0.95, 1],
    transition: {
      duration: 1.5,
      ease: 'easeInOut',
      color: "#97fce3",
      repeat: Infinity,
      repeatType: 'loop'
    },
  }
};

const colorVariants = {
  colorChange: {
    color: ['#e1a2f2', '#97fce3', '#d1ff7a', '#fc979f', '#619eff'],  // Color change from #e1a2f2 to #97fce3 and back
    transition: {
      duration: 3,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'loop'
    }
  }
};

export default function SignUpPage() {
  const router = useRouter();

    const handleImageClick = () => {
      router.push('/');
    }; 
  return (
    <Box height="100vh">
      {/* Toolbar */}
      <Toolbar
        sx={{
          flexDirection: 'row',
          justifyContent: 'right',
          textAlign: 'top',
        }}
      >
        <Link href="/sign-in" passHref>
          <Button color="inherit" sx={{ mr: 2, color: '#e1a2f2' }}>
            Login
          </Button>
        </Link>
        <Link href="/sign-up" passHref>
          <Button color="inherit" sx={{ ml: 2, color: '#e1a2f2' }}>
            Sign Up
          </Button>
        </Link>
      </Toolbar>

      {/* Grid layout to divide the page into two sections */}
      <Grid container sx={{ height: '100vh' }}>
        {/* Left side for image */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative', // Make the parent container relative
          }}
        >
          {/* Container for the SVG and Image */}
          <Box sx={{ position: 'relative', width: 500, height: 500 }}> {/* Match sizes */}
            {/* SVG Animated Circle */}
            <motion.svg 
              className="absolute top-0 left-0" // Ensure proper absolute positioning
              fill="transparent"
              viewBox="0 0 506 506"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                position: 'absolute', // Absolutely position the SVG
                zIndex: 1,            // Make sure circle is above the image
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
            >
              <motion.circle 
                cx="254" 
                cy="252" 
                r="235" 
                stroke="#97fce3" 
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ strokeDasharray: "14 10 0 0" }}
                animate={{
                  strokeDasharray: [
                    "24 10 0 0", 
                    "16 25 92 72", 
                    "24 10 0 0"
                  ],
                  rotate: [0, 360]  // Rotate around the center
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
                style={{
                  transformOrigin: '50% 50%'  // Fix the rotation point to the center
                }}
              />
            </motion.svg>
            <motion.svg 
              className="absolute top-0 left-0" // Ensure proper absolute positioning
              fill="transparent"
              viewBox="0 0 506 506"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                position: 'absolute', // Absolutely position the SVG
                zIndex: 1,            // Make sure circle is above the image
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
            >
              <motion.circle 
                cx="253" 
                cy="253" 
                r="200" 
                stroke="#97fce3" 
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ strokeDasharray: "14 10 0 0" }}
                animate={{
                  strokeDasharray: [
                    "24 10 0 0", 
                    "16 25 92 72", 
                    "24 10 0 0"
                  ],
                  rotate: [0, 360]  // Rotate around the center
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
                style={{
                  transformOrigin: '50% 50%'  // Fix the rotation point to the center
                }}
              />
            </motion.svg>
            <motion.svg 
              className="absolute top-0 left-0" // Ensure proper absolute positioning
              fill="transparent"
              viewBox="0 0 506 506"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                position: 'absolute', // Absolutely position the SVG
                zIndex: 1,            // Make sure circle is above the image
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
            >
              <motion.circle 
                cx="253" 
                cy="253" 
                r="100" 
                stroke="#97fce3" 
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ strokeDasharray: "14 10 0 0" }}
                animate={{
                  strokeDasharray: [
                    "24 10 0 0", 
                    "16 25 92 72", 
                    "24 10 0 0"
                  ],
                  rotate: [0, 360]  // Rotate around the center
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
                style={{
                  transformOrigin: '50% 50%'  // Fix the rotation point to the center
                }}
              />
            </motion.svg>
            <motion.svg 
              className="absolute top-0 left-0" // Ensure proper absolute positioning
              fill="transparent"
              viewBox="0 0 506 506"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                position: 'absolute', // Absolutely position the SVG
                zIndex: 1,            // Make sure circle is above the image
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
            >
              <motion.circle 
                cx="253" 
                cy="253" 
                r="150" 
                stroke="#97fce3" 
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ strokeDasharray: "14 10 0 0" }}
                animate={{
                  strokeDasharray: [
                    "24 10 0 0", 
                    "16 25 92 72", 
                    "24 10 0 0"
                  ],
                  rotate: [0, 360]  // Rotate around the center
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
                style={{
                  transformOrigin: '50% 50%'  // Fix the rotation point to the center
                }}
              />
            </motion.svg>
            <motion.svg 
              className="absolute top-0 left-0" // Ensure proper absolute positioning
              fill="transparent"
              viewBox="0 0 506 506"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                position: 'absolute', // Absolutely position the SVG
                zIndex: 1,            // Make sure circle is above the image
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
            >
              <motion.circle 
                cx="253" 
                cy="253" 
                r="50" 
                stroke="#97fce3" 
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ strokeDasharray: "14 10 0 0" }}
                animate={{
                  strokeDasharray: [
                    "24 10 0 0", 
                    "16 25 92 72", 
                    "24 10 0 0"
                  ],
                  rotate: [0, 360]  // Rotate around the center
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
                style={{
                  transformOrigin: '50% 50%'  // Fix the rotation point to the center
                }}
              />
            </motion.svg>

            {/* Image placed under the animated circle */}
            <Image
              src="/assets/record.png"
              priority
              quality={100}
              width={500} // Adjust width/height to your desired size
              height={500}
              alt="Record Image"
              style={{
                position: 'absolute', // Keep image in normal flow
                zIndex: 0, // Ensure image appears beneath the circle
                top: 0,
                left: 0,
              }}
              onClick = {handleImageClick}
            />
          </Box>
        </Grid>

        {/* Right side for the content */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          {/* Animation wrapper for the title */}
          <motion.div
            variants={pulseVariants}
            animate="pulse"
            style={{
              display: 'inline-block',
            }}
          >
            <motion.div variants={colorVariants} animate="colorChange">
              <Typography
                variant="h3"
                gutterBottom
                className={monoton.className}
              >
                Login
              </Typography>
            </motion.div>
          </motion.div>

          {/* SignIn Form */}
          <SignIn />
        </Grid>
      </Grid>
    </Box>
  );
}
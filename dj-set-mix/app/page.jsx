  'use client'

  import React from "react";
  import { Container, Box, Typography, AppBar, Toolbar, Button, Grid} from "@mui/material";
  import styles from "./page.module.css";
  import Head from "next/head";
  import {
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
  } from '@clerk/nextjs';
  import {useRouter} from 'next/navigation';
  import {motion} from 'framer-motion'
  import {Monoton} from 'next/font/google'
  import { TfiMusicAlt } from "react-icons/tfi";

  // create the monoton font
  const monoton = Monoton({subsets: ['latin'], weight: ['400']})

  // define zoom in animation variant
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
      color: ['#e1a2f2', '#97fce3','#d1ff7a', '#fc979f', '#619eff'],  // Color change from #e1a2f2 to #97fce3 and back
      transition: {
        duration: 3,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'loop'
      }
    }
  }

  export default function Home() {
    const router = useRouter();

    const handleImageClick = () => {
      router.push('/');
    }; 

    return (
      <Container maxWidth = "100vw">
        <Head
        >MIXER AI.
          <meta name = "description" content = "Create flashcard from your text" />
        </Head>
          <Toolbar style = {{
            flexDirection:'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            textAlign: 'top'
          }}>
            <Button color="inherit" href = "/sign-in">Login</Button>
            <Button color = "inherit" href = "/">Sign Up</Button>
          </Toolbar>
          <Box sx={{textAlign: 'center', my:6}}>
            <motion.div
              variants = {pulseVariants}
              animate = "pulse"
              style = {{
                display:'inline-block',
              }}
            >
            <motion.div
              variants={colorVariants}
              animate="colorChange"
            >
              <Typography 
                className={monoton.className} 
                variant="h1" 
                style={{ 
                  flexGrow: 1,  
                }}
                >
                MIXER AI.
              </Typography>
            </motion.div>
            </motion.div>
          </Box>
          <Box sx={{position: 'relative', textAlign: 'center', justifyContent: 'center', my: 6, cursor: 'pointer'}}>
            <motion.img
              src="/assets/static_stereo.png" 
              alt="Pulsing Image"
              variants={pulseVariants}
              animate = "pulse"
              style={{
                width: '900px',  
                height: 'auto',
              }}
              onClick = {handleImageClick}
            />
      </Box>
      </Container>
    );
  }

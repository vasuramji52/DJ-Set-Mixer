  'use client'

  import React from "react";
  import { Container, Box, Typography, AppBar, Toolbar, Button, Grid} from "@mui/material";
  import styles from "./page.module.css";
  import Head from "next/head";
  import {useRouter} from 'next/navigation';
  import {motion} from 'framer-motion'
  import {Monoton} from 'next/font/google'
  import {ClerkProvider, SignedIn, SignedOut, UserButton, SignInButton} from '@clerk/nextjs'

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

    const handleButtonClick = () => {
      router.push('/creation');
    }; 

    return (
      <Container maxWidth = "100vw" color = "black">
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
            <Button href = "/sign-in" sx = {{ mr: 2, color:'#e1a2f2'}}>Login</Button>
            <Button href = "/sign-up" sx = {{ml: 2, color:'#97fce3'}}>Sign Up</Button>
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
          <Box sx={{position: 'relative', textAlign: 'center', justifyContent: 'center', my: 6}}>
            <motion.img
              src="/assets/static_stereo.png" 
              alt="Pulsing Image"
              variants={pulseVariants}
              animate = "pulse"
              style={{
                width: '900px',  
                height: 'auto',
              }}
              onClick = {handleButtonClick}
            />
            <button
              onClick = {handleButtonClick}
              className = {styles.overlayButton}
              style = {{
                position: 'absolute',
                top: '50%',
                left: '10',
                transform: 'translateY(-50%)', // Center the button vertically
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
          >
          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            style={{
              fontSize: '3rem',
              color: '#ff1493', // Color of your icon
            }}
          >
            {/* Add your react-icon here */}
            </motion.div>
            </button>
      </Box>
      
      <Box sx = {{display: 'flex', justifyContent:'center'}}>
        <Typography variant = "h3">
          Click the mixer to begin.
        </Typography>
      </Box>
      <Box sx = {{display: 'flex', justifyContent: 'center'}}>
      <Typography variant = "body1">
          Take your DJ skills to a new level.
      </Typography>
      </Box>
      {/* <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
      <Button variant="contained" color="primary" sx={{mt: 2, mr: 2, mt: 2, backgroundColor: '#e1a2f2', color: {variants: {colorVariants}, animate : "colorChange"}, '&:hover':{backgroundColor: '#97fce3'} }} href="/creation" className = "rounded-full bg-white group-hover:bg-accent">
            Get Started
      </Button>
      </Box> */}
      </Container>
    );
  }

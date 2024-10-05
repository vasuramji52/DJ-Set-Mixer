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
import {Monoton} from 'next/font/google'

const monoton = Monoton({subsets: ['latin'], weight: ['400'], color: "e1a2f2"})

export default function Home() {
  return (
    <Container maxWidth = "100vw">
      <Head
        style = {{
          flexDirection:'column',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center'
        }}
      >
        <title>MIXER AI.</title>
        <meta name = "description" content = "Create flashcard from your text" />
      </Head>

      
        <Toolbar style = {{
          flexDirection:'row',
          justifyContent: 'right',
          textAlign: 'top'
        }}>
          <Button color="inherit" href = "/">Login</Button>
          <Button color = "inherit" href = "/">Sign Up</Button>
        </Toolbar>
        <Box sx={{textAlign: 'center', my:6}}>
          <Typography 
            className={monoton.className} 
            variant="h1" 
            style={{ 
              flexGrow: 1, 
              color: '#e1a2f2'  // Set the color to e1a2f2
            }}>
            MIXER AI.
          </Typography>
        </Box>
  
        
        <title>MIXER AI.</title>
    </Container>
  );
}

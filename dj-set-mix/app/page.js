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

      <AppBar position = "static" sx = {{width: "100%"}}>
        <Toolbar>
          <Typography variant = "h6" style = {{flexGrow: 1}}>MIXER AI.</Typography>
          <Button color="inherit" href = "/">Login</Button>
          <Button color = "inherit" href = "/">Sign Up</Button>
        </Toolbar>
      </AppBar>
        <title>MIXER AI.</title>
    </Container>
  );
}

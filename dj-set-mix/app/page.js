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
      <Head>
        <title>MIXERAI.</title>
      </Head>

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{flexGrow: 1}}>
            MIXERAI.
          </Typography>
          <ClerkProvider>
            <html lang="en">
              <body>
                <SignedOut>
                  <Button color="inherit" href="/sign-in">Login</Button>
                  <Button color="inherit" href="/sign-up">Sign Up</Button>
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </body>
            </html>
          </ClerkProvider>
        </Toolbar>
      </AppBar>

    </Container>
  );
}

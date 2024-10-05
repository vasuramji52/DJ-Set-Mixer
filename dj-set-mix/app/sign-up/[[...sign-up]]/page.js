import { Typography, Button, Toolbar, Container, AppBar, Box } from "@mui/material";
import Link from "next/link";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <Box>
      <Toolbar style = {{
          flexDirection:'row',
          justifyContent: 'right',
          textAlign: 'top'
        }}>
          <Link href="/sign-in" passHref>
            <Button color="inherit" sx={{ mr: 2, color:'#e1a2f2'}}>
              Login
            </Button>
          </Link>
          <Link href="/sign-up" passHref>
            <Button color="inherit" sx={{ ml: 2, color:'#e1a2f2' }}>
              Sign Up
            </Button>
          </Link>
        </Toolbar>
      
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        sx={{ mt: 1 }} // Margin top for spacing
      >
        <Typography variant="h3" gutterBottom sx={{color: "#e1a2f2"}} >
          Sign Up
        </Typography>
        <SignUp />
      </Box>
    </Box>
  );
}






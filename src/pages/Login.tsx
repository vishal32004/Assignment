import { LockOutlined } from "@mui/icons-material";
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../hooks/reduxHooks";
import { login } from "../Slices/authSlice";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password Must be 8 characters  Long"),
});

type FormData = {
  email: string;
  password: string;
};

const Login = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (email && password) {
      try {
        await dispatch(
          login({
            email,
            password,
          })
        ).unwrap();
      } catch (e) {
        console.error(e);
      }
    } else {
      return;
    }
  };

  return (
    <>
      <Container maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            mt: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
            <LockOutlined />
          </Avatar>
          <Typography variant="h5">Login</Typography>
          <Box sx={{ mt: 1 }}>
            <form
              onSubmit={handleSubmit((data) => console.log(data))}
              noValidate
            >
              <TextField
                {...register("email", {
                  required: "email is required",
                })}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!errors.email}
                helperText={errors.email && errors.email.message}
              />

              <TextField
                {...register("password", {
                  required: "Password is required",
                })}
                margin="normal"
                required
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                error={!!errors.password}
                helperText={errors.password && errors.password.message}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleLogin}
              >
                Login
              </Button>
            </form>
            <Grid container justifyContent={"flex-end"}>
              <Grid item>
                <Link to="/register">Don't have an account? Register</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Login;

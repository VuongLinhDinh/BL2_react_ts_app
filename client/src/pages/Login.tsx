/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Container,
  Stack,
  TextField,
  Typography,
  Snackbar,
  Alert,
  Box
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import instance from "src/axious";

type LoginFormParams = {
  email: string;
  password: string;
};

const Login = () => {
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormParams>();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setSuccessMessage("You are already logged in!");
      setTimeout(() => {
        navigate("/product");
      }, 2000); // Redirect after 2 seconds
    }
  }, [navigate]);

  const onSubmit: SubmitHandler<LoginFormParams> = async (data) => {
    try {
      const response = await instance.post("/auth/login", data);
      console.log("Response:", response); // Log response to verify
      const { token, user } = response.data; // Assuming API returns accessToken and user
      console.log("Token:", token); // Log accessToken to verify
      console.log("User:", user); // Log user to verify

      // Store accessToken and user in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setEmailError(null); // Clear error messages on success
      setPasswordError(null);
      setGeneralError(null);
      setSuccessMessage("Login successful!");
      setTimeout(() => {
        navigate("/product");
      }, 2000); // Redirect after 2 seconds
    } catch (error: any) {
      if (error.response && error.response.data) {
        const errorMsg =
          error.response.data.message || "Failed to login. Please try again.";
        if (errorMsg.includes("email")) {
          setEmailError(errorMsg);
          setPasswordError(null);
        } else if (errorMsg.includes("password")) {
          setPasswordError(errorMsg);
          setEmailError(null);
        } else {
          setGeneralError(errorMsg);
        }
      } else {
        setGeneralError("Failed to login. Please try again.");
      }
      console.error("Error details:", error);
    }
  };

  return (
    <Container
      sx={{
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.25)",
        padding: "20px 30px",
        margin: "40px auto",
        borderRadius: "8px",
        width: "50%",
        position: "relative"
      }}
    >
      <Typography variant="h4" textAlign={"center"} mb={2}>
        Login
      </Typography>
      {generalError && (
        <Typography color="error" textAlign={"center"} mb={2}>
          {generalError}
        </Typography>
      )}
      <Snackbar
        open={!!successMessage}
        autoHideDuration={2000}
        onClose={() => setSuccessMessage(null)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSuccessMessage(null)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {successMessage}
        </Alert>
      </Snackbar>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={4} sx={{ padding: "0 20px" }}>
          <Box
            position={"absolute"}
            margin={2}
            top={0}
            right={0}
            sx={{ cursor: "pointer" }}
          >
            <Link to={"/product"}>
              <CloseIcon />
            </Link>
          </Box>

          <TextField
            sx={{ width: "100%", borderRadius: "10px" }}
            label="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
            error={!!errors?.email?.message || !!emailError}
            helperText={errors?.email?.message || emailError}
          />
          <TextField
            label="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters"
              }
            })}
            type="password"
            error={!!errors?.password?.message || !!passwordError}
            helperText={errors?.password?.message || passwordError}
          />
          <Stack
            direction="row"
            spacing={2}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <Button type="submit" variant="contained" sx={{ width: "33.33%" }}>
              Submit
            </Button>
          </Stack>
        </Stack>
      </form>
    </Container>
  );
};

export default Login;

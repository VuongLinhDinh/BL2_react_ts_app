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
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type RegisterFormParams = {
  username: string;
  email: string;
  password: string;
};

const Register = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormParams>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<RegisterFormParams> = async (data) => {
    try {
      await axios.post("http://localhost:3000/auth/register", data);
      setErrorMessage(null); // Clear error message on success
      setSuccessMessage("Registration successful!");
      setTimeout(() => {
        navigate("/login");
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      setErrorMessage("Failed to register. Please try again.");
      console.log(error);
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
        position: "relative" // Add position: relative
      }}
    >
      <Typography variant="h4" textAlign={"center"} mb={2}>
        Register
      </Typography>
      {errorMessage && (
        <Typography color="error" textAlign={"center"} mb={2}>
          {errorMessage}
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
        <Box
          position={"absolute"}
          margin={2}
          top={0}
          right={0}
          sx={{ cursor: "pointer" }}
        >
          <Link to={"/product"}>
            {" "}
            <CloseIcon />
          </Link>
        </Box>
        <Stack gap={2}>
          <TextField
            label="Username"
            {...register("username", {
              required: "Username is required"
            })}
            error={!!errors?.username?.message}
            helperText={errors?.username?.message}
          />
          <TextField
            label="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
            error={!!errors?.email?.message}
            helperText={errors?.email?.message}
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
            error={!!errors?.password?.message}
            helperText={errors?.password?.message}
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

export default Register;

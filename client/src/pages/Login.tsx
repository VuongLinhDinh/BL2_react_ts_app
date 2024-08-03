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
import { useAuth } from "src/contexts/AuthContext";
import { AxiosError } from "axios";

type LoginFormParams = {
  email: string;
  password: string;
};
interface ErrorResponse {
  message?: string;
}
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
  const { login } = useAuth();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setSuccessMessage("Bạn đã đăng nhập!");
      setTimeout(() => {
        navigate("/product");
      }, 2000); // Chuyển hướng sau 2 giây
    }
  }, [navigate]);

  const onSubmit: SubmitHandler<LoginFormParams> = async (data) => {
    try {
      const response = await instance.post("/auth/login", data);
      const { token, user } = response.data;

      login(token, user);

      setEmailError(null);
      setPasswordError(null);
      setGeneralError(null);
      setSuccessMessage("Đăng nhập thành công!");
      setTimeout(() => {
        navigate("/product");
      }, 2000); // Chuyển hướng sau 2 giây
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      if (axiosError.response && axiosError.response.data) {
        const errorMsg =
          axiosError.response.data.message ||
          "Đăng nhập thất bại. Vui lòng thử lại.";
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
        setGeneralError("Đăng nhập thất bại. Vui lòng thử lại.");
      }
      console.error("Chi tiết lỗi:", axiosError);
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
        Đăng nhập
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
              required: "Email là bắt buộc",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email không hợp lệ"
              }
            })}
            error={!!errors?.email?.message || !!emailError}
            helperText={errors?.email?.message || emailError}
          />
          <TextField
            label="Mật khẩu"
            {...register("password", {
              required: "Mật khẩu là bắt buộc",
              minLength: {
                value: 6,
                message: "Mật khẩu phải có ít nhất 6 ký tự"
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

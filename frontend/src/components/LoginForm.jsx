import {
  Alert,
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  styled,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BigButton } from "./Global/Buttons";
import api from "../api/api";
import AuthContext from "../context/AuthProvider";

const CssTextField = styled(TextField)({
  "& label: ": {
    fontFamily: "Cairo, sans-serif",
  },
  "& label.Mui-focused": {
    color: "#022B3A",
  },
  "& .MuiOutlinedInput-root": {
    /* '& fieldset': {
        borderColor: '#022B3A',
      }, */
    color: "#333333",
    fontFamily: "Cairo, sans-serif",
    borderRadius: "16px",
    "&:hover fieldset": {
      borderColor: "#022B3A",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#022B3A",
    },
  },
});

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    try {
      const response = await api.post("/users/login", user, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      const accessToken = response?.data?.accessToken;

      setAuth({ email, password, accessToken });

      navigate("/stats", { state: { email } });
    } catch (err) {
      setErrorText(err.response.data.message);
    }
  };

  return (
    <div className="w-[469px]">
      <form onSubmit={handleSubmit}>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "100%" },
            //display: "flex",
            //justifyContent: 'flex-end'
          }}
          noValidate
          autoComplete="off"
        >
          <CssTextField
            label="E-mail"
            id="custom-css-outlined-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputLabelProps={{
              style: {
                fontFamily: "Cairo, sans-serif",
                fontSize: "18px",
              }, // Change the font family here
            }}
          />
        </Box>

        <FormControl
          sx={{
            "& > :not(style)": { m: 1, width: "100%" },
            //display: "flex",
            //justifyContent: 'flex-end'
            width: "100%",
            "& label.Mui-focused": {
              color: "#022B3A", // Change label color
            },
            "& .MuiOutlinedInput-root": {
              fontFamily: "Cairo, sans-serif",
              color: "#333333",
              borderRadius: "16px",
              "&:hover fieldset": {
                borderColor: "#022B3A", // Change border color on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "#022B3A", // Change border color when focused
              },
            },
          }}
          variant="outlined"
        >
          <InputLabel
            htmlFor="outlined-adornment-password"
            sx={{
              fontFamily: "Cairo, sans-serif",
              fontSize: "18px",
            }}
          >
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            }
          />
          {errorText && (
            <Alert severity="error" variant="filled">
              {errorText}
            </Alert>
          )}
        </FormControl>
        <BigButton label="Login" />
      </form>
    </div>
  );
};

export default LoginForm;

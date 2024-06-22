import React, { useState, useEffect } from "react";
import styles from "../style/Login.module.css";
import {
  Box,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../provider/AuthProvider";
import { Api } from "../constant/api";
const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [error, setError] = useState({});
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError({...error, [e.target.name]: ""})
  };
  const errorHandling = () => {
    var error = {};
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!form.email || form.email === "") {
      error["email"] = "Email is required";
    } else if (!form.email.match(emailPattern)) {
      error["email"] = "Email is invalid";
    }
    if (!form.password || form.password === "") {
      error["password"] = "Password is required";
    }
    setError(error);
    if (Object.keys(error).length > 0) {
      return true;
    }
  };
  const handleSubmit = () => {
    if (errorHandling()) {
      return;
    }
    axios.post(Api.login, form).then((res) => {
      if (res.data.token) {
        login(res.data.token);
      }
    });
  };
  return (
    <Box className={styles.container}>
      <Box className={styles.login}>
        <Box className={styles.loginForm}>
          <Box className={styles.loginFormTitle}>
            <Heading className={styles.loginFormTitleText}>Login</Heading>
          </Box>
          <FormControl className={styles.loginFormInput} isInvalid={error.email}>
            <FormLabel className={styles.loginFormInputText}>Email</FormLabel>
            <Input
              name="email"
              className={styles.loginFormInputField}
              type="email"
              onChange={handleChange}
            />
            <FormErrorMessage>{error.email}</FormErrorMessage>
          </FormControl>
          <FormControl className={styles.loginFormInput} isInvalid={error.password}>
            <FormLabel className={styles.loginFormInputText}>
              Password
            </FormLabel>
            <Input
              name="password"
              className={styles.loginFormInputField}
              type="password"
              onChange={handleChange}
            />
          <FormErrorMessage>{error.password}</FormErrorMessage>
          </FormControl>
          <Box className={styles.loginRegister}>
            Don't have an account? &nbsp;
            <span
              className={styles.loginRegisterText}
              onClick={() => {
                navigate("/register");
              }}
            >
              Register here
            </span>
          </Box>
          <Box className={styles.loginFormButton}>
            <button
              onClick={handleSubmit}
              className={styles.loginFormButtonField}
            >
              Login
            </button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
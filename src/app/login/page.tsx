"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Avatar,
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Link from "next/link";
import { getCurrentUser, rememberDevice, signIn } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import LoadingButton from "@mui/lab/LoadingButton";

import { useAuth } from "@/context";
import { useSnackbar } from "@/context/SnackbarContext";
import PasswordInput from "@/components/Shared/CommonPassword";

const validationSchema = Yup.object({
  identifier: Yup.string().required("Identifier is required"), // You can add more specific validation based on your requirement
  password: Yup.string().required("Password is required"),
});

const SignIn = () => {
  const router = useRouter();
  const { setUser } = useAuth();
  const { showMessage } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      identifier: "",
      password: "",
      rememberMe: false,
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      const { identifier, password, rememberMe } = values;
      try {
        const result = await signIn({ username: identifier, password });
        if (
          result?.nextStep?.signInStep ===
          "CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED"
        ) {
          router.push("/new-password");
        }
        if (rememberMe) {
          await rememberDevice();
        }
        if (result?.isSignedIn) {
          const user = await getCurrentUser();
          setUser(user);
          router.push("/");
        }
      } catch (error) {
        setSubmitting(false);
        showMessage(error, "error");
      }
    },
  });

  return (
    <>
      <Box sx={styles.mainwrapper} component="main" maxWidth="xs">
        <Box sx={styles.formwrapper}>
          <Box
            sx={{
              marginTop: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "var(--primary-color-dark)" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={formik.handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                label="Email Address / Username"
                name="identifier"
                autoComplete="email"
                autoFocus
                value={formik.values.identifier}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.identifier && Boolean(formik.errors.identifier)
                }
                helperText={
                  formik.touched.identifier && formik.errors.identifier
                }
              />
              <PasswordInput
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                autoComplete="current-password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value="remember"
                    sx={{ width: "2rem", height: "2rem", m: "0 0.5rem 0 0" }}
                  />
                }
                label="Remember me"
                sx={{ width: "80%" }}
              />
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, ...styles.signInButton }}
                loading={formik.isSubmitting}
              >
                Sign In
              </LoadingButton>
              <Grid container>
                <Grid item xs style={{ color: "var(--black)" }}>
                  <Typography sx={{ color: "var(--black)" }} variant="body2">
                    <Link href="/forgot-password">
                      <span>Forgot password?</span>
                    </Link>
                  </Typography>
                </Grid>
                <Grid item style={{ color: "var(--black)" }}>
                  <Typography sx={{ color: "var(--black)" }} variant="body2">
                    Don't have an account?{" "}
                    <Link href="/signup">
                      <span>Sign Up</span>
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SignIn;

/** @type {import("@mui/material").SxProps} */
const styles = {
  mainwrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    bgcolor: "var(--white)",
    minHeight: "calc(100vh - 344px)",
  },
  formwrapper: {
    width: "auto",
    p: "20px 4rem",
  },
  signInButton: {
    bgcolor: "var(--primary-color-dark)",
    "&:hover": {
      bgcolor: "var(--secondary-color-light)",
    },
  },
};

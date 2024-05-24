"use client";

import React from "react";
import Link from "next/link";
import PhoneInput, { isPossiblePhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { signUp } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import { SxProps, Theme } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormHelperText from "@mui/material/FormHelperText";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LoadingButton from "@mui/lab/LoadingButton";
import { useFormik } from "formik";
import * as Yup from "yup";

import theme from "./../../components/helpers/Theme";
import { useSnackbar } from "@/context/SnackbarContext";
import PasswordInput from "@/components/Shared/CommonPassword";
import { FormData } from "@/shared/interfaces/interfaces";
import { UserRole } from "@/shared/enums/enums";

const USERNAME_REGEX = /^[a-z0-9_]{4,20}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&.?_]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const validationSchema = Yup.object({
  username: Yup.string()
    .matches(USERNAME_REGEX, "Invalid username format")
    .required("Username is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .matches(EMAIL_REGEX, "Invalid email address")
    .required("Email is required"),
  phone: Yup.string().test(
    "is-valid-phone",
    "Invalid phone number",
    (value) => !value || isPossiblePhoneNumber(value)
  ),
  password: Yup.string()
    .matches(
      PWD_REGEX,
      "Password must be 8-24 characters with uppercase, lowercase letters, a number, and a special character (!, @, #, $, %, &, ., ?, _)."
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
  isAccepted: Yup.boolean()
    .required("Terms must be accepted")
    .oneOf([true], "Terms must be accepted"),
});

const AddUser: React.FC = () => {
  const router = useRouter();
  const { showMessage } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      isAccepted: false,
      role: UserRole.VIEWER,
    } as FormData,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      const {
        username: username,
        password,
        email,
        phone: phone_number,
        firstName,
        lastName,
        role,
      } = values;
      try {
        const { isSignUpComplete, userId, nextStep } = await signUp({
          username,
          password,
          options: {
            userAttributes: {
              email,
              phone_number,
              name: `${firstName} ${lastName}`,
              ["custom:role"]: role,
              given_name: firstName,
              family_name: lastName,
            },
          },
        });
        console.log(
          "isSignUpComplete, userId, nextStep",
          isSignUpComplete,
          userId,
          nextStep
        );
        router.push(`/email-verification?username=${username}`);
      } catch (error) {
        setSubmitting(false);
        showMessage(error, "error");
      }
    },
  });

  return (
    <Box component="main" maxWidth="xs" sx={styles.mainwrapper}>
      <Box sx={styles.formwrapper}>
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "var(--primary-color-dark)" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ mb: "2rem" }}>
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={formik.handleSubmit}
            sx={{ mt: 2 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="User Name"
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.username && Boolean(formik.errors.username)
                  }
                  helperText={formik.touched.username && formik.errors.username}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  type="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  name="phone"
                  placeholder="Phone Number"
                  value={formik.values.phone}
                  onChange={(value) => formik.setFieldValue("phone", value)}
                  onBlur={formik.handleBlur}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  InputProps={{
                    inputComponent: PhoneInput as any,
                  }}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <FormHelperText error>{formik.errors.phone}</FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <PasswordInput
                  required
                  fullWidth
                  label="Password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <PasswordInput
                  required
                  fullWidth
                  label="Confirm Password"
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.confirmPassword &&
                    Boolean(formik.errors.confirmPassword)
                  }
                  helperText={
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      name="isAccepted"
                      checked={formik.values.isAccepted}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  }
                  label={
                    <Typography>
                      I accept the{" "}
                      <Link href="/terms-of-agrement">
                        <span>Terms and Agreements</span>
                      </Link>{" "}
                      of this service and its{" "}
                      <Link href="/privacy-policy">
                        <span>Privacy Policy</span>
                      </Link>
                    </Typography>
                  }
                />
                {formik.touched.isAccepted && formik.errors.isAccepted && (
                  <Typography color="error">
                    {formik.errors.isAccepted}
                  </Typography>
                )}
              </Grid>
            </Grid>
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, ...styles.signupButton }}
              disabled={!formik.isValid || !formik.dirty}
              loading={formik.isSubmitting}
            >
              Sign Up
            </LoadingButton>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Typography sx={{ color: "var(--black)" }} variant="body2">
                  Already have an account?{" "}
                  <Link href="/login">
                    <span>Sign In</span>
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AddUser;

/** @type {import("@mui/material").SxProps} */
const styles: { [key: string]: SxProps<Theme> } = {
  mainwrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    bgcolor: "var(--white)",
  },
  formwrapper: {
    width: "auto",
    p: "2rem 15rem 8rem 15rem",
    [theme.breakpoints.down("laptop")]: {
      p: "2rem 4rem 6rem 4rem",
    },
  },
  signUpButton: {
    bgcolor: "var(--primary-color-dark)",
    "&:hover": {
      bgcolor: "var(--secondary-color-light)",
    },
  },
};

"use client";

import React from "react";
import { useFormik } from "formik";
import { confirmSignIn, getCurrentUser } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

import * as Yup from "yup";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import PasswordIcon from "@mui/icons-material/Password";

import { useSnackbar } from "@/context/SnackbarContext";
import theme from "../../components/helpers/Theme";
import PasswordInput from "../../components/Shared/CommonPassword";
import { useAuth } from "@/context";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&.?_]).{8,24}$/;

// Define your validation schema
const validationSchema = Yup.object({
  password: Yup.string()
    .matches(
      PWD_REGEX,
      "Password must be 8-24 characters with uppercase, lowercase letters, a number, and a special character (!, @, #, $, %, &, ., ?, _)."
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

const NewPasswordForm = () => {
  const router = useRouter();
  const { showMessage } = useSnackbar();
  const { user, setUser } = useAuth();

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      const { password } = values;
      try {
        await confirmSignIn({ challengeResponse: password });
        showMessage("Password successfully updated", "success");
        const user = await getCurrentUser();
        setUser(user);
        router.push("/");
      } catch (error) {
        setSubmitting(false);
        showMessage(error, "error");
      }
    },
  });

  return (
    <>
      <Box component="main" maxWidth="xs" sx={styles.mainwrapper}>
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
              <PasswordIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              New Password
            </Typography>
            <Box
              component="form"
              onSubmit={formik.handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <PasswordInput
                margin="normal"
                required
                fullWidth
                label="Password"
                name="password"
                autoComplete="new-password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
              <PasswordInput
                margin="normal"
                required
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                autoComplete="new-password"
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
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, ...styles.newPasswordButton }}
                loading={formik.isSubmitting}
              >
                Set Password
              </LoadingButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default NewPasswordForm;

/** @type {import("@mui/material").SxProps} */
const styles = {
  mainwrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "auto",
    bgcolor: "var(--white)",
  },
  formwrapper: {
    width: "80%",
    p: "2rem 15rem 8rem 15rem",

    [theme.breakpoints.down("tablet")]: {
      p: "2rem 4rem 6rem 4rem",
      width: "100%",
    },
  },
  newPasswordButton: {
    bgcolor: "var(--primary-color-dark)",
    "&:hover": {
      bgcolor: "var(--secondary-color-light)",
    },
  },
};

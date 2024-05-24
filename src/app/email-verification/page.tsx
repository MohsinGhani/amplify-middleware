"use client";

import React, { useState } from "react";
import { confirmSignUp, resendSignUpCode } from "aws-amplify/auth";
import { useFormik } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import { Theme, SxProps } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LoadingButton from "@mui/lab/LoadingButton";
import { useRouter, useSearchParams } from "next/navigation";
import { useSnackbar } from "@/context/SnackbarContext";
import { FormValues } from "@/shared/interfaces/interfaces";

const USERNAME_REGEX = /^[a-z0-9_]{4,20}$/;

const validationSchema = Yup.object({
  username: Yup.string()
    .matches(USERNAME_REGEX, "Invalid username format")
    .required("Username is required"),
  code: Yup.string().required("Verification code is required"),
});

const EmailVerification: React.FC = () => {
  const [resedLoading, setResendLoading] = useState<boolean>(false);
  const { showMessage } = useSnackbar();
  const searchParams = useSearchParams();
  const username = searchParams.get("username");
  const router = useRouter();

  const formik = useFormik<FormValues>({
    initialValues: {
      username: username || "",
      code: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        await confirmSignUp({
          username: username || "",
          confirmationCode: values.code,
        });
        router.replace("/login");
      } catch (error) {
        showMessage(error, "error");
        setSubmitting(false);
      }
    },
  });

  const handleResendCode = async () => {
    const { username } = formik.values;
    if (!username) {
      console.error("Email address is required to resend the code");
      return;
    }

    try {
      setResendLoading(true);
      await resendSignUpCode({ username: username });
      setResendLoading(false);
      showMessage("Verification code resent successfully ", "success");
    } catch (error) {
      showMessage(error, "error");
      setResendLoading(false);
    }
  };

  return (
    <Box component="main" sx={styles.mainwrapper}>
      <Box sx={styles.formwrapper}>
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 5,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "var(--primary-color-light)" }}>
            <EmailIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Verify Your Email
          </Typography>
        </Box>
        <Box
          component="form"
          noValidate
          onSubmit={formik.handleSubmit}
          sx={{ mt: 1 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="User name"
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
                id="code"
                label="Verification Code"
                name="code"
                value={formik.values.code}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.code && Boolean(formik.errors.code)}
                helperText={formik.touched.code && formik.errors.code}
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs style={{ color: "var(--black)" }}>
              <LoadingButton
                onClick={handleResendCode}
                variant="text"
                sx={{ mt: 2 }}
                loading={resedLoading}
              >
                Resend Email
              </LoadingButton>
            </Grid>
            <Grid item style={{ color: "var(--black)" }}>
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2 }}
                loading={formik.isSubmitting}
              >
                Verify Email
              </LoadingButton>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default EmailVerification;

/** Styles */
const styles: { [key: string]: SxProps<Theme> } = {
  mainwrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    bgcolor: "var(--white)",
    minHeight: "calc(100vh - 345px)",
  },
  formwrapper: {
    width: "auto",
    p: "2rem",
    // Add more styles as needed
  },
};

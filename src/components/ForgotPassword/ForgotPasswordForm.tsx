"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import Link from "next/link";
import { resetPassword, type ResetPasswordOutput } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import LockResetIcon from "@mui/icons-material/LockReset";
import { useSnackbar } from "@/context/SnackbarContext";

const validationSchema = Yup.object({
  identifier: Yup.string().required("Identifier is required"), // You can add more specific validation based on your requirement
});

const ForgotPasswordForm = () => {
  const router = useRouter();
  const { showMessage } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      identifier: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      const { identifier } = values;
      try {
        const output = await resetPassword({ username: identifier });
        handleResetPasswordNextSteps(output, identifier);
        setSubmitting(false);
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleResetPasswordNextSteps = async (
    output: ResetPasswordOutput,
    identifier: string
  ) => {
    const { nextStep } = output;
    switch (nextStep.resetPasswordStep) {
      case "CONFIRM_RESET_PASSWORD_WITH_CODE":
        const codeDeliveryDetails = nextStep.codeDeliveryDetails;
        showMessage(
          `Confirmation code was sent to ${codeDeliveryDetails.deliveryMedium}`,
          "success"
        );
        router.push(`/forgot-password?username=${identifier}`);
        break;
      case "DONE":
        console.log("Successfully reset password.");
        break;
    }
  };

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
              <LockResetIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Forgot Password
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
                type="text"
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
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, ...styles.forgotPasswordButton }}
                loading={formik.isSubmitting}
              >
                Send Code
              </LoadingButton>
            </Box>
            <Grid container>
              <Grid item xs style={{ color: "var(--black)" }}>
                <Typography sx={{ color: "var(--black)" }} variant="body2">
                  <Link href="/login">
                    <span>Sign In</span>
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
    </>
  );
};

export default ForgotPasswordForm;

/** @type {import("@mui/material").SxProps} */
const styles = {
  mainwrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    bgcolor: "var(--white)",
  },
  formwrapper: {
    width: "auto",
    p: "2rem 4rem 8rem 4rem",
  },
  forgotPasswordButton: {
    bgcolor: "var(--primary-color-dark)",
    "&:hover": {
      bgcolor: "var(--secondary-color-light)",
    },
  },
};

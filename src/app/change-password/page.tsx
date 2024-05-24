"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import { ThemeProvider, Box, Typography, Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import LoadingButton from "@mui/lab/LoadingButton";

import theme from "@/components/helpers/Theme";
import changePasswordValidation from "./validation";
import { handleUpdatePassword } from "@/shared/helper/authServices";
import { useSnackbar } from "@/context/SnackbarContext";
import PasswordInput from "@/components/Shared/CommonPassword";

const ChangePassword = () => {
  const router = useRouter();
  const { showMessage } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
      oldPassword: "",
    },
    validationSchema: changePasswordValidation,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const res = await handleUpdatePassword(
          values["oldPassword"],
          values["password"]
        );
        showMessage("Password updated successfully", "success");
        router.back();
      } catch (err) {
        showMessage(err, "error");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box component={"main"} sx={styles.mainWrapper}>
        <Typography variant="h4" sx={{ p: "2rem 0", fontWeight: "500" }}>
          Change Password
        </Typography>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={styles.formWrapper}
        >
          <Grid>
            <Grid item xs={12} sm={6}>
              <PasswordInput
                fullWidth
                name="oldPassword"
                label="Old Password"
                value={formik.values.oldPassword}
                onChange={formik.handleChange}
                error={
                  formik.touched.oldPassword &&
                  Boolean(formik.errors.oldPassword)
                }
                helperText={
                  formik.touched.oldPassword && formik.errors.oldPassword
                }
                disabled={loading}
              />
            </Grid>
            <br />
            <Grid item xs={12} sm={6}>
              <PasswordInput
                fullWidth
                name="password"
                label="New Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                disabled={loading}
              />
            </Grid>
            <br />
            <Grid item xs={12} sm={6}>
              <PasswordInput
                fullWidth
                name="confirmPassword"
                label="Confirm New Password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12}>
              <LoadingButton
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                type="submit"
                loading={loading}
              >
                Change Password
              </LoadingButton>
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            p: "2rem 0",
            cursor: "pointer",
          }}
          onClick={() => router.back()}
        >
          <Typography sx={{ ml: "1rem" }}>RETURN TO DASHBOARD</Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ChangePassword;

// /** @type {import("@mui/material").SxProps} */
const styles = {
  mainWrapper: {
    bgcolor: "var(--whiteoverlay)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    p: "2rem 0",
    flexDirection: "column",
    [theme.breakpoints.down("laptop")]: {
      p: "2rem 0 4rem 0",
    },
  },
  formWrapper: {
    bgcolor: "var(--white)",
    width: "40%",
    p: 2,
    boxShadow: "1px 1px 6px var(--shadow)",
    borderRadius: "10px",
    [theme.breakpoints.down("laptop")]: {
      width: "70%",
    },
  },
};

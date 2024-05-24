"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import theme from "../../../components/helpers/Theme";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import LoadingButton from "@mui/lab/LoadingButton";
import { useAuth } from "@/context";
import { signOut, updateUserAttributes } from "aws-amplify/auth";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormHelperText,
  Grid,
} from "@mui/material";
import { useSnackbar } from "@/context/SnackbarContext";
import { useRouter } from "next/navigation";
import { deactivateUserApi, updateUserDetailsApi } from "@/apis/userApi";
import { DeactivateUser, UpdateUser } from "@/shared/interfaces/interfaces";

const UserSettings = () => {
  const { user, setUser, loading } = useAuth();
  const { showMessage } = useSnackbar();
  const [deactivateDialog, setDeactivateDialog] = useState(false);
  const [isDeactivating, setIsDeactivating] = useState(false);
  const router = useRouter();

  const initialValues = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
  };

  // Yup validation schema
  const validationSchema = Yup.object({
    firstName: Yup.string().required("Name is required"),
    lastName: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      const { firstName, lastName, phone: phone_number } = values;
      // API call to update user attributes
      try {
        const update = {
          username: user?.username,
          id: user?.userId,
          first_name: firstName,
          last_name: lastName,
          phone_number: phone_number,
        } as UpdateUser;

        await updateUserDetailsApi(update);
        // await updateUserAttributes({
        //   userAttributes: {
        //     given_name: firstName,
        //     lastName,
        //     phone_number,
        //   },
        // });

        setUser({
          ...user,
          firstName,
          lastName,
          phone: phone_number,
        });

        showMessage("User profile updated successfully", "success");
      } catch (error) {
        console.error(error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const deactivateAccountHandler = async () => {
    setIsDeactivating(true);
    try {
      await deactivateUserApi({ userId: user?.userId } as DeactivateUser);
      await signOut();
      setUser(null);
      router.replace("/");
      showMessage("Your account has been deactivated successfully", "success");
    } catch (e: any) {
      showMessage(e, "error");
    }
    setIsDeactivating(false);
  };

  const dialogCloseHandler = () => {
    if (isDeactivating) return;
    setIsDeactivating(false);
    setDeactivateDialog(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={styles.mainWrapper}>
        {!loading ? (
          <>
            <Box sx={styles.avatarWrapper}>
              <Avatar
                src={user?.avatar ?? ""}
                sx={styles.avatar}
                alt={user?.username}
              />
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography sx={styles.header}>{user?.firstName}</Typography>
                <Typography sx={styles.textItemLow} variant="body2">
                  @{user?.username}
                </Typography>
              </Box>
            </Box>
            <Box
              component="form"
              onSubmit={formik.handleSubmit}
              sx={styles.info}
            >
              <Grid spacing={2}>
                <Box sx={styles.name}>
                  <Grid container xs={12} sm={6}>
                    <TextField
                      label="First Name"
                      name="firstName"
                      fullWidth
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.firstName &&
                        Boolean(formik.errors.firstName)
                      }
                      helperText={
                        formik.touched.firstName && formik.errors.firstName
                      }
                    />
                  </Grid>
                  <Grid container xs={12} sm={6}>
                    <TextField
                      label="Last Name"
                      name="lastName"
                      fullWidth
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.lastName &&
                        Boolean(formik.errors.lastName)
                      }
                      helperText={
                        formik.touched.lastName && formik.errors.lastName
                      }
                    />
                  </Grid>
                </Box>
                <br />
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    name="email"
                    fullWidth
                    disabled
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>
                <br />
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
                <br />
                <Box sx={styles.field}>
                  <SubscriptionsIcon sx={styles.itemIcon} />
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography sx={styles.textItem}>Subscription:</Typography>
                    <Box
                      sx={{
                        width: "100%",
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 2fr)",
                        [theme.breakpoints.down("laptop")]: {
                          gridTemplateColumns: "2fr",
                        },
                      }}
                    >
                      <Box sx={styles.subInfo}>
                        <Typography sx={styles.textItem} variant="body2">
                          Plan:
                        </Typography>
                        <Typography sx={styles.textItemSubs} variant="body2">
                          plane name
                        </Typography>
                      </Box>
                      <Box sx={styles.subInfo}>
                        <Typography sx={styles.textItem} variant="body2">
                          Status:
                        </Typography>
                        <Typography sx={styles.textItemSubs} variant="body2">
                          subscription status
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Grid item xs={12}>
                  <LoadingButton
                    loading={formik.isSubmitting}
                    type="submit"
                    sx={styles.btn}
                    variant="contained"
                    fullWidth
                  >
                    Update Profile
                  </LoadingButton>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={styles.modifywrapper}>
                    <Typography
                      sx={styles.pwd}
                      variant="body2"
                      onClick={() => {
                        router.push("/change-password");
                      }}
                    >
                      change password
                    </Typography>
                    <Typography
                      sx={styles.delete}
                      variant="body2"
                      onClick={() => {
                        setDeactivateDialog(true);
                      }}
                    >
                      Deactivate Account
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </>
        ) : (
          <Box sx={styles.loader}>
            <CircularProgress size={60} />
          </Box>
        )}
      </Box>
      <Dialog open={deactivateDialog} onClose={dialogCloseHandler}>
        <DialogTitle id="alert-dialog-title">
          {"Deactivate Account?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to deactivate your account?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button disabled={isDeactivating} onClick={dialogCloseHandler}>
            Cancel
          </Button>
          <LoadingButton
            loading={isDeactivating}
            onClick={deactivateAccountHandler}
          >
            Deactivate
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default UserSettings;

/** @type {import("@mui/material").SxProps} */
const styles = {
  mainWrapper: {
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    bgcolor: "var(--white)",
  },
  header: {
    color: "var(--black)",
    fontWeight: 500,
    fontSize: "2rem",
    [theme.breakpoints.down("laptop")]: {
      fontSize: "1.1rem",
    },
  },
  avatarWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    gap: 2,
    bgcolor: "white.offwhite",
    p: "1rem 1.5rem",
    borderRadius: "0 0 10px 10px",
  },
  avatar: {
    width: "5rem",
    height: "5rem",
    [theme.breakpoints.down("laptop")]: {
      width: "3rem",
      height: "3rem",
    },
  },
  info: {
    pt: "2rem",
    display: "flex",
    flexDirection: "column",
    width: "50%",
    p: "2rem 1.5rem",
    [theme.breakpoints.down("laptop")]: {
      width: "100%",
    },
  },
  name: {
    display: "flex",
    flexDirection: "row",
    gap: 2,
    [theme.breakpoints.down("laptop")]: {
      flexDirection: "column",
      gap: 2,
    },
  },
  field: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    bgcolor: "var(--white)",
    boxShadow: "0 0 2px var(--black)",
    width: "100%",
    borderRadius: "4px",
    p: 1,
  },
  btn: {
    color: "var(--white)",
    bgcolor: "var(--primary-color-light)",
    boxShadow: "0 0 2px var(--black)",
    m: "1rem 0",
    "&:hover": {
      color: "var(--black)",
    },
  },
  loader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  profileInfo: {
    lineHeight: "0.3rem",
    width: "100%",
  },
  itemIcon: {
    fontSize: "2rem",
  },
  textItem: {
    color: "var(--black)",
    fontWeight: "500",
    textTransform: "capitalize",
  },
  textItemLow: {
    color: "var(--black)",
    textTransform: "lowercase",
  },
  textItemSubs: {
    color: "var(--black)",
    textTransform: "capitalize",
  },
  subInfo: {
    display: "flex",
    flexDirection: "row",
    gap: 1,
  },
  modifywrapper: {
    display: "flex",
    flexDirection: "row",
    mt: "0.5rem",
    [theme.breakpoints.down("mobile")]: {
      flexDirection: "column",
      alignItems: "center",
      gap: 1,
    },
  },
  pwd: {
    color: "var(--primary-color-light)",
    textTransform: "capitalize",
    fontWeight: 500,
    flexGrow: 1,
    cursor: "pointer",
  },
  delete: {
    color: "var(--red)",
    textTransform: "capitalize",
    fontWeight: 500,
    cursor: "pointer",
  },
};

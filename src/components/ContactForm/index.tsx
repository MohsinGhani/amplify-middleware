import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Radio,
  SxProps,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import theme from "../helpers/Theme";
import { ContactFormValues } from "@/shared/interfaces/interfaces";

const validationSchema = Yup.object({
  firstName: Yup.string().required("First Name is Required"),
  lastName: Yup.string().required("Last Name is Required"),
  email: Yup.string().email("Invalid email").required("Email is Required"),
  phone: Yup.string(),
  subject: Yup.string().required("Subject is Required"),
  contentdesc: Yup.string().required("Content Description is Required"),
  isAccepted: Yup.boolean().oneOf(
    [true],
    "You must accept the terms and conditions"
  ),
});

const ContactForm = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "",
      contentdesc: "",
      isAccepted: false,
    } as ContactFormValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Box
      component={"form"}
      sx={styles.formContainer}
      onSubmit={formik.handleSubmit}
    >
      <Typography variant="h4" sx={styles.heading}>
        Content Submission
      </Typography>
      <Box sx={styles.fullname}>
        <TextField
          label="First Name"
          name="firstName"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
          sx={styles.textfield}
          InputLabelProps={{
            sx: styles.label,
          }}
          InputProps={{
            sx: styles.defVal,
          }}
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
          sx={styles.textfield}
          InputLabelProps={{
            sx: styles.label,
          }}
          InputProps={{
            sx: styles.defVal,
          }}
        />
      </Box>
      <TextField
        type="email"
        label="Email"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        sx={styles.textfield}
        InputLabelProps={{
          sx: styles.label,
        }}
        InputProps={{
          sx: styles.defVal,
        }}
      />
      <TextField
        name="phone"
        label="Contact Number (Optional)"
        value={formik.values.phone}
        onChange={formik.handleChange}
        error={formik.touched.phone && Boolean(formik.errors.phone)}
        sx={styles.textfield}
        InputLabelProps={{
          sx: styles.label,
        }}
        InputProps={{
          sx: styles.defVal,
        }}
        helperText={
          formik.touched.phone && formik.errors.phone
            ? formik.errors.phone
            : "For faster feedback we may reach out to you by a direct call. Kindly include your country's code, e.g +234"
        }
      />
      <TextField
        label="Subject"
        name="subject"
        sx={styles.textfield}
        InputLabelProps={{
          sx: styles.label,
        }}
        InputProps={{
          sx: styles.defVal,
        }}
        value={formik.values.subject}
        onChange={formik.handleChange}
        error={formik.touched.subject && Boolean(formik.errors.subject)}
        helperText={formik.touched.subject && formik.errors.subject}
      />
      <TextField
        id="outlined-required"
        name="contentdesc"
        label="Content Description"
        value={formik.values.contentdesc}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.contentdesc && Boolean(formik.errors.contentdesc)}
        helperText={formik.touched.contentdesc && formik.errors.contentdesc}
        sx={styles.textfield}
        InputLabelProps={{
          sx: styles.label,
        }}
        InputProps={{
          sx: styles.defVal,
        }}
        multiline
        rows={8}
      />
      <Box sx={styles.tnc}>
        <Radio
          checked={formik.values.isAccepted}
          onChange={formik.handleChange}
          value="isAccepted"
          name="isAccepted"
          inputProps={{ "aria-label": "A" }}
          sx={styles.radio}
        />
        <Typography sx={styles.info}>
          I have read and agree to the website Terms and Conditions and Privacy
          Policy
        </Typography>
      </Box>
      {formik.touched.isAccepted && formik.errors.isAccepted && (
        <Typography variant="body2" color="var(--red)">
          <InfoIcon /> {formik.errors.isAccepted}
        </Typography>
      )}
      <Box sx={styles.btn}>
        <Button
          type="submit"
          className="form-btn"
          sx={{
            width: "15%",
            borderRadius: "5px",
            p: 1.5,
            color: "var(--white)",
            background:
              "linear-gradient(45deg, var(--secondary-color-dark), var(--grad-bg-light))",
            backgroundImage:
              "linear-gradient(45deg, var(--secondary-color-dark), var(--grad-bg-light)) !important",
            transition: "all 0.5s ease-in-out",
            "&:hover": {
              background:
                "linear-gradient(-300deg, var(--primary-color-light), rgb(0, 221, 11))",
              backgroundImage:
                "linear-gradient(-300deg, var(--primary-color-light), rgb(0, 221, 11)) !important",
              borderRadius: "10px",
              transform: "scale(1.05)",
            },
          }}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ContactForm;

/** @type {import("@mui/material").SxProps} */
const styles: { [key: string]: SxProps<Theme> } = {
  formContainer: {
    bgcolor: "var(--whiteoverlay)",
    border: "1px solid #e8e8e8",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    padding: "4rem 3rem",
    [theme.breakpoints.down("tablet")]: {
      padding: "2rem 1rem",
    },
  },
  heading: {
    color: "var(--black)",
    fontWeight: "700",
    p: "0 0 2rem 0",
  },
  fullname: {
    display: "grid",
    gridTemplateColumns: "2fr 2fr",
    gap: "1rem",
    width: "100%",
    [theme.breakpoints.down("tablet")]: {
      gridTemplateColumns: "1fr",
    },
  },
  textfield: {
    width: "100%",
  },
  defVal: {
    color: "var(--black)",
    bgcolor: "var(--formfield)",
  },
  tnc: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  info: {
    color: "var(--black)",
    fontSize: "0.9rem",
  },
  radio: {
    width: "1.5rem",
    height: "1.5rem",
    m: "0 1rem 0 0",
  },
  btn: {
    display: "flex",
    justifyContent: "center",
    p: "2rem 0 4rem 0",
  },
};

"use client";
// Import necessary libraries
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  TextField,
  Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import InfoIcon from "@mui/icons-material/Info";
import theme from "../helpers/Theme";
import { contentSubmissionApi } from "@/apis/contentSubmissionApi";
import { useSnackbar } from "@/context/SnackbarContext";
import LoadingButton from "@mui/lab/LoadingButton";
import { putFileToS3 } from "@/shared/helper/s3Services";
import { v4 as uuidv4 } from "uuid";
import DownloadBtn from "../DownloadButton";
import { SubmissionFormValues } from "@/shared/interfaces/interfaces";

const validationSchema = Yup.object({
  first_name: Yup.string().required("First Name is Required"),
  last_name: Yup.string().required("Last Name is Required"),
  email: Yup.string().email("Invalid email").required("Email is Required"),
  phone: Yup.string(),
  address: Yup.string().required("Address is Required"),
  city: Yup.string().required("Please enter your city"),
  state: Yup.string().required("Please enter your state"),
  country: Yup.string().required("Please enter your country"),
  tiktok: Yup.string(),
  instagram: Yup.string(),
  facebook: Yup.string(),
  title: Yup.string().required("This field is required"),
  contentdesc: Yup.string().required("This field is required"),
  contenturl: Yup.string().required("This field is required"),
  form: Yup.mixed().required("This field is required"),
  isAccepted: Yup.boolean().oneOf(
    [true],
    "You must accept the terms and conditions"
  ),
});

// Component
const SubmitForm = () => {
  const { showMessage } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      country: "",
      tiktok: "",
      instagram: "",
      facebook: "",
      title: "",
      contentdesc: "",
      contenturl: "",
      isAccepted: false,
      form: null,
    } as SubmissionFormValues,
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true);
        const id = uuidv4();
        await putFileToS3(`submission-form/${id}.pdf`, values.form);

        const contentDetails = {
          id,
          first_name: values.first_name,
          last_name: values.last_name,
          email: values.email,
          address: values.address,
          city: values.city,
          state: values.state,
          country: values.country,
          title: values.title,
          contentdesc: values.contentdesc,
          contenturl: values.contenturl,
          phone: values.phone,
          tiktok: values.tiktok,
          facebook: values.facebook,
          instagram: values.instagram,
        };

        await contentSubmissionApi(contentDetails);
        resetForm();
        showMessage("Form Submitted Successfully", "success");
      } catch (err: any) {
        showMessage(err, "error");
      } finally {
        setLoading(false);
      }
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
          id="outlined-required"
          label="First Name"
          name="first_name"
          value={formik.values.first_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.first_name && Boolean(formik.errors.first_name)}
          sx={styles.textfield}
          InputLabelProps={{
            sx: styles.label,
          }}
          InputProps={{
            sx: styles.defVal,
          }}
          helperText={formik.touched.first_name && formik.errors.first_name}
        />
        <TextField
          id="outlined-required"
          label="Last Name"
          name="last_name"
          value={formik.values.last_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.last_name && Boolean(formik.errors.last_name)}
          helperText={formik.touched.last_name && formik.errors.last_name}
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
        id="outlined-required"
        label="Email"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
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
        id="outlined-required"
        name="phone"
        label="Contact Number (Optional)"
        value={formik.values.phone}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
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
        id="outlined-required"
        label="Address"
        name="address"
        value={formik.values.address}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.address && Boolean(formik.errors.address)}
        helperText={formik.touched.address && formik.errors.address}
        sx={styles.textfield}
        InputLabelProps={{
          sx: styles.label,
        }}
        InputProps={{
          sx: styles.defVal,
        }}
      />
      <Box sx={styles.add}>
        <TextField
          id="outlined-required"
          label="City"
          name="city"
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.city && Boolean(formik.errors.city)}
          helperText={formik.touched.city && formik.errors.city}
          sx={styles.textfield}
          InputLabelProps={{
            sx: styles.label,
          }}
          InputProps={{
            sx: styles.defVal,
          }}
        />
        <TextField
          id="outlined-required"
          label="State"
          name="state"
          value={formik.values.state}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.state && Boolean(formik.errors.state)}
          helperText={formik.touched.state && formik.errors.state}
          sx={styles.textfield}
          InputLabelProps={{
            sx: styles.label,
          }}
          InputProps={{
            sx: styles.defVal,
          }}
        />
        <TextField
          id="outlined-required"
          label="Country"
          name="country"
          value={formik.values.country}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.country && Boolean(formik.errors.country)}
          helperText={formik.touched.country && formik.errors.country}
          sx={styles.textfield}
          InputLabelProps={{
            sx: styles.label,
          }}
          InputProps={{
            sx: styles.defVal,
          }}
        />
      </Box>
      <Box sx={styles.add}>
        <TextField
          id="outlined-required"
          name="tiktok"
          label="TikTok Handle"
          value={formik.values.tiktok}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.tiktok && Boolean(formik.errors.tiktok)}
          helperText={formik.touched.tiktok && formik.errors.tiktok}
          sx={styles.textfield}
          InputLabelProps={{
            sx: styles.label,
          }}
          InputProps={{
            sx: styles.defVal,
          }}
        />
        <TextField
          id="outlined-required"
          name="instagram"
          label="Instagram Handle"
          value={formik.values.instagram}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.instagram && Boolean(formik.errors.instagram)}
          helperText={formik.touched.instagram && formik.errors.instagram}
          sx={styles.textfield}
          InputLabelProps={{
            sx: styles.label,
          }}
          InputProps={{
            sx: styles.defVal,
          }}
        />
        <TextField
          id="outlined-required"
          name="facebook"
          label="Facebook Handle"
          value={formik.values.facebook}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.facebook && Boolean(formik.errors.facebook)}
          helperText={formik.touched.facebook && formik.errors.facebook}
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
        id="outlined-required"
        name="title"
        label="Content Title"
        value={formik.values.title}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.title && Boolean(formik.errors.title)}
        helperText={formik.touched.title && formik.errors.title}
        sx={styles.textfield}
        InputLabelProps={{
          sx: styles.label,
        }}
        InputProps={{
          sx: styles.defVal,
        }}
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
      <Typography sx={styles.info}>
        Upload your video on{" "}
        <a href="https://www.wetransfer.com">
          <span>https://www.wetransfer.com</span>
        </a>{" "}
        or{" "}
        <a href="https://www.sendspace.com">
          <span>https://www.sendspace.com</span>
        </a>{" "}
        and share the link here{" "}
      </Typography>
      <TextField
        id="outlined-required"
        name="contenturl"
        label="Content Url"
        value={formik.values.contenturl}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.contenturl && Boolean(formik.errors.contenturl)}
        helperText={formik.touched.contenturl && formik.errors.contenturl}
        sx={styles.textfield}
        InputLabelProps={{
          sx: styles.label,
        }}
        InputProps={{
          sx: styles.defVal,
        }}
      />

      <DownloadBtn />
      <Typography sx={styles.info}>
        1. Download and Print Submission Form
        <br />
        2. Fill the submission form with your signature (form should be
        handwritten) <br />
        3. Upload the form back here
      </Typography>
      <Box sx={styles.upldbtn}>
        <Box component="label">
          <Button
            component="span"
            endIcon={<CloudUploadIcon sx={{ fill: "var(--white)" }} />}
            sx={{
              borderRadius: "5px",
              p: 2,
              color: "var(--white)",
              background:
                "linear-gradient(45deg, var(--secondary-color-dark), var(--grad-bg-light))",
              transition: "all 0.5s ease-in-out",
              "&:hover": {
                background:
                  "linear-gradient(-300deg, var(--primary-color-light), rgb(0, 221, 11))",
                borderRadius: "10px",
                transform: "scale(1.05)",
              },
            }}
          >
            Upload Submission Form
          </Button>
          <Box
            component={"input"}
            type="file"
            accept=".pdf"
            sx={{ display: "none" }}
            name="form"
            onChange={(e) => {
              formik.setFieldValue("form", e.target?.files?.[0]);
            }}
            onBlur={formik.handleBlur}
          />
        </Box>
        <Box sx={{ p: "1rem 0 2rem 0" }}>
          {formik.values.form ? (
            <Typography variant="body2">
              Selected File: {formik.values.form?.name}
            </Typography>
          ) : (
            formik.touched.form &&
            formik.errors.form && (
              <Typography variant="body2" color="var(--red)">
                <InfoIcon /> {formik.errors.form}
              </Typography>
            )
          )}
        </Box>
      </Box>
      <Box sx={styles.tnc}>
        <FormControlLabel
          control={
            <Radio
              checked={formik.values.isAccepted}
              onChange={(e) => {
                formik.setFieldValue("isAccepted", e.target.checked);
              }}
              onBlur={formik.handleBlur}
              value="isAccepted"
              name="isAccepted"
              inputProps={{ "aria-label": "A" }}
              sx={styles.radio}
            />
          }
          label={
            <Typography sx={styles.info}>
              I have read and agree to the website Terms and Conditions and
              Privacy Policy
            </Typography>
          }
        />
      </Box>
      {formik.touched.isAccepted && formik.errors.isAccepted && (
        <Typography variant="body2" color="var(--red)">
          <InfoIcon /> {formik.errors.isAccepted}
        </Typography>
      )}
      <Box sx={styles.btn}>
        <LoadingButton
          type="submit"
          value="Send"
          className="form-btn"
          variant="contained"
          loading={loading}
          sx={{
            width: "30%",
            borderRadius: "5px",
            p: 1.5,
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
          disabled={!(formik.isValid && formik.dirty)}
        >
          Submit
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default SubmitForm;

/** @type {import("@mui/material").SxProps} */
// const styles: { [key: string]: SxProps<Theme> } = {
const styles: { [key: string]: any } = {
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
  },
  info: {
    color: "var(--black)",
    fontSize: "0.9rem",
  },
  add: {
    display: "grid",
    gridTemplateColumns: "2fr 2fr 2fr",
    gap: "1rem",
    [theme.breakpoints.down("tablet")]: {
      gridTemplateColumns: "1fr",
    },
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
  btn: {
    display: "flex",
    justifyContent: "center",
    p: "2rem 0 4rem 0",
    ".Mui-disabled": {
      backgroundImage: "var(--disabled-color-dark) !important",
    },
  },
  tnc: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  radio: {
    width: "1.5rem",
    height: "1.5rem",
    m: "0 1rem 0 0",
  },
};

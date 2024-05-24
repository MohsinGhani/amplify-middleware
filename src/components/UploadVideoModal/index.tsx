import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  FilledInput,
  Modal,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";

import FileUploadIcon from "@mui/icons-material/FileUpload";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";

import theme from "../helpers/Theme";
import { UploadVideoModalProps } from "@/shared/interfaces/interfaces";
import VideoDetails from "../UploadVideoFormSteps/videoDetails";
import CommonButton from "../Shared/CommonButton";
import Thumbnails from "../UploadVideoFormSteps/thumbnails";
import Visibility from "../UploadVideoFormSteps/visibility";

// const fileUploadSchema = Yup.object().shape({
//   videoFile: Yup.mixed().required("A file is required"),
//   title: Yup.string().required("Title is required"),
//   description: Yup.string().required("Description is required"),
//   category: Yup.string().required("Category is required"),
//   tags: Yup.string().required("Tags are required"),
//   playlist: Yup.string().required("Playlist is required"),
//   thumbnail: Yup.string().required("Thumbnail is required"),
// });

const stepValidationSchemas = [
  Yup.object().shape({
    // Fields to validate in Step 1
    videoFile: Yup.mixed().required("A file is required"),
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    category: Yup.string().required("Category is required"),
    tags: Yup.string().required("Tags are required"),
    playlist: Yup.string().required("Playlist is required"),
  }),
  Yup.object().shape({
    thumbnail: Yup.string().required("Thumbnail is required"),
  }),
  Yup.object().shape({}),
];

const UploadVideoModal = ({ open, handleClose }: UploadVideoModalProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Video details", "Thumbnails", "Visibility"];

  const currentValidationSchema = stepValidationSchemas[activeStep];

  const formik = useFormik({
    initialValues: {
      videoFile: null,
      title: "",
      description: "",
      category: "",
      tags: "",
      playlist: "",
      thumbnail: "",
    },
    // validationSchema: currentValidationSchema,
    onSubmit: (values) => {
      console.log("🚀 ~ values:", values);
    },
  });

  const handleNext = async () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // try {
    //   await currentValidationSchema.validate(formik.values, {
    //     abortEarly: false,
    //   });

    //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // } catch (err) {
    //   if (err instanceof Yup.ValidationError) {
    //     let formErrors: any = {};
    //     err.inner.forEach((error: any) => {
    //       if (!formErrors[error.path]) {
    //         formErrors[error.path] = error.message;
    //       }
    //     });
    //     formik.setErrors(formErrors);
    //   }
    // }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box component="form" onSubmit={formik.handleSubmit}>
        <Box sx={styles.mainwrapper}>
          <Box sx={styles.uploadHeader}>
            <Typography variant="h4">
              {formik.values.videoFile
                ? (formik?.values?.videoFile as File)?.name
                : "Upload Video"}
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: "1rem",
                cursor: "pointer",
              }}
            >
              <FeedbackOutlinedIcon />
              <CloseOutlinedIcon onClick={handleClose} />
            </Box>
          </Box>
          <Divider />
          {!formik.values.videoFile ? (
            <Box sx={styles.fileUploader}>
              <Box component="label" sx={styles.uploadIcon}>
                <FileUploadIcon />
                <FilledInput
                  sx={{ display: "none" }}
                  type="file"
                  name="videoFile"
                  onChange={(event: any) => {
                    const file = event.target.files[0];
                    if (file) {
                      formik.setFieldValue("videoFile", file);
                      formik.setFieldValue("title", file.name);
                    }
                  }}
                />
              </Box>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 400,
                  fontSize: "0.9rem",
                }}
              >
                Drag and drop video files to upload
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 400,
                  fontSize: "0.7rem",
                  marginTop: "-15px",
                }}
              >
                Your videos will be private until you publish them.
              </Typography>
              <Button
                component="label"
                variant="contained"
                sx={{
                  marginTop: "15px",
                }}
              >
                Upload file
                <FilledInput
                  sx={{ display: "none" }}
                  type="file"
                  name="videoFile"
                  onChange={(event: any) => {
                    const file = event.target.files[0];
                    if (file) {
                      formik.setFieldValue("videoFile", file);
                      formik.setFieldValue("title", file.name);
                    }
                  }}
                />
              </Button>
            </Box>
          ) : (
            <Box sx={styles.stepperContainer}>
              <Stepper
                activeStep={activeStep}
                sx={{
                  width: "100%",
                }}
              >
                {steps.map((item: any) => {
                  return (
                    <Step key={item}>
                      <StepLabel>{item}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                }}
              >
                {activeStep === 0 && (
                  <>
                    <VideoDetails
                      values={formik.values}
                      handleChange={formik.handleChange}
                      handleBlur={formik.handleBlur}
                      errors={formik.errors}
                      touched={formik.touched}
                    />
                    <CommonButton
                      variant="contained"
                      sx={{
                        width: "200px !important",
                        marginTop: "15px",
                      }}
                      onClick={handleNext}
                      fullWidth={false}
                    >
                      Next
                    </CommonButton>
                  </>
                )}
                {activeStep === 1 && (
                  <>
                    <Thumbnails
                      values={formik.values}
                      handleChange={formik.handleChange}
                      handleBlur={formik.handleBlur}
                      errors={formik.errors}
                      touched={formik.touched}
                    />
                    <Box sx={styles.stepperFooterButtons}>
                      <CommonButton
                        variant="text"
                        sx={{
                          marginTop: "15px",
                        }}
                        onClick={handleBack}
                      >
                        Back
                      </CommonButton>
                      <CommonButton
                        variant="contained"
                        sx={{
                          marginTop: "15px",
                        }}
                        onClick={handleNext}
                      >
                        Next
                      </CommonButton>
                    </Box>
                  </>
                )}
                {activeStep === 2 && (
                  <Box>
                    <Visibility
                      values={formik.values}
                      handleChange={formik.handleChange}
                      handleBlur={formik.handleBlur}
                      errors={formik.errors}
                      touched={formik.touched}
                    />
                    <Box sx={styles.stepperFooterButtons}>
                      <CommonButton
                        variant="text"
                        sx={{
                          marginTop: "15px",
                        }}
                        onClick={handleBack}
                      >
                        Back
                      </CommonButton>
                      <CommonButton
                        variant="contained"
                        sx={{
                          marginTop: "15px",
                        }}
                        onClick={() => {
                          formik.handleSubmit();
                          handleClose();
                        }}
                      >
                        {activeStep === steps.length - 1 ? "Upload" : "Next"}
                      </CommonButton>
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
          )}
          {!formik.values.videoFile && (
            <Box
              sx={{
                padding: "1rem 1.5rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 400,
                  fontSize: "0.7rem",
                  textAlign: "center",
                }}
              >
                By submitting your videos to Noire TV, you acknowledge that you
                agree to Noire TV's Terms of Service and Community Guidelines.
                Please be sure not to violate others' copyright or privacy
                rights. Learn more
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default UploadVideoModal;

/** @type {import("@mui/material").SxProps} */
const styles = {
  mainwrapper: {
    display: "grid",
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: "50%",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "0.4rem",
    [theme.breakpoints.down("laptop")]: {
      width: "70%",
    },
  },
  uploadHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 1.5rem",
    "& h4": {
      fontSize: "1.3rem",
      fontWeight: 500,
    },
  },
  fileUploader: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "1rem",
    height: "calc(100vh - 300px)",
    "& button": {
      width: "100%",
    },
  },
  uploadIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: "50%",
    width: "8rem",
    height: "8rem",
    cursor: "pointer",
    "& svg": {
      fontSize: "4rem",
      color: "#bdbdbd",
    },
  },
  stepperContainer: {
    padding: "1rem 1.5rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.5rem",
    minHeight: "fit-content",
    maxHeight: "calc(100vh - 300px)",
    overflowY: "auto",
  },
  stepperFooterButtons: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "1rem",
    "& .common-button": {
      width: "fit-content !important",
    },
  },
};

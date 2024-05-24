import React from "react";
import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

import theme from "../helpers/Theme";

const Visibility = ({
  values,
  handleChange,
  handleBlur,
  errors,
  touched,
}: any) => {
  return (
    <Box sx={styles.mainwrapper}>
      <Box sx={styles.visibilityDetails}>
        <Typography variant="h6" sx={{ marginBottom: "1rem" }}>
          Age Restriction
        </Typography>
        <RadioGroup
          name="ageRestriction"
          defaultValue="none"
          value={values.ageRestriction}
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <FormControlLabel
            value="none"
            control={<Radio />}
            label="No, don't restrict my video to viewers over 18 only"
          />
          <FormControlLabel
            value="18+"
            control={<Radio />}
            label="Yes, restrict my video to viewers over 18"
          />
        </RadioGroup>
        {touched.ageRestriction && errors.ageRestriction && (
          <Typography
            color="red"
            sx={{
              fontSize: "0.6rem",
            }}
          >
            {errors.ageRestriction}
          </Typography>
        )}
        <Typography variant="h6" sx={{ marginBottom: "1rem" }}>
          Visibility
        </Typography>
        <RadioGroup
          name="visibility"
          defaultValue="none"
          value={values.visibility}
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <FormControlLabel
            value="private"
            control={<Radio />}
            label="Private"
          />
          <FormControlLabel value="Public" control={<Radio />} label="Public" />
        </RadioGroup>
        {touched.visibility && errors.visibility && (
          <Typography
            color="red"
            sx={{
              fontSize: "0.6rem",
            }}
          >
            {errors.visibility}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Visibility;

/** @type {import("@mui/material").SxProps} */
const styles = {
  mainwrapper: {
    display: "grid",
    width: "100%",
    [theme.breakpoints.down("laptop")]: {
      flexDirection: "column",
    },
  },
  visibilityDetails: {
    width: "100%",
    "& h6": {
      marginBottom: "0.4rem",
    },
    "& .MuiTypography-root": {
      color: "black !important",
    },
  },
};

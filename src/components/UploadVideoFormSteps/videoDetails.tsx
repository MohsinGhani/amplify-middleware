import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import theme from "../helpers/Theme";
import data from "../../shared/json/index.json";

const VideoDetails = ({
  values,
  handleChange,
  handleBlur,
  errors,
  touched,
}: any) => {
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    if (values.videoFile) {
      const url = URL.createObjectURL(values.videoFile);
      setVideoUrl(url);
    }
  }, []);

  return (
    <Box sx={styles.mainwrapper}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          width: "100%",
          gap: "1rem",
          marginTop: "1.8rem",
          [theme.breakpoints.down("laptop")]: {
            flexDirection: "column-reverse",
          },
        }}
      >
        <Box sx={styles.videoDetails}>
          <TextField
            label="Title (required)"
            variant="outlined"
            name="title"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.title && Boolean(errors.title)}
            helperText={touched.title && errors.title}
            fullWidth
          />
          <TextField
            label="Description"
            variant="outlined"
            name="description"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.description && Boolean(errors.description)}
            helperText={touched.description && errors.description}
            fullWidth
            multiline
            rows={4}
          />
          <FormControl
            fullWidth
            error={touched.category && Boolean(errors.category)}
          >
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              label="Category"
              labelId="category-label"
              variant="outlined"
              name="category"
              value={values.category}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.category && Boolean(errors.category)}
              fullWidth
            >
              {data.videoCategories?.map((category: any, index: any) => (
                <MenuItem key={index} value={category.value}>
                  {category.label}
                </MenuItem>
              ))}
            </Select>
            {touched.category && errors.category && (
              <FormHelperText>{errors.category}</FormHelperText>
            )}
          </FormControl>
          <FormControl
            fullWidth
            error={touched.category && Boolean(errors.category)}
          >
            <InputLabel id="playlist-label">Playlist</InputLabel>
            <Select
              label="Playlist"
              labelId="playlist-label"
              variant="outlined"
              name="playlist"
              value={values.playlist}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.playlist && Boolean(errors.playlist)}
              fullWidth
            >
              {data.playlists?.map((playlist: any, index: any) => (
                <MenuItem key={playlist.playlistId} value={playlist.value}>
                  {playlist.category}
                </MenuItem>
              ))}
            </Select>
            {touched.playlist && errors.playlist && (
              <FormHelperText>{errors.playlist}</FormHelperText>
            )}
          </FormControl>
          <TextField
            label="Tags"
            variant="outlined"
            name="tags"
            value={values.tags}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={
              touched.tags && errors.tags
                ? errors.tags
                : "Tags help people discover your video. Enter comma separated tags."
            }
            error={touched.tags && Boolean(errors.tags)}
            fullWidth
          />
        </Box>
        <Box sx={styles.videoPlayer}>
          <video src={videoUrl} controls style={{ width: "100%" }} />
          <Typography variant="body2" color="text.secondary">
            Video Link: <b>https://noire.tv/X3ri2kwhxts</b>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Filename: <b>{values.videoFile.name}</b>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default VideoDetails;

/** @type {import("@mui/material").SxProps} */
const styles = {
  mainwrapper: {
    display: "grid",
    width: "100%",
    [theme.breakpoints.down("laptop")]: {
      flexDirection: "column",
    },
  },
  videoDetails: {
    width: "65%",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    [theme.breakpoints.down("laptop")]: {
      width: "100%",
    },
  },
  videoPlayer: {
    width: "35%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "0.7rem",
    [theme.breakpoints.down("laptop")]: {
      width: "100%",
    },
  },
};

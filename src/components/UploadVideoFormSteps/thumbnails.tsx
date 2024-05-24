import { Box, Typography, Button, Paper } from "@mui/material";
import React, { useState } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";

import theme from "../helpers/Theme";

const thumbnails: any = [
  "https://i9.ytimg.com/vi/X3ri2kwhxts/mqdefault.jpg?sqp=CIDO26sG-oaymwEmCMACELQB8quKqQMa8AEB-AH-BIAC6AKKAgwIABABGE0gZSgmMA8=&rs=AOn4CLAM7hCTZ3aVhVRvBhFcFC_rkXglmQ",
  "https://i9.ytimg.com/vi/X3ri2kwhxts/mqdefault.jpg?sqp=CIDO26sG-oaymwEmCMACELQB8quKqQMa8AEB-AH-BIAC6AKKAgwIABABGE0gZSgmMA8=&rs=AOn4CLAM7hCTZ3aVhVRvBhFcFC_rkXglmQ",
  "https://i9.ytimg.com/vi/X3ri2kwhxts/mqdefault.jpg?sqp=CIDO26sG-oaymwEmCMACELQB8quKqQMa8AEB-AH-BIAC6AKKAgwIABABGE0gZSgmMA8=&rs=AOn4CLAM7hCTZ3aVhVRvBhFcFC_rkXglmQ",
];

const Thumbnails = ({
  values,
  handleChange,
  handleBlur,
  errors,
  touched,
}: any) => {
  const [image, setImage] = useState("");
  const [selectedImage, setSelectedImage] = useState(
    "https://i9.ytimg.com/vi/9SmXRmEQV2s/mqdefault.jpg?sqp=CMDz26sG-oaymwEmCMACELQB8quKqQMa8AEB-AH-BIAC6AKKAgwIABABGFQgZShPMA8=&rs=AOn4CLAuXA1ewo0jnS9emBEAkLhufvPV5A"
  );
  const [images, setImages] = useState([
    "https://i9.ytimg.com/vi/9SmXRmEQV2s/mqdefault.jpg?sqp=CMDz26sG-oaymwEmCMACELQB8quKqQMa8AEB-AH-BIAC6AKKAgwIABABGFQgZShPMA8=&rs=AOn4CLAuXA1ewo0jnS9emBEAkLhufvPV5A",
    "https://i9.ytimg.com/vi/X3ri2kwhxts/mqdefault.jpg?sqp=CJTx26sG-oaymwEmCMACELQB8quKqQMa8AEB-AH-BIAC6AKKAgwIABABGE0gZSgmMA8=&rs=AOn4CLCKH46a8PTojPd-ntAhsSUUZzvbVw",
    "https://i9.ytimg.com/vi/-QBIgAdBCKI/mqdefault.jpg?sqp=CJTx26sG-oaymwEmCMACELQB8quKqQMa8AEB-AH-BIAC6AKKAgwIABABGEEgZSgwMA8=&rs=AOn4CLDuD22R9qAzvoDQ7dZss572Bn2_vg",
  ]);

  const handleImageSelect = (src: any) => {
    setSelectedImage(src);
  };

  const handleUploadClick = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader() as any;
      reader.onloadend = () => {
        setImages([reader.result, ...images]);
        setImage(reader.result);
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOnClick = () => {
    setSelectedImage(image === selectedImage ? images[1] : selectedImage);
    setImages((p) => p.filter((src) => src !== image));
    setImage("");
  };

  return (
    <Box sx={styles.mainwrapper}>
      <Typography sx={{ fontSize: 17, fontWeight: "bold" }}>
        Thumbnails
      </Typography>
      <Typography variant="subtitle2" sx={{ fontSize: 13 }}>
        Select or upload a picture that shows what's in your video. A good
        thumbnail stands out and draws viewers' attention
      </Typography>

      <Paper sx={styles.paperWrapper}>
        {!image ? (
          <>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="upload-thumbnail"
              type="file"
              onChange={handleUploadClick}
            />
            <label htmlFor="upload-thumbnail">
              <Button
                variant="text"
                component="span"
                startIcon={<AddPhotoAlternateIcon />}
                sx={{
                  border: "1px solid #0000001f",
                  height: 75,
                  width: 120,
                  lineHeight: 1.5,
                  fontSize: 12,
                }}
              >
                Upload thumbnail
              </Button>
            </label>
          </>
        ) : null}

        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          {images.map((src, index) => (
            <div style={{ position: "relative" }}>
              <img
                src={src}
                alt={`Thumbnail ${index}`}
                style={{
                  height: 75,
                  width: 120,
                  opacity: selectedImage === src ? 1 : "0.5",
                  border: selectedImage === src ? "2px solid #1976d2" : "",
                  cursor: "pointer",
                  objectFit: "cover",
                }}
                onClick={() => handleImageSelect(src)}
              />
              <span style={{ position: "absolute", right: 2, top: 2 }}>
                {image === src ? (
                  <DeleteIcon onClick={handleOnClick} fontSize="small" />
                ) : null}
              </span>
            </div>
          ))}
        </div>
      </Paper>
    </Box>
  );
};

export default Thumbnails;

/** @type {import("@mui/material").SxProps} */
const styles = {
  mainwrapper: {
    display: "grid",
    width: "100%",
    padding: 2,
    [theme.breakpoints.down("laptop")]: {
      flexDirection: "column",
    },
  },
  paperWrapper: {
    display: "flex",
    alignItems: "center",
    gap: 2,
    px: 1,
    py: 1,
    my: 3,
    mx: 1,
    justifyContent: "center",
  },
};

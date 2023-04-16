import {
  Box,
  Button,
  Dialog,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../store/modalSlice";
import { Close, DeleteOutlined, EditOutlined } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import Dropzone from "react-dropzone";
import CircularProgress from '@mui/material/CircularProgress';

const UploadModal = () => {
  const open = useSelector((state) => state.open);
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [medicine, setMedicine] = useState('');

  const onSubmit = async () => {
    if(!image)return;
    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', image);

    const response = await fetch('http://127.0.0.1:8000/predict', {
      method: 'POST',
      // headers: {
      //   'Content-Type': 'application/json',
      //   'accept':'application/json'
      // },
      body: formData
    })
    if(!response.ok){
      setIsLoading(false);
      return;
    }

    const data = await response.json();
    setMedicine(data?.medicine)

    setIsLoading(false);
  }

  return (
    <Dialog
      open={open}
      onClose={() => {
        dispatch(setOpen({ open: false }));
      }}
      fullWidth
    >
      <Box
        sx={{
          backgroundColor: palette.background.alt,
          minHeight: "50vh",
          width: "100%",
          p: 2,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: 'center',
            justifyContent: 'space-between',
            p:1
          }}
        >
          <Typography
            style={{
              color: palette.lightBlue,
              fontFamily: 'Gilroy',
              fontSize: '1.2rem'
            }}
          >
            Upload Prescription
          </Typography>
          <Button
            onClick={() => {
              dispatch(setOpen({ open: false }));
            }}
          >
            <Close sx={{ fontWeight: "bold" }} />
          </Button>
        </Box>
        <Box
          border={`1px solid ${palette.lightBlue}`}
          borderRadius='5px'
          mt='1rem'
          p='1rem'
        >
          <Dropzone
            acceptedFiles='.jpg,.jpeg,.png'
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"center"}
                gap={1}
              >
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p='1rem'
                  width={"100%"}
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <Typography
                      sx={{
                        fontFamily: "Gentona",
                        color: palette.lightBlue,
                      }}
                    >
                      Add Prescription Here
                    </Typography>
                  ) : (
                    <Stack
                      direction={"row"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      gap={1}
                    >
                      <Typography
                        sx={{
                          fontFamily: "Gilroy",
                          color: palette.lightBlue,
                        }}
                      >
                        {image.name}
                      </Typography>
                      <EditOutlined sx={{ color: palette.lightBlue }} />
                    </Stack>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined sx={{ color: palette.lightBlue }} />
                  </IconButton>
                )}
              </Stack>
            )}
          </Dropzone>
        </Box>
        <Stack
          alignItems={'center'}
          justifyContent={'center'}
          gap={2}
          sx={{
            m: '2rem'
          }}
        >
          {isLoading && <CircularProgress sx={{color: palette.lightBlue}} />}
          {!isLoading && medicine && (
            <Typography
              style={{
                color: palette.lightBlue,
                fontFamily: 'Gilroy',
                fontSize: '1.2rem'
              }}
            >
              Medicine: {medicine}
            </Typography>
          )}
          <Button
            varient='text'
            sx={{
              color: palette.lightBlue,
              fontFamily: "Gentona",
              fontSize: "1.2rem",
              m: 1,
              '&:disabled': {
                color: palette.blueishGreen
              }
            }}
            disabled={!image || isLoading}
            onClick={onSubmit}
          >
            UPLOAD
          </Button>
        </Stack>
      </Box>
    </Dialog>
  );
};

export default UploadModal;

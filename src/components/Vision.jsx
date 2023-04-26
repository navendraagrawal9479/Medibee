import React from "react";
import Navbar from "./Navbar";
import { Box, Stack, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";

const Vision = () => {
  const { palette } = useTheme();

  return (
    <div>
      <Navbar />
      <Box
        sx={{
          height: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "80%",
          m: "2rem auto",
        }}
      >
        <Stack
          gap = {2}
        >
          <Typography
            style={{
              fontFamily: "Comfortaa",
              fontSize: "1rem",
              color: palette.lightBlue,
              m: "2rem auto",
            }}
          >
            Welcome to Medibee, the ultimate solution for hassle-free medical
            prescription recognition. We are a team of tech enthusiasts and
            medical experts who have come together to make your life easier. Our
            vision is to make prescription reading a seamless process for
            everyone.
          </Typography>
          <Typography
            style={{
              fontFamily: "Comfortaa",
              fontSize: "1rem",
              color: palette.lightBlue,
              m: "2rem auto",
            }}
          >
            At Medibee, we understand the pain of going through countless
            prescriptions to find the right medicine. That's why we have created
            a platform where you can simply upload an image of your prescription
            and leave the rest to us. Our advanced ML model based on cnn and
            lstm technology will analyze the prescription and extract all the
            medicine names in text format for you.
          </Typography>
          <Typography
            style={{
              fontFamily: "Comfortaa",
              fontSize: "1rem",
              color: palette.lightBlue,
              m: "2rem auto",
            }}
          >
            But that's not all. Medibee goes beyond just recognizing medicine
            names. Our platform provides a comprehensive list of alternative
            medicines with the same salt and their prices, ensuring that you
            have access to all available options. We also provide detailed
            information about each medicine, including its side effects, uses,
            medical benefits, directions for use, and storage instructions.
          </Typography>
          <Typography
            style={{
              fontFamily: "Comfortaa",
              fontSize: "1rem",
              color: palette.lightBlue,
              m: "2rem auto",
            }}
          >
            Our ultimate goal is to make prescription reading as easy as
            possible for you. With Medibee, you can save time and effort while
            getting accurate and reliable results. Our team is committed to
            ensuring that you have access to the best healthcare services, and
            we will continue to innovate and improve our platform to meet your
            needs.
          </Typography>
          <Typography
            style={{
              fontFamily: "Comfortaa",
              fontSize: "1rem",
              color: palette.lightBlue,
              m: "2rem auto",
            }}
          >
            So, if you're tired of going through endless prescription papers,
            look no further than Medibee. Let us take care of your prescription
            reading needs and give you the peace of mind you deserve. Join our
            platform today and experience the future of healthcare!
          </Typography>
        </Stack>
      </Box>
    </div>
  );
};

export default Vision;

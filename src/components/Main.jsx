import { useTheme } from "@emotion/react";
import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";

const Main = () => {
  const { palette } = useTheme();

  return (
    <Box
      sx={{
        m: "3rem auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        maxWidth: "60%",
      }}
    >
      <Stack gap={5} alignItems={"center"} justifyContent={"center"}>
        <Stack
          direction={"row"}
          flexWrap={"wrap"}
          gap={1}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Typography
            style={{
              fontFamily: "Gentona",
              color: palette.cyan,
            }}
            variant='h2'
          >
            Prescription
          </Typography>
          <Typography
            style={{
              fontFamily: "Gentona",
              color: palette.white,
            }}
            variant='h2'
          >
            Recognition
          </Typography>
          <Typography
            style={{
              fontFamily: "Gentona",
              color: palette.white,
            }}
            variant='h2'
          >
            Just Got Smarter
          </Typography>
          <Typography
            style={{
              fontFamily: "Gilroy",
              color: palette.white,
            }}
            variant='h2'
          >
            .
          </Typography>
        </Stack>
        <Box
          sx={{
            height: "30vh",
            overflowY: "scroll",
            width: '60%'
          }}
        >
          <Stack 
            gap={2} 
            alignItems={"center"} 
            justifyContent={"center"} 
            sx={{
              color: palette.white,
              textAlign: 'center'
            }}
          >
            <Typography
              style={{
                fontFamily: 'Comfortaa',
                fontSize: '1rem'
              }}
            >
              Upload the doctor's signed prescription to receive a list of
              prescribed medicines. Optimize costs by purchasing recommended
              medicines with the same salt at a lower price.
            </Typography>
            <Typography
              style={{
                fontFamily: 'Comfortaa',
                fontSize: '1rem'
              }}
            >
              A hassle-free way to understand your prescriptions and save money.
              Simply upload a photo of your doctor's signed prescription, and
              we'll provide you with a list of prescribed medicines and
              recommended options with the same salt composition but at a lower
              price.
            </Typography>
            <Typography
              style={{
                fontFamily: 'Comfortaa',
                fontSize: '1rem'
              }}
            >
              Say goodbye to long wait times and confusion at the pharmacy, and
              hello to convenience and affordability. Try our service today and
              experience the difference for yourself!
            </Typography>
          </Stack>
        </Box>
        <Button
          variant='contained'
          sx={{
            backgroundColor: palette.lightBlue,
            color: palette.background.alt,
            fontWeight: 700,
            fontSize: '1.2rem',
            fontFamily: 'Gentona',
          }}
        >
          <h3>GET STARTED</h3>
        </Button>
      </Stack>
    </Box>
  );
};

export default Main;

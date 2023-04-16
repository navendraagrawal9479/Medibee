import { useTheme } from '@emotion/react';
import { Box, Button, Stack } from '@mui/material';
import React from 'react'
import logo from '../logo.png'
import { useDispatch } from 'react-redux';
import { setOpen } from '../store/modalSlice';

const Navbar = () => {
  const { palette } = useTheme();
  const dispatch = useDispatch();

  return (
    <Box
      sx={{
        backgroundColor: palette.background.default,
        p: 3
      }}
    >
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <img alt='logo' src={logo} style={{ width: '200px' }} />
        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'center'}
          gap={2}
        >
          <Button 
            varient='text'
            sx={{
              color: palette.lightBlue,
              fontFamily: 'Gentona',
              fontSize: '1.2rem'
            }}
          >
            VISION
          </Button>
          <Button 
            varient='text'
            sx={{
              color: palette.lightBlue,
              fontFamily: 'Gentona',
              fontSize: '1.2rem'
            }}
          >
            MEDICINES
          </Button>
          <Button 
            varient='text'
            sx={{
              color: palette.lightBlue,
              fontFamily: 'Gentona',
              fontSize: '1.2rem'
            }}
            onClick={() => {
              dispatch(setOpen({open: true}))
            }}
          >
            UPLOAD
          </Button>
        </Stack>
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
          <h3>LOGIN</h3>
        </Button>
      </Stack>
    </Box>
  )
}

export default Navbar
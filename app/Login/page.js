'use client';
import React, { useState } from 'react'
import './Login.css';
import { TextField, Button, Typography, Box, Stack } from '@mui/material'
// import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
// import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function page() {

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const [formData, setFormData] = useState({
    name: '',
    password: '',
  });

  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    const lat = parseFloat(formData.latitude)
    const lon = parseFloat(formData.longitude)

    if (isNaN(lat) || lat < -90 || lat > 90) return setError('Latitude must be between -90 and 90')
    if (isNaN(lon) || lon < -180 || lon > 180) return setError('Longitude must be between -180 and 180')

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/attractions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await res.json()
      router.push('../attractions')

    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className='Loginpage'>
      
      <div className='Boxcenter'>
        {/* <div className='Boxitem'> */}

        <form onSubmit={handleSubmit} className='Boxitem'>
          {/* <Stack spacing={2}> */}

          <div></div><div></div>
          <TextField className='TF-User'
            label="Username"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            className='TF-password'
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          

          {error && <Typography color="error">{error}</Typography>}

          <Button 
            sx={{
              width: "100%",
              maxWidth: "300px",
              backgroundColor: "#547616",
              borderRadius: "15px",
              padding: "15px",
              color: "white",
              fontSize: "14px",
              '&:hover': { backgroundColor: "#405812",color:"" } // เปลี่ยนสีเมื่อ hover
              }}
          > 
              Submit
          </Button>
          
          {/* </Stack> */}
             
              <p className='line'>___________________________</p>
          <div className='noaccout'>
              <a className='Noaccount'>Don't have an Accont?</a> <a className='signup' href='#' >Signup</a>
          </div>

        </form>

        {/* <FormControl className='TF-User'>
            <InputLabel htmlFor="outlined-adornment-password">User</InputLabel>
            <OutlinedInput 
              id="outlined-adornment-password"
              type={'text'}
              label="User"
            />
          </FormControl>
     



          <FormControl className='TF-password'>
            <InputLabel htmlFor="outlined-adornment-password" className='labelintutpassword'>Password</InputLabel>
            <OutlinedInput className='labelintutpassword'
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword ? 'hide the password' : 'display the password'
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl> */}




        {/* </div> */}
        <div className='Boxitem'>

        </div>



      </div>










    </div>

  );
}

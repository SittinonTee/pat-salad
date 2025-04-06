'use client';
import React, { useState } from 'react'
import './Signup.css';
import { useRouter } from 'next/navigation'
import { TextField, Button, Typography, Box, Stack, IconButton, InputAdornment } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material';

// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';


export default function Signup() {

  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [error, setError] = useState(null);

  const [showCfPassword, setShowCfPassword] = useState(false); // แก้ชื่อ state
  const handleClickShowCfPassword = () => setShowCfPassword((show) => !show); // แก้ชื่อ function และให้เรียกถูก state
  const [cfError, setCfError] = useState(null); // แก้ชื่อ state error ให้ไม่ชน




  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    fname: '',
    lname: '',
    phone: '',
    address: '',
    password: '',
    cfpassword: '',

  });



  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }


  //-------------------------------------handleSubmit----------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password || !formData.phone) {
      setError('Please fill in all fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      setError('Please enter a valid phone number');
      return;
    }


    if (formData.password !== formData.cfpassword) {
      setError('Passwords do not match');
      return;
    }



    // alert("Yes")
    await sendDataToBackend(formData);
  };






  //-------------------------------------sentData----------------------------------------
  const sendDataToBackend = async (e) => {
    // e.preventDefault()
    setError(null)




    console.log('send Data to backend', formData);


    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await res.json()
      // console.log(result)

      if (result) {
        console.log(result)
        router.push('../Login')

      }




    } catch (err) {
      setError(err.message)
    }
  }





  //-------------------------------------Design----------------------------------------
  return (
    <div className='Signuppage'>

      <div className='Boxcenter'>
        {/* <div className='Boxitem'> */}

        <form onSubmit={handleSubmit} className='Boxitem'>
          {/* <Stack spacing={2}> */}

          <TextField className='TF-User'
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <TextField className='TF-Email'
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <TextField className='TF-fname'
            label="Firstname"
            name="fname"
            value={formData.fname}
            onChange={handleChange}
            required
          />

          <TextField className='TF-lname'
            label="Lastname"
            name="lname"
            value={formData.lname}
            onChange={handleChange}
            required
          />

          <TextField className='TF-phone'
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <TextField className='TF-address'
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />

          <TextField
            className="TF-password"
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
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
              ),
            }}
          />

          <TextField
            className="TF-CFpassword"
            label="Confirm Password"
            name="cfpassword"
            type={showCfPassword ? "text" : "password"}
            value={formData.cfpassword}
            onChange={handleChange}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowCfPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showCfPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />








          <div className='gpbutton'>

            <div className='err'>
              {error ? <Typography color="error">{error}</Typography> : null}
            </div>

            <Button
              type="submit"
              sx={{
                width: "100%",
                minWidth: "250px",
                maxWidth: "250px",
                backgroundColor: "#547616",
                borderRadius: "15px",
                padding: "15px",
                color: "white",
                fontSize: "14px",
                '&:hover': { backgroundColor: "#405812", color: "" } // เปลี่ยนสีเมื่อ hover
              }}
            >
              Submit
            </Button>

            {/* </Stack> */}
            <p className='line'>________________________</p>
            <div className='noaccout'>
              <a className='Noaccount'>Already have an Accont?</a> <a className='Login' href='../Login' >Login</a>
            </div>
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
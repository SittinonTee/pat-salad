'use client';
import React, { useState } from 'react'
import './Login.css';
import { TextField, Button, Typography, Box, Stack, IconButton, InputAdornment } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useRouter } from 'next/navigation';




export default function page() {

  const router = useRouter();

  //--------------------------------------------------------showpassword--------------------------------
  const [showPassword, setShowPassword] = useState(false);
  
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };
  //----------------------------------------------------------------------------------------


  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }


  //--------------------------------------------------------handleSubmit--------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault()
    // setError(null)

    if (!formData.username || !formData.password) {
      setError('Please fill in all fields');
      return;
    }


    // console.log(formData)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await res.json()
      console.log(result);
      // console.log(result.error);
      setError(result.error);


      if (res.ok) {
        setError(null)
        // console.log(result.type === "user");
        if (result.type === "user") {
          console.log("GoHomepage", result)
          sessionStorage.setItem("user", JSON.stringify(result));
          router.push("../Homepage");
          // router.push(`../Homepage?userId=${result.userId}&username=${result.username}`);
        } else {
          router.push('../Editmenu');
        }

      }
    } catch (err) {
      setError(err.message)
    }
  }








//---------------------------------------------------------return---------------------------------------------
  return (
    <div className='Loginpage'>

      <div className='Boxcenter'>
        {/* <div className='Boxitem'> */}

        <form onSubmit={handleSubmit} className='Boxitem'>
          {/* <Stack spacing={2}> */}

          <div></div><div></div><div></div><div></div>
          <TextField className='TF-User'
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          // required
          />
          <TextField
            className='TF-password'
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            // required
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
                padding: "5px",
                color: "white",
                fontSize: "30px",
                '&:hover': { backgroundColor: "#405812", color: "" },
                boxShadow: "0px 4px 10px rgba(30, 30, 30, 0.5)",
                fontWeight: "bold",
              }}

            >
              Login
            </Button>

            {/* </Stack> */}

            <p className='line'>________________________</p>
            <div className='noaccout'>
              <a className='Noaccount'>Don't have an Accont?</a> <a href={`../Signup`} className="signup">Signup</a>
            </div>
          </div>
        </form>

        <div className='Boxitem'>

        </div>



      </div>
    </div>

  );
}

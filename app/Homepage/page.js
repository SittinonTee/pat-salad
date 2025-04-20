'use client';
import './hompage.css';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect, useContext } from 'react'
import { DataContext } from './layout';
// import { useRouter } from 'next/navigation';


//install
// npm install @mui/material @emotion/react @emotion/styled @mui/icons-material


import * as React from 'react';
import { red } from '@mui/material/colors';


export default function Home() {

  const router = useRouter();


  // useEffect(() => {
  //   setUser({ userId, username });
  // }, [userId, username]);


  // const searchParams = useSearchParams();
  // const userId = searchParams.get('userId');
  // const username = searchParams.get('username');


  const { user, setUser, add_and_phone, setadd_and_phone } = useContext(DataContext);


  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (!storedUser) {
      router.push("/Login");
    } else {
      // console.log("Get user", JSON.parse(storedUser))
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      setadd_and_phone({
        address: parsedUser.address || '',
        phone: parsedUser.phone || ''
      });
    }
  }, []);



  // useEffect(() => {
  //   console.log("checkadd", add_and_phone)
  // }, [add_and_phone]);


//---------------------------------------------------------------return--------------------------------
  return (
    <div className='test'>

      <div ></div>

      <div className='buttomBox'>
        <div className='Buttomitem'>
          <div className='imageContainer'>
            <img src='/salad.png' alt='icon' className='iconmenu' />
          </div>
          <div className='textContainer' onClick={() => router.push('/Homepage/Menu?type=salad')}>
            <h1>Salad</h1>
          </div>
        </div>
        <div className='Buttomitem' style={{ background: red }}>
          <div className='imageContainer'>
            <img src='/wrap.png' alt='icon' className='iconmenu' />
          </div>
          <div className='textContainer' onClick={() => router.push('/Homepage/Menu?type=wrap')}>
            <h1>wrap</h1>
            {/* <button onClick={()=>setData("deerrrrrrrr")}>ClickMe</button> */}
          </div>
        </div>
        <div className='Buttomitem'>
          <div className='imageContainer' >
            <img src='/fried.png' alt='icon' className='iconmenu' />
          </div>
          <div className='textContainer' onClick={() => router.push('/Homepage/Menu?type=fried')}>
            <h1>Fried</h1>
          </div>
        </div>
        <div className='Buttomitem'>
          <div className='imageContainer'>
            <img src='/drink.png' alt='icon' className='iconmenu' />
          </div>
          <div className='textContainer' onClick={() => router.push('/Homepage/Menu?type=drink')}>
            <h1>Drink</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

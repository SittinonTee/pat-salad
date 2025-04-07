'use client';
import './hompage.css';
import { useSearchParams,useRouter } from 'next/navigation';
import {useState,useEffect,useContext} from 'react'
import {DataContext} from './layout';
// import { useRouter } from 'next/navigation';


//install
// npm install @mui/material @emotion/react @emotion/styled @mui/icons-material


import * as React from 'react';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';


export default function Home() {

  const { Menumane, setMenuname } = useContext(DataContext);





  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
      padding: '0 4px',
    },
  }));





  const router = useRouter();  
  const searchParams = useSearchParams()
  const username = searchParams.get('username')


  return (
    <div className='test'>


      <div ></div>

      <div className='buttomBox'>
        <div className='Buttomitem'>
          <div className='imageContainer'>
            <img src='/path/to/icon1.png' alt='icon' />
          </div>
          <div className='textContainer' onClick={() => router.push('/Homepage/Menu?type=Salad')}
          >
            <h1>Salad</h1>
          </div>
        </div>
        <div className='Buttomitem' style={{background:red}}>
          <div className='imageContainer'>
            <img src='/path/to/icon2.png' alt='icon' />
          </div>
          <div className='textContainer'>
            <h1>{Menumane}</h1>
            {/* <button onClick={()=>setData("deerrrrrrrr")}>ClickMe</button> */}
          </div>
        </div>
        <div className='Buttomitem'>
          <div className='imageContainer'>
            <img src='/path/to/icon2.png' alt='icon' />
          </div>
          <div className='textContainer'>
            <h1>Fried</h1>
          </div>
        </div>
        <div className='Buttomitem'>
          <div className='imageContainer'>
            <img src='/path/to/icon2.png' alt='icon' />
          </div>
          <div className='textContainer'>
            <h1>Text 2</h1>
          </div>
        </div>
      </div>


    </div>
  );
}

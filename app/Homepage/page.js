'use client';
import './hompage.css';


//install
// npm install @mui/material @emotion/react @emotion/styled @mui/icons-material



import * as React from 'react';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';




export default function Home() {

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
      padding: '0 4px',
    },
  }));



  //---------------------------------------------------------------------------------------------------------------

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );












  return (
    <div className='homepage'>


      <div className="TopBox">
        <div className="Logo">
          <h1>My Logo</h1>
        </div>
        <div className='Menubar'>
          {/* <div className='boxitem'>
            <h1>1</h1>
          </div>
          <div className='boxitem'>
            <h1>2</h1>
          </div> */}
          <div className='boxitem'>
            <h1>Setting</h1>
          </div>
          <div className='boxitem'>
            <h1>Profile</h1>
          </div>
          <div className='boxitem'>

            <IconButton aria-label="cart" onClick={toggleDrawer(true)}>
              <StyledBadge badgeContent={4} color="secondary">
                <ShoppingCartIcon />
              </StyledBadge>
            </IconButton>

            <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
              {DrawerList}
            </Drawer>


          </div>
        </div>
      </div>

      <div className='buttomBox'>
        <div className='Buttomitem'>
          <div className='imageContainer'>
            <img src='/path/to/icon1.png' alt='icon' />
          </div>
          <div className='textContainer'>
            <h1>Salad</h1>
          </div>
        </div>
        <div className='Buttomitem'>
          <div className='imageContainer'>
            <img src='/path/to/icon2.png' alt='icon' />
          </div>
          <div className='textContainer'>
            <h1>Wraps</h1>
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

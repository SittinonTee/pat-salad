'use client'; 
import './hompage.css';
import * as React from 'react';
import {useState,useEffect,createContext} from 'react'
import { usePathname } from 'next/navigation';
// import { TextField, Button, Typography, Box, Stack ,IconButton,InputAdornment,ListItem,List,ListItemButton} from '@mui/material'
import {
    Badge,
    Box,
    Drawer,
    List,
    Divider,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    IconButton
  } from '@mui/material';
  import { MoveToInbox as InboxIcon, Mail as MailIcon, ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';
  import { styled } from '@mui/material/styles';



    export const DataContext = createContext();
    
    // export const MenunameProvider = ({children}) =>{


    // }



export default function navigationbar({ children }) {
    const pathname = usePathname();

    const isSaladPage = pathname.includes('/Homepage/Menu');

    const [Menumane , setMenuname] = useState("Terr")





    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
          right: -3,
          top: 13,
          border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
          padding: '0 4px',
        },
      }));
    



    const [open, setOpen] = useState(false);

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
        <div>
        <div className={isSaladPage ? 'Saladpage':'homepage'}>
            <div className="TopBox">
                <div className="Logo">
                    <h1>My Logo</h1>
                </div>
                <div className='Menubar'>
                    <div className='boxitem'>
                        <h1>pp</h1>
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
            <DataContext.Provider value={{Menumane,setMenuname}}>
            {children}
            </DataContext.Provider>
        </div>
       
        </div>
    );
  }
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
    const [cart, setCart] = useState([]);



  const addToCart = (menu) =>{
    setCart(preCart =>{
      const checkmenu = preCart.find(i => i.nameENG === menu.nameENG);
      if(checkmenu){
        return preCart.map(i =>{
          if(i.name===menu.name){
            return { ...i, quantity: i.quantity + 1 };
          }
          return i;
        })
      }else{
        return [...preCart,{...menu,quantity:1}]
      }
    })

      console.log("Orde = ",cart);

   
  }


  useEffect(() => {
    console.log("Updated Cart:", cart);
  }, [cart]); 
  

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
  <Box sx={{ width: 400 }} role="presentation" onClick={toggleDrawer(false)}>
    <List>
      {cart.map((Data, index) => (
        <ListItem key={Data.menu_id} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <img src={Data.image_url} alt={Data.nameENG} width="30" height="30" />
            </ListItemIcon>
            <ListItemText primary={Data.nameENG} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
    <Divider />
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
            <DataContext.Provider value={{Menumane, setMenuname, cart, setCart, addToCart }}>
            {children}
            </DataContext.Provider>
        </div>
       
        </div>
    );
  }
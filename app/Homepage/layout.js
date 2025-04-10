'use client';
import './hompage.css';
import * as React from 'react';
import { useState, useEffect, createContext } from 'react'
import { usePathname } from 'next/navigation';
import { Add, Remove } from '@mui/icons-material';
import { Button } from '@mui/material';
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
    const [error, setError] = useState(null)
  const pathname = usePathname();

  const isSaladPage = pathname.includes('/Homepage/Menu');

  const [ user, setUser] = useState([])
  const [cart, setCart] = useState([]);



  const addToCart = (menu) => {
    setCart(preCart => {
      const checkmenu = preCart.find(i => i.nameENG === menu.nameENG);
      console.log("fgfffff : ",checkmenu)
      if (checkmenu) {
        return preCart.map(i => {
          if (i.nameENG === menu.nameENG) {
            return { ...i, quantity: i.quantity + 1 };
          }
          return i;
        })
      } else {
        return [...preCart, { ...menu, quantity: 1 }]
      }
    })

    console.log("Orde = ", cart);


  }

  // const handleIncrease = (index) => {
  //   console.log(index)
  //   const newCart = [...cart];
  //   newCart[index].quantity += 1;
  //   setCart(newCart);
  // };

  const handleDecrease = (index) => {
    const newCart = [...cart];
    if (newCart[index].quantity > 1) {
      newCart[index].quantity -= 1;
      setCart(newCart);
    } else {
      // ลบออกถ้าเหลือ 0
      newCart.splice(index, 1);
      setCart(newCart);
    }
  };

  const handleCheckBill = () => {
    // ตัวอย่าง: รวมยอดและแสดง log
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.quantity * item.price, 0); // ต้องมี field price

    // alert(`คุณมี ${totalItems} รายการ\nยอดรวม: ${totalPrice.toLocaleString()} บาท`);
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);




  useEffect(() => {
    console.log("Updated Cart:", cart);
  }, [cart]);







  const AddToOrder  = async()=>{
    const order_date = new Date().toISOString();
    const Userid  = user.userId;

    try {
      const res  = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/AddToOrder`,{
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Userid,
          order_date,
          totalPrice,
          cart
        }),
      });
      if (res.ok) {
        const data = await res.json();
        console.log('add order success:', data);
        setCart([])
      } else {
        const errorData = await res.json();
        setError(errorData.error || 'add order fail');
      }


    } catch (error) {
      setError(err.message)
    }
  }



  
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
      <List sx={{ padding: 0 }}>

        <div className='Toplist'>This is Your Order</div>

        {cart.map((Data, index) => (
          <ListItem key={Data.menu_id} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <img src={Data.image_url} alt={Data.nameENG} width="30" height="30" />
              </ListItemIcon>
              <ListItemText primary={Data.nameENG} className="menu-name" />
            </ListItemButton>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, }}>



              {/* ปุ่มเพิ่ม/ลด */}
              <div className='updown'>
                <IconButton onClick={(e) => { e.stopPropagation(); handleDecrease(index); }}>
                  <Remove sx={{ fontSize: '16px' }} />
                </IconButton>
                <div>{Data.quantity}</div>
                <IconButton onClick={(e) => { e.stopPropagation(); addToCart(Data); }}>
                  <Add sx={{ fontSize: '16px' }} />
                </IconButton>
              </div>

              {/* ราคาจะอยู่ขวาสุด */}
              <div className='orderPrice'>
                ฿{Data.price * Data.quantity}
              </div>

            </Box>

          </ListItem>
        ))}
        <div className='buttom-space'>

          <div className="Totalprice">
            <span>Total</span>
            <span>฿{totalPrice.toFixed(2)}</span>
          </div>

          {/* ✅ ปุ่มด้านล่าง */}
          <div className="check-bill-button" onClick={() => {handleCheckBill();AddToOrder()}}>
            เช็คบิล
          </div>

        </div>
      </List>
      <Divider />

    </Box>
  );






  return (
    <div>
      <div className={isSaladPage ? 'Saladpage' : 'homepage'}>
        <div className="TopBox">
          <div className="Logo">
            <h1>My Logo</h1>
          </div>
          <div className='Menubar'>
            <div className='boxitem'>
              <h1>{user.username}</h1>
            </div>
            <div className='boxitem'>
              <h1>Profile</h1>
            </div>
            <div className='boxitem'>
              <IconButton aria-label="cart" onClick={toggleDrawer(true)}>
                <StyledBadge badgeContent={cart.length} color="secondary">
                  <ShoppingCartIcon />
                </StyledBadge>
              </IconButton>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
              </Drawer>
            </div>
          </div>
        </div>
        <DataContext.Provider value={{ user, setUser, cart, setCart, addToCart }}>
          {children}
        </DataContext.Provider>
      </div>

    </div>
  );
}
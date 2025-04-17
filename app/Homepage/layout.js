'use client';
import './hompage.css';
import * as React from 'react';
import { useState, useEffect, createContext } from 'react'
import { usePathname } from 'next/navigation';
import { Add, Delete, Remove } from '@mui/icons-material';
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

  const [user, setUser] = useState([])
  const [add_and_phone, setadd_and_phone] = useState({
    address: '',
    phone: ''
  })

  const [cart, setCart] = useState([]);
  const [showModal, setShowModal] = useState(false);








  const openModal = () => {
    console.log("openmodal");
    setShowModal(true);
  };


  const closeModal = () => {
    // modal.classList.remove('active');
    setShowModal(false);
  }









  const addToCart = (menu) => {
    setCart(preCart => {
      const checkmenu = preCart.find(i => i.nameENG === menu.nameENG);
      console.log("Cheak-Menu : ", checkmenu)
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



  const handleDelete = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1); 
    setCart(newCart);
  };







  const handleCheckBill = () => {

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);

   
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);




  useEffect(() => {
    console.log("Updated Cart:", cart);
  }, [cart]);







  const AddToOrder = async () => {
    const order_date = new Date().toISOString();
    const Userid = user.userId;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/AddToOrder`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Userid,
          order_date,
          totalPrice,
          address: add_and_phone.address,
          phone: add_and_phone.phone,
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







  //----------------------------------------------------------------------------------------------------------------------------------------------------
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




              <div className='updown'>
                <IconButton onClick={(e) => { e.stopPropagation(); handleDecrease(index); }}>
                  <Remove sx={{ fontSize: '16px', color: 'orange' }} />
                </IconButton>
                <div>{Data.quantity}</div>
                <IconButton onClick={(e) => { e.stopPropagation(); addToCart(Data); }}>
                  <Add sx={{ fontSize: '16px', color: 'green' }} />
                </IconButton>
                <IconButton onClick={(e) => { e.stopPropagation(); handleDelete(index); }}>
                  <Delete sx={{ fontSize: '16px', color: 'red' }} />
                </IconButton>
              </div>


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


          {/* <div className="check-bill-button" onClick={() => {handleCheckBill();AddToOrder();openModal()}}> */}
          <div className="check-bill-button" onClick={() => { handleCheckBill(); openModal() }}>
            เช็คบิล
          </div>

        </div>
      </List>
      <Divider />

    </Box>
  );

















  //===================================================================================return==================================================
  return (
    <div>
      <div className={isSaladPage ? 'Saladpage' : 'homepage'}>
        <div className="TopBox">
          <div className="Logo">
            <h1>TAP Salad</h1>
          </div>
          <div className='Menubar'>
            <div className='boxitem'>
              <h1>{user.username}</h1>
            </div>
            <div className='boxitem'>
              <h1>Profile</h1>
            </div>
            <div className='boxitem' >
              <h1>History</h1>
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
        <DataContext.Provider value={{ user, setUser, add_and_phone, setadd_and_phone, cart, setCart, addToCart, showModal, setShowModal, openModal, closeModal ,totalPrice ,AddToOrder}}>
          {children}
        </DataContext.Provider>







      </div>

    </div>
  );
}
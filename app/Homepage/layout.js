'use client';
import './hompage.css';
import * as React from 'react';
import { useState, useEffect, createContext } from 'react'
import { usePathname, useRouter } from 'next/navigation';
import { Add, Delete, Remove } from '@mui/icons-material';
import { isEditable, Button, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import '@fortawesome/fontawesome-free/css/all.min.css';
import CloseIcon from '@mui/icons-material/Close'
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
// import { MoveToInbox as InboxIcon, Mail as MailIcon, ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';




export const DataContext = createContext();


export default function navigationbar({ children }) {

  const router = useRouter();

  const [error, setError] = useState(null)
  const pathname = usePathname();

  const isSaladPage = pathname.includes('/Homepage/Menu');

  const [user, setUser] = useState([])
  const [add_and_phone, setadd_and_phone] = useState({
    address: '',
    phone: ''
  })

  const [cart, setCart] = useState([]);
  const [ordershistory, setOrdershistory] = useState([]);
  
  const [showModal, setShowModal] = useState(false);
  const [showModalhistory, setShowModalhistory] = useState(false);
  const [showModalprofile, setShowModalprofile] = useState(false);
  const [showModalsuccess, setShowModalsuccess] = useState(false);



useEffect(()=>{
// return router.push('/login')
console.log("showModalsuccess",showModalsuccess)
},[showModalsuccess])


  const openModal = () => {
    // console.log("openmodal");
    setShowModal(true);
    setShowModalhistory(false);
    setShowModalprofile(false);
  };


  const closeModal = () => {
    setShowModal(false);
  }

  const openModalhistory = () => {
    // console.log("openmodalhistory");
    setShowModalhistory(true);
    setShowModal(false);
    setShowModalprofile(false);
  };


  const closeModalhistory = () => {
    setShowModalhistory(false);
  }

  function openModalsuccess() {
    setShowModalsuccess(true);
    setTimeout(() => {
        setShowModalsuccess(false);
        closeModal();
        closeModalhistory();
   }, 10000);
}







//---------------------------------------------------------addtocart--------------------------------------------------
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
      handleDelete(index);
    }
  };



  const handleDelete = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };



  // const handleCheckBill = () => {
  //   const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  //   const totalPrice = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
  // };

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
        openModalsuccess();
      } else {
        const errorData = await res.json();
        setError(errorData.error || 'add order fail');
      }
    } catch (error) {
      setError(err.message)
    }
  }






  const checksubmit = async () => {

    if (!add_and_phone.address || !add_and_phone.phone) {
      setError('Please fill in address and phone number');
      return;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(add_and_phone.phone)) {
      setError('Please enter a valid phone number');
      return;
    }

    await AddToOrder();
    setError(null);
    closeModal();
  }









  async function fetchOrderHistory() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Getmenu/history?userId=${user.userId}`);

      if (!res.ok) {
        throw new Error('Failed to fetch order history');
      }

      const orders = await res.json();
      setOrdershistory(orders);
      //   console.log(o)

    } catch (error) {
      console.error('Error:', error);
    }
  }



  useEffect(() => {
    console.log("ordershistory", ordershistory);
  }, [ordershistory]);







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
            <ListItemButton >
              <ListItemIcon>
                <img src={Data.image_url} alt={Data.nameENG} width="30" height="30" />
              </ListItemIcon>
              <ListItemText primary={Data.nameENG} className="menu-name" />
            </ListItemButton>
            <Box sx={{ display: 'flex', alignItems: 'center', }}>
              <div className='updown'>
                <IconButton onClick={(e) => { e.stopPropagation(); handleDecrease(index); }}>
                  <Remove sx={{ fontSize: '14px', color: 'orange' }} />
                </IconButton>
                <div style={{ width: '15px', fontSize: '14px', display: 'flex', alignItems: 'center' }}>{Data.quantity}</div>
                <IconButton onClick={(e) => { e.stopPropagation(); addToCart(Data); }}>
                  <Add sx={{ fontSize: '14px', color: 'green' }} />
                </IconButton>
                <IconButton onClick={(e) => { e.stopPropagation(); handleDelete(index); }}>
                  <Delete sx={{ fontSize: '14px', color: 'red' }} />
                </IconButton>
                <div className='orderPrice'>
                  ฿{Data.price * Data.quantity}
                </div>
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
          <button className="check-bill-button" disabled={cart.length === 0} onClick={() => { openModal() }}>
            เช็คบิล
          </button>

        </div>
      </List>
      <Divider />

    </Box>
  );

















  //===================================================================================return==================================================
  return (
    <div>
      <div className={isSaladPage ? 'Saladpage' : 'homepage'}>
        <div className={isSaladPage ? 'TopBoxSaladpage' : 'TopBoxHomepage'}>
          {/* <div className="TopBox"> */}

          <div className="Logo">
            <i
              className="fas fa-arrow-left text-lg backbutton"
              onClick={() => router.push(isSaladPage ? '/Homepage' : '/Login')}
            ></i>
            {/* <i className="fas fa-arrow-left text-lg backbutton" onClick={() => router.back()}></i> */}
            <h1>TAP Salad</h1>
          </div>
          <div className='Menubar'>
            <div className='boxitem' onClick={() => setShowModalprofile(true)}>
              <h1>Profile</h1>
            </div>
            <div className='boxitem' onClick={async () => { await openModalhistory(); await fetchOrderHistory();}}>
              <h1>History</h1>
            </div>
            {/* <div className='boxitem' onClick={() => openModalsuccess()}>
              <h1>Hissdsdstory</h1>
            </div> */}
            <div className='boxitem'>
              <IconButton aria-label="cart" onClick={toggleDrawer(true)}>
                <StyledBadge badgeContent={cart.length} color="secondary">
                <i className="fas fa-shopping-cart inconcart"></i>


                  
                </StyledBadge>
              </IconButton>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
              </Drawer>
            </div>
          </div>
        </div>
        <DataContext.Provider value={{ user, setUser, add_and_phone, setadd_and_phone, cart, setCart, addToCart, showModal, setShowModal, openModal, closeModal, totalPrice, AddToOrder, showModalhistory, setShowModalhistory, openModalhistory, closeModalhistory, ordershistory, setOrdershistory }}>
          {children}
        </DataContext.Provider>
      </div>






{/* -------------------------------------------------popup-------------------------------------------------------------- */}


      <div id="modal" className={`modal-overlay ${showModal ? 'active' : ''}`}>
        <div className="modal-container">
          <button className="modal-close" onClick={closeModal}>&times;</button>

          <h1 className="modal-title">ข้อมูลการจัดส่ง</h1>
          <div className="form-group">

            <label className="form-label">
              <i className="fas fa-map-marker-alt icon" ></i>
              ที่อยู่จัดส่ง
            </label>

            <textarea
              id="address"
              className="form-textarea"
              rows="3"
              placeholder="กรุณากรอกที่อยู่"
              value={add_and_phone.address || ''}
              required
              onChange={(e) =>
                setadd_and_phone((prev) => ({ ...prev, address: e.target.value }))
              }
            ></textarea>
          </div>
          <div className="form-group">
            <label className="form-label">
              <i className="fas fa-phone-alt icon"></i>
              เบอร์โทรศัพท์
            </label>
            <input
              id="phone"
              type="tel"
              className="form-input"
              placeholder="กรุณากรอกเบอร์โทรศัพท์"
              value={add_and_phone.phone || ''}
              required
              onChange={(e) =>
                setadd_and_phone((prev) => ({ ...prev, phone: e.target.value }))
              }
            />

          </div>

          <div className="order">
            <h3 className="order-title">
              <i className="fas fa-list icon"></i>
              <span className="order-text">รายการอาหารที่สั่ง</span>
            </h3>



            {cart.map((Data, index) => (
              <div className="order-item" key={Data.menu_id}>

                <div>
                  <span>{Data.nameENG}</span>
                  <span style={{ color: 'red', marginLeft: '6px' }}>x {Data.quantity}</span>
                </div>

                <span className="order-item-price">
                  {/* <span>{Data.quantity}</span> */}
                  {/* <div></div> */}
                  <span>{Data.price * Data.quantity} บาท</span>
                </span>
              </div>
            ))}


            <div className="order-total">
              <span>ยอดรวมทั้งสิ้น:</span>
              <span>{totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <div className='err'>
            {error ? <Typography color="error">{error}</Typography> : null}
          </div>
          <div className="button-container">
            <button className="btn btn-cancel" onClick={closeModal}>
              <h3>ยกเลิก</h3>
            </button>
            <button className="btn btn-confirm" onClick={ async () => { await checksubmit();}}>
              <h3>ยืนยันคำสั่งซื้อ</h3>
            </button>
          </div>
        </div>
      </div>













      <div className={`modalhistory ${showModalhistory ? 'active' : ''}`} id="modalhistory">
        <div className="history-container">
          <div className="history-header">
            <div className="history-title">ประวัติการสั่งซื้อของคุณ</div>
            <button className="close-btn" onClick={() => setShowModalhistory(false)}>
              <CloseIcon sx={{ fontSize: '40px' }} />
            </button>
          </div>

          <div className="history-content">
            {ordershistory.map((order, index) => (

              <div className="bill-item" key={index}>
                <div className="bill-header">
                  <div className="bill-date">{order.order_date}</div>
                  <div className="bill-number">บิล #{order.order_id}</div>
                </div>
                <div className="bill-content">
                  <div className="order-items">
                    {order.items.map((item, index) => (
                      <div className="order-item" key={index}>
                        <div className="item-name">
                          <strong>{item.nameENG}</strong>
                          <div className="item-desc">ราคาชิ้นละ {item.unit_price} x {item.quantity}</div>
                        </div>
                        <div className="item-price">฿{item.unit_price * item.quantity}</div>
                      </div>))}

                  </div>
                  <div className="bill-summary">
                    <div className="summary">
                      <div>รวมทั้งสิ้น</div>
                      <div>{order.total_price}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))};
          </div>
        </div>
      </div>





      <div className={`modal-Profile ${showModalprofile ? 'active' : ''}`} role="dialog" aria-modal="true" aria-labelledby="account-settings-title">
  <div className="modal-content">
    <header className='title2'>
      <h1 id="account-settings-title">Account Setting</h1>
      <h2>ข้อมูลของผู้ใช้</h2>
      <button 
        className="close-btn" 
        onClick={() => setShowModalprofile(false)}
        aria-label="Close"
      >
        <CloseIcon style={{ fontSize: '24px' }} />
      </button>
    </header>

    <form className='userdetail'>
      <div className="field-group">
        <TextField
          className='TF-input1'
          label="Username"
          name="username"
          variant="standard"
          value={user.username || ''}
          InputLabelProps={{ 
            shrink: true, 
            sx: { fontSize: '16px', color: '#333' } 
          }}
          disabled={!isEditable}
        />
      </div>

      <div className="field-group">
        <TextField
          className='TF-input1'
          label="Email"
          name="email"
          variant="standard"
          value={user.email || ''}
          InputLabelProps={{ 
            shrink: true, 
            sx: { fontSize: '16px', color: '#333' } 
          }}
          disabled={!isEditable}
        />
      </div>

      <div className="field-group">
        <TextField
          className='TF-input1'
          label="Firstname"
          name="first_name"
          variant="standard"
          value={user.first_name || ''}
          InputLabelProps={{ 
            shrink: true, 
            sx: { fontSize: '16px', color: '#333' } 
          }}
          disabled={!isEditable}
        />
      </div>

      <div className="field-group">
        <TextField
          className='TF-input1'
          label="Lastname"
          name="last_name"
          variant="standard"
          value={user.last_name || ''}
          InputLabelProps={{ 
            shrink: true, 
            sx: { fontSize: '16px', color: '#333' } 
          }}
          disabled={!isEditable}
        />
      </div>

      <div className="field-group">
        <TextField
          className='TF-input1'
          label="Phone"
          name="phone"
          variant="standard"
          value={user.phone || ''}
          InputLabelProps={{ 
            shrink: true, 
            sx: { fontSize: '16px', color: '#333' } 
          }}
          disabled={!isEditable}
        />
      </div>

      <div className="field-group">
        <TextField
          className='TF-input1'
          label="Address"
          name="address"
          variant="standard"
          value={user.address || ''}
          InputLabelProps={{ 
            shrink: true, 
            sx: { fontSize: '16px', color: '#333' } 
          }}
          disabled={!isEditable}
          multiline
          rows={2}
        />
      </div>
    </form>

    <div className='btnLogout'>
      <button 
        className="Logout" 
        onClick={() => router.push('/Login')}
        type="button"
      >
        Logout
      </button>
    </div>
  </div>
</div>






      <div className={`modal-success ${showModalsuccess ? 'active' : ''}`} >
        <div className="success-popup">
            <div className="success-icon"><img src="/img/check-button.png" alt="check"></img></div>
            <div className="success-title">เสร็จสิ้น</div>
            <div className="success-message">การทำรายการของคุณเสร็จสิ้นเรียบร้อย</div>
            <button className="close1-btn" onClick={() => setShowModalsuccess(false)}>ตกลง</button>
        </div>
    </div>



    </div>
  );
}
'use client';
import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import './menu.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import { DataContext } from '../layout';

// import {useSearchParams} from 'next/navigation';



export default function page() {
    const router = useRouter();

    const searchParams = useSearchParams();
    const [type, setType] = useState('');
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);



    const { user, setUser, add_and_phone, setadd_and_phone, cart, setCart, addToCart, showModal, setShowModal, openModal, closeModal, totalPrice ,AddToOrder} = useContext(DataContext);



  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (!storedUser) {
    //   router.push("/login");
    } else {
    //   console.log(JSON.parse(storedUser))
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
  
      setadd_and_phone({
        address: parsedUser.address,
        phone: parsedUser.phone
      });
    }
  }, []);


useEffect(() => {
    console.log("checkadd", add_and_phone)
}, [add_and_phone]);






    useEffect(() => {
        const getType = searchParams.get("type");
        setType(getType);
    }, [searchParams]);


    useEffect(() => {
        if (!type) return;

        const getdatamenu = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Getmenu?type=${type}`);
                if (!res.ok) throw new Error('Failed to fetch data');
                const DataMenu = await res.json();
                setData(DataMenu);
                console.log("Menu-Data = ", DataMenu);
                console.log("user", user)
                console.log("add_and_phone", add_and_phone)
            } catch (err) {
                setError(err.message);
            }
        };

        getdatamenu();
    }, [type]);


    useEffect(() => {
        console.log(data);
    }, [data]);




    //-----------------------------------------------------model-----------------------------------------------------




    // const [showModal, setShowModal] = useState(false);

    // const openModal = () => {
    //     console.log("openmodal");
    //     setShowModal(true);

    // };


    // const closeModal = () => {
    //     modal.classList.remove('active');
    //     setShowModal(false);
    //   }



    return (
        <div className="container">

            {/* <div className="circle"></div>

            <div className="Showimage">
                <img src="/img/Salad.jpg" alt="Tomato Mozzarella Salad" />
            </div> */}


            <div className="contenttitle">
                <div>
                    <h1 className="title">Fresh & Delicious</h1>
                    <h5 className="title1">Healthy ingredients, crafted with care</h5>
                </div>


                <div className="GroupBoxmenu">
                    <div className="BoxMenu" onClick={() => router.push('/Homepage/Menu?type=salad')}>Salad</div>
                    <div className="BoxMenu" onClick={() => router.push('/Homepage/Menu?type=wrap')}>Wrap</div>
                    <div className="BoxMenu" onClick={() => router.push('/Homepage/Menu?type=fried')}>Fried</div>
                    <div className="BoxMenu" onClick={() => router.push('/Homepage/Menu?type=drink')}>Drink</div>
                    <div className="BoxMenu" onClick={() => openModal()}>Drink</div>
                </div>
            </div>

            <div className="carousel">
                <div className='leftBox'>
                    {data.map((datamenu, index) => {
                        return (
                            <div className="Boxmenu" key={datamenu.id || index}>
                                <div className="menuBoximg">
                                    <img src={datamenu.image_url} alt={datamenu.name} className="menu-image" />
                                </div>
                                <div className="menu-details">
                                    <div className="menu-title">{datamenu.nameENG}</div>
                                    <div className="menu-bottom">
                                        <div className="menu-price">{`฿${datamenu.price}`}</div>
                                        <button className="order-button" onClick={() => { addToCart(datamenu) }}>Order</button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>





            {/* <div id="modal" className="modal-overlay"> */}
            <div id="modal" className={`modal-overlay ${showModal ? 'active' : ''}`}>
                <div className="modal-container">
                    <button className="modal-close" onClick={closeModal}>&times;</button>

                    <h1 className="modal-title">ข้อมูลการจัดส่ง</h1>


                    <div className="form-group">
                        <label className="form-label">
                            <div className="form-label-icon">
                                <i className="fas fa-map-marker-alt icon" ></i>


                            </div>
                            ที่อยู่จัดส่ง
                        </label>
                        <textarea
                            id="address"
                            className="form-textarea"
                            rows="3"
                            placeholder="กรุณากรอกที่อยู่"
                            value={add_and_phone.address || user.address || ''}
                            required
                            onChange={(e) =>
                                setadd_and_phone((prev) => ({ ...prev, address: e.target.value }))
                              }
                        ></textarea>
                    </div>


                    <div className="form-group">
                        <label className="form-label">
                            <div className="form-label-icon">
                                <i className="fas fa-phone-alt icon"></i>

                            </div>
                            เบอร์โทรศัพท์
                        </label>
                        <input
                            id="phone"
                            type="tel"
                            className="form-input"
                            placeholder="กรุณากรอกเบอร์โทรศัพท์"
                            value={add_and_phone.phone || user.phone || ''}
                            required
                            onChange={(e) =>
                                setadd_and_phone((prev) => ({ ...prev, phone: e.target.value }))
                              }
                        />
                    </div>

                    <div className="order">
                        <h3 className="order-title">
                            <span className="order-icon">
                            <i className="fas fa-list icon"></i>
                            </span>
                            รายการอาหารที่สั่ง
                        </h3>



                        {cart.map((Data, index) => (
                            <div className="order-item" key={Data.menu_id}>
                                <span>{Data.nameENG} x{Data.quantity}</span>
                                <span className="order-item-price">
                                    <span>{Data.quantity}</span>
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

                  
                    <div className="button-container">
                        <button className="btn btn-cancel" onClick={closeModal}>
                        <h3>ยกเลิก</h3>
                        </button>
                        <button className="btn btn-confirm" onClick={() => {AddToOrder();closeModal()}}>
                            <h3>ยืนยันคำสั่งซื้อ</h3>
                        </button>
                    </div>
                </div>



            </div>


        </div>
    );
}

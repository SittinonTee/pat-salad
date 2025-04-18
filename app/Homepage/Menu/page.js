'use client';
import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import './menu.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import { Typography } from '@mui/material';

import { DataContext } from '../layout';

// import {useSearchParams} from 'next/navigation';



export default function page() {
    const router = useRouter();

    const searchParams = useSearchParams();
    const [type, setType] = useState('');
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);



    const { user, setUser, add_and_phone, setadd_and_phone, cart, setCart, addToCart, showModal, setShowModal, openModal, closeModal, totalPrice, AddToOrder, showModalhistory, setShowModalhistory, openModalhistory, closeModalhistory, ordershistory, setOrdershistory } = useContext(DataContext);
    // const [ordershistory, setOrdershistory] = useState([]);


    useEffect(() => {
        const storedUser = sessionStorage.getItem("user");
        if (!storedUser) {
            //   router.push("/login");
        } else {
            //   console.log(JSON.parse(storedUser))
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);

            setadd_and_phone({
                address: parsedUser.address || '',
                phone: parsedUser.phone || ''
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
        console.log("type", type)
    }, [type]);

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
                    <div
                        className={`BoxMenu ${type === 'salad' ? 'active' : ''}`}
                        onClick={() => router.push('/Homepage/Menu?type=salad')}
                    >
                        Salad
                    </div>

                    <div
                        className={`BoxMenu ${type === 'wrap' ? 'active' : ''}`}
                        onClick={() => router.push('/Homepage/Menu?type=wrap')}
                    >
                        Wrap
                    </div>

                    <div
                        className={`BoxMenu ${type === 'fried' ? 'active' : ''}`}
                        onClick={() => router.push('/Homepage/Menu?type=fried')}
                    >
                        Fried
                    </div>

                    <div
                        className={`BoxMenu ${type === 'drink' ? 'active' : ''}`}
                        onClick={() => router.push('/Homepage/Menu?type=drink')}
                    >
                        Drink
                    </div>

                    {/* <div className="BoxMenu" onClick={() => openModalhistory()}>Drink</div>
                    <div className="BoxMenu" onClick={() => fetchOrderHistory()}>Drink</div> */}
                </div>
            </div>

            <div className="carousel">
                <div className='leftBox'>
                    {data.map((datamenu, index) => {
                        return (
                            <div className="Boxmenushow" key={datamenu.id || index}>
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










        </div>
    );
}

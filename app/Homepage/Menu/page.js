'use client';
import React, { useState, useEffect,useContext } from 'react';
import { useSearchParams } from 'next/navigation';
import './menu.css';

import { DataContext } from '../layout';

// import {useSearchParams} from 'next/navigation';



export default function page() {

    const searchParams = useSearchParams();
    const [type, setType] = useState('');
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);



    const {Menumane, setMenuname, cart, setCart, addToCart} = useContext(DataContext);




    useEffect(() => {
        const getType = searchParams.get("type") ; 
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
            } catch (err) {
                setError(err.message);
            }
        };

        getdatamenu();
    }, [type]);


    useEffect(() => {
        console.log(data);
    }, [data]);



    return (
        <div className="container">
            {/* <!-- วงกลมแรกที่มีจุดศูนย์กลางอยู่ที่มุมขวาล่าง --> */}
            <div className="circle"></div>

            <div className="Showimage">
                <img src="/img/Salad.jpg" alt="Tomato Mozzarella Salad" />
            </div>


            <div className="contenttitle">
                <h1 className="title">Tomato</h1>
                <h1 className="title">Mozzarella</h1>
                <h1 className="title">Salad</h1>
            </div>

            <div className="carousel">
                <div className='leftBox'>
                    {/* <div  className="carousel-items"> */}
                    {data.map((datamenu, index) => {
                        return (
                            <div key={datamenu.id || index} className="Boxmenu">
                                <div className="Menu-name">{datamenu.nameENG}</div>

                                <div className="Menu-Image"><img src={datamenu.image_url} alt={datamenu.name} /></div>
                                
                                <div className="Menu-price">{datamenu.price}</div>

                                <div className='Box-button'>
                                    <div className="order-button" onClick={()=>{addToCart(datamenu)}}>
                                        Order
                                    </div>
                                </div>

                            </div>
                        );
                    })}




                    {/* </div> */}

                </div>




                <div className='rigthBox'>

                </div>

            </div>

        </div>
    );
}

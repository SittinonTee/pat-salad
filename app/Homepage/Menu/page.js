'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import './menu.css';
// import {useSearchParams} from 'next/navigation';



export default function page() {

    const searchParams = useSearchParams();
    const [type, setType] = useState("Salad");
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const getType = searchParams.get("type");
      setType(getType);
    //   if (getType) {
    //     setType(getType);
    //   }
    }, [searchParams]); 





    useEffect(() => {
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
            <div  className="circle"></div>

            <div  className="Showimage">
                <img src="/img/Salad.jpg" alt="Tomato Mozzarella Salad" />
            </div>


            <div  className="contenttitle">
                <h1  className="title">Tomato</h1>
                <h1  className="title">Mozzarella</h1>
                <h1  className="title">Salad</h1>
            </div>

            <div  className="carousel">
                <div className='leftBox'>
                    {/* <div  className="carousel-items"> */}
                    {data.map((datamenu, index) => {
                        return (
                            <div key={datamenu.id || index} className="Boxmenu">
                                <img src={datamenu.image_url || "/api/placeholder/100/100"} alt={datamenu.name} />
                                <div className="Menu-name">{datamenu.name}</div>
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

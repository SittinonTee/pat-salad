'use client';
import React, { useState, useEffect, useContext } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { TextField, Button, Typography, Box, Stack, IconButton, InputAdornment } from '@mui/material'
import './edit.css';
export default function page() {

  const router = useRouter();
  const searchParams = useSearchParams();
  const [type, setType] = useState('');
  const [data, setData] = useState([]);
  // const [datamenu, setDatamenu] = useState([]);

  useEffect(() => {
    const getType = searchParams.get("type");
    setType(getType);
  }, [searchParams]);

  useEffect(() => {
    console.log(data);
  }, [data]);

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


  const [selectedMenu, setSelectedMenu] = useState({
    nameENG: '',
    nameTHAI: '',
    price: '',
    type: '',
    image_url: '',
  });



  return (

    <div className='container'>

      <div className='left'>

        <div className='title'>
          <h1>Salad</h1>
        </div>

        <div className='Boxtitle'>

          <div
            className={`box-item ${type === 'Salad' ? 'active' : ''}`}
            onClick={() => router.push('Editmenu?type=Salad')}
          >
            <h2>Salad</h2>
          </div>

          <div
            className={`box-item ${type === 'wrap' ? 'active' : ''}`}
            onClick={() => router.push('Editmenu?type=wrap')}
          >
            <h2>Wrap</h2>
          </div>

          <div
            className={`box-item ${type === 'Fried' ? 'active' : ''}`}
            onClick={() => router.push('Editmenu?type=Fried')}
          >
            <h2>Fried</h2>
          </div>

          <div
            className={`box-item ${type === 'Drink' ? 'active' : ''}`}
            onClick={() => router.push('Editmenu?type=Drink')}
          >
            <h2>Drink</h2>
          </div>

        </div>

        <div className='gpboxmenu'>

          {data.map((datamenu, index) => {
            return (
              <div key={datamenu.id || index} className="Boxmenu" onClick={() => setSelectedMenu(datamenu)}>

                <div className="Menu-name">{datamenu.nameENG}</div>

                <div className="Menu-Image"><img src={datamenu.image_url} alt={datamenu.name} /></div>

                <div className="Menu-price">{datamenu.price}</div>

              </div>
            );
          })}

        </div>
        {/* <div key={datamenu.id || index} className="Boxmenu">

          <div className="Menu-name">*{datamenu.nameENG}}</div>

          <div className="Menu-Image">{<img src={datamenu.image_url} alt={datamenu.name} />}</div>

          <div className="Menu-price">{{datamenu.price}}</div>

        </div> */}

      </div>

      <div className='right'>

        <div className='titleright'><h1>Pat-Salad</h1></div>

        <div className='UserID'><h1>UserID</h1></div>


            <div className="ImagePreviewArea">

              {selectedMenu.image_url && (
                <div className="Image">

                  <img src={selectedMenu.image_url} alt={selectedMenu.nameENG || "Selected Menu"} />
                </div>

              )}

            </div>


        <form className='EditZone'>

          <TextField
            className='TF-input'
            label="Name_ENG"
            name="NameEng"
            variant="standard"
            value={selectedMenu.nameENG || ''}
            onChange={(e) =>
              setSelectedMenu((prev) => ({ ...prev, nameENG: e.target.value }))
            }
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            className='TF-input'
            label="Name_THAI"
            name="NameThai"
            variant="standard"
            value={selectedMenu.nameTHAI || ''}
            onChange={(e) =>
              setSelectedMenu((prev) => ({ ...prev, nameTHAI: e.target.value }))
            }
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            className='TF-input'
            label="Price"
            name="Price"
            variant="standard"
            value={selectedMenu.price || ''}
            onChange={(e) =>
              setSelectedMenu((prev) => ({ ...prev, price: e.target.value }))
            }
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            className='TF-input'
            label="Type"
            name="Type"
            variant="standard"
            value={selectedMenu.type || ''}
            onChange={(e) =>
              setSelectedMenu((prev) => ({ ...prev, type: e.target.value }))
            }
            InputLabelProps={{ shrink: true }}
          />


          <div className="ButtonGroup">

            <button className="SaveBtn">Deleted</button>

            <button className="SaveBtn">Add</button>

            <button className="SaveBtn">Save</button>

          </div>
        </form>

      </div>

    </div>
  )
}

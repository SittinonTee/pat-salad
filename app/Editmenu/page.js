'use client';
import React, { useState, useEffect, useContext } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { TextField, Button, Typography, Box, Stack, IconButton, InputAdornment ,Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import './edit.css';






export default function page() {

  // const router = useRouter();
  // const searchParams = useSearchParams();
  const [type, setType] = useState('salad');
  const [data, setData] = useState([]);
  const [err, setError] = useState(null);




  const [selectedMenu, setSelectedMenu] = useState({
    menu_id: '',
    nameENG: '',
    nameTHAI: '',
    price: '',
    type: '',
    image_url: '',
  });

  // const [datamenu, setDatamenu] = useState([]);

  // useEffect(() => {
  //   const getType = searchParams.get("type");
  //   setType(getType);
  // }, [searchParams]);

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);



  useEffect(() => {
    if (!type) return;
    // console.log("dddddddd")
    // console.log(type)
    getdatamenu();
  }, [type]);

  //-------------------------------------------------------API-------------------------------------------------

  //-------------------------------------------------------Get-------------------------------------------------
  const getdatamenu = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Getmenu?type=${type}`);
      if (!res.ok) throw new Error('Failed to fetch data');
      const DataMenu = await res.json();
      setData(DataMenu);
      // setFile();
      console.log("Menu-Data = ", DataMenu);
    } catch (err) {
      setError(err.message);
    }
  };


  //-------------------------------------------------------Del------------------------------------------------

  const deletemunu = async () => {
    const menu_id = selectedMenu.menu_id;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Getmenu`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ menu_id }),
    });

    const data = await res.json();
    // console.log(data)


    if (res.ok) {
      ClearData(); 
      getdatamenu();
      openModalsuccess();
      console.log("Delete Success", data);
    } else {
      setError(data.error)
      // console.error("Delete Failed", data.error);
    }

  };

  //-------------------------------------------------------Edit-------------------------------------------------
  const editmenu = async (menuData) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Getmenu`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify({
        //   menu_id: selectedMenu.menu_id,
        //   nameENG: selectedMenu.nameENG,
        //   nameTHAI: selectedMenu.nameTHAI,
        //   price: selectedMenu.price,
        //   type: selectedMenu.type,
        //   image_url: selectedMenu.image_url,
        // }),


        body: JSON.stringify(menuData),
      });


      if (res.ok) {
        ClearData();
        getdatamenu();
        openModalsuccess();
      }

      const data = await res.json();
      console.log("Updated:", data);
      setError(data.error)
    } catch (err) {
      setError(err.message);
      // console.error("Update failed:", err);
    }
  };

  //-------------------------------------------------------Add-------------------------------------------------
  const addmenu = async (menuData) => {

    try {
      console.log("addmenu", menuData);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Getmenu`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(menuData),
      });

      const data = await res.json();
      if (res.ok) {
        ClearData();
        // await getdatamenu();
        openModalsuccess();
      }
      setError(data.error)
    } catch (error) {
      // console.error("Add menu error:", error);
    }
  };





  //-------------------------------------------------------Model-------------------------------------------------
  const [contentModel, setcontentModel] = useState({
    title: '',
    content: '',
    btmshow: '',
  });



  // const deleteBtn = document.getElementById('deleteBtn');
  // const modal = document.getElementById('modal');


  const clickbtn = (title, content, btmshow) => {
    setcontentModel({
      title: title,
      content: content,
      btmshow: btmshow,
    });
    modal.classList.add('active');

    
  }


  // const closeBtn = document.getElementById('closeBtn');
  // const cancelBtn = document.getElementById('cancelBtn');
  // const confirmBtn = document.getElementById('confirmBtn');


  const closeModal = () => {
    modal.classList.remove('active');
  }



  //-======================================================upload img====================================================================================
  //   useEffect(() => {
  //  console.log(file)
  //   },[file])



  const handleModalAction = async (title) => {

    console.log(title)
    if (title === "Delete") {
      console.log(selectedMenu.menu_id)
      await deletemunu(selectedMenu.menu_id);
      // openModalsuccess();

    } else if (title === "Add") {
      // console.log("1")
      await handleUpload("Add");
      // await console.log(updatedMenu)
      // console.log("2")
      // await addmenu();
      // console.log("3")

    } else if (title === "Save") {
      await handleUpload("Save");
      // await editmenu();
    }
    closeModal();
  };


  useEffect(() => {
    setPreview(null);
  }, [selectedMenu.image_url]);


  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setPreview(URL.createObjectURL(file));
    }
    //   setSelectedMenu((prev) => ({
    //     ...prev,
    //     image_url: URL.createObjectURL(file),
    //   }));
    // }
  };

  useEffect(() => {
    console.log("SelectedMenu updated:", selectedMenu);
  }, [selectedMenu]);


  const handleUpload = async (check) => {
    let updatedMenu;
  
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('menuname', selectedMenu.nameENG);
      formData.append('type', selectedMenu.type);
  
      const res = await fetch('/api/Getmenu/upload', {
        method: 'POST',
        body: formData,
      });
  
      const result = await res.json();
  
      if (!res.ok) {
        console.error("Upload failed:", result.message);
        return;
      }
  
      updatedMenu = {
        ...selectedMenu,
        image_url: result.url + `?t=${Date.now()}`,
      };
    } else {
      updatedMenu = {
        ...selectedMenu,
        image_url: selectedMenu.image_url,
      };
    }
  
    // const updatedMenu = {
    //   ...selectedMenu,
    //   image_url: result.url + `?t=${Date.now()}`, // เพิ่ม timestamp
    // };
    console.log("Upload success: ", { check }, updatedMenu);
  
    if (check === "Add") {
      await addmenu(updatedMenu);
      // openModalsuccess();
    } else {
      await editmenu(updatedMenu);
      //  openModalsuccess();
    }
  };
  




  const ClearData = () => {
    setSelectedMenu({
      menu_id: '',
      nameENG: '',
      nameTHAI: '',
      price: '',
      type: '',
      image_url: '',
    });


    setFile(null);
    setPreview(null);
    setError(null);

    // const fileInput = document.getElementById('upload');
    // if (fileInput) {
    //   fileInput.value = '';
    // }
  };




const [showModalsuccess, setShowModalsuccess] = useState(false);

  function openModalsuccess() {
    setShowModalsuccess(true);
    getdatamenu();
    setTimeout(() => {
        setShowModalsuccess(false);
   }, 5000);
}


  //-------------------------------------------------------Return-------------------------------------------------
  return (

    <div className='container'>

      <div className='left'>

        <div className='title'>
          <h1>Salad</h1>
        </div>

        <div className='Boxtitle'>

          <div
            className={`box-item ${type === 'salad' ? 'active' : ''}`}
            onClick={() => setType('salad')}
          >
            <h2>Salad</h2>
          </div>

          <div
            className={`box-item ${type === 'wrap' ? 'active' : ''}`}
            onClick={() => setType('wrap')}
          >
            <h2>Wrap</h2>
          </div>

          <div
            className={`box-item ${type === 'fried' ? 'active' : ''}`}
            onClick={() => setType('fried')}
          >
            <h2>Fried</h2>
          </div>

          <div
            className={`box-item ${type === 'drink' ? 'active' : ''}`}
            onClick={() => setType('drink')}
          >
            <h2>Drink</h2>
          </div>
        </div>

        <div className='gpboxmenu'>
          {data.map((datamenu, index) => {
            return (
              <div key={datamenu.id || index} className="Boxmenu" onClick={() => {
                setSelectedMenu(datamenu);
              }}>
                <div className="Menu-name">{datamenu.nameENG}</div>
                <div className="Menu-Image"><img src={datamenu.image_url||"/img/question-mark.png"} alt={datamenu.name} /></div>
                <div className="Menu-price">{datamenu.price}</div>
              </div>
            );
          })}

        </div>
      </div>



      <div className='right'>
        <div className='titleright'><h1>Pat-Salad</h1></div>
        <div className='UserID' ><h1><a href={`../Login`} className="signup">Logout</a></h1></div>
        <div className="ImagePreviewArea">
          {(preview || selectedMenu.image_url) && (
            <div className="Image">
              <img
                src={preview || selectedMenu.image_url||"/img/question-mark.png"}
                alt={selectedMenu.nameENG || "Selected Menu"}
              />
            </div>
          )}
        </div>
        <div className="ImageChoose_ImageArea">
          <label htmlFor="upload" className="choose_image">
            choose image
          </label>
          <input
            id="upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <button
            className="clearBtn"
            onClick={ClearData}
          >
            Clear
          </button>
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
          // InputLabelProps={{ shrink: true }}
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
          // InputLabelProps={{ shrink: true }}
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
          // InputLabelProps={{ shrink: true }}
          />
          <FormControl variant="standard" className='TF-input'>
            <InputLabel id="type-label">Type</InputLabel>
            <Select
              labelId="type-label"
              value={selectedMenu.type || ''}
              onChange={(e) =>
                setSelectedMenu((prev) => ({ ...prev, type: e.target.value }))
              }
            >
              <MenuItem value="salad">Salad</MenuItem>
              <MenuItem value="wrap">Wrap</MenuItem>
              <MenuItem value="fried">Fried</MenuItem>
              <MenuItem value="drink">Drink</MenuItem>
            </Select>
          </FormControl>



          <div className='err'>
            {err ? <Typography color="error">{err}</Typography> : null}
          </div>
        </form>
        <div className="ButtonGroup">
          <button
            className="Btn DeleteBtn"
            id="BtnDeleteBtn"
            disabled={!selectedMenu || selectedMenu.nameENG === '' || selectedMenu.nameTHAI === '' || selectedMenu.price === '' || selectedMenu.type === ''}
            onClick={() => clickbtn("ยืนยันการลบ", `แน่ใจไหมว่าต้องการลบรายการ  ${selectedMenu.nameENG}`, "Delete")
            }
          >
            Delete
          </button>
          <button
            className="Btn AddBtn"
            id="BtnAddBtn"
            disabled={!selectedMenu || selectedMenu.nameENG === '' || selectedMenu.nameTHAI === '' || selectedMenu.price === '' || selectedMenu.type === ''}
            onClick={() => clickbtn("เพิ่มเมนูใหม่", `ต้องการเพิ่มรายการ ${selectedMenu.nameENG} ไหม`, "Add")
            }
          >
            Add
          </button>
          <button
            className="Btn SaveBtn"
            id="BtnSaveBtn"

            disabled={!selectedMenu || selectedMenu.nameENG === '' || selectedMenu.nameTHAI === '' || selectedMenu.price === '' || selectedMenu.type === ''}
            onClick={() => clickbtn("บันทึกข้อมูล", `ยืนยันการแก้ไขเมนู ${selectedMenu.nameENG}`, "Save")}
          >
            Edit
          </button>
        </div>
      </div>



      <div id="modal" className="modal-overlay">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title">{contentModel.title}</h2>
            <button className="close-button" id="closeBtn" onClick={closeModal}>&times;</button>
          </div>
          <div className="modal-body">
            <p>{contentModel.content}</p>
          </div>
          <div className="modal-footer">
            <button className="cancelBtn" id="cancelBtn" onClick={closeModal}>cancel</button>
            <button className="confirmBtn" id="confirmBtn" onClick={() => handleModalAction(contentModel.btmshow)}>{contentModel.btmshow}</button>
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




  )
}

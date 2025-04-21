import { NextResponse } from "next/server";
import { mysqlPool } from "@/utils/db";
// import {useSearchParams} from 'next/navigation';

const db = mysqlPool.promise()


export async function GET(Request){
    try{
        const url = new URL(Request.url);
        const type = url.searchParams.get('type'); 

        console.log(type)
        const [data] = await db.query(
            `SELECT * FROM menu WHERE type IN (?)`, [type]
        )
        // console.log(data)
        return NextResponse.json(data, {status: 200})
    }catch(error){
        return NextResponse.json({error:"Failed to fetch"}, {status: 500})
    }

}



export async function DELETE(request) {

try {
    const {menu_id} = await request.json();
    console.log(menu_id)
    const [result] = await db.query(
        `DELETE FROM menu WHERE menu_id = ?`, [menu_id]
    );
    if(result.affectedRows === 0){
        return NextResponse.json({error:"Menu not found"}, {status:404})
    }

    return NextResponse.json({message:"Delete Success"}, {status:200})

} catch (error) {
    return NextResponse.json({error:"delete Failed"}, {status: 500})
}
}



export async function PUT(request){
    try {
        const {menu_id, nameENG, nameTHAI, price, type, image_url} = await request.json();
        // console.log(menu_id, nameENG, nameTHAI, price, type, image_url)
        console.log(image_url)
        const [result] = await db.query(
            'UPDATE menu SET nameTHAI=?, nameENG=?, price=?, type=?, image_url=? WHERE menu_id = ?',[nameTHAI, nameENG, price, type, image_url, menu_id]
        );
        if (result.affectedRows == 0){
            return NextResponse.json({error: "Menu not found"}, {status: 404});
        }
        return NextResponse.json({message: "Updated", menu_id}, {status: 200});
    } catch (error){
        return NextResponse.json({error: error}, {status: 500})
    }
}



export async function POST(request) {
    try {
      const { menu_id, nameENG, nameTHAI, price, type, image_url } = await request.json();
      console.log(menu_id, nameENG, nameTHAI, price, type, image_url);
  
      const [existing] = await db.query(
        'SELECT menu_id FROM menu WHERE menu_id = ?',
        [menu_id]
      );
  
      if (existing.length > 0) {
        return NextResponse.json(
          { error: "Menu ID already exists", menu_id: existing[0].menu_id } ,{ status: 404 }
        );
      }
  
      const [result] = await db.query(
        'INSERT INTO menu (nameTHAI, nameENG, price, type, image_url) VALUES (?, ?, ?, ?, ?)',
        [nameTHAI, nameENG, price, type, image_url]
      );
  
      return NextResponse.json({ message: "Added", menu_id: result.insertId }, { status: 200 });
  
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
  
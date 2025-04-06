import { NextResponse } from "next/server";
// import bcrypt from 'bcryptjs';
import { mysqlPool } from "@/utils/db";
// import { useRouter } from 'next/router';


const db = mysqlPool.promise();

export async function POST(request) {
  try {

    const { username, email, fname, lname, password, phone, address } = await request.json();


    const [existingUser] = await db.query('SELECT * FROM user WHERE username = ? OR email = ?', [username, email]);
    if (existingUser.length > 0) {
      return NextResponse.json({ error: 'Username or Email already exists' }, { status: 400 });
    }


    // const hashedPassword = await bcrypt.hash(password, 10);


    const [result] = await db.query(
      `INSERT INTO user (username, first_name, last_name, phone, address, email, password) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [username, fname, lname, phone,  address ,email,  password ]
    );


    // return NextResponse.json(
    //   {
    //     id: result.insertId,
    //     username,
    //     email,
    //     fname,
    //     lname,
    //     phone,
    //     address
    //   },
    //   { status: 200 }
    // );


    return NextResponse.json(
        { success:true},{status:200}
    )
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

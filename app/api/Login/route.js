import { NextResponse } from "next/server";
import { mysqlPool } from "@/utils/db";
// import bcrypt from 'bcryptjs';






export async function POST(request) {
  try {
    const { username, password } = await request.json();
    const db = mysqlPool.promise();

    const [Checkuser] = await db.query("SELECT * FROM user WHERE username = ?", [username]);


    if (Checkuser.length === 0) {
      return NextResponse.json({ error: "Username or password is incorrect" }, { status: 401 });
    }

    // console.log("ddddd +",Checkuser)
    const user = Checkuser[0];
    console.log("c + ",user)

    if (!(password === user.password)) {
      return NextResponse.json({ error: "Password is incorrect" }, { status: 401 });
    }


    return NextResponse.json({
      message: "successful",
      userId: user.user_id,
      username: user.username,
      type: user.type,
      phone: user.phone,
      address: user.address,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

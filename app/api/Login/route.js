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

    const user = Checkuser[0];


    console.log("c + ",user)

    const isPasswordCorrect = (password === user.password);




    if (!isPasswordCorrect) {
      return NextResponse.json({ error: "Username or password is incorrect" }, { status: 401 });
    }


    return NextResponse.json({
      Sentstatus: true,
      message: "successful",
      userId: user.id,
      username: user.username
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

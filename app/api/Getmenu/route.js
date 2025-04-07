import { NextResponse } from "next/server";
import { mysqlPool } from "@/utils/db";
// import {useSearchParams} from 'next/navigation';

const db = mysqlPool.promise()


export async function GET(Request){
    try{
        const url = new URL(Request.url);
        const type = url.searchParams.get('type'); 

        console.log(type)
        const [data, fields] = await db.query(
            `SELECT * FROM menu WHERE type IN (?)`, [type]
        )
        return NextResponse.json(data, {status: 200})

    }catch(error){
        return NextResponse.json({error:"Failed to fetch"}, {status: 500})
    }

}
import { NextResponse } from "next/server";
import { mysqlPool } from "@/utils/db";

const db = mysqlPool.promise();

export async function POST(request) {
    try {
        const { Userid, order_date, totalPrice, cart, address, phone } = await request.json();

        const date = new Date(order_date);
        const thaiMonths = [
            "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
            "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
        ];

        const day = date.getDate();
        const month = thaiMonths[date.getMonth()];
        const year = date.getFullYear() + 543; 
        const hour = date.getHours().toString().padStart(2, '0');
        const minute = date.getMinutes().toString().padStart(2, '0');

        const dateformat = `${day} ${month} ${year} เวลา ${hour}:${minute} น.`;

        // console.log(formatted);

        console.log("Userid:", address, phone);
        const [result] = await db.query(
            'INSERT INTO `order` (user_id, order_date, total_price, address, phone) VALUES (?, ?, ?, ?, ?)',
            [Userid, dateformat, totalPrice, address, phone]
        );

        await addOrderDetail(cart, result.insertId, totalPrice);

        return NextResponse.json({ result });
    } catch (error) {
        // console.error("Error in POST /api/AddToOrder:", error);  
        return NextResponse.json({ error: `Failed to insert order: ${error.message}` }, { status: 500 });
    }
}

async function addOrderDetail(cart, orderId, totalPrice) {
    try {
        const orderDetails = cart.map(item => [
            orderId,
            item.menu_id,
            item.quantity,
            item.price,
            totalPrice
        ]);

        if (orderDetails.length === 0) {
            throw new Error("Cart is empty.");
        }

        const [orderDetailResult] = await db.query(
            `INSERT INTO order_detail (order_id, menu_id, quantity, unit_price, total_price) VALUES ?`,
            [orderDetails]
        );

        console.log("Order details inserted:", orderDetailResult);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

import { NextResponse } from "next/server";
import { mysqlPool } from "@/utils/db";

const db = mysqlPool.promise();

export async function POST(request) {
    try {
        const { Userid, order_date, totalPrice, cart } = await request.json();

        const [result] = await db.query(
            'INSERT INTO `order` (user_id, order_date, total_price) VALUES (?, ?, ?)', 
            [Userid, order_date, totalPrice]
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

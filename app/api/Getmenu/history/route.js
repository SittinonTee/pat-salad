
import { NextResponse } from "next/server";
import { mysqlPool } from "@/utils/db";

const db = mysqlPool.promise();

export async function GET(request) {
    try {

        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

        console.log("userId:", userId);


        if (!userId) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        console.log("Fetching order for user:", userId);

        const [orders] = await db.query(
            "SELECT * FROM `order` WHERE user_id = ?", [userId]
        );

        if (!orders || orders.length === 0) {
            return NextResponse.json([], { status: 200 });
        }

        const ordersWithDetails = await Promise.all(
            orders.map(async (order) => {
                const details = await getOrderDetails(order.order_id);
                return {
                    ...order,
                    items: details
                };
            })
        );

        return NextResponse.json(ordersWithDetails, { status: 200 });

    } catch (error) {
        console.error("Error fetching order history:", error);
        return NextResponse.json({ error: "Failed to fetch order history" }, { status: 500 });
    }
}

const getOrderDetails = async (orderId) => {
    try {
        const [menuItems] = await db.query(
            `SELECT TOrder.*, menu.nameENG 
            FROM order_detail AS TOrder 
            JOIN menu ON TOrder.menu_id = menu.menu_id 
            WHERE TOrder.order_id = ?`, [orderId]
        );
        return menuItems;
    } catch (error) {
        console.error("Error fetching order details:", error);
        throw error;
    }
};
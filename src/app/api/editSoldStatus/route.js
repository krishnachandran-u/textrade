import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import useServerSession from "@/lib/auth";

export async function POST(req) {
    const session = await useServerSession(req)
    try {
        const { productId,sellerName } = await req.json();
        console.log(productId,sellerName)
        if(!session){
            console.log("You must be signed in to edit mark as paid.")
            return new NextResponse(JSON.stringify({ message: "You must be signed in to edit mark as paid." }), { status: 401 })
        }
        if(session.user.username!== username){
            return new NextResponse(JSON.stringify({ message: "You can only view your own cart." }), { status: 403 })
        }

        await prismadb.products.update({
            where: { id: productId },
            data: {
                sold: true,
            },
        });

        return new NextResponse(JSON.stringify({ message: "Successfully marked product as sold" }), { status: 200 })

    }
    catch (error) {
        return new NextResponse(JSON.stringify({ error: error }), { status: 500 })
    }
}
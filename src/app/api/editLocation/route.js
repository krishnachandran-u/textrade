import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { productId, newLocation } = await req.json();

        const existingProduct = await prismadb.products.findUnique({
            where: { id: productId },
        });

        if (!existingProduct) {
            return new NextResponse(JSON.stringify({ error: `Product with ID ${productId} not found.` }), { status: 404 })
        }

        const updatedProduct = await prismadb.products.update({
            where: { id: productId },
            data: {
                location: newLocation,
            },
        });

        return new NextResponse(JSON.stringify({ message: "success" }), { status: 200 })

    }
    catch (error) {
        return new NextResponse(JSON.stringify({ error: error }), { status: 500 })
    }
}
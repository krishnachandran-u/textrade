import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const url = new URL(req.url)
        const productId = url.searchParams.get('productId')

        const product = await prismadb.products.findUnique({
            where: {
              id: productId,
            },
            select: {
              name: true,
              price: true,
              location: true,
              sellerId: true,
              images: {
                select: {
                  url: true,
                },
              },
            },
          });

        if (product) {
            return new NextResponse(JSON.stringify(product), { status: 200 })
        }
        else {
            return new NextResponse(JSON.stringify({ message: `Product with name "${productName}" not found.` }), { status: 404 })
        }
    }
    catch (error) {
        return new NextResponse(JSON.stringify({ error: error }), { status: 500 })
    }
}
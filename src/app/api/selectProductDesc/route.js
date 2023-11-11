import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req){
    try {
        const url = new URL(req.url);
        const productId = url.searchParams.get("productId");

        const productDetails = await prismadb.products.findUnique({
            where: {
              id: productId,
            },
            select: {
              name: true,
              description: true,
            },
          });

        if (productDetails) {
            return new NextResponse(JSON.stringify(productDetails),{status:200})
        }
        else {
            return new NextResponse(JSON.stringify({message:`Product with ID ${productId} not found.`}),{status:404})
        }
    }
    catch (error) {
        return new NextResponse(JSON.stringify({error:error}),{status:500})
    }
}
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server"

export async function GET(req) {
    try {

        const url = new URL(req.url);
        const skip = url.searchParams.get("skip");
        const take = url.searchParams.get("take");

        const products = await prismadb.products.findMany({
			
            select: {
                name: true,
                price: true,
                description: true,
                location: true,
                seller: {
                    select: {
                        username: true,
                    },
                },
                images: {
                    select: {
                        url: true,
                    },
                },
            },
				skip : parseInt(skip),
				take : parseInt(take),
        });

        const obj = {};
        obj["data"] = products;

        return new NextResponse(JSON.stringify(obj), { status: 200 })
    }
    catch (error) {
        return new NextResponse(JSON.stringify({ error: error }), { status: 500 })
    }
}
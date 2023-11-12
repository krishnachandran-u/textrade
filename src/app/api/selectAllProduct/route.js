import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server"

export async function GET(req) {
    try {

        const url = new URL(req.url);
        const skip = url.searchParams.get("skip");
        const take = url.searchParams.get("take");
        let search = url.searchParams.get("search");
        search = search == null ? "" : search;

        const products = await prismadb.products.findMany({
            where: {
                OR: [
                    { name: { contains: search, mode: "insensitive" } },
                    { description: { contains: search, mode: "insensitive" } },
                ],
            },
            select: {
                name: true,
                price: true,
                description: true,
                location: true,
                seller: {
                    select: {
                        username: true,
                        profile_pic: true,
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

        const obj = products;

        return new NextResponse(JSON.stringify(obj), { status: 200 })
    }
    catch (error) {
        return new NextResponse(JSON.stringify({ error: error }), { status: 500 })
    }
}
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server"

export async function POST(req) {
    try {
        const { username, categoryname, name, price, description, location, imageUrls } = await req.json();

        const user = await prismadb.users.findUnique({
            where: {
                username: username,
            },
        });

        if (!user) {
            return new NextResponse(JSON.stringify({ message: `User '${username}' not found` }), { status: 404 })
        }

        const category = await prismadb.categories.findUnique({
            where: {
                name: categoryname,
            },
        });

        if (!category) {
            return new NextResponse(JSON.stringify({ message: `Category '${categoryname}' not found` }), { status: 404 })
        }

        const newProduct = await prismadb.products.create({
            data: {
                name,
                price,
                description,
                location,
                category: {
                    connect: { id: category.id },
                },
                seller: {
                    connect: { id: user.id },
                },
            },
        });

        for (const imageUrl of imageUrls) {
            await prismadb.images.create({
                data: {
                    url: imageUrl,
                    productId: newProduct.id,
                },
            });
        }

        return new NextResponse(JSON.stringify({ message: `Created a new product '${newProduct.name}' for seller '${user.username}' in category '${category.name}'.` }), { status: 201 })

    }
    catch (error) {
        return new NextResponse(JSON.stringify({ error: error }), { status: 500 })
    }
}
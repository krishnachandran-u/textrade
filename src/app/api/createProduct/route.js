import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server"
import useServerSession from "@/lib/auth";
import checkProfileComplete from "@/lib/checkProfileComplete";

export async function POST(req) {
    const session = await useServerSession(req)
    if(!session){
        return new NextResponse(JSON.stringify({ message: "You must be signed in to create a product." }), { status: 401 })
    }
    try {
        const { categoryname, name, price, description, imageUrls } = await req.json();

        const user = await prismadb.users.findUnique({
            where: {
                id: session.user.id,
            },
            select: {
                id: true,
                profile_pic: true,
                username: true,
                phoneNo: true,
                email: true,
                name: true,
                verified: true,
                branchId: true,
                collegeId: true,
            },
        });
    
        if (!user) {
            return new NextResponse(JSON.stringify({ message: `User '${username}' not found` }), { status: 404 })
        }
        if(!await checkProfileComplete(user)){
            return new NextResponse(JSON.stringify({ message: "You must complete your profile to create a product." }), { status: 403 })
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
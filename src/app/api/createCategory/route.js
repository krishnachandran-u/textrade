//API request
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { categoryName } = await req.json();

        const existingCategory = await prismadb.categories.findUnique({
            where: { name: categoryName },
        });

        if (existingCategory) {
            return new NextResponse(JSON.stringify({ message: "Category with the same name already exists" }), { status: 400 })
        }

        await prismadb.categories.create({
            data: {
                name: categoryName,
            },
        });

        return new NextResponse(JSON.stringify({ message: "Categories created successfully" }), { status: 201 })
    }
    catch (error) {
        return new NextResponse(JSON.stringify({ error: error }), { status: 500 })
    }
}

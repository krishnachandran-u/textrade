import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const {username} = await req.json()

        const existingUser = await prismadb.users.findUnique({
            where: { username:username},
        });

        if (!existingUser) {
            return new NextResponse(JSON.stringify({ message: `User with username ${username} not found.` }), { status: 404 })
        }

        const userProducts = await prismadb.products.findMany({
            where: {
              seller: {
                username: username,
              },
            },
            select: {
              id: true,
              name: true,
              price: true,
              images:{
                select:{
                  url:true,
                }
              },
              seller: {
                select: {
                  username: true,
                  profile_pic: true,
                },
              },
              description: true,
              sold: true,
            },
          });          
        return new NextResponse(JSON.stringify(userProducts), { status: 200 })
    }
    catch (error) {
        return new NextResponse(JSON.stringify({ error: error }), { status: 500 })
    }
}
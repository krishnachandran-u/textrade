import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req){
    try {
        const {username} = await req.json();

        const user = await prismadb.users.findUnique({
            where: {
              username: username,
            },
            select: {
              password : true,
            },
          });

        if (user) {
            return new NextResponse(JSON.stringify(user),{status:200})
        }
        else {
            return new NextResponse(JSON.stringify({message:`User with username ${username} not found.`}),{status:404})
        }          

    }
    catch (error) {
        return new NextResponse(JSON.stringify({error:error}),{status:500})
    }
}
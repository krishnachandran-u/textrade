import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server"

export async function POST(req) {
    try {
        const { collegeName } = await req.json();

        const existingCollege = await prismadb.colleges.findUnique({
            where: {
              name: collegeName,
            },
          });

        if (existingCollege) {
            return new NextResponse(JSON.stringify({message:"College exists"}),{status:200})
        }

        const newCollege = await prismadb.colleges.create({
            data: {
              name: collegeName,
            },
          });

        return new NextResponse(JSON.stringify({message:`Created a new college with name: ${newCollege.name}`}),{status:201})

    }
    catch (error) {
        return new NextResponse(JSON.stringify({error:error}),{status:500})
    }
}
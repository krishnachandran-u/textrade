import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server"

export async function POST(req) {
    try {
        const { collegeName, branchName } = await req.json();

        const college = await prismadb.colleges.findUnique({
            where: {
              name: collegeName,
            },
          });

        if (!college) {
        return new NextResponse(JSON.stringify({message:"College doesn't exists"}),{status:404})
        }

        const newBranch = await prismadb.branches.create({
            data: {
              name: branchName,
              colleges: {
                connect: { id: college.id },
              },
            },
          });

        return new NextResponse(JSON.stringify({message:`New branch '${newBranch.name}' for college '${college.name}' created.`}),{status:201})
    }
    catch (error) {
        return new NextResponse(JSON.stringify({error:error}),{status:500})
    }
}
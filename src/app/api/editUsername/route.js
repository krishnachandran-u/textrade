import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { usernameToUpdate, updatedName  } = await req.json();

        const existingUser = await prismadb.users.findUnique({
            where: { username: usernameToUpdate },
          });

          if (!existingUser) {
            return new NextResponse(JSON.stringify({ error: `User with username ${usernameToUpdate} not found.` }), { status: 404 })
          }
          const updatedUser = await prismadb.users.update({
            where: { username: usernameToUpdate },
            data: {
              name: updatedName,
            },
          });

        return new NextResponse(JSON.stringify({ message: "success" }), { status: 200 })

    }
    catch (error) {
        return new NextResponse(JSON.stringify({ error: error }), { status: 500 })
    }
}
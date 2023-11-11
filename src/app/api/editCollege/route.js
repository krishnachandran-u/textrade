import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { username, collegeId, branchId } = await req.json();

        const user = await prismadb.users.findUnique({
            where: {
                username: username,
            },
        });

        if (!user) {
            return new NextResponse(JSON.stringify({ error: `User with username ${username} not found.` }), { status: 404 })
        }

        const college = await prismadb.colleges.findUnique({
            where: {
                id: collegeId,
            },
        });

        if (!college) {
            return new NextResponse(JSON.stringify({ error: `College with ID ${collegeId} not found.` }), { status: 404 })
        }

        const branch = await prismadb.branches.findUnique({
            where: {
                id: branchId,
            },
        });

        if (!branch) {
            return new NextResponse(JSON.stringify({ error: `Branch with ID ${branchId} not found.` }), { status: 404 })
        }

        const updatedUser = await prismadb.users.update({
            where: {
                id: user.id,
            },
            data: {
                collegeId: collegeId,
                branchId: branchId,
            },
        });

        return new NextResponse(JSON.stringify({ message: "success" }), { status: 200 })

    }
    catch (error) {
        return new NextResponse(JSON.stringify({ error: error }), { status: 500 })
    }
}
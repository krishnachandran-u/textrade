import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {

        const { username, name, note, location, collegeId, branchName, profile_pic } = await req.json();

        const existingBranch = await prismadb.branches.findUnique({
            where: { name: branchName }, // Use appropriate condition based on your data model
        });

        if (!existingBranch) {
            // Handle the case where the branch doesn't exist
            return new NextResponse(
                JSON.stringify({ error: `Branch with name ${branchName} not found.` }),
                { status: 404 }
            );
        }

        const editedProfile = await prismadb.users.update({
            where: { username: username },
            data: {
                name: name,
                note: note,
                location: location,
                college: { connect: { id: collegeId } },
                branch: { connect: { name: branchName } }, // Change branchId to branchName
                profile_pic: profile_pic,
            },
        });

        if (editedProfile) {
            return new NextResponse(JSON.stringify({ message: "User profile edited" }), { status: 200 })
        } else {
            return new NextResponse(JSON.stringify({ message: "Unable to edit user profile" }), { status: 500 })
        }
    }
    catch (error) {
        return new NextResponse(JSON.stringify({ error: error }), { status: 500 })
    }
}

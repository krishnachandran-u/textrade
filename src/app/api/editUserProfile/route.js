import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import useServerSession from "@/lib/auth";
import { hash } from "bcryptjs";

export async function POST(req) {
    const session = await useServerSession(req)
    if(!session){
        console.log("You must be signed in to edit profile.")
        return new NextResponse(JSON.stringify({ message: "You must be signed in to edit profile." }), { status: 401 })
    }
    try {

        const { name,username, note, location, college, branch, profile_pic, phoneNo,password } = await req.json();

        let editedProfile = await prismadb.users.update({
            where: { username: username },
            data: {
                name: name,
                note: note,
                phoneNo: phoneNo,
                location: location,
                college: { connect: { name: college} },
                branch: { connect: { name: branch} }, 
                profile_pic: profile_pic,
            },
        });
        if (password && password.trim() !== '') {
            updateData.password = await hash(password, 10),
            editedProfile = await prismadb.users.update({
            where: { username: username },
            data: updateData,
            });
        }

        if (editedProfile) {
            return new NextResponse(JSON.stringify({ message: "User profile edited",editedProfile:editedProfile }), { status: 200 })
        } else {
            return new NextResponse(JSON.stringify({ message: "Unable to edit user profile" }), { status: 500 })
        }
    }
    catch (error) {
        return new NextResponse(JSON.stringify({ error: error }), { status: 500 })
    }
}

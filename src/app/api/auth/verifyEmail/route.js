import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req){
  const {email, token} = await req.json()
  try{
    await prismadb.users.update({
      where: {
        email: email,
        activationKey: token,
        activationSentAt: {
          gt: new Date(Date.now() - 24 * 60 * 60 * 1000)
        }
      },
      data: {
        activationKey: null,
        verified: true,
      }
    })
    return new NextResponse(JSON.stringify({message:"User verified successfully"}),{status: 201})
  }catch(error){
    return new NextResponse(JSON.stringify({message:"Server Error"}),{status: 500})
  }
}
import { NextResponse } from "next/server"
import prismadb from "@/lib/prismadb"
import { hash } from "bcryptjs"

// api than accept a post request to register a user
export async function POST(req){
  try{
    const {name,username, email, password, department, year} = await req.json()
    //Check if user already exists
    const user = await prismadb.Users.findUnique({
        where: {
          email: email
        },
    })
    if(user && user.verified) {
      return new NextResponse(JSON.stringify({message:"User already exists"}),{status: 208})
    }
    else if(user && !user.verified){
      return new NextResponse(JSON.stringify({message:"User already exists but not activated"}),{status: 207})
    }
    //Create user
    await prismadb.user.create({
      data:{
        name: name,
        user_name: username,
        email:email,
        department: department,
        year: Number(year),
        password: await hash(password, 10)
      }
    })
    return new NextResponse(JSON.stringify({message:"User created successfully"}),{status: 201})
  }
  catch(error){
    return new NextResponse(JSON.stringify({error:error}),{status: 500})
  }
}
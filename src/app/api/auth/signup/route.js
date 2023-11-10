import { NextResponse } from "next/server"
import prismadb from "@/lib/prismadb"
import { hash } from "bcryptjs"

// api than accept a post request to register a user
export async function POST(req){
  try{
    const {name, username, email, password, college} = await req.json()
    //Check if user already exists
    const user = await prismadb.Users.findFirst({
        where: {
          OR:[
            {email: email},
            {username: username}
          ]
        },
    })
    if(user && user?.verified && user?.email == email && user?.username == username) {
      return new NextResponse(JSON.stringify({message:"User already exists"}),{status: 208})
    }
    else if(user && !user?.verified && user?.email == email && user?.username == username){
      return new NextResponse(JSON.stringify({message:"User already exists but not activated"}),{status: 207})
    }
    else if(user && user?.email == email){
      return new NextResponse(JSON.stringify({message:"User already exist with this email"}),{status: 209})
    }
    else if(user && user?.username == username){
      return new NextResponse(JSON.stringify({message:"Username already taken"}),{status: 210})
    }
    //Create user
    await prismadb.users.create({
      data:{
        name: name,
        username: username,
        email: email,
        college: {
          connect: {
            name: college,
          }
        },
        password: await hash(password, 10)
      }
    })
    return new NextResponse(JSON.stringify({message:"User created successfully"}),{status: 201})
  }
  catch(error){
    return new NextResponse(JSON.stringify({error:error}),{status: 500})
  }
}
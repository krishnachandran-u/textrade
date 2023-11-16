import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import useServerSession from "@/lib/auth";

export async function POST(req) {
  const session = await useServerSession(req)
    try {
        const {cartId} = await req.json()
        if(!session){
            console.log("You must be signed in to fetch cart products.")
            return new NextResponse(JSON.stringify({ message: "You must be signed in to fetch cart products." }), { status: 401 })
        }
        if(session.user.cartId!== cartId){
            return new NextResponse(JSON.stringify({ message: "You can only view your own cart." }), { status: 403 })
        }

        const cart = await prismadb.cart.findUnique({
            where: {
              id: cartId,
            },
            include:{
              products:{
                select:{
                  id:true,
                  name:true,
                  price:true,
                  sold:true,
                  description:true,
                  images:{
                      select:{
                        url:true
                      },
                  },
                  seller:{
                    select:{
                      username:true,
                      name:true,
                      profile_pic:true,
                    }
                  }
                },
              }
            }
          });          
        return new NextResponse(JSON.stringify(cart), { status: 200 })
    }
    catch (error) {
        return new NextResponse(JSON.stringify({ error: error }), { status: 500 })
    }
}
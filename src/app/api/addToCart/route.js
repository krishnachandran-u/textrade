import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import useServerSession from "@/lib/auth";

export async function POST(req) {
  const session = await useServerSession(req)
    try {
        const {cartId,productId} = await req.json()
        if(!session){
            console.log("You must be signed in to modity cart products.")
            return new NextResponse(JSON.stringify({ message: "You must be signed in to add to cart." }), { status: 401 })
        }
        if(session.user.cartId!== cartId){
            return new NextResponse(JSON.stringify({ message: "You can only add to your own cart." }), { status: 403 })
        }

      await prismadb.cart.update({
          where: {
            id: cartId,
          },
          data:{
            products:{
              connect:{
                id:productId
              }
            }
          },
        });       
        return new NextResponse(JSON.stringify({message:"Product added to card successfully"}), { status: 200 })
    }
    catch (error) {
        return new NextResponse(JSON.stringify({ error: error }), { status: 500 })
    }
}
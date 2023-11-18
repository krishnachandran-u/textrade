'use client'
import Image from "next/image"
import { Avatar,AvatarImage,AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {BsCartPlus,BsTelephoneOutbound} from 'react-icons/bs'
import { FaRegEdit } from "react-icons/fa";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { MdErrorOutline } from "react-icons/md";
import { useQuery } from "@tanstack/react-query"
import { selectProduct } from "@/lib/fetchQueries"
import ContactNow from "@/components/ContactNow"
import { useSession } from "next-auth/react"
import { Toaster } from "@/components/ui/toaster"
import { useAddToCartMutation } from "@/lib/mutations"
import { useMemo } from "react"
import { cn } from "@/lib/utils"
import { useAddSoldMutatioon } from "@/lib/mutations"

export default function ProductPage({params}) {
  const session = useSession();
  const productId = params.productID;
  const cartId = useMemo(() => session.data?.user?.cartId, [session.data?.user?.cartId]);
  
  const addToCartMutation = useAddToCartMutation(cartId);
  const addSoldMutation = useAddSoldMutatioon();
  const product= useQuery({ 
      queryKey: ["product", productId], 
      queryFn: () => selectProduct(productId),
      enabled : !!productId
  })

  if(product.isLoading || !productId || session.status == "loading"){
      return <div>Loading...</div>
  }
  if(product.isError){
      return <div>Error</div>
  }
  const {name,description,price,seller,images,sold} = product.data;
  return(
    <div className="flex w-full sm:mt-20 flex-col sm:flex-row justify-center">
      <div className="sm:p-4 max-w-[250px] sm:max-w-[400px] mx-auto sm:mx-0 mt-4">
        <Image src={images[0]?.url} alt="Product image" width={400} height={400} className="overflow-hidden mx-auto" />
      </div>
      <div className="flex flex-col sm:ml-14 p-5 sm:p-6">
        <h1 className="sm:text-[40px] text-[20px] font-bold">{name}</h1>
        <div className="flex gap-1 items-center mt-1">
          <Avatar className="cursor-pointer hover:drop-shadow-2xl w-8 h-8">
            <AvatarImage src={seller?.profile_pic} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className="text-slate-800 text-lg font-semibold">{seller?.username}</span>
        </div>
        <p className="text-lg text-slate-700 max-w-[550px] mt-1 sm:mt-3">{description}</p>
        <div className='p-2 border-2 rounded-md w-fit text-lg sm:mt-4 mt-2 font-semibold'>₹{price}</div>
        {(session.data?.user?.username != seller?.username) ?
          <div className={cn("flex gap-4 sm:mt-5 mt-3",sold ? "hidden" : "")}>
            <Button className="flex text-md">
              <ContactNow className='mr-2 h-4 w-4'/>
            </Button>
            <Button className="flex text-md"onClick={() => {
              addToCartMutation.mutate(productId)
            }}>
              <BsCartPlus className='mr-2 h-4 w-4'/> Add to Cart 
            </Button>
          </div>
          :
          <div className={cn("flex gap-4 sm:mt-5 mt-3",sold ? "hidden" : "")}>
            <Button className="flex text-md" onClick={() => {
                addSoldMutation.mutate({productId,sellerName:seller?.username})
              }
            }>
              <IoCheckmarkDoneSharp className="mr-2 h-4 w-4"/> Mark as Sold
            </Button>
            <Button className="flex text-md"onClick={() => {
            }}>
              <FaRegEdit className='mr-2 h-4 w-4'/> Edit Product
            </Button>
          </div>
        }
        { sold && <div className="bg-red-500 rounded w-fit p-2 px-3 mt-4 font-semibold flex items-center"> 
          <MdErrorOutline  className="mr-2 text-lg"/>
          Sold Out 
        </div>}
      </div>
      <Toaster />
    </div>
  )
}



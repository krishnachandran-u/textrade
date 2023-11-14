'use client'
import Image from "next/image"
import { Avatar,AvatarImage,AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {BsCartPlus,BsTelephoneOutbound} from 'react-icons/bs'
import { useQuery } from "@tanstack/react-query"
import { selectProduct } from "@/lib/fetchProducts"
import ContactNow from "@/components/ContactNow"

export default function ProductPage({params}) {

  const productId = params.productID;
  const product= useQuery({ 
      queryKey: ["product", productId], 
      queryFn: () => selectProduct(productId),
      enabled : !!productId
  })
  if(product.isLoading || !productId){
      return <div>Loading...</div>
  }
  if(product.isError){
      return <div>Error</div>
  }
  const {name,description,price,seller,images} = product.data;
  return(
    <div className="flex w-full sm:mt-20 flex-col sm:flex-row justify-center">
      <div className="sm:p-4 max-w-[250px] sm:max-w-[400px] mx-auto sm:mx-0 mt-4">
        <Image src={images[0].url} alt="Product image" width={400} height={400} className="overflow-hidden mx-auto" />
      </div>
      <div className="flex flex-col sm:ml-14 p-5 sm:p-6">
        <h1 className="sm:text-[40px] text-[20px] font-bold">{name}</h1>
        <div className="flex gap-1 items-center mt-1">
          <Avatar className="cursor-pointer hover:drop-shadow-2xl w-8 h-8">
            <AvatarImage src={seller.profile_pic} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className="text-slate-800 text-lg font-semibold">{seller.username}</span>
        </div>
        <p className="text-lg text-slate-700 max-w-[550px] mt-1 sm:mt-3">{description}</p>
        <div className='p-2 border-2 rounded-md w-fit text-lg sm:mt-4 mt-2 font-semibold'>{price}₹</div>
        <div className="flex gap-4 sm:mt-5 mt-3">
          <Button className="flex text-md">
            <ContactNow className='mr-2 h-4 w-4'/>
          </Button>
          <Button className="flex text-md">
            <BsCartPlus className='mr-2 h-4 w-4'/> Add to Cart 
          </Button>
        </div>
      </div>
    </div>
  )
}



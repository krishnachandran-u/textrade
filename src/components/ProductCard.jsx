import {
  Card,
  CardContent,
} from "@/components/ui/card"
import Image from "next/image"
import { BsCartPlus } from "react-icons/bs"
import { Button } from "./ui/button"
import { Avatar,AvatarImage,AvatarFallback } from "./ui/avatar"
import { cn } from "@/lib/utils"
import {MdOutlineAccountCircle} from 'react-icons/md'
import { useRouter } from "next/navigation"

export default function ProductCard({hideCart,disableCard,hideSeller,product}) {
  const {name,price,images,description,seller} = product;
  const router = useRouter();
  return(
    <Card className="min-w-[280px] hover:shadow-2xl relative" onClick={() => router.push(`/product/${product.id}`) }>
      <div className={cn(disableCard?"":"hidden","bg-slate-400/40 h-full w-full absolute rounded-sm z-50")}/>
      <div className={cn(hideSeller ? "h-[403px]" : "h-[410px]")}>
        <CardContent className="relative h-full w-full flex flex-col items-center">
          <Image src={images[0].url} alt="Product image" width={200} height={200} className={cn(disableCard?"grayscale":"","overflow-hidden my-auto")}/>
          <div className="mx-auto border-t-2">
            <h1 className="font-semibold pt-2">{name}</h1>
            <span className="text-slate-500 text-sm text-wrap">{description.substring(0,35)}</span>
            <div className={cn( hideSeller ? "hidden" : "flex","gap-1 items-center mt-1 cursor-pointer")} onClick={(event) => {
              event.stopPropagation();
              router.push(`/profile/${seller?.username}`)
              }}>
              <Avatar className="hover:drop-shadow-2xl w-4 h-4">
                <AvatarImage src={seller?.profile_pic} alt="@textrade.store" />
                <AvatarFallback><MdOutlineAccountCircle/></AvatarFallback>
              </Avatar>
              <span className="text-slate-500 text-sm">{seller?.username}</span>
            </div>
            <div className="flex justify-between mt-2 items-center">
              <div className='text-sm p-2 border-2 rounded-md'>{price}₹</div>
              <Button className={cn(hideCart?'hidden':"",'rounded-md text-md')}>
                <BsCartPlus/>
              </Button>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}
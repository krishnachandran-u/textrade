import {
  Card,
  CardContent,
} from "@/components/ui/card"
import Image from "next/image"
import { BsCartPlus } from "react-icons/bs"
import { Button } from "./ui/button"
import { Avatar,AvatarImage,AvatarFallback } from "./ui/avatar"
import { cn } from "@/lib/utils"

export default function ProductCard({hideCart,disableCard}) {
  return(
    <Card className="min-w-[280px] hover:shadow-2xl relative">
      <div className={cn(disableCard?"":"hidden","bg-slate-400/40 h-full w-full absolute rounded-sm z-50")}/>
      <div className={cn(hideCart ? "h-[403px]" : "h-[410px]")}>
        <CardContent>
          <Image src="https://i.ibb.co/D46XN9S/Algorithms-clrs.jpg" alt="Product image" width={200} height={200} className={cn(disableCard?"grayscale":"","overflow-hidden border-b-2 my-2 mx-auto")}/>
          <h1 className="font-semibold">Agorithms CLRS</h1>
          <span className="text-slate-500 text-sm">Small discription </span>
          <div className={cn(hideCart ? "hidden" : "flex","gap-1 items-center mt-1")}>
            <Avatar className="cursor-pointer hover:drop-shadow-2xl w-4 h-4">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="text-slate-500 text-sm">Seller name</span>
          </div>
          <div className="flex justify-between mt-2 items-center">
            <div className='text-sm p-2 border-2 rounded-md'>500₹</div>
            <Button className={cn(hideCart?'hidden':"",'rounded-md text-md')}>
              <BsCartPlus/>
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}
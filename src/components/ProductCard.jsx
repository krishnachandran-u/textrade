import {
  Card,
  CardContent,
} from "@/components/ui/card"
import Image from "next/image"
import { BsCartPlus } from "react-icons/bs"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Avatar,AvatarImage,AvatarFallback } from "./ui/avatar"

export default function ProductCard() {
  return(
    <Card className="min-w-[280px] hover:shadow-2xl">
      <div className="h-[410px]">
        <CardContent>
          <Image src="https://i.ibb.co/D46XN9S/Algorithms-clrs.jpg" alt="Product image" width={200} height={200} className="overflow-hidden border-b-2 my-2 mx-auto" />
          <h1 className="font-semibold">Agorithms CLRS</h1>
          <span className="text-slate-500 text-sm">Small discription </span>
          <div className="flex gap-1 items-center mt-1">
            <Avatar className="cursor-pointer hover:drop-shadow-2xl w-4 h-4">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="text-slate-500 text-sm">Seller name</span>
          </div>
          <div className="flex justify-between mt-2 items-center">
            {/* <Badge variant='outline' className='text-sm p-2'>500₹</Badge> */}
            <div className='text-sm p-2 border-2 rounded-md'>500₹</div>
            <Button className='rounded-md text-md'>
              <BsCartPlus/>
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}
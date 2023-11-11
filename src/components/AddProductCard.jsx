import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Button } from "./ui/button"
import {BiAddToQueue} from 'react-icons/bi'
import Link from 'next/link'

export default function AddProductCard() {
  return(
    <Card className="min-w-[280px] hover:shadow-2xl">
      <div className="h-[410px]">
        <CardContent className='h-full flex flex-col items-center justify-center'>
          <Link href = "/sell/create">
          <Button className="flex gap-1 text-md relative top-5">
            <BiAddToQueue/>
            Add Product
          </Button>
          </Link>
          <p className="text-sm text-center mx-4 mt-2 text-slate-500 relative top-5">
            Sell your products to millions of customers on the go
          </p>
        </CardContent>
      </div>
    </Card>
  )
}
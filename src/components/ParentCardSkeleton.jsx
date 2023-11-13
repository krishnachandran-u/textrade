import { Skeleton } from "@/components/ui/skeleton"
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

export default function ParentCardSkeleton({hideCart,disableCard,product,hideSeller}){
    return(
        <main>
            <div className = "sm:flex hidden">
                <Card className="min-w-[280px] hover:shadow-2xl relative">
      <div className="h-full w-full absolute rounded-sm z-50" />
      <div className="h-[410px]">
        <CardContent className="relative h-full w-full flex flex-col items-center">
          <Skeleton className="h-[200px] w-[200px] bg-slate-100 overflow-hidden my-auto"/>
          <div className="mx-auto border-t-2">
            <h1 className="font-semibold pt-2">
              <Skeleton className="h-6 w-[200px] mb-1" />
            </h1>
            <span className="text-slate-500 text-sm text-wrap">
              <Skeleton className="h-10 w-[150px]" />
            </span>
            <div className="flex gap-1 items-center mt-1 cursor-pointer">
              <Avatar className="hover:drop-shadow-2xl w-4 h-4">
                <Skeleton className="h-4 w-4" />
              </Avatar>
              <span className="text-slate-500 text-sm">
                <Skeleton className="h-4 w-[80px]" />
              </span>
            </div>
            <div className="flex justify-between mt-2 items-center">
              <div className="text-sm p-2 border-2 rounded-md">
                <Skeleton className="h-4 w-[50px]" />
              </div>
              <Skeleton className="rounded-md text-md h-8 w-8" />
            </div>
          </div>
        </CardContent>
        </div>
        </Card> 
        </div>

            <div className = "sm:hidden flex">
                <div className="min-w-[280px] hover:shadow-2xl relative border shadow rounded w-full">
      <div className={disableCard ? "hidden" : "h-full w-full absolute rounded-sm z-50"} />
      <div className={hideCart ? "h-[403px]" : "m-2"}>
        <div className="relative w-full h-[290px] flex sm:flex-col flex-row items-center gap-3">
          <Skeleton className="h-[200px] w-[200px] ml-2 bg-slate-100 overflow-hidden my-auto border pt-5 pb-5 pr-1 pl-1" />
          <div className="mx-auto mr-2">
            <h1 className="font-semibold pt-2">
              <Skeleton className="h-6 w-[150px] mb-1" />
            </h1>
            <span className="text-slate-500 text-sm text-wrap">
              <Skeleton className="h-10 w-[200px]" />
            </span>
            <div className={hideSeller ? "hidden" : "flex gap-1 items-center mt-1 cursor-pointer"}>
              <Avatar className="hover:drop-shadow-2xl w-4 h-4">
                <Skeleton className="h-4 w-4" />
              </Avatar>
              <span className="text-slate-500 text-sm">
                <Skeleton className="h-4 w-[80px]" />
              </span>
            </div>
            <div className="flex justify-between mt-6 items-center">
              <div className="text-sm p-2 border-2 rounded-md">
                <Skeleton className="h-4 w-[50px]" />
              </div>
              <Button className={hideCart ? 'hidden' : 'rounded-md text-md'} variant = "outline">
                <Skeleton className="h-6 w-8" />
              </Button>
                </div>
                </div>
                </div>
                </div>
                </div>
            </div>
        </main>
    )
}
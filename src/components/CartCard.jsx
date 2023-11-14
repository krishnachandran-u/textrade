import ProductCard from "./ProductCard";
import { Button } from "./ui/button";
import Image from "next/image"
import { Avatar,AvatarImage,AvatarFallback } from "./ui/avatar"
import { BiPhoneCall } from 'react-icons/bi'
import { Badge } from "@/components/ui/badge"
import ContactNow from "./ContactNow";
import { Contact } from "lucide-react";

export default function CartCard() {
    return (
        <main>
            <div className = "flex flex-row justify-between border hover:shadow-sm rounded-sm p-5"> 
                <div className = "flex lg:flex-row flex-col">
                    <Image src="https://github.com/shadcn.png" alt="Product image" width={200} height={200} className="overflow-hidden my-2 mx-auto sm:aspect-h-1 sm:aspect-w-1" />
                    <div className = "flex flex-col justify-between m-8 flex-wrap">
                        <div className = "flex flex-col gap-2">
                            <h2 className = "font-bold">Algorithms CLRS</h2> 
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            <div className = "flex flex-row gap-2 items-center">
                                <Avatar className="cursor-pointer hover:drop-shadow-2xl w-4 h-4">
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar> 
                                <p>Seller name</p>
                            </div>
                        </div>
                        <div className = "flex sm:flex-row flex-col justify-between items-center ml-5 m-4 gap-2">
                            <Badge className = "rounded-sm p-2 text-2xl justify-center" variant = "outline">₹499</Badge>
                            <div className = "sm:flex items-center justify-between">
                                <Button className = "flex flex-row justify-between gap-2">
                                    <p className = "p-10"><ContactNow /></p>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        </main>
    )
}
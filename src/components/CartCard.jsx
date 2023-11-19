import { Button } from "./ui/button";
import Image from "next/image"
import { Avatar,AvatarImage,AvatarFallback } from "./ui/avatar"
import { Badge } from "@/components/ui/badge"
import ContactNow from "./ContactNow";
import { MdOutlineAccountCircle } from "react-icons/md";
import { useRouter } from "next/navigation"
import { IoIosClose } from "react-icons/io";
import Link from "next/link"

export default function CartCard({product,removeItem}) {
    const router = useRouter();
    return (
        <main>
            <div className = "flex flex-row justify-center border hover:shadow-sm rounded-sm p-5 cursor-pointer" onClick={() => router.push(`/product/${product.id}`)} > 
                <div className = "flex flex-col">
                    <div className ="w-20 ml-auto" onClick={(e) => {
                        e.stopPropagation();
                        removeItem({productId:product.id,price:product.price})
                    }}>
                        <IoIosClose className ="w-8 h-8 border p-1 shadow hover:bg-slate-200 transition duration-75"/>
                    </div>
                <div className = "flex lg:flex-row flex-col">
                    <Image src={product.images[0].url} alt="Product image" width={200} height={200} className="overflow-hidden my-2 mx-auto sm:aspect-h-1 sm:aspect-w-1" />
                    <div className = "flex flex-col justify-between m-8 flex-wrap">
                        <div className = "flex flex-col gap-2">
                            <h2 className = "font-bold">{product.name}</h2> 
                            <p>{product.description}</p>
                            <div className = "flex flex-row gap-2 items-center" onClick={(event) => {
                                event.stopPropagation();
                                router.push(`/profile/${product.seller?.username}`)
                            }}>
                                <Avatar className="cursor-pointer hover:drop-shadow-2xl w-4 h-4">
                                    <AvatarImage src={product.seller.profile_pic} alt="@textrade.store" />
                                    <AvatarFallback><MdOutlineAccountCircle/></AvatarFallback>
                                </Avatar> 
                                <p>{product.seller.username}</p>
                            </div>
                        </div>
                        <div className = "flex sm:flex-row flex-col justify-between items-center ml-5 m-4 gap-2"
                            onClick = {(e) => {
                                e.stopPropagation();
                            }}>
                            <Badge className = "rounded-sm p-2 text-2xl justify-center" variant = "outline">₹{product.price}</Badge>
                            <div className = "sm:flex items-center justify-between">
                                <Button className = "flex flex-row justify-between gap-2">
                                    <p className = "p-10"><ContactNow /></p>
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
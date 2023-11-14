import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AiOutlineMobile } from "react-icons/ai"
import { BsWhatsapp } from 'react-icons/bs'
import { BiLogoTelegram } from 'react-icons/bi'
import { BiPhoneCall } from "react-icons/bi"
import Link from "next/link"
import { Button } from "./ui/button";

export default function ContactNow() {
    return (
        <DropdownMenu className = "w-full">
            <DropdownMenuTrigger asChild>
                <div>
                    <div className = "sm:flex items-center justify-between">
                        <Button className = "flex flex-row justify-between gap-2">
                            <BiPhoneCall /> 
                            <p className = "p-10 justify-center items-center">Contact Now</p>
                        </Button>
                    </div>  
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className = "w-full">
                <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <Link href = "">
                            <DropdownMenuItem>
                                <AiOutlineMobile className="text-lg mx-2"/>
                                <p>Mobile</p>
                            </DropdownMenuItem>
                        </Link>
                    </DropdownMenuGroup>
                <DropdownMenuSeparator />
                     <DropdownMenuGroup>
                        <Link href = "">
                            <DropdownMenuItem>
                                <BsWhatsapp className="text-lg mx-2"/>
                                <p>WhatsApp</p>
                            </DropdownMenuItem>
                        </Link>
                    </DropdownMenuGroup>
                <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <Link href = "">
                            <DropdownMenuItem>
                                <BiLogoTelegram className="text-lg mx-2"/>
                                <p>Telegram</p>
                            </DropdownMenuItem>
                        </Link>
                    </DropdownMenuGroup>
            </DropdownMenuContent> 
        </DropdownMenu>
    )
}
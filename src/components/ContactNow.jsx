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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FaTelegram } from "react-icons/fa";

export default function ContactNow() {
    return (
        <main>
            <Dialog>
                <DialogTrigger>
                    <div>
                        <div className = "sm:flex items-center justify-between">
                            <Button className = "flex flex-row justify-between gap-2">
                                <BiPhoneCall /> 
                                <p className = "p-10 justify-center items-center">Contact Now</p>
                            </Button>
                        </div>
                    </div>                    
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Connect</DialogTitle>                        
                        <DialogDescription>
                            Choose a platform to get in touch with!
                        </DialogDescription> 
                    </DialogHeader>
                    <div className = "flex flex-col justify-center items-center">
                        <table className = "w-full">
                            <tbody>
                                <tr className = "">
                                    <Link href = "">
                                    <div className = "border m-2 p-2 rounded shadow">
                                    <td className = "pr-10 pl-10"><AiOutlineMobile className  = "items-center"/></td>
                                    <td className = "pl-20">Phone</td>
                                    </div>
                                    </Link>
                                </tr>
                                <tr className = "">
                                    <Link href = "">
                                    <div className = "border m-2 p-2 rounded shadow">
                                    <td className = "pr-10 pl-10"><BsWhatsapp className=""/></td>
                                    <td className = "pl-20">WhatsApp</td>
                                    </div>
                                    </Link>
                                </tr>
                                <tr>
                                    <Link href = " ">
                                    <div className = "border m-2 p-2 rounded shadow">
                                    <td className = "pr-10 pl-10"><FaTelegram className = ""/></td>
                                    <td className = "pl-20">Telegram</td>
                                    </div>
                                    </Link>
                                </tr>
                            </tbody>
                        </table> 
                    </div>
                </DialogContent>
            </Dialog>
        </main>
    )
}
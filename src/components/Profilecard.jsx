import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

import { Badge } from "@/components/ui/badge"

import {AiOutlineWhatsApp} from 'react-icons/ai'
import {BsTelegram} from 'react-icons/bs'
import {TbLogout2} from 'react-icons/tb'
import {BiPhoneCall} from 'react-icons/bi'

import { Button } from "@/components/ui/button"
  
export default function Profilecard(){
    return (
        <div className = "w-[370px]">
            <Card>
                <CardHeader className = "">
                        <div>
                            <Avatar className = "w-80 h-80 justify-center items-center mb-5">
                                <AvatarImage className src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </div>
                    <CardTitle className = "">
                        <p>First Middle Last</p>
                    </CardTitle>
                    <CardDescription >@username</CardDescription>
                    <Badge variant = "secondary" className = "h-[50px]">
                        <p className = "pl-10">College of Engineering, Trivandrum</p>
                    </Badge>
                    <div className = "flex justify-center items-center">
                        <Button className = "m-1 h-[50px] w-[50px]">
                            <BiPhoneCall className = "h-[50px] w-[50px]"/>
                        </Button>
                        <Button className = "m-1 h-[50px] w-[50px]">
                            <AiOutlineWhatsApp className = "h-[50px] w-[50px]"/>
                        </Button>
                        <Button className = "m-1 h-[50px] w-[50px]">
                            <BsTelegram className = "h-[50px] w-[50px]"/>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className = "">
                    <p className = "pb-1 font-bold">About me</p>
                    <Card className = "h-[100px] p-2">
                        <p Classname = "">Lorem ipsum dolor sit ames</p>
                    </Card>
                </CardContent>
                <CardFooter className>
                    <p></p>
                </CardFooter>
            </Card>
        </div>
    )
}
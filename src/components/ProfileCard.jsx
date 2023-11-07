
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

import { Button } from "@/components/ui/button"

export default function ProfileCard() {
    return (
        <main>
            <div className = "border rounded-lg shadow-md w-[400px] h-[800px] flex flex-col items-center p-8 gap-5">
                <div className = "">
                    <Avatar className = "w-30 h-30">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar> 
                </div>
                <div className = "flex flex-col items-start w-full">
                    <h1 className = "text-3xl font-bold">First Middle Last</h1>
                    <p className = "text-gray-700 italic">@username</p>
                </div>
                <div className = "w-full gap-2 flex flex-col">
                    <Button variant = "Primary" className = "w-full bg-gray-500">
                        <p className = "text-white">Edit Profile</p>
                    </Button>
                    <Button className = "bg-black">
                        <p variant = "secondary" className = "">College of Engineering, Trivandrum</p>
                    </Button>
                </div>
                <div className = "flex flex-col w-full gap-2">
                    <div className = "font-bold">Note</div>
                    <div className = "w-full h-[100px] border rounded-lg shadow-md p-1 ">
                        <p>Lorem ipsum dolor sit ames.</p>
                    </div>
                </div>
            </div>
        </main>
    )
}
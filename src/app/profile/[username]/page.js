import Navbar from "@/components/Navbar";
import Productdisplayprofile from "@/components/Productdisplayprofile";
import Profilecard from "@/components/Profilecard"
import { Heading } from "lucide-react";

export default function Home() {
    return (
        <main className = "">
            <div className = "flex justify-between items-start m-5 max-h-screen-sm">
                <div>
                    <h1 className = "text-2xl font-bold">User Profile</h1>
                </div>
                <div className>
                    <Profilecard />
                </div>
            </div>
        </main>
    )
}
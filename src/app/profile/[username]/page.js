import Navbar from "@/components/Navbar";
import Productdisplayprofile from "@/components/Productdisplayprofile";
import ProfileCard from "@/components/ProfileCard";
import { Heading } from "lucide-react";

export default function Home() {
    return (
        <main className = "">
            <div className = "flex flex-row justify-between items-start m-5 max-h-screen-sm">
                <div>
                    
                </div>
                <div className>
                    <ProfileCard />
                </div>
            </div>
        </main>
    )
}
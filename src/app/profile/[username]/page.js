import Navbar from "@/components/Navbar";
import Productdisplayprofile from "@/components/Productdisplayprofile";
import ProfileCard from "@/components/ProfileCard";
import ProductCard from "@/components/ProductCard";
import { Heading } from "lucide-react";

export default function Home() {
    return (
        <main className = "">
            <div className = "flex flex-col w-full p-4 gap-1">
                <div>
                    <h1 className = "text-5xl text-center sm:pl-2 sm:text-left font-bold">User Profile</h1>
                </div>
                <div className = "flex flex-col sm:flex-row w-full justify-end sm:flex-wrap mb-20">
                    <div>
                        <ProfileCard />
                    </div>
                </div>
            </div>
        </main>
    )
}
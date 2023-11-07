import Navbar from "@/components/Navbar";
import ProfileCard from "@/components/ProfileCard";
import ProductCard from "@/components/ProductCard";
import { Heading } from "lucide-react";

export default function Home() {
    return (
        <main className = "">
            <div className = "flex flex-col  p-4 gap-2">
                <div>
                    <h1 className = "text-5xl text-center sm:pl-2 sm:text-left font-bold">User Profile</h1>
                </div>
                <div className = "flex flex-col sm:flex-row flex-grow sm:justify-between mb-20 gap-4 h-full">
                    <div className = "flex flex-col items-center">
                        <div className = "text-center sm:text-left w-full sm:pl-2 text-3xl font-semibold">
                            <h2 className = "">Products</h2>
                        </div>
                        <div className = "flex sm:flex-row flex-col sm:flex-wrap sm:items-start p-4 gap-2">
                          <ProductCard />
                          <ProductCard />
                          <ProductCard />
                          <ProductCard />
                          <ProductCard />
                          <ProductCard />
                        </div>
                    </div>
                    <div className = "order-first sm:order-last">
                        <ProfileCard />
                    </div>
                </div>
            </div>
        </main>
    )
}
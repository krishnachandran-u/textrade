import CartCard from "@/components/CartCard";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import BoughtCard from "@/components/BoughtCard"

export default function Cart(){
    return (
       <main className = "m-5 mb-20">
            <div className = "hidden lg:flex flex-col">
                <div className = "sm:flex flex-row justify-around gap-2">
                    <div className = "sm:flex flex-col gap-5">
                        <div className = "sm:flex flex-col">
                            <div className = "sm:flex sm:flex-col flex flex-col border rounded-sm shadow-sm p-5 gap-4">
                                <h2 className = "text-3xl font-bold">Your Cart</h2>
                                <div className = "sm:flex sm:flex-col gap-3">
                                    <CartCard /> 
                                    <CartCard />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className = "sm:flex sm:flex-col border rounded-sm shadow-sm p-5 gap-4">
                                <h2 className = "text-3xl font-bold">Previously Bought</h2>
                                <div className = "sm:flex sm:flex-col gap-3">
                                    <BoughtCard />
                                    <BoughtCard /> 
                                    <BoughtCard />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className = "flex flex-col gap-3">
                        <div className = "flex flex-col border rounded shadow gap-2 p-2">
                            <div className = "flex flex-row justify-between gap-6">
                                <p>Items</p>
                                <p>6</p>
                            </div> 
                            <div className = "flex flex-row justify-between">
                                <p>Price</p>
                                <p>₹3000</p>
                            </div>
                        </div>
                        <Button className = "w-full justify-center">
                            <p className = "p-20">Checkout</p>
                        </Button>
                    </div>
                </div>
            </div>





            <div className = "lg:hidden flex flex-col gap-3">
                <div className = "flex flex-col border rounded shadow gap-2 p-2">
                        <div className = "flex flex-row justify-between gap-6">
                            <p>Items</p>
                            <p>6</p>
                        </div> 
                        <div className = "flex flex-row justify-between">
                            <p>Price</p>
                            <p>₹3000</p>
                        </div>
                </div>
                <Button className = "w-full justify-center">
                    <p className = "p-20">Checkout</p>
                </Button>

                <div className = "flex flex-col">
                            <div className = "sm:flex sm:flex-col border rounded-sm shadow-sm p-5 gap-4">
                                <h2 className = "text-3xl font-bold text-center m-2">Your Cart</h2>
                                <div className = "sm:flex sm:flex-col flex flex-col gap-3">
                                    <CartCard /> 
                                    <CartCard />
                                </div>
                            </div>
                        </div>
                
                 <div>
                        <div className = "sm:flex sm:flex-col border rounded-sm shadow-sm p-5 gap-4">
                            <h2 className = "text-3xl font-bold text-center m-2">Previously Bought</h2>
                            <div className = "sm:flex sm:flex-col flex flex-col gap-3">
                                <BoughtCard />
                                <BoughtCard /> 
                                <BoughtCard />
                            </div>
                        </div>
                </div> 
            </div> 
       </main> 
    )
}
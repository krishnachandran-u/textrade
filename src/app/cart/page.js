import CartCard from "@/components/CartCard";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";

export default function Cart(){
    return (
        <main className = "flex flex-col m-6 mb-20 gap-2">
            <h1 className = "text-4xl mb-2 sm:text-left text-center">Shopping Cart</h1>
            <div className = "flex flex-col sm:grid sm:grid-cols-5 sm:grid-rows-5 gap-5">
                <div className = "order-2 row-start-2 row-end-3 sm:col-start-1 sm:col-end-5 sm:row-start-1 sm:row-end-4 sm:order-none flex flex-col border rounded-md">
                    <div className = "flex flex-col sm:flex-row flex-wrap gap-3 p-3 rounded-lg shadow-md border">
                        <CartCard />
                        <CartCard />
                        <CartCard />
                        <CartCard />
                        <CartCard />
                        <CartCard />
                    </div> 
                </div>
                <div className = "order-3 row-start-3 row-end-4 sm:col-start-5 sm:col-end-6 sm:row-start-1 sm:row-end-6 sm:order-none">
                    <div className = "flex flex-col gap-20">
                        <div className = "border rounded-lg shadow-md flex flex-col justify-center">
                            <div className = "">
                                <table className = "w-full">
                                    <tbody>
                                        <tr className = "">
                                            <td className = "p-4">Items</td>
                                            <td className = "text-right p-4">6</td>
                                        </tr>
                                        <tr>
                                            <td className = "p-4">Price</td>
                                            <td className = "text-right p-4">₹3000</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>  
                            <Button className = "m-5">Checkout</Button>
                        </div>                        
                        <div className = "flex flex-col border rounded-lg shadow-md p-3 gap-2">
                            <div>
                                <h2 className = "sm:text-left text-center">You might also like</h2>
                            </div>
                            <div className = "flex flex-col gap-3">
                                <ProductCard />
                                <ProductCard />
                                <ProductCard />
                            </div>
                        </div>
                    </div>                    
                </div>
            </div>
        </main>
    )
}
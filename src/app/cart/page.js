'use client'
import CartCard from "@/components/CartCard";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { selectCart } from "@/lib/fetchQueries";
import { useCartStore } from "@/lib/stores";
import { useEffect } from "react";

export default function Cart(){
    const session = useSession();
    const [itemsCount, totalPrice, setItemsCount, setTotalPrice] = useCartStore((state) => [state.itemsCount, state.totalPrice, state.setItemsCount, state.setTotalPrice]);
    const cartId = session?.data?.user?.cartId;
    const cart = useQuery({ 
        queryKey: ["cart",cartId], 
        queryFn: () => selectCart(cartId),
        enabled : !!cartId
    })
    useEffect(() => {
        let itemsCount = 0;
        let totalPrice = 0;

        cart.data?.products?.forEach((product) => {
        itemsCount += 1;
        totalPrice += parseInt(product.price);
        });

        setItemsCount(itemsCount);
        setTotalPrice(totalPrice);
    }, [cart.data?.products]);


    if(cart.isLoading){
        return <div>Loading...</div>
    }
    return (
        <main className = "m-5 mb-20">
            <div className = "hidden lg:flex flex-col">
                <div className = "sm:flex flex-row justify-around gap-2">
                    <div className = "sm:flex flex-col gap-5">
                        <div className = "sm:flex flex-col">
                            <div className = "sm:flex sm:flex-col flex flex-col border rounded-sm shadow-sm p-5 gap-4">
                                <h2 className = "text-3xl font-bold">Your Cart</h2>
                                <div className = "sm:flex sm:flex-col gap-3">
                                    {
                                        cart.data?.products?.map((product) => {
                                            return (
                                                <CartCard product={product} key={product.id}/> 
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className = "flex flex-col gap-3">
                        <div className = "flex flex-col border rounded shadow gap-2 p-2">
                            <div className = "flex flex-row justify-between gap-6">
                                <p>Items</p>
                                <p>{itemsCount}</p>
                            </div> 
                            <div className = "flex flex-row justify-between">
                                <p>Price</p>
                                <p>₹{totalPrice}</p>
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
                            <p>{itemsCount}</p>
                        </div> 
                        <div className = "flex flex-row justify-between">
                            <p>Price</p>
                            <p>₹{totalPrice}</p>
                        </div>
                </div>
                <Button className = "w-full justify-center">
                    <p className = "p-20">Checkout</p>
                </Button>

                <div className = "flex flex-col">
                    <div className = "sm:flex sm:flex-col border rounded-sm shadow-sm p-5 gap-4">
                        <h2 className = "text-3xl font-bold text-center m-2">Your Cart</h2>
                        <div className = "sm:flex sm:flex-col flex flex-col gap-3">
                            {
                                cart.data?.products?.map((product) => {
                                    return (
                                        <CartCard product={product} key={product.id}/> 
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div> 
        </main> 
    )
}
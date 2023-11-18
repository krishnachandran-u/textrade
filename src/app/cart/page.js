'use client'
import CartCard from "@/components/CartCard";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useQuery, useMutation,useQueryClient } from "@tanstack/react-query";
import { selectCart } from "@/lib/fetchQueries";
import { useCartStore } from "@/lib/stores";
import { useEffect } from "react";
import axios from "axios";
import { Toaster } from "@/components/ui/toaster"
import { toast } from "@/components/ui/use-toast"

export default function Cart(){
    const session = useSession();
    const [itemsCount, totalPrice, setItemsCount, setTotalPrice, removeItem, addItem] = useCartStore((state) => [state.itemsCount, state.totalPrice, state.setItemsCount, state.setTotalPrice, state.removeItem, state.addItem]);
    const queryClient = useQueryClient();
    const cartId = session?.data?.user?.cartId;
    const cart = useQuery({ 
        queryKey: ["cart",cartId], 
        queryFn: () => selectCart(cartId),
        enabled : !!cartId
    })
    const products = cart.data?.products;
    const removeFromCartMutation = useMutation({
        mutationFn: async ({productId,price}) => {
            if(cartId == undefined){
                toast({title: "User session not found", description: "You must be signed in to remove from cart"})
                throw new Error("User session not found")
            }
            if(productId == undefined || productId == null){
                toast({title: "Product id not found", description: "Please provide a valid product id"})
                throw new Error("Product id not found")
            }
            const response = await axios.post('/api/removeFromCart',{"cartId":cartId,"productId":productId});
            return response.data;
        },
        onSuccess: (data,variables) => {
            removeItem(parseInt(variables.price))
            queryClient.setQueryData(["cart",cartId],(oldData) => {
                return {
                    ...oldData,
                    products: oldData?.products?.filter((product) => product.id != variables.productId)
                }
            })
            toast({title: "Product removed from cart", description: "Product removed from cart successfully"})
        },
        onError:(error) => {
            toast({title: "Error", description: error.message})
        }
    })
    useEffect(() => {
        let itemsCount = 0;
        let totalPrice = 0;

        cart.data?.products?.forEach((product) => {
            itemsCount += 1;
            totalPrice += parseInt(product.price);
            addItem(product.id);
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
                                        products?.map((product) => {
                                            return (
                                                <CartCard product={product} key={product.id} removeItem={removeFromCartMutation.mutate}/> 
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
                                products?.map((product) => {
                                    return (
                                        <CartCard product={product} key={product.id} removeItem={removeFromCartMutation.mutate}/> 
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div> 
            <Toaster/>
        </main> 
    )
}
'use client'
import { useQuery, useMutation, useQueryClient} from "@tanstack/react-query"
import axios from 'axios';
import { useSearchParams } from "next/navigation";
import { searchProducts } from "@/lib/fetchQueries";
import ParentCard from "@/components/ParentCard";
import ParentCardSkeleton from "@/components/ParentCardSkeleton";
import { Toaster } from "@/components/ui/toaster"
import { toast } from "@/components/ui/use-toast"
import { useSession } from "next-auth/react";
import { useCartStore } from "@/lib/stores";

export default function Home() {
  const session = useSession();
  const cartId = session.data?.user?.cartId;
  const searchParams = useSearchParams();
  let search = searchParams.get('search');
  search = search == null ? "" : search;
  const addCartItem = useCartStore(state => state.addItem)
  const queryClient = useQueryClient();

  const addToCartMutation = useMutation({
    mutationFn: async ({productId,price}) => {
      if(cartId == undefined){
        toast({title: "User session not found", description: "You must be signed in to add to cart"})
        return
      }
      if(productId == undefined || productId == null){
        toast({title: "Product id not found", description: "Please provide a valid product id"})
        return
      }
      const response = await axios.post('/api/addToCart',{"cartId":cartId,"productId":productId});
      return response.data;
    },
    onSuccess: (data,variables) => {
      addCartItem(parseInt(variables.price))
      queryClient.invalidateQueries(["cart",cartId]);
      toast({title: "Product added to cart", description: "Product added to cart successfully"})
    },
    onError:(error) => {
      console.log(error)
      toast({title: "Error", description: error.message})
    }
  })

  const products = useQuery({ queryKey: ["products",{searchParams: search}], queryFn: () => searchProducts(search) })
  if(products.isLoading){
    return <div>Loading...</div>
  }
  if(products.isError){
    return <div>Error</div>
  }
  return (
    <>
      <div className="flex flex-wrap gap-2 p-4 mb-20 sm:mb-0">
        {
          products?.data?.map((product) => {
            return <ParentCard key={product.id} product={product} disableCard={product.sold} addToCart={addToCartMutation.mutate}/>
          })
        }
      </div>
      <Toaster />
    </>
  )
}

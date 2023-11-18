import axios from 'axios';
import { toast } from '@/components/ui/use-toast';
import { useCartStore } from '@/lib/stores';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useAddToCartMutation(cartId) {
  const [addCartItem, products] = useCartStore((state) => [state.addItem,state.products]);
  const queryClient = useQueryClient();

  const addToCartMutation = useMutation({
    mutationFn: async (productId) => {
      if(cartId == undefined){
          throw new Error("User session not found")
      }
      if(productId == undefined || productId == null){
          throw new Error("Product id not found")
      }
      if(products.includes(productId)){
        throw new Error("Product already added to cart")
      }
      const response = await axios.post('/api/addToCart',{"cartId":cartId,"productId":productId});
      return response.data;
    },
    onSuccess: (data,productId) => {
      addCartItem(productId)
      queryClient.invalidateQueries(["cart",cartId]);
      toast({title: "Product added to cart", description: "Product added to cart successfully"})
    },
    onError:(error) => {
      toast({title: "Error", description: error.message})
    }
  });

  return addToCartMutation;
}
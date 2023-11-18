import axios from 'axios';
import { toast } from '@/components/ui/use-toast';
import { useCartStore } from '@/lib/stores';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useAddToCartMutation(cartId) {
  const [addCartItem] = useCartStore((state) => [state.addItem]);
  const queryClient = useQueryClient();

  const addToCartMutation = useMutation({
    mutationFn: async ({productId,price}) => {
      if(cartId == undefined){
          toast({title: "User session not found", description: "You must be signed in to remove from cart"})
          throw new Error("User session not found")
      }
      if(productId == undefined || productId == null){
          toast({title: "Product id not found", description: "Please provide a valid product id"})
          throw new Error("Product id not found")
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
      toast({title: "Error", description: error.message})
    }
  });

  return addToCartMutation;
}
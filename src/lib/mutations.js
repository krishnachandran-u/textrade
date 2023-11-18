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

export function useAddSoldMutatioon() {
  const queryClient = useQueryClient();
  const addSoldMuation = useMutation({
    mutationFn: async ({productId,sellerName}) => {
      const response = await axios.post('/api/editSoldStatus',{"productId":productId,"sellerName":sellerName});
      return response.data;
    },
    onSuccess: (data,variables) => {
      queryClient.setQueryData(["product",variables.productId],(oldData) => {
        return {...oldData,sold:true}
      })
      if(queryClient.getQueryData(["products",{"sellerName":variables.sellerName}]) != undefined){
        queryClient.setQueryData(["products",{"sellerName":variables.sellerName}],(oldData) => {
          return oldData?.map((product) => {
            if(product.id == variables.productId){
              return {...product,sold:true}
            }
            return product
          })
        })
      }
      if(queryClient.getQueryData(["profile",variables.sellerName]) != undefined){
        queryClient.setQueryData(["profile",variables.sellerName],(oldData) => {
          return{
            ...oldData,
            products: oldData?.products?.map((product) => {
              if(product.id == variables.productId){
                return {...product,sold:true}
              }
              return product
            })
          }
        })
      }
      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey[0] === 'products' && query.queryKey[1]?.searchParams != undefined 
      })
      toast({title: "Product marked as sold", description: "Sold status updated successfully"})
    },
    onError:(error) => {
      toast({title: "Error", description: error.message})
    }
  });

  return addSoldMuation;
}
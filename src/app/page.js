'use client'
import { useQuery } from "@tanstack/react-query"
import axios from 'axios';
import ProductCard from "@/components/ProductCard";

export default function Home() {
  const fetchPosts = async () => {
    const { data } = await axios.get('/api/selectAllProduct?skip=0&take=20');
    return data;
  }
  const products = useQuery({ queryKey: ["products"], queryFn: fetchPosts })
  if(products.isLoading){
    return <div>Loading...</div>
  }
  if(products.isError){
    return <div>Error</div>
  }
  return (
    <div className="flex flex-wrap gap-2 p-4">
      {
        products.data.map((product) => {
          return <ProductCard key={product.id} product={product} />
        })
      }
    </div>
  )
}

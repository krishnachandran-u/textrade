'use client'
import { useQuery } from "@tanstack/react-query"
import axios from 'axios';
import ProductCard from "@/components/ProductCard";
import { useSearchParams } from "next/navigation";
import { searchProducts } from "@/lib/fetchQueries";
import ParentCard from "@/components/ParentCard";
import ParentCardSkeleton from "@/components/ParentCardSkeleton";

export default function Home() {
  const searchParams = useSearchParams();
  let search = searchParams.get('search');
  search = search == null ? "" : search;

  const products = useQuery({ queryKey: ["products",{searchParams: search}], queryFn: () => searchProducts(search) })
  if(products.isLoading){
    return <div>Loading...</div>
  }
  if(products.isError){
    return <div>Error</div>
  }
  return (
    <div className="flex flex-wrap gap-2 p-4 mb-20 sm:mb-0">
      {
        products?.data?.map((product) => {
          return <ParentCard key={product.id} product={product} />
        })
      }
    </div>
  )
}

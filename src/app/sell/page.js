import AddProductCard from "@/components/AddProductCard"
import ProductCard from "@/components/ProductCard"

function SellPage() {
  return (
    <div className="p-4">
      <div className = "flex flex-col">
          <div className = "text-center sm:text-left w-full sm:pl-2 text-3xl font-semibold">
              <h2 className = "">Your Products</h2>
          </div>
          <div className = "flex sm:flex-row flex-col sm:flex-wrap sm:items-start p-4 gap-2">
            <AddProductCard />
            <ProductCard hideCart={true}/>
            <ProductCard hideCart={true}/>
            <ProductCard hideCart={true}/>
            <ProductCard hideCart={true}/>
          </div>
          <div className = "text-center sm:text-left w-full sm:pl-2 text-3xl font-semibold">
              <h2 className = "">Sold Products</h2>
          </div>
          <div className = "flex sm:flex-row flex-col sm:flex-wrap sm:items-start p-4 gap-2">
            <ProductCard hideCart={true} disableCard={true}/>
            <ProductCard hideCart={true} disableCard={true}/>
            <ProductCard hideCart={true} disableCard={true}/>
          </div>
      </div>
    </div>
  )
}

export default SellPage
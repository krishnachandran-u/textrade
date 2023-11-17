import ProductCard from "./ProductCard"
import HorCard from "./HorCard"

export default function ParentCard({hideCart,disableCard,product,hideSeller,addToCart}){
    return(
        <main>
        <div className = "sm:flex hidden">
            <ProductCard hideCart={hideCart} disableCard={disableCard} product={product} hideSeller={hideSeller} addToCart={addToCart}/>
        </div>
        <div className = "sm:hidden flex">
            <HorCard hideCart={hideCart} disableCard={disableCard} product={product} hideSeller={hideSeller} addToCart={addToCart}/>
        </div>
        </main>
    )
}
import ProductCard from "./ProductCard";
import { Button } from "./ui/button";

export default function CartCard() {
    return (
        <div className = "border rounded-lg hover:shadow-md transition-all duration-75">
           <ProductCard />
           <div className = "flex flex-row justify-between m-4">
                <Button className = "bg-gray-200" variant = "outline">
                    <div>Delete</div>
                </Button>
           </div>
        </div>
    )
}
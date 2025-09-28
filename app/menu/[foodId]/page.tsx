import { Metadata } from "next"
import { Suspense } from "react"
import FoodDetail from "@/components/food-detail"

export const metadata:Metadata ={
    title:"Food Detail"
}

const FoodDetailPage = async ({ params }: { params: { foodId: string } }) => {
    const { foodId } = params; // destructure langsung
    return (
        <div className="mt-16">
        <Suspense fallback={<p>Loading...</p>}>
            <FoodDetail foodId={foodId}/>
        </Suspense>
        
    </div>
  )
}

export default FoodDetailPage
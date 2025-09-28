import { Metadata } from "next"
import { Suspense } from "react"
import FoodDetail from "@/components/food-detail"

export const metadata:Metadata = {
  title:"Food Detail"
}

const FoodDetailPage = async({
  params
}:{
  params: Promise<{foodId: string}>
}) => {
    const foodId= (await params).foodId;

  return (
    <div className="mt-16">
      <Suspense fallback={<p>Loading...</p>}>
        <FoodDetail foodId={foodId}/>
      </Suspense>
      
    </div>
  )
}

export default FoodDetailPage 
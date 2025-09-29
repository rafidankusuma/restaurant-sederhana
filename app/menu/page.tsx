import { Metadata } from "next"
import { Suspense } from "react"
import HeaderSection from "@/components/header-section"
import Main from "@/components/main"
import FoodSkeleton from "@/components/skeletons/food-skeleton"

export const metadata:Metadata = {
    title: "Foods & Rates",
    description: "Choose your best food today",
} 

const MenuPage = () => {
  return (
    <div>
        <HeaderSection 
        title="Foods" 
        subTitle="Lorem ipsum dolor sit amet."
        />
        <div className="mt-10 px-4">
            <Suspense fallback={<FoodSkeleton />}>
                <Main/>
            </Suspense>
        </div> 
    </div>
  ) 
}

export default MenuPage
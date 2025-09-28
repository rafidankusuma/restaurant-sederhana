import Link from "next/link"
import FoodTable from "@/components/admin/food/food-table"
import { Suspense } from "react"

const FoodPage = () => {
  return (
    <div className="max-w-screen-xl px-4 py-16 mt-10 mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-gray-800">Food list</h1>
        <Link href="/admin/food/create" className="bg-orange-400 px-6 py-2.5 hover:bg-orange-500 text-white font-bold"
        >
          Create New
        </Link>
      </div>
      <Suspense fallback={<p>Loading Data...</p>}>
        <FoodTable />
      </Suspense>
    </div>
  )
}

export default FoodPage
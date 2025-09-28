import Card from "@/components/card"
import { getFoods } from "@/lib/data"
import { notFound } from "next/navigation"

const Main = async () => {
  const foods = await getFoods();
  if(!foods) return notFound();

  return (
    <div className="max-w-screen-xl py-6 pb-20 px-4 mx-auto">
        <div className="grid gap-7 md:grid-cols-3">
          {foods.map((food) => (
            <Card food={food} key={food.id}/>
          ))}
            
        </div>
    </div>
  )
}

export default Main 
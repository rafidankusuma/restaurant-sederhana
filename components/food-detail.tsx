import Image from "next/image";
import { getFoodDetailById } from "@/lib/data";
import { notFound } from "next/navigation";
import { IoCheckmark, IoPeopleOutline } from "react-icons/io5";
import { formatCurrency } from "@/lib/utils";
import ReserveForm from "@/components/reserve-form";

const FoodDetail = async ({ foodId }: { foodId: string }) => {
    const food = await getFoodDetailById(foodId);
    if (!food) return notFound();

    return (
        <div className="max-w-screen-xl py-16 px-4 grid lg:grid-cols-12 gap-8 mx-auto">
            <div className="md:col-span-8">
                <Image src={food.image} alt={food.name} width={770} height={430} priority
                    className="w-full rounded-sm mb-8" />
                <h1 className="text-5xl font-semibold text-gray-900 mb-8">{food.name}</h1>
                <p>{food.description}</p>
                <h5 className="text-lg font-bold py-1 mt-1">Amenities:</h5>
                <div className="grid md:grid-cols-3">
                    {food.FoodAmenities.map((item) => (
                        <div className="flex gap-1 py-1" key={item.id}>
                            <IoCheckmark className="size-5" />
                            <span>{item.Amenities.name}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="md:col-span-4">
                <div className="border-2 border-gray-300 border-dashed px-3 py-5 bg-slate-50 rounded-md">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center space-x-2">
                            <IoPeopleOutline className="size-4" />
                            <span>
                                {food.capacity} {food.capacity === 1 ? "person" : "people"}
                            </span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-2xl font-semibold text-gray-600">{formatCurrency(food.price)}</span>
                            <span className="text-gray-400 text-sm">/Porsi</span>
                        </div>
                    </div>
                    {/* Resevation Form */}
                    <ReserveForm food={food}/>
                </div>
            </div>
        </div>
    )
}

export default FoodDetail
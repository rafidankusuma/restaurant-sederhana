import { getFoods } from "@/lib/data"
import Image from "next/image";
import { formatDate, formatCurrency } from "@/lib/utils";
import { DeleteButton, EditButton } from "@/components/admin/food/button";

const FoodTable = async () => {
    const foods = await getFoods();
    if (!foods?.length) return <p>No Food Found</p>
    return (
        <div className='bg-white p-4 mt-5 shadow-sm'>
            <table className='w-full divide-y divide-gray-200'>
                <thead>
                    <tr>
                        <th className='px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase 
                    text-left'>Image</th>
                        <th className='px-6 py-3 text-sm font-bold text-gray-700 uppercase 
                    text-left'>Food Name</th>
                        <th className='px-6 py-3 text-sm font-bold text-gray-700 uppercase 
                    text-left'>Price</th>
                        <th className='px-6 py-3 text-sm font-bold text-gray-700 uppercase 
                    text-left'>Created At</th>
                        <th className='px-6 py-3 text-sm font-bold text-gray-700 uppercase'>Action</th>
                    </tr>
                </thead>
                <tbody className='divide-y divide-gray-200'>
                    {foods.map((food) => (
                        <tr className='hover:bg-gray-100' key={food.id}>
                            <td className='px-6 py-4'>
                                <div className="h-20 w-32 relative">
                                    <Image src={food.image} fill sizes="20vw" alt="food image"
                                        className="object-cover" />
                                </div>
                            </td>
                            <td className='px-6 py-4'>{food.name}</td>
                            <td className='px-6 py-4'>{formatCurrency(food.price)}</td>
                            <td className='px-6 py-4'>{formatDate(food.createdAt.toString())}</td>
                            <td className='px-6 py-4 text-right'>
                                <div className="flex items-center justify-center gap-1">
                                    <EditButton id={food.id} />
                                    <DeleteButton id={food.id} image={food.image} />
                                </div>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default FoodTable
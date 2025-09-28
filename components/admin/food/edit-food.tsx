
import EditForm from "@/components/admin/food/edit-form";
import { getAmenities, getFoodById } from "@/lib/data"
import { notFound } from "next/navigation";

const EditFood = async ({ foodId }: { foodId: string }) => {
    const [amenities, food] = await Promise.all([getAmenities(), getFoodById(foodId)]);
    if (!amenities || !food) return notFound();

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Edit a Food</h1>
            <EditForm amenities={amenities} food={food} />
        </div>
    )
}

export default EditFood
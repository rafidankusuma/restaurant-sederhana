import CreateForm from "@/components/admin/food/create-form"
import { getAmenities } from "@/lib/data"

const CreateFood = async () => {
    const amenities = await getAmenities();
    if (!amenities) return null;

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Create New Food</h1>
            <CreateForm amenities={amenities} />
        </div>
    )
}

export default CreateFood
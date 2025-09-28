import { IoTrashOutline, IoPencil } from "react-icons/io5";
import { deleteFood } from "@/lib/actions";
import Link from "next/link";

export const EditButton = ({ id }: { id: string }) => {
    return (
        <Link href={`/admin/food/edit/${id}`} className="rounded-sm p-1 hover:bg-gray-200">
            <IoPencil className="size-5"/>
        </Link>
    )
}

export const DeleteButton = ({ id, image }: { id: string; image: string }) => {
    const DeleteFoodWithId = deleteFood.bind(null, id, image);
    return (
        <form action={DeleteFoodWithId}>
            <button type="submit" className="rounded-sm p-1 hover:bg-gray-200 cursor-pointer">
                <IoTrashOutline className="size-5" />
            </button>
        </form>
    )
}
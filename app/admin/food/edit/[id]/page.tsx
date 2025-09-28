import { notFound } from 'next/navigation';
import EditFood from '@/components/admin/food/edit-food';
import { Suspense } from 'react';

const UpdateFoodPage = async ({
    params
}: {
    params: Promise<{ id: string }>
}) => {
    const foodId = (await params).id;
    if (!foodId) return notFound();

    return (
        <div className='max-w-screen-xl px-4 py-16 mt-10 mx-auto'>
            <Suspense fallback={<p>Loading...</p>}>
                <EditFood foodId={foodId} />
            </Suspense>
        </div>
    )
}

export default UpdateFoodPage
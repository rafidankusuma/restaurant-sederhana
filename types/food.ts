import { Prisma } from "@prisma/client";

export type FoodProps = Prisma.FoodGetPayload<{
    include: { FoodAmenities: { select: { amenitiesId: true } } };
}>;

export type FoodDetailProps = Prisma.FoodGetPayload<{
    include: {
        FoodAmenities: {
            include: {
                Amenities: {
                    select: {
                        name: true,
                    }
                }
            }
        }
    }
}>
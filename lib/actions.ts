"use server";

import { prisma } from "@/lib/prisma";
import { ContactSchema, FoodSchema, ReserveSchema } from "@/lib/zod";
import { redirect } from "next/navigation";
import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { TbX } from "react-icons/tb";

export const saveFood = async (image: string, prevState: unknown, formData: FormData) => {
    if (!image) return { message: "Image is Required." }

    const rawData = {
        name: formData.get("name"),
        description: formData.get("description"),
        capacity: formData.get("capacity"),
        price: formData.get("price"),
        amenities: formData.getAll("amenities")
    };

    const validatedFields = FoodSchema.safeParse(rawData);
    if (!validatedFields.success) {
        return { error: validatedFields.error.flatten().fieldErrors }
    }

    const { name, description, price, capacity, amenities } = validatedFields.data;

    try {
        await prisma.food.create({
            data: {
                name,
                description,
                image,
                price,
                capacity,
                FoodAmenities: {
                    createMany: {
                        data: amenities.map((item) => ({
                            amenitiesId: item
                        }))
                    }
                }
            }
        })
    } catch (error) {
        console.log(error);
    }
    redirect("/admin/food");
};

export const ContactMessage = async (prevState: unknown, formData: FormData) => {
    const validatedFields = ContactSchema.safeParse(Object.fromEntries(formData.entries()))

    if (!validatedFields.success) {
        return { error: validatedFields.error.flatten().fieldErrors };
    }

    const { name, email, subject, message } = validatedFields.data;

    try {
        await prisma.contact.create({
            data: {
                name,
                email,
                subject,
                message
            }
        });
        return { message: "Thanks for contact us." }
    } catch (error) {
        console.log(error);

    }
}

// Delete Room
export const deleteFood = async (id: string, image: string) => {
    try {
        await del(image);
        await prisma.food.delete({
            where: { id }
        })
    } catch (error) {
        console.log(error);
    }
    revalidatePath("/admin/food");
}

//Update Room
export const updateFood = async (
    image: string,
    foodId: string,
    prevState: unknown,
    formData: FormData
) => {
    if (!image) return { message: "Image is Required." }

    const rawData = {
        name: formData.get("name"),
        description: formData.get("description"),
        capacity: formData.get("capacity"),
        price: formData.get("price"),
        amenities: formData.getAll("amenities")
    };

    const validatedFields = FoodSchema.safeParse(rawData);
    if (!validatedFields.success) {
        return { error: validatedFields.error.flatten().fieldErrors }
    }

    const { name, description, price, capacity, amenities } = validatedFields.data;

    try {
        await prisma.$transaction([
            prisma.food.update({
                where: { id: foodId },
                data: {
                    name,
                    description,
                    image,
                    price,
                    capacity,
                    FoodAmenities: {
                        deleteMany: {}
                    }
                }
            }),
            prisma.foodAmenities.createMany({
                data: amenities.map((item) => ({
                    foodId,
                    amenitiesId: item
                }))
            })
        ])
    } catch (error) {
        console.log(error);
    }
    revalidatePath("/admin/food");
    redirect("/admin/food");
};


export const createReserve = async (
    foodId: string,
    price: number,
    prevState: unknown,
    formData: FormData
) => {
    const session = await auth();
    if (!session || !session.user || !session.user.id) redirect(`/signin?redirect_url=menu/${foodId}`);

    const rawData = {
        name: formData.get("name"),
        phone: formData.get("phone"),
        address: formData.get("address"),
    }

    const validatedFields = ReserveSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors
        }
    }

    const {name, phone} = validatedFields.data
    const night = Number(formData.get("night"));
    if(night <= 0) return {messageDate: "Date mush be at least 1 night"}
    const total = night * price;

    let reservationId;
    try {
        await prisma.$transaction(async (tx) => {
            await tx.user.update({
                data: {
                    name,
                    phone,
                },
                where: { id: session.user.id }
            });
            const reservation = await tx.reservation.create({
                data: {
                    startDate: new Date(),                  // misalnya default hari ini
                    endDate: new Date(Date.now() + 86400000), // contoh +1 hari
                    price: price,
                    foodId: foodId,
                    userId: session.user.id as string,
                    Payment:{
                        create:{
                            amount: total
                        }
                    }
                }
            })
            reservationId =  reservation.id;
        })
    } catch (error) {
        console.log(error);
    }
    redirect(`/checkout/${reservationId}`);
}

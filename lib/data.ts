import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const getAmenities = async () => {
    const session = await auth();
    if (!session || !session.user) {
        throw new Error("Unauthorized Access");
    }
    try {
        const result = await prisma.amenities.findMany();
        return result;
    } catch (error) {
        console.log(error);
    }
}

export const getFoods = async () => {
    try {
        const result = await prisma.food.findMany({
            orderBy: { createdAt: "desc" },
        });
        return result;
    } catch (error) {
        console.log(error);
    }
}

export const getFoodById = async (foodId: string) => {
    try {
        const result = await prisma.food.findUnique({
            where: { id: foodId },
            include: { FoodAmenities: { select: { amenitiesId: true } } }
        });
        return result;
    } catch (error) {
        console.log(error);
    }
}

export const getFoodDetailById = async (foodId: string) => {
    try {
        const result = await prisma.food.findUnique({
            where: { id: foodId },
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
        });
        return result;
    } catch (error) {
        console.log(error);
    }
}

export const getReservationById = async (id: string) => {
    try {
        const result = await prisma.reservation.findUnique({
            where: { id },
            include: {
                Food: {
                    select: {
                        name: true,
                        image: true,
                        price: true
                    }
                },
                User: {
                    select: {
                        name: true,
                        email: true,
                        phone: true
                    }
                },
                Payment: true,
            },
        });
        return result;
    } catch (error) {
        console.log(error);
    }
}

export const getReservationByUserId = async () => {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
        throw new Error("Unauthorized Access");
    }
    try {
        const result = await prisma.reservation.findMany({
            where: { userId: session.user.id },
            include: {
                Food: {
                    select: {
                        name: true,
                        image: true,
                        price: true
                    }
                },
                User: {
                    select: {
                        name: true,
                        email: true,
                        phone: true
                    }
                },
                Payment: true
            },
            orderBy: { createdAt: "desc" },
        });
        return result;
    } catch (error) {
        console.log(error);
    }
}

export const getRevenueAndReserve = async () => {
    try {
        const result = await prisma.reservation.aggregate({
            _count: true,
            _sum: { price: true },
            where: {
                Payment: { status: { not: "failure" } },
            },
        });
        return {
            revenue: result._sum.price || 0,
            reserve: result._count,
        };
    } catch (error) {
        console.log(error);
    }
}

export const getTotalCustomers = async () => {
    try {
        const result = await prisma.reservation.findMany({
            distinct: ["userId"],
            where: {
                Payment: { status: { not: "failure" } },
            },
            select: { userId: true }
        });
        return result;
    } catch (error) {
        console.log(error);
    }
}

export const getReservations = async () => {
    const session = await auth();
    if (!session || !session.user || !session.user.id || session.user.role !== "admin") {
        throw new Error("Unauthorized Access");
    }
    try {
        const result = await prisma.reservation.findMany({
            include: {
                Food: {
                    select: {
                        name: true,
                        image: true,
                        price: true
                    }
                },
                User: {
                    select: {
                        name: true,
                        email: true,
                        phone: true
                    }
                },
                Payment: true
            },
            orderBy: { createdAt: "desc" },
        });
        return result;
    } catch (error) {
        console.log(error);
    }
} 
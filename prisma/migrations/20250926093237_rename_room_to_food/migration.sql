/*
  Warnings:

  - You are about to drop the column `roomId` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the `Room` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RoomAmenities` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `foodId` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Reservation" DROP CONSTRAINT "Reservation_roomId_fkey";

-- DropForeignKey
ALTER TABLE "public"."RoomAmenities" DROP CONSTRAINT "RoomAmenities_amenitiesId_fkey";

-- DropForeignKey
ALTER TABLE "public"."RoomAmenities" DROP CONSTRAINT "RoomAmenities_roomId_fkey";

-- AlterTable
ALTER TABLE "public"."Reservation" DROP COLUMN "roomId",
ADD COLUMN     "foodId" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."Room";

-- DropTable
DROP TABLE "public"."RoomAmenities";

-- CreateTable
CREATE TABLE "public"."Food" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "capacity" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Food_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."FoodAmenities" (
    "id" TEXT NOT NULL,
    "foodId" TEXT NOT NULL,
    "amenitiesId" TEXT NOT NULL,

    CONSTRAINT "FoodAmenities_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."FoodAmenities" ADD CONSTRAINT "FoodAmenities_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "public"."Food"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FoodAmenities" ADD CONSTRAINT "FoodAmenities_amenitiesId_fkey" FOREIGN KEY ("amenitiesId") REFERENCES "public"."Amenities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Reservation" ADD CONSTRAINT "Reservation_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "public"."Food"("id") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `servings` on the `Food` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Food" DROP COLUMN "servings",
ADD COLUMN     "capacity" INTEGER NOT NULL DEFAULT 1;

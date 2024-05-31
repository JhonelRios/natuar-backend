/*
  Warnings:

  - Added the required column `average_age` to the `Animal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `diet` to the `Animal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gestation` to the `Animal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `habitat` to the `Animal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `height` to the `Animal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitude` to the `Animal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Animal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `model_name` to the `Animal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scientific_name` to the `Animal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weigth` to the `Animal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `picture` to the `Spot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Animal" ADD COLUMN     "average_age" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "diet" TEXT NOT NULL DEFAULT 'Uk',
ADD COLUMN     "gestation" TEXT NOT NULL DEFAULT 'Uk',
ADD COLUMN     "habitat" TEXT NOT NULL DEFAULT 'Uk',
ADD COLUMN     "height" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "model_name" TEXT NOT NULL DEFAULT 'Uk',
ADD COLUMN     "scientific_name" TEXT NOT NULL DEFAULT 'Uk',
ADD COLUMN     "weigth" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Spot" ADD COLUMN     "images" TEXT[] DEFAULT '{}',
ADD COLUMN     "picture" TEXT NOT NULL DEFAULT 'Uk';

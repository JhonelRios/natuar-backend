-- AlterTable
ALTER TABLE "Animal" ALTER COLUMN "average_age" DROP DEFAULT,
ALTER COLUMN "diet" DROP DEFAULT,
ALTER COLUMN "gestation" DROP DEFAULT,
ALTER COLUMN "habitat" DROP DEFAULT,
ALTER COLUMN "height" DROP DEFAULT,
ALTER COLUMN "latitude" DROP DEFAULT,
ALTER COLUMN "longitude" DROP DEFAULT,
ALTER COLUMN "model_name" DROP DEFAULT,
ALTER COLUMN "scientific_name" DROP DEFAULT,
ALTER COLUMN "weigth" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Spot" ALTER COLUMN "images" DROP DEFAULT,
ALTER COLUMN "picture" DROP DEFAULT;

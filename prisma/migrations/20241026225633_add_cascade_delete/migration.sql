-- DropForeignKey
ALTER TABLE "FavoriteAnimal" DROP CONSTRAINT "FavoriteAnimal_touristId_fkey";

-- DropForeignKey
ALTER TABLE "SeenAnimal" DROP CONSTRAINT "SeenAnimal_touristId_fkey";

-- AddForeignKey
ALTER TABLE "FavoriteAnimal" ADD CONSTRAINT "FavoriteAnimal_touristId_fkey" FOREIGN KEY ("touristId") REFERENCES "Tourist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeenAnimal" ADD CONSTRAINT "SeenAnimal_touristId_fkey" FOREIGN KEY ("touristId") REFERENCES "Tourist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

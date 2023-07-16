/*
  Warnings:

  - The `rating` column on the `Business` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `testimonial` column on the `Business` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `rating` column on the `Developer` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `testimonial` column on the `Developer` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Business" DROP COLUMN "rating",
ADD COLUMN     "rating" INTEGER[],
DROP COLUMN "testimonial",
ADD COLUMN     "testimonial" TEXT[];

-- AlterTable
ALTER TABLE "Developer" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "rating",
ADD COLUMN     "rating" INTEGER[],
DROP COLUMN "testimonial",
ADD COLUMN     "testimonial" TEXT[];

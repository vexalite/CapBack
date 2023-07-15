-- AlterTable
ALTER TABLE "Business" ADD COLUMN     "logoUrl" TEXT NOT NULL DEFAULT 'https://unsplash.it/300/301',
ADD COLUMN     "rating" INTEGER,
ADD COLUMN     "testimonial" TEXT;

-- AlterTable
ALTER TABLE "Developer" ADD COLUMN     "imageUrl" TEXT NOT NULL DEFAULT 'https://unsplash.it/300/301',
ADD COLUMN     "price" INTEGER NOT NULL DEFAULT 5,
ADD COLUMN     "rating" INTEGER,
ADD COLUMN     "testimonial" TEXT,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "price" INTEGER NOT NULL DEFAULT 5,
ADD COLUMN     "team" TEXT[];

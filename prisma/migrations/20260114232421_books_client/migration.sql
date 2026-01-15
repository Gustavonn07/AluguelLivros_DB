/*
  Warnings:

  - You are about to drop the column `author_id` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `publication_date` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `publiseher` on the `Book` table. All the data in the column will be lost.
  - You are about to alter the column `isbn` on the `Book` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(13)`.
  - The primary key for the `Client` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `client_id` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[isbn]` on the table `Book` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `publication_year` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publisher` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_author_id_fkey";

-- DropForeignKey
ALTER TABLE "Rental" DROP CONSTRAINT "Rental_client_id_fkey";

-- DropIndex
DROP INDEX "Client_cpf_key";

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "author_id",
DROP COLUMN "publication_date",
DROP COLUMN "publiseher",
ADD COLUMN     "publication_year" INTEGER NOT NULL,
ADD COLUMN     "publisher" TEXT NOT NULL,
ALTER COLUMN "isbn" SET DATA TYPE VARCHAR(13);

-- AlterTable
ALTER TABLE "Client" DROP CONSTRAINT "Client_pkey",
DROP COLUMN "client_id",
ADD CONSTRAINT "Client_pkey" PRIMARY KEY ("cpf");

-- AlterTable
ALTER TABLE "Rental" ALTER COLUMN "client_id" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "User";

-- DropEnum
DROP TYPE "Role";

-- CreateIndex
CREATE UNIQUE INDEX "Book_isbn_key" ON "Book"("isbn");

-- AddForeignKey
ALTER TABLE "Rental" ADD CONSTRAINT "Rental_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Client"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;

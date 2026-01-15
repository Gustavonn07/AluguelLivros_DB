/*
  Warnings:

  - The primary key for the `Author` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `author_id` on the `Author` table. All the data in the column will be lost.
  - The primary key for the `Book` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `book_id` on the `Book` table. All the data in the column will be lost.
  - The primary key for the `Copy` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `book_id` on the `Copy` table. All the data in the column will be lost.
  - You are about to drop the column `copy_id` on the `Copy` table. All the data in the column will be lost.
  - The primary key for the `Rental` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `client_id` on the `Rental` table. All the data in the column will be lost.
  - You are about to drop the column `copy_id` on the `Rental` table. All the data in the column will be lost.
  - You are about to drop the column `rental_id` on the `Rental` table. All the data in the column will be lost.
  - Added the required column `bookId` to the `Copy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientCpf` to the `Rental` table without a default value. This is not possible if the table is not empty.
  - Added the required column `copyId` to the `Rental` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Copy" DROP CONSTRAINT "Copy_book_id_fkey";

-- DropForeignKey
ALTER TABLE "Rental" DROP CONSTRAINT "Rental_client_id_fkey";

-- DropForeignKey
ALTER TABLE "Rental" DROP CONSTRAINT "Rental_copy_id_fkey";

-- AlterTable
ALTER TABLE "Author" DROP CONSTRAINT "Author_pkey",
DROP COLUMN "author_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Author_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Book" DROP CONSTRAINT "Book_pkey",
DROP COLUMN "book_id",
ADD COLUMN     "authorId" INTEGER,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Book_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Copy" DROP CONSTRAINT "Copy_pkey",
DROP COLUMN "book_id",
DROP COLUMN "copy_id",
ADD COLUMN     "bookId" INTEGER NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Copy_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Rental" DROP CONSTRAINT "Rental_pkey",
DROP COLUMN "client_id",
DROP COLUMN "copy_id",
DROP COLUMN "rental_id",
ADD COLUMN     "clientCpf" TEXT NOT NULL,
ADD COLUMN     "copyId" INTEGER NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Rental_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Copy" ADD CONSTRAINT "Copy_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rental" ADD CONSTRAINT "Rental_clientCpf_fkey" FOREIGN KEY ("clientCpf") REFERENCES "Client"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rental" ADD CONSTRAINT "Rental_copyId_fkey" FOREIGN KEY ("copyId") REFERENCES "Copy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

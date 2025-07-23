/*
  Warnings:

  - Added the required column `subheading` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "image" TEXT,
ADD COLUMN     "subheading" TEXT NOT NULL;

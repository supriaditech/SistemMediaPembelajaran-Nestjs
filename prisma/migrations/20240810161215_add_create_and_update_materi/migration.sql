/*
  Warnings:

  - Added the required column `createdAt` to the `materis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `materis` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `materis` ADD COLUMN `createdAt` DATETIME(3) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

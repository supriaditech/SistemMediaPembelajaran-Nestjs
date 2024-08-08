/*
  Warnings:

  - You are about to drop the column `userId` on the `admins` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `gurus` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `murids` table. All the data in the column will be lost.
  - You are about to drop the column `photo` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[adminId]` on the table `admins` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[guruId]` on the table `gurus` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[muridId]` on the table `murids` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `adminId` to the `admins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guruId` to the `gurus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `muridId` to the `murids` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `admins` DROP FOREIGN KEY `admins_userId_fkey`;

-- DropForeignKey
ALTER TABLE `gurus` DROP FOREIGN KEY `gurus_userId_fkey`;

-- DropForeignKey
ALTER TABLE `murids` DROP FOREIGN KEY `murids_userId_fkey`;

-- AlterTable
ALTER TABLE `admins` DROP COLUMN `userId`,
    ADD COLUMN `adminId` INTEGER NOT NULL,
    ADD COLUMN `photo` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `gurus` DROP COLUMN `userId`,
    ADD COLUMN `guruId` INTEGER NOT NULL,
    ADD COLUMN `photo` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `murids` DROP COLUMN `userId`,
    ADD COLUMN `muridId` INTEGER NOT NULL,
    ADD COLUMN `photo` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `photo`;

-- CreateIndex
CREATE UNIQUE INDEX `admins_adminId_key` ON `admins`(`adminId`);

-- CreateIndex
CREATE UNIQUE INDEX `gurus_guruId_key` ON `gurus`(`guruId`);

-- CreateIndex
CREATE UNIQUE INDEX `murids_muridId_key` ON `murids`(`muridId`);

-- AddForeignKey
ALTER TABLE `admins` ADD CONSTRAINT `admins_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `gurus` ADD CONSTRAINT `gurus_guruId_fkey` FOREIGN KEY (`guruId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `murids` ADD CONSTRAINT `murids_muridId_fkey` FOREIGN KEY (`muridId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

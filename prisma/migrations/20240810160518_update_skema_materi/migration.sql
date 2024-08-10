/*
  Warnings:

  - Made the column `videoUrl` on table `materis` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `materiId` to the `soals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `materis` MODIFY `videoUrl` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `soals` ADD COLUMN `materiId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `soals` ADD CONSTRAINT `soals_materiId_fkey` FOREIGN KEY (`materiId`) REFERENCES `materis`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

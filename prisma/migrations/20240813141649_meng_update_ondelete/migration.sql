-- DropForeignKey
ALTER TABLE `jawabans` DROP FOREIGN KEY `jawabans_muridId_fkey`;

-- DropForeignKey
ALTER TABLE `jawabans` DROP FOREIGN KEY `jawabans_soalId_fkey`;

-- DropForeignKey
ALTER TABLE `options` DROP FOREIGN KEY `options_soalId_fkey`;

-- DropForeignKey
ALTER TABLE `soals` DROP FOREIGN KEY `soals_guruId_fkey`;

-- DropForeignKey
ALTER TABLE `soals` DROP FOREIGN KEY `soals_materiId_fkey`;

-- AddForeignKey
ALTER TABLE `soals` ADD CONSTRAINT `soals_guruId_fkey` FOREIGN KEY (`guruId`) REFERENCES `gurus`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `soals` ADD CONSTRAINT `soals_materiId_fkey` FOREIGN KEY (`materiId`) REFERENCES `materis`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `options` ADD CONSTRAINT `options_soalId_fkey` FOREIGN KEY (`soalId`) REFERENCES `soals`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `jawabans` ADD CONSTRAINT `jawabans_soalId_fkey` FOREIGN KEY (`soalId`) REFERENCES `soals`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `jawabans` ADD CONSTRAINT `jawabans_muridId_fkey` FOREIGN KEY (`muridId`) REFERENCES `murids`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

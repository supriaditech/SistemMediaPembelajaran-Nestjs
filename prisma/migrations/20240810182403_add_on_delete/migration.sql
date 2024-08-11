-- DropForeignKey
ALTER TABLE `gurus` DROP FOREIGN KEY `gurus_guruId_fkey`;

-- DropForeignKey
ALTER TABLE `materis` DROP FOREIGN KEY `materis_guruId_fkey`;

-- DropForeignKey
ALTER TABLE `murids` DROP FOREIGN KEY `murids_muridId_fkey`;

-- AddForeignKey
ALTER TABLE `gurus` ADD CONSTRAINT `gurus_guruId_fkey` FOREIGN KEY (`guruId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `murids` ADD CONSTRAINT `murids_muridId_fkey` FOREIGN KEY (`muridId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `materis` ADD CONSTRAINT `materis_guruId_fkey` FOREIGN KEY (`guruId`) REFERENCES `gurus`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

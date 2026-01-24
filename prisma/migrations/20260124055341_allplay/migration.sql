/*
  Warnings:

  - A unique constraint covering the columns `[club_id,user_id]` on the table `join_request` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `sport_facilities` ADD COLUMN `operating_hours` VARCHAR(15) NULL;

-- CreateTable
CREATE TABLE `facility_photos` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `facility_id` BIGINT NOT NULL,
    `facility_photo_url` VARCHAR(255) NULL,
    `uploaded_at` DATETIME(6) NULL DEFAULT CURRENT_TIMESTAMP(6),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `join_request_club_id_user_id_key` ON `join_request`(`club_id`, `user_id`);

-- AddForeignKey
ALTER TABLE `facility_photos` ADD CONSTRAINT `facility_photos_facility_id_fkey` FOREIGN KEY (`facility_id`) REFERENCES `sport_facilities`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

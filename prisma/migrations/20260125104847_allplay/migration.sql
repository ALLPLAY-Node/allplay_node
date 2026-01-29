/*
  Warnings:

  - You are about to drop the column `photo_url` on the `sport_facilities` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `sport_facilities` DROP COLUMN `photo_url`,
    ADD COLUMN `is_public` BOOLEAN NULL DEFAULT false;

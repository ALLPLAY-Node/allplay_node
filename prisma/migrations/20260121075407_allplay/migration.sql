/*
  Warnings:

  - A unique constraint covering the columns `[club_id,user_id]` on the table `join_request` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `join_request_club_id_user_id_key` ON `join_request`(`club_id`, `user_id`);

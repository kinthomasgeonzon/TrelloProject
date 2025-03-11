/*
  Warnings:

  - You are about to drop the column `password_reset_token` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `password_reset_token`,
    ADD COLUMN `passwordResetToken` VARCHAR(191) NULL;

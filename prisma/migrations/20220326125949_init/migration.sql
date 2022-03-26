/*
  Warnings:

  - You are about to drop the `Channel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Video` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Channel`;

-- DropTable
DROP TABLE `Video`;

-- CreateTable
CREATE TABLE `LbryUrlMap` (
    `id` VARCHAR(191) NOT NULL,
    `lbryUrl` VARCHAR(191) NOT NULL,
    `scrapDate` BIGINT NOT NULL,
    `type` ENUM('Video', 'Channel') NOT NULL,
    `profilePublicKey` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `LbryUrlMap_id_lbryUrl_key`(`id`, `lbryUrl`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Profile` (
    `publicKey` VARCHAR(191) NOT NULL,
    `nickname` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`publicKey`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `LbryUrlMap` ADD CONSTRAINT `LbryUrlMap_profilePublicKey_fkey` FOREIGN KEY (`profilePublicKey`) REFERENCES `Profile`(`publicKey`) ON DELETE RESTRICT ON UPDATE CASCADE;

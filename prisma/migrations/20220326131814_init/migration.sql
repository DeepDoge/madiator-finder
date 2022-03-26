-- CreateTable
CREATE TABLE `LbryUrlMap` (
    `id` VARCHAR(191) NOT NULL,
    `lbryUrl` VARCHAR(191) NOT NULL,
    `scrapDate` BIGINT NOT NULL,
    `type` ENUM('Video', 'Channel') NOT NULL,
    `profilePublicKey` VARCHAR(191) NULL,

    INDEX `LbryUrlMap_type_idx`(`type`),
    INDEX `LbryUrlMap_type_id_idx`(`type`, `id`),
    INDEX `LbryUrlMap_profilePublicKey_idx`(`profilePublicKey`),
    INDEX `LbryUrlMap_profilePublicKey_type_idx`(`profilePublicKey`, `type`),
    UNIQUE INDEX `LbryUrlMap_id_lbryUrl_key`(`id`, `lbryUrl`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Profile` (
    `publicKey` VARCHAR(191) NOT NULL,
    `nickname` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`publicKey`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `LbryUrlMap` ADD CONSTRAINT `LbryUrlMap_profilePublicKey_fkey` FOREIGN KEY (`profilePublicKey`) REFERENCES `Profile`(`publicKey`) ON DELETE SET NULL ON UPDATE CASCADE;

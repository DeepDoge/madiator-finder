/*
  Warnings:

  - The primary key for the `LbryUrlMap` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `_id` on the `LbryUrlMap` table. All the data in the column will be lost.
  - The primary key for the `Profile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `_id` on the `Profile` table. All the data in the column will be lost.
  - Added the required column `id` to the `LbryUrlMap` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publicKey` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "LbryUrlMap" DROP CONSTRAINT "LbryUrlMap_profilePublicKey_fkey";

-- DropIndex
DROP INDEX "LbryUrlMap__id_lbryUrl_key";

-- DropIndex
DROP INDEX "LbryUrlMap_type__id_idx";

-- AlterTable
ALTER TABLE "LbryUrlMap" DROP CONSTRAINT "LbryUrlMap_pkey",
DROP COLUMN "_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "LbryUrlMap_pkey" PRIMARY KEY ("id", "lbryUrl");

-- AlterTable
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_pkey",
DROP COLUMN "_id",
ADD COLUMN     "publicKey" TEXT NOT NULL,
ADD CONSTRAINT "Profile_pkey" PRIMARY KEY ("publicKey");

-- CreateIndex
CREATE INDEX "LbryUrlMap_type_id_idx" ON "LbryUrlMap"("type", "id");

-- AddForeignKey
ALTER TABLE "LbryUrlMap" ADD CONSTRAINT "LbryUrlMap_profilePublicKey_fkey" FOREIGN KEY ("profilePublicKey") REFERENCES "Profile"("publicKey") ON DELETE SET NULL ON UPDATE CASCADE;

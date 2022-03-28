-- CreateEnum
CREATE TYPE "LbryUrlType" AS ENUM ('Video', 'Channel');

-- CreateTable
CREATE TABLE "LbryUrlMap" (
    "_id" TEXT NOT NULL,
    "lbryUrl" TEXT NOT NULL,
    "scrapDate" BIGINT NOT NULL,
    "type" "LbryUrlType" NOT NULL,
    "profilePublicKey" TEXT,

    CONSTRAINT "LbryUrlMap_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "_id" TEXT NOT NULL,
    "nickname" TEXT,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("_id")
);

-- CreateIndex
CREATE INDEX "LbryUrlMap_type_idx" ON "LbryUrlMap"("type");

-- CreateIndex
CREATE INDEX "LbryUrlMap_type__id_idx" ON "LbryUrlMap"("type", "_id");

-- CreateIndex
CREATE INDEX "LbryUrlMap_profilePublicKey_idx" ON "LbryUrlMap"("profilePublicKey");

-- CreateIndex
CREATE INDEX "LbryUrlMap_profilePublicKey_type_idx" ON "LbryUrlMap"("profilePublicKey", "type");

-- CreateIndex
CREATE UNIQUE INDEX "LbryUrlMap__id_lbryUrl_key" ON "LbryUrlMap"("_id", "lbryUrl");

-- AddForeignKey
ALTER TABLE "LbryUrlMap" ADD CONSTRAINT "LbryUrlMap_profilePublicKey_fkey" FOREIGN KEY ("profilePublicKey") REFERENCES "Profile"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

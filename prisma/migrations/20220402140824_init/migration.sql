-- CreateEnum
CREATE TYPE "LbryUrlType" AS ENUM ('Video', 'Channel');

-- CreateTable
CREATE TABLE "LbryUrlMap" (
    "id" TEXT NOT NULL,
    "lbryUrl" TEXT NOT NULL,
    "scrapDate" BIGINT NOT NULL,
    "type" "LbryUrlType" NOT NULL,
    "profilePublicKey" TEXT,

    CONSTRAINT "LbryUrlMap_pkey" PRIMARY KEY ("id","lbryUrl")
);

-- CreateTable
CREATE TABLE "Profile" (
    "publicKey" TEXT NOT NULL,
    "nickname" TEXT,
    "score" BIGINT NOT NULL DEFAULT 0,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("publicKey")
);

-- CreateIndex
CREATE INDEX "LbryUrlMap_type_idx" ON "LbryUrlMap"("type");

-- CreateIndex
CREATE INDEX "LbryUrlMap_type_id_idx" ON "LbryUrlMap"("type", "id");

-- CreateIndex
CREATE INDEX "LbryUrlMap_profilePublicKey_idx" ON "LbryUrlMap"("profilePublicKey");

-- CreateIndex
CREATE INDEX "LbryUrlMap_profilePublicKey_type_idx" ON "LbryUrlMap"("profilePublicKey", "type");

-- AddForeignKey
ALTER TABLE "LbryUrlMap" ADD CONSTRAINT "LbryUrlMap_profilePublicKey_fkey" FOREIGN KEY ("profilePublicKey") REFERENCES "Profile"("publicKey") ON DELETE SET NULL ON UPDATE CASCADE;

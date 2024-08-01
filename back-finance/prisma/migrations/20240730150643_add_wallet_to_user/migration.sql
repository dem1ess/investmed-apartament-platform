-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('PENDING', 'COMPLETE', 'ERROR', 'CANCELLED', 'EXPIRED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,
    "google_id" TEXT,
    "role" "Role" NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "documet_type" TEXT,
    "country" TEXT,
    "document_photo1_url" TEXT,
    "document_photo2_url" TEXT,
    "selfie_url" TEXT,
    "is_verif" BOOLEAN NOT NULL,
    "is_email_verif" BOOLEAN NOT NULL DEFAULT false,
    "wallet" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Purchase" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tokens" INTEGER NOT NULL,
    "totalCost" INTEGER NOT NULL,
    "property_id" TEXT NOT NULL,
    "buyer_id" TEXT NOT NULL,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Property" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "tokens" INTEGER NOT NULL,
    "price_token" INTEGER NOT NULL,
    "available_tokens" INTEGER NOT NULL,
    "land_area" DOUBLE PRECISION NOT NULL,
    "house_aria" DOUBLE PRECISION NOT NULL,
    "distance_to_sea" TEXT NOT NULL,
    "video_url" TEXT NOT NULL,
    "photo_urls" TEXT[],
    "roi" DOUBLE PRECISION NOT NULL,
    "location_1" TEXT NOT NULL,
    "location_2" TEXT NOT NULL,
    "main_location" TEXT NOT NULL,
    "document_urls" TEXT[],
    "annual_growth_rate" DOUBLE PRECISION NOT NULL,
    "year_of_completion" INTEGER NOT NULL,
    "legal_fees" DOUBLE PRECISION NOT NULL,
    "rent_per_year" INTEGER NOT NULL,
    "facility_management" DOUBLE PRECISION NOT NULL,
    "booking_link" TEXT NOT NULL,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,
    "amount" INTEGER NOT NULL,
    "transactionStatus" "TransactionStatus" NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_google_id_key" ON "User"("google_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_buyer_id_fkey" FOREIGN KEY ("buyer_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

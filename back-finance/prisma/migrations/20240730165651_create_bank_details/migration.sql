-- CreateTable
CREATE TABLE "BankDetails" (
    "id" TEXT NOT NULL,
    "accountName" TEXT NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "routingNumber" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "bankAddress" TEXT NOT NULL,

    CONSTRAINT "BankDetails_pkey" PRIMARY KEY ("id")
);

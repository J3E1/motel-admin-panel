-- CreateTable
CREATE TABLE "Cabin" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cabinName" INTEGER NOT NULL,
    "maxCapacity" INTEGER NOT NULL,
    "regularPrice" INTEGER NOT NULL,
    "discount" INTEGER,
    "description" TEXT,
    "coverImage" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Cabin_cabinName_key" ON "Cabin"("cabinName");

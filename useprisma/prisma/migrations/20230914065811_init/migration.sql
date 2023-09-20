-- CreateTable
CREATE TABLE "barang" (
    "id" BIGSERIAL NOT NULL,
    "nama" VARCHAR,
    "harga" INTEGER,
    "stok" INTEGER,

    CONSTRAINT "barang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaksi" (
    "id" BIGSERIAL NOT NULL,
    "barang_id" BIGINT,
    "user_id" BIGINT,
    "jumlah" INTEGER,
    "total_harga" INTEGER,
    "create_at" TIMESTAMP(6),

    CONSTRAINT "transaksi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" BIGSERIAL NOT NULL,
    "nama" VARCHAR,
    "username" VARCHAR,
    "password" VARCHAR,
    "alamat" VARCHAR,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "transaksi" ADD CONSTRAINT "barang_id" FOREIGN KEY ("barang_id") REFERENCES "barang"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transaksi" ADD CONSTRAINT "user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

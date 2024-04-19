-- CreateEnum
CREATE TYPE "CategoryPeriod" AS ENUM ('ANO', 'BIMESTRE', 'SEMESTRE');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "is_admin" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "schools" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(254) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "schools_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "students" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(254) NOT NULL,
    "registry" VARCHAR(50) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "periods" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "category" "CategoryPeriod" NOT NULL,
    "date_initial" DATE NOT NULL,
    "date_final" DATE NOT NULL,
    "year" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "periods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "school_server" (
    "key" TEXT NOT NULL,
    "school_id" TEXT NOT NULL,
    "server_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "school_server_pkey" PRIMARY KEY ("school_id","server_id")
);

-- CreateTable
CREATE TABLE "class_student" (
    "key" TEXT NOT NULL,
    "year" VARCHAR(254) NOT NULL,
    "class_id" VARCHAR(254) NOT NULL,
    "student_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "class_student_pkey" PRIMARY KEY ("year","class_id","student_id")
);

-- CreateTable
CREATE TABLE "class_year" (
    "key" TEXT NOT NULL,
    "year" VARCHAR(254) NOT NULL,
    "class_id" VARCHAR(254) NOT NULL,
    "school_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "class_year_pkey" PRIMARY KEY ("year","class_id","school_id")
);

-- CreateTable
CREATE TABLE "class_year_student" (
    "key" TEXT NOT NULL,
    "class_id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "class_year_student_pkey" PRIMARY KEY ("class_id","student_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "schools_name_key" ON "schools"("name");

-- CreateIndex
CREATE UNIQUE INDEX "students_registry_key" ON "students"("registry");

-- CreateIndex
CREATE UNIQUE INDEX "school_server_key_key" ON "school_server"("key");

-- CreateIndex
CREATE UNIQUE INDEX "class_student_key_key" ON "class_student"("key");

-- CreateIndex
CREATE UNIQUE INDEX "class_year_key_key" ON "class_year"("key");

-- CreateIndex
CREATE UNIQUE INDEX "class_year_student_key_key" ON "class_year_student"("key");

-- AddForeignKey
ALTER TABLE "school_server" ADD CONSTRAINT "school_server_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "schools"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "school_server" ADD CONSTRAINT "school_server_server_id_fkey" FOREIGN KEY ("server_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_student" ADD CONSTRAINT "class_student_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_year" ADD CONSTRAINT "class_year_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "schools"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_year_student" ADD CONSTRAINT "class_year_student_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "class_year"("key") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_year_student" ADD CONSTRAINT "class_year_student_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

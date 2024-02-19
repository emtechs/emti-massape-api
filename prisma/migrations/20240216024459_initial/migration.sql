-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SERV', 'DIRET', 'ADMIN');

-- CreateEnum
CREATE TYPE "CategoryPeriod" AS ENUM ('ANO', 'BIMESTRE', 'SEMESTRE');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'SERV',
    "is_super" BOOLEAN NOT NULL DEFAULT false,
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
    "director_id" TEXT,

    CONSTRAINT "schools_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "classes" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(254) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "classes_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "frequencies" (
    "id" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "is_open" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finished_at" TIMESTAMP NOT NULL,
    "infrequency" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "class_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "request_id" TEXT,

    CONSTRAINT "frequencies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tests" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(254) NOT NULL,
    "options" INTEGER NOT NULL DEFAULT 3,
    "quests" INTEGER NOT NULL,
    "model" VARCHAR(100) NOT NULL,
    "templet" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "is_visible" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "class_id" TEXT NOT NULL,

    CONSTRAINT "tests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "years" (
    "id" TEXT NOT NULL,
    "year" VARCHAR(10) NOT NULL,

    CONSTRAINT "years_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "periods" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "category" "CategoryPeriod" NOT NULL,
    "date_initial" DATE NOT NULL,
    "date_final" DATE NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "year_id" TEXT NOT NULL,

    CONSTRAINT "periods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "requests" (
    "id" TEXT NOT NULL,
    "justification" VARCHAR(200) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "school_server" (
    "id" TEXT NOT NULL,
    "school_id" TEXT NOT NULL,
    "server_id" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'SERV',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "school_server_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "class_year" (
    "id" TEXT NOT NULL,
    "class_id" TEXT NOT NULL,
    "school_id" TEXT NOT NULL,
    "year_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "class_year_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "class_student" (
    "id" TEXT NOT NULL,
    "class_id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "class_student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fouls" (
    "id" TEXT NOT NULL,
    "justification" VARCHAR(200),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "frequency_id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "request_id" TEXT,

    CONSTRAINT "fouls_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "test_student" (
    "id" TEXT NOT NULL,
    "value" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "test_id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,

    CONSTRAINT "test_student_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "schools_name_key" ON "schools"("name");

-- CreateIndex
CREATE UNIQUE INDEX "classes_name_key" ON "classes"("name");

-- CreateIndex
CREATE UNIQUE INDEX "students_registry_key" ON "students"("registry");

-- CreateIndex
CREATE UNIQUE INDEX "frequencies_request_id_key" ON "frequencies"("request_id");

-- CreateIndex
CREATE UNIQUE INDEX "years_year_key" ON "years"("year");

-- CreateIndex
CREATE UNIQUE INDEX "fouls_request_id_key" ON "fouls"("request_id");

-- AddForeignKey
ALTER TABLE "schools" ADD CONSTRAINT "schools_director_id_fkey" FOREIGN KEY ("director_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "frequencies" ADD CONSTRAINT "frequencies_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "class_year"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "frequencies" ADD CONSTRAINT "frequencies_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "frequencies" ADD CONSTRAINT "frequencies_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "requests"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tests" ADD CONSTRAINT "tests_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "class_year"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "periods" ADD CONSTRAINT "periods_year_id_fkey" FOREIGN KEY ("year_id") REFERENCES "years"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requests" ADD CONSTRAINT "requests_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "school_server" ADD CONSTRAINT "school_server_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "schools"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "school_server" ADD CONSTRAINT "school_server_server_id_fkey" FOREIGN KEY ("server_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_year" ADD CONSTRAINT "class_year_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_year" ADD CONSTRAINT "class_year_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "schools"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_year" ADD CONSTRAINT "class_year_year_id_fkey" FOREIGN KEY ("year_id") REFERENCES "years"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_student" ADD CONSTRAINT "class_student_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "class_year"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_student" ADD CONSTRAINT "class_student_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fouls" ADD CONSTRAINT "fouls_frequency_id_fkey" FOREIGN KEY ("frequency_id") REFERENCES "frequencies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fouls" ADD CONSTRAINT "fouls_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fouls" ADD CONSTRAINT "fouls_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "requests"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test_student" ADD CONSTRAINT "test_student_test_id_fkey" FOREIGN KEY ("test_id") REFERENCES "tests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test_student" ADD CONSTRAINT "test_student_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

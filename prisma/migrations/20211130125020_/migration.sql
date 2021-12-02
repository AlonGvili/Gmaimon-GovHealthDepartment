/*
  Warnings:

  - You are about to drop the `Building` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Classroom` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Device` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `School` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Supervisor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Task` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Team` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TeamToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('PENDING', 'INPROGRESS', 'DONE');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'CANCELLED');

-- DropForeignKey
ALTER TABLE "Building" DROP CONSTRAINT "Building_schoolId_fkey";

-- DropForeignKey
ALTER TABLE "Classroom" DROP CONSTRAINT "Classroom_buildingId_fkey";

-- DropForeignKey
ALTER TABLE "Device" DROP CONSTRAINT "Device_taskId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_schoolId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_supervisorId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_classroomId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_userId_fkey";

-- DropForeignKey
ALTER TABLE "_TeamToUser" DROP CONSTRAINT "_TeamToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_TeamToUser" DROP CONSTRAINT "_TeamToUser_B_fkey";

-- DropTable
DROP TABLE "Building";

-- DropTable
DROP TABLE "Classroom";

-- DropTable
DROP TABLE "Device";

-- DropTable
DROP TABLE "Order";

-- DropTable
DROP TABLE "School";

-- DropTable
DROP TABLE "Supervisor";

-- DropTable
DROP TABLE "Task";

-- DropTable
DROP TABLE "Team";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "_TeamToUser";

-- CreateTable
CREATE TABLE "schools" (
    "school_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "totalDevices" INTEGER NOT NULL,
    "schoolType" "SchoolType",

    CONSTRAINT "schools_pkey" PRIMARY KEY ("school_id")
);

-- CreateTable
CREATE TABLE "buildings" (
    "building_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "totalClassrooms" INTEGER NOT NULL,

    CONSTRAINT "buildings_pkey" PRIMARY KEY ("building_id")
);

-- CreateTable
CREATE TABLE "classrooms" (
    "classroom_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "number" TEXT NOT NULL,

    CONSTRAINT "classrooms_pkey" PRIMARY KEY ("classroom_id")
);

-- CreateTable
CREATE TABLE "teams" (
    "team_id" SERIAL NOT NULL,
    "leaderName" TEXT NOT NULL,
    "User.idNumber" TEXT NOT NULL,
    "start_working_date" TIMESTAMP(3) NOT NULL,
    "totalUsers" INTEGER NOT NULL,

    CONSTRAINT "teams_pkey" PRIMARY KEY ("team_id")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "idNumber" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "teamId" INTEGER,
    "role" "UserRole" NOT NULL DEFAULT E'USER',

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "tasks" (
    "task_id" SERIAL NOT NULL,
    "installtion_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "TaskStatus" DEFAULT E'PENDING',
    "deviceId" INTEGER,
    "install_by" INTEGER,
    "signature" TEXT NOT NULL,
    "deviceCondition" BOOLEAN NOT NULL DEFAULT true,
    "note" TEXT,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("task_id")
);

-- CreateTable
CREATE TABLE "devices" (
    "device_id" SERIAL NOT NULL,
    "serialNumber" TEXT NOT NULL,
    "taskId" INTEGER NOT NULL,

    CONSTRAINT "devices_pkey" PRIMARY KEY ("device_id")
);

-- CreateTable
CREATE TABLE "supervisors" (
    "supervisor_id" SERIAL NOT NULL,
    "idNumber" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "supervisors_pkey" PRIMARY KEY ("supervisor_id")
);

-- CreateTable
CREATE TABLE "orders" (
    "order_id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "schoolName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "trackingNumber" TEXT NOT NULL,
    "amountOfDevices" INTEGER NOT NULL,
    "contactName" TEXT NOT NULL,
    "contactPhone" TEXT NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT E'PENDING',

    CONSTRAINT "orders_pkey" PRIMARY KEY ("order_id")
);

-- CreateTable
CREATE TABLE "OrdersOnSupervisors" (
    "supervisorId" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,

    CONSTRAINT "OrdersOnSupervisors_pkey" PRIMARY KEY ("supervisorId","orderId","teamId")
);

-- CreateTable
CREATE TABLE "BuildingsOnSchools" (
    "buildingId" INTEGER NOT NULL,
    "schoolId" INTEGER NOT NULL,
    "classroomId" INTEGER NOT NULL,

    CONSTRAINT "BuildingsOnSchools_pkey" PRIMARY KEY ("schoolId","buildingId","classroomId")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_idNumber_key" ON "users"("idNumber");

-- CreateIndex
CREATE UNIQUE INDEX "tasks_deviceId_key" ON "tasks"("deviceId");

-- CreateIndex
CREATE UNIQUE INDEX "devices_serialNumber_key" ON "devices"("serialNumber");

-- CreateIndex
CREATE UNIQUE INDEX "devices_taskId_key" ON "devices"("taskId");

-- CreateIndex
CREATE UNIQUE INDEX "supervisors_idNumber_key" ON "supervisors"("idNumber");

-- CreateIndex
CREATE UNIQUE INDEX "supervisors_email_key" ON "supervisors"("email");

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "devices"("device_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_install_by_fkey" FOREIGN KEY ("install_by") REFERENCES "users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrdersOnSupervisors" ADD CONSTRAINT "OrdersOnSupervisors_supervisorId_fkey" FOREIGN KEY ("supervisorId") REFERENCES "supervisors"("supervisor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrdersOnSupervisors" ADD CONSTRAINT "OrdersOnSupervisors_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("order_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrdersOnSupervisors" ADD CONSTRAINT "OrdersOnSupervisors_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("team_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuildingsOnSchools" ADD CONSTRAINT "BuildingsOnSchools_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "buildings"("building_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuildingsOnSchools" ADD CONSTRAINT "BuildingsOnSchools_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "schools"("school_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuildingsOnSchools" ADD CONSTRAINT "BuildingsOnSchools_classroomId_fkey" FOREIGN KEY ("classroomId") REFERENCES "classrooms"("classroom_id") ON DELETE RESTRICT ON UPDATE CASCADE;

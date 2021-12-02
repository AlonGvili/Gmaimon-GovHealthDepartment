/*
  Warnings:

  - You are about to drop the column `totalClassrooms` on the `buildings` table. All the data in the column will be lost.
  - You are about to drop the column `device_id` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `install_by` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the `ClassroomToBuildingToSchool` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[taskId]` on the table `classrooms` will be added. If there are existing duplicate values, this will fail.
  - Made the column `taskId` on table `devices` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `userId` to the `supervisors` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ClassroomToBuildingToSchool" DROP CONSTRAINT "ClassroomToBuildingToSchool_buildingId_fkey";

-- DropForeignKey
ALTER TABLE "ClassroomToBuildingToSchool" DROP CONSTRAINT "ClassroomToBuildingToSchool_classroomId_fkey";

-- DropForeignKey
ALTER TABLE "ClassroomToBuildingToSchool" DROP CONSTRAINT "ClassroomToBuildingToSchool_schoolId_fkey";

-- DropForeignKey
ALTER TABLE "devices" DROP CONSTRAINT "devices_taskId_fkey";

-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_install_by_fkey";

-- AlterTable
ALTER TABLE "buildings" DROP COLUMN "totalClassrooms",
ADD COLUMN     "schoolId" INTEGER;

-- AlterTable
ALTER TABLE "classrooms" ADD COLUMN     "buildingId" INTEGER,
ADD COLUMN     "taskId" INTEGER;

-- AlterTable
ALTER TABLE "devices" ALTER COLUMN "taskId" SET NOT NULL;

-- AlterTable
ALTER TABLE "schools" ADD COLUMN     "supervisorId" INTEGER;

-- AlterTable
ALTER TABLE "supervisors" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "device_id",
DROP COLUMN "install_by",
ADD COLUMN     "classroomId" INTEGER,
ADD COLUMN     "deviceId" INTEGER;

-- DropTable
DROP TABLE "ClassroomToBuildingToSchool";

-- CreateTable
CREATE TABLE "SchoolOrder" (
    "school_order_id" SERIAL NOT NULL,
    "schoolId" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,

    CONSTRAINT "SchoolOrder_pkey" PRIMARY KEY ("school_order_id")
);

-- CreateTable
CREATE TABLE "_TaskToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TaskToUser_AB_unique" ON "_TaskToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_TaskToUser_B_index" ON "_TaskToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "classrooms_taskId_key" ON "classrooms"("taskId");

-- AddForeignKey
ALTER TABLE "schools" ADD CONSTRAINT "schools_supervisorId_fkey" FOREIGN KEY ("supervisorId") REFERENCES "supervisors"("supervisor_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "buildings" ADD CONSTRAINT "buildings_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "schools"("school_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classrooms" ADD CONSTRAINT "classrooms_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "buildings"("building_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classrooms" ADD CONSTRAINT "classrooms_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "tasks"("task_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "devices" ADD CONSTRAINT "devices_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "tasks"("task_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supervisors" ADD CONSTRAINT "supervisors_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchoolOrder" ADD CONSTRAINT "SchoolOrder_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "schools"("school_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchoolOrder" ADD CONSTRAINT "SchoolOrder_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("order_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TaskToUser" ADD FOREIGN KEY ("A") REFERENCES "tasks"("task_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TaskToUser" ADD FOREIGN KEY ("B") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

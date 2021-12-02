/*
  Warnings:

  - You are about to drop the column `deviceCondition` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `deviceId` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the `BuildingsOnSchools` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrdersOnSupervisors` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BuildingsOnSchools" DROP CONSTRAINT "BuildingsOnSchools_buildingId_fkey";

-- DropForeignKey
ALTER TABLE "BuildingsOnSchools" DROP CONSTRAINT "BuildingsOnSchools_classroomId_fkey";

-- DropForeignKey
ALTER TABLE "BuildingsOnSchools" DROP CONSTRAINT "BuildingsOnSchools_schoolId_fkey";

-- DropForeignKey
ALTER TABLE "OrdersOnSupervisors" DROP CONSTRAINT "OrdersOnSupervisors_orderId_fkey";

-- DropForeignKey
ALTER TABLE "OrdersOnSupervisors" DROP CONSTRAINT "OrdersOnSupervisors_supervisorId_fkey";

-- DropForeignKey
ALTER TABLE "OrdersOnSupervisors" DROP CONSTRAINT "OrdersOnSupervisors_teamId_fkey";

-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_deviceId_fkey";

-- DropIndex
DROP INDEX "devices_taskId_key";

-- DropIndex
DROP INDEX "tasks_deviceId_key";

-- AlterTable
ALTER TABLE "buildings" ADD COLUMN     "schoolId" INTEGER;

-- AlterTable
ALTER TABLE "classrooms" ADD COLUMN     "buildingId" INTEGER;

-- AlterTable
ALTER TABLE "devices" ALTER COLUMN "taskId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "deviceCondition",
DROP COLUMN "deviceId",
ADD COLUMN     "device_id" INTEGER;

-- DropTable
DROP TABLE "BuildingsOnSchools";

-- DropTable
DROP TABLE "OrdersOnSupervisors";

-- AddForeignKey
ALTER TABLE "buildings" ADD CONSTRAINT "buildings_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "schools"("school_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classrooms" ADD CONSTRAINT "classrooms_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "buildings"("building_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("team_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "devices" ADD CONSTRAINT "devices_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "tasks"("task_id") ON DELETE SET NULL ON UPDATE CASCADE;

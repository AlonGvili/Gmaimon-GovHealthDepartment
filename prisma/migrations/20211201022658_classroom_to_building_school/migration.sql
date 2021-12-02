/*
  Warnings:

  - You are about to drop the column `schoolId` on the `buildings` table. All the data in the column will be lost.
  - You are about to drop the column `buildingId` on the `classrooms` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "buildings" DROP CONSTRAINT "buildings_schoolId_fkey";

-- DropForeignKey
ALTER TABLE "classrooms" DROP CONSTRAINT "classrooms_buildingId_fkey";

-- AlterTable
ALTER TABLE "buildings" DROP COLUMN "schoolId";

-- AlterTable
ALTER TABLE "classrooms" DROP COLUMN "buildingId";

-- CreateTable
CREATE TABLE "ClassroomToBuildingToSchool" (
    "classroomId" INTEGER NOT NULL,
    "buildingId" INTEGER NOT NULL,
    "schoolId" INTEGER NOT NULL,

    CONSTRAINT "ClassroomToBuildingToSchool_pkey" PRIMARY KEY ("classroomId","buildingId","schoolId")
);

-- AddForeignKey
ALTER TABLE "OrderToSupervisor" ADD CONSTRAINT "OrderToSupervisor_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("team_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassroomToBuildingToSchool" ADD CONSTRAINT "ClassroomToBuildingToSchool_classroomId_fkey" FOREIGN KEY ("classroomId") REFERENCES "classrooms"("classroom_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassroomToBuildingToSchool" ADD CONSTRAINT "ClassroomToBuildingToSchool_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "buildings"("building_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassroomToBuildingToSchool" ADD CONSTRAINT "ClassroomToBuildingToSchool_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "schools"("school_id") ON DELETE RESTRICT ON UPDATE CASCADE;

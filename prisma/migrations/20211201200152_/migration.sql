/*
  Warnings:

  - You are about to drop the `OrderToSupervisor` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "OrderToSupervisor" DROP CONSTRAINT "OrderToSupervisor_orderId_fkey";

-- DropForeignKey
ALTER TABLE "OrderToSupervisor" DROP CONSTRAINT "OrderToSupervisor_supervisorId_fkey";

-- DropForeignKey
ALTER TABLE "OrderToSupervisor" DROP CONSTRAINT "OrderToSupervisor_teamId_fkey";

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "supervisorId" INTEGER,
ADD COLUMN     "teamId" INTEGER;

-- DropTable
DROP TABLE "OrderToSupervisor";

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_supervisorId_fkey" FOREIGN KEY ("supervisorId") REFERENCES "supervisors"("supervisor_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("team_id") ON DELETE SET NULL ON UPDATE CASCADE;

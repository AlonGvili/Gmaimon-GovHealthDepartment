/*
  Warnings:

  - You are about to drop the `_OrderToSupervisor` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_OrderToSupervisor" DROP CONSTRAINT "_OrderToSupervisor_A_fkey";

-- DropForeignKey
ALTER TABLE "_OrderToSupervisor" DROP CONSTRAINT "_OrderToSupervisor_B_fkey";

-- DropTable
DROP TABLE "_OrderToSupervisor";

-- CreateTable
CREATE TABLE "OrderToSupervisor" (
    "orderId" INTEGER NOT NULL,
    "supervisorId" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,

    CONSTRAINT "OrderToSupervisor_pkey" PRIMARY KEY ("orderId","supervisorId")
);

-- AddForeignKey
ALTER TABLE "OrderToSupervisor" ADD CONSTRAINT "OrderToSupervisor_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("order_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderToSupervisor" ADD CONSTRAINT "OrderToSupervisor_supervisorId_fkey" FOREIGN KEY ("supervisorId") REFERENCES "supervisors"("supervisor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

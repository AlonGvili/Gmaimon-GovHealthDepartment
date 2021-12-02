-- CreateTable
CREATE TABLE "_OrderToSupervisor" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_OrderToSupervisor_AB_unique" ON "_OrderToSupervisor"("A", "B");

-- CreateIndex
CREATE INDEX "_OrderToSupervisor_B_index" ON "_OrderToSupervisor"("B");

-- AddForeignKey
ALTER TABLE "_OrderToSupervisor" ADD FOREIGN KEY ("A") REFERENCES "orders"("order_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderToSupervisor" ADD FOREIGN KEY ("B") REFERENCES "supervisors"("supervisor_id") ON DELETE CASCADE ON UPDATE CASCADE;

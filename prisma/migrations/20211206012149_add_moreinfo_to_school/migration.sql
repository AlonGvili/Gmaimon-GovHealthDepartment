-- CreateEnum
CREATE TYPE "SchoolType" AS ENUM ('KINDERGARDEN', 'YESODI', 'HIGHSCHOOL', 'ELSE');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPERVISOR', 'TEAMLEADER', 'MEMBER', 'ADMIN');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('PENDING', 'ASSIGNED', 'STARTED', 'DONE', 'CANCELED', 'WAITINGFORAPPROVAL', 'APPROVEDBYSUPERVISOR', 'APPROVEDBYTEAMLEADER', 'APPROVEDBYADMIN');

-- CreateEnum
CREATE TYPE "TicketStatus" AS ENUM ('OPEN', 'PROCESSING', 'COMPLETED', 'CANCELLED');

-- CreateTable
CREATE TABLE "School" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "zip" INTEGER NOT NULL,
    "principalNme" TEXT NOT NULL,
    "principalPhone" TEXT NOT NULL,
    "workManagerName" TEXT,
    "workManagerPhone" TEXT,
    "wifiName" TEXT,
    "wifiPassword" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "schoolType" "SchoolType" NOT NULL DEFAULT E'ELSE',

    CONSTRAINT "School_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Building" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "schoolId" INTEGER NOT NULL,

    CONSTRAINT "Building_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "buildingId" INTEGER,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" SERIAL NOT NULL,
    "leaderId" INTEGER,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Member" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "socialNumber" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT E'MEMBER',
    "teamId" INTEGER,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "note" TEXT,
    "status" "TaskStatus" NOT NULL DEFAULT E'PENDING',
    "memberId" INTEGER,
    "orderId" INTEGER,
    "deviceLocation" TEXT,
    "approvedByMember" BOOLEAN NOT NULL DEFAULT false,
    "approvedByMemberDate" TIMESTAMP(3),
    "approvedByLeader" BOOLEAN NOT NULL DEFAULT false,
    "approvedByLeaderDate" TIMESTAMP(3),
    "approvedBySupervisor" BOOLEAN NOT NULL DEFAULT false,
    "approvedBySupervisorDate" TIMESTAMP(3),
    "approvedByAdmin" BOOLEAN NOT NULL DEFAULT false,
    "approvedByAdminDate" TIMESTAMP(3),
    "memberSignature" TEXT,
    "leaderSignature" TEXT,
    "supervisorSignature" TEXT,
    "adminSignature" TEXT,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Device" (
    "id" SERIAL NOT NULL,
    "serialNumber" TEXT NOT NULL,
    "roomId" INTEGER,
    "taskId" INTEGER,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "schoolName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "trackingNumber" TEXT NOT NULL,
    "devices" INTEGER NOT NULL,
    "contactName" TEXT NOT NULL,
    "contactPhone" TEXT NOT NULL,
    "status" "TicketStatus" NOT NULL DEFAULT E'OPEN',
    "schoolId" INTEGER,
    "supervisorId" INTEGER,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Member_email_key" ON "Member"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Member_socialNumber_key" ON "Member"("socialNumber");

-- AddForeignKey
ALTER TABLE "Building" ADD CONSTRAINT "Building_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "Building"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Ticket"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_supervisorId_fkey" FOREIGN KEY ("supervisorId") REFERENCES "Member"("id") ON DELETE SET NULL ON UPDATE CASCADE;

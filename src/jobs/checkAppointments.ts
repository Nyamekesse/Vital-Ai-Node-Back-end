import { Status } from "@prisma/client";
import prisma from "../lib/prisma-instance";
import dayjs from "dayjs";

export const checkAppointments = async () => {
  const pendingAppointments = await prisma.appointment.findMany({
    where: {
      status: {
        in: [Status.PENDING, Status.UPCOMING],
      },
    },
  });

  pendingAppointments.forEach(async (appointment) => {
    const timePassed = dayjs().diff(appointment.scheduledTime, "hour");
    const timeLimit = 48;
    if (timePassed > timeLimit) {
      await prisma.appointment.update({
        where: { id: appointment.id },
        data: { status: Status.CANCELLED },
      });
    }
  });
};

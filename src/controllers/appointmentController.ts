import { init } from "@paralleldrive/cuid2";
import { Appointment, PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import { Request, Response } from "express";

const prisma = new PrismaClient();
const createId = init({
  length: 5,
  fingerprint: process.env.SECRET,
});
export async function getAllAppointments(req: Request, res: Response) {
  const { id } = req.user;
  try {
    const appointments = await prisma.appointment.findMany({
      where: {
        careRecipientID: id,
      },
      select: {
        id: true,
        scheduledTime: true,
        purpose: true,
        status: true,
        healthProfessional: {
          select: {
            firstName: true,
            lastName: true,
            displayPicture: true,
          },
        },
      },
    });
    return res.status(200).json(appointments);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function getAppointDetailsById(req: Request, res: Response) {
  const { id: appointmentID } = req.params;
  const { id: careRecipientID } = req.user;

  try {
    const appointmentDetails = await prisma.appointment.findUnique({
      where: {
        id: appointmentID,
        careRecipientID,
      },
      select: {
        id: true,
        careRecipient: {
          select: {
            firstName: true,
            lastName: true,
            gender: true,
          },
        },
        scheduledTime: true,
        healthProfessional: {
          select: {
            firstName: true,
            lastName: true,
            displayPicture: true,
            specialization: {
              select: {
                name: true,
              },
            },
            organization: {
              select: {
                name: true,
              },
            },
          },
        },
        purpose: true,
      },
    });
    if (!appointmentDetails)
      return res.status(404).json({
        message: "Could not find any details for selected appointment",
      });
    return res.status(200).json(appointmentDetails);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function addNewAppointment(req: Request, res: Response) {
  const { id } = req.user;
  try {
    const { scheduledTime, purpose, healthProfessionalID }: Appointment =
      req.body;
    if (!scheduledTime || !purpose || !healthProfessionalID)
      return res.sendStatus(400);
    const parsedScheduledTime = dayjs(scheduledTime).toISOString();
    const isBooked = await prisma.appointment.findFirst({
      where: {
        scheduledTime: parsedScheduledTime,
        healthProfessionalID,
      },
    });
    if (isBooked)
      return res.status(400).json({
        message: "The selected date and time has already been booked",
      });
    const appointment = await prisma.appointment.create({
      data: {
        id: createId(),
        scheduledTime: parsedScheduledTime,
        purpose,
        careRecipientID: id,
        healthProfessionalID,
      },
    });

    return res.status(201).json(appointment);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

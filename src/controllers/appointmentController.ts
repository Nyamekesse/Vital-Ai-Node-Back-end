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
        date: true,
        time: true,
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
  const { id } = req.params;
  try {
    const appointmentDetails = await prisma.appointment.findUnique({
      where: {
        id,
      },
    });
    if (!appointmentDetails)
      return res
        .status(404)
        .json({
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
    const { date, time, purpose, healthProfessionalID }: Appointment = req.body;
    if (!date || !time || !purpose || !healthProfessionalID)
      return res.sendStatus(400);
    const appointment = await prisma.appointment.create({
      data: {
        id: createId(),
        date: dayjs(date).format("YYYY-MM-DD"),
        time: dayjs(time).format("YYYY-MM-DDTHH:mm:ss"),
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

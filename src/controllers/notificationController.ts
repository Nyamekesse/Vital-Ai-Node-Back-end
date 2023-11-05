import { Request, Response } from "express";
import { createId } from "@paralleldrive/cuid2";
import prisma from "../lib/prisma-instance";

export const getNotifications = async (req: Request, res: Response) => {
  const { id } = req.user;
  try {
    const notifications = await prisma.notification.findMany({
      where: {
        userID: id,
      },
    });

    return res.status(200).json(notifications);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const createNotification = async (req: Request, res: Response) => {
  //   const { id: owner } = req.user;
  //   const { id: receiver } = req.params;

  try {
    const newNotification = await prisma.notification.create({
      data: {
        id: createId(),
        title: "Test notifiaction 2",
        message: "Hello there again is me from the astronaut",
        userID: "kdsngjos8s",
      },
    });
    return res.status(201).json(newNotification);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const markNotificationRead = async (req: Request, res: Response) => {
  const { id: userID } = req.user;
  const { id: notificationId } = req.params;
  try {
    const notification = await prisma.notification.update({
      where: {
        id: notificationId,
        userID,
      },
      data: {
        isRead: true,
      },
    });

    if (!notification) return res.sendStatus(404);
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

import { Request, Response } from "express";
import { Conversation, IConversation } from "../db/conversation";
import { log } from "console";
import {
  CareRecipient,
  HealthProfessional,
  PrismaClient,
  UserType,
} from "@prisma/client";

const prisma = new PrismaClient();

export const getAllChatsByUserId = async (req: Request, res: Response) => {
  const { id, userType } = req.user;
  try {
    const conversations: IConversation[] = await Conversation.find({
      participants: id,
    }).select("-messages -__v");

    const participantIds = conversations.flatMap(
      (conversation) => conversation.participants
    );
    let participantDetails: CareRecipient[] | HealthProfessional[] | any;
    if (userType === UserType.CARE_RECIPIENT) {
      participantDetails = await prisma.healthProfessional.findMany({
        where: {
          userID: {
            in: participantIds,
          },
        },
        select: {
          userID: true,
          firstName: true,
          lastName: true,
          displayPicture: true,
        },
      });
    } else if (userType === UserType.HEALTH_PROFESSIONAL) {
      participantDetails = await prisma.careRecipient.findMany({
        where: {
          userID: {
            in: participantIds,
          },
        },
        select: {
          userID: true,
          firstName: true,
          lastName: true,
          displayPicture: true,
        },
      });
    }
    const response = conversations.map((conversation) => {
      const otherParticipantIds = conversation.participants.filter(
        (participantId) => participantId !== id
      );
      const otherParticipants = participantDetails.filter((participant) =>
        otherParticipantIds.includes(participant.userID)
      );

      return {
        participant: otherParticipants.map((participant) => ({
          userID: participant.userID,
          firstName: participant.firstName,
          lastName: participant.lastName,
          displayPicture: participant.displayPicture,
        })),
      };
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

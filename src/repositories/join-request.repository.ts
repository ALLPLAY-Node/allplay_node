import { prisma } from "../db.config.js";

export const isApplied = async (userId: number, clubId: number) => {
  const joinRequests = await prisma.joinRequest.findFirst({
    where: {
      user_id: BigInt(userId),
      club_id: BigInt(clubId),
    },
  });
  if (!joinRequests) {
    return false;
  }
  return true;
};

export const joinClub = async (userId: number, clubId: number) => {
  const join = await prisma.joinRequest.create({
    data: {
      user_id: BigInt(userId),
      club_id: BigInt(clubId),
      created_at: new Date(),
    },
  });
  return join;
};

export const findJoinRequests = async (clubId: number) => {
  const joinRequests = await prisma.joinRequest.findMany({
    where: {
      club_id: BigInt(clubId),
    },
  });

  return joinRequests;
};

const deleteJoinRequest = async (requestId: number) => {
  const joinRequest = await prisma.joinRequest.delete({
    where: {
      id: BigInt(requestId),
    },
  });
  if (joinRequest) {
    return true;
  }
  return false;
};

export const joinRequestApprove = async (
  requestId: number,
  clubId: number,
  status: string,
) => {
  const joinRequest = await prisma.joinRequest.findUnique({
    where: {
      id: BigInt(requestId),
    },
  });
  if (!joinRequest) {
    return false;
  }
  const isDeleted = await deleteJoinRequest(requestId);
  if (!isDeleted) {
    return false;
  }
  if (status === "APPROVED") {
    await prisma.userClubs.create({
      data: {
        user_id: joinRequest.user_id,
        club_id: BigInt(clubId),
        is_leader: false,
        created_at: new Date(),
      },
    });
  }
  return true;
};

import { prisma } from "../db.config.js";
export const isApplied = async (userId, clubId) => {
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
export const joinClub = async (userId, clubId) => {
    const join = await prisma.joinRequest.create({
        data: {
            user_id: BigInt(userId),
            club_id: BigInt(clubId),
            created_at: new Date(),
        },
    });
    return join;
};
export const findJoinRequests = async (clubId) => {
    const joinRequests = await prisma.joinRequest.findMany({
        where: {
            club_id: BigInt(clubId),
        },
    });
    return joinRequests;
};
//# sourceMappingURL=join-request.repository.js.map
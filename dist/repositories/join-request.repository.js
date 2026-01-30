import { prisma } from "../db.config.js";
export class JoinRequestRepository {
    isApplied = async (userId, clubId) => {
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
    joinClub = async (userId, clubId) => {
        const join = await prisma.joinRequest.create({
            data: {
                user_id: BigInt(userId),
                club_id: BigInt(clubId),
                created_at: new Date(),
            },
        });
        return join;
    };
    findJoinRequests = async (clubId) => {
        const joinRequests = await prisma.joinRequest.findMany({
            where: {
                club_id: BigInt(clubId),
            },
        });
        return joinRequests;
    };
    deleteJoinRequest = async (requestId) => {
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
    joinRequestApprove = async (requestId, clubId, status) => {
        const joinRequest = await prisma.joinRequest.findUnique({
            where: {
                id: BigInt(requestId),
            },
        });
        if (!joinRequest) {
            return false;
        }
        const isDeleted = await this.deleteJoinRequest(requestId);
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
}
//# sourceMappingURL=join-request.repository.js.map
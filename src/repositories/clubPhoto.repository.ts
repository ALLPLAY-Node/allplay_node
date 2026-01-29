import { prisma } from "../db.config.js";

export const addClubPhotos = async (clubPhotos: string[], clubId: bigint) => {
  for (const photoURL of clubPhotos) {
    await prisma.clubPhotos.create({
      data: {
        club_id: clubId,
        club_photo_url: photoURL,
        uploaded_at: new Date(),
      },
    });
  }
  return clubPhotos;
};

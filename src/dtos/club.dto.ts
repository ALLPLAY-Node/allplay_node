import { Age, Level } from "@prisma/client";

export interface clubRequest {
  clubName: string;
  sportType: string;
  city: string;
  district: string;
  ageGroup: Age;
  imageURL: string[];
  maxMembers: number;
  activityFrequency: string;
  level: Level;
  description: string;
  joinRequirement: string;
  contact: string;
  hompageUrl: string;
}

export const clubDtos = (data: clubRequest) => {
  return {
    clubName: data.clubName,
    sportType: data.sportType,
    city: data.city,
    district: data.district,
    ageGroup: data.ageGroup,
    imageURL: data.imageURL,
    maxMembers: data.maxMembers,
    activityFrequency: data.activityFrequency,
    level: data.level,
    description: data.description,
    joinRequirement: data.joinRequirement,
    contact: data.contact,
    hompageUrl: data.hompageUrl,
  };
};

export const clubListDtos = (data: any) => {
  const items = [];
  for (const item of data) {
    items.push({
      id: item.id,
      clubName: item.name,
      clubPhotoURL: item.photos,
      description: item.summary,
      joinRequirement: item.join_requirement,
      region: item.region?.city + " " + item.region?.district,
      maxMembers: item.capacity,
      currentMembers: item.current_members,
    });
  }
  return items;
};

export const joinRequestDtos = (data: any) => {
  const items = [];
  for (const item of data) {
    items.push({
      id: item.id,
      clubId: item.club_id,
      userId: item.user_id,
      applicationDate: item.created_at,
    });
  }
  return items;
};

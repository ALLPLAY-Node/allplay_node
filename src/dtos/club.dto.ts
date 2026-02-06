import { Age, Level } from "@prisma/client";

export interface ClubRequest {
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
  homepageUrl: string;
}

export interface ClubListData {
  id: bigint | string;
  name: string | null;
  photos: { club_photo_url: string | null }[];
  summary: string | null;
  join_requirement: string | null;
  region: { city: string | null; district: string | null } | null;
  capacity: number | null;
  _count: { members: number };
}

export const clubListDtos = (data: ClubListData[]) => {
  const items = [];
  for (const item of data) {
    items.push({
      id: item.id.toString(),
      clubName: item.name,
      clubPhotoURL: item.photos,
      description: item.summary,
      joinRequirement: item.join_requirement,
      region: item.region?.city + " " + item.region?.district,
      maxMembers: item.capacity,
      currentMembers: item._count.members,
    });
  }
  return items;
};

export interface JoinRequestData {
  id: bigint;
  club_id: bigint;
  user_id: bigint;
  created_at: Date | null;
}

export const joinRequestDtos = (data: JoinRequestData[]) => {
  const items = [];
  for (const item of data) {
    items.push({
      id: item.id.toString(),
      clubId: item.club_id.toString(),
      userId: item.user_id.toString(),
      applicationDate: item.created_at,
    });
  }
  return items;
};

export interface ClubResponseData {
  id: bigint;
  name: string | null;
  photos: { club_photo_url: string | null }[];
  members: {
    user: {
      name: string | null;
      introduce: string | null;
    };
  }[];
  region: { city: string | null; district: string | null } | null;
  level: Level | null;
  capacity: number | null;
  _count: { members: number };
  join_requirement: string | null;
  contact_number: string | null;
  homepage_url: string | null;
}

export const clubResponseDto = (data: ClubResponseData) => {
  return {
    id: data.id.toString(),
    clubName: data.name,
    clubPhotoURL: data.photos,
    operator: data.members[0]?.user,
    region: data.region?.city + " " + data.region?.district,
    level: data.level,
    maxMembers: data.capacity,
    currentMembers: data._count.members,
    joinRequirement: data.join_requirement,
    contact: data.contact_number,
    homepageURL: data.homepage_url,
  };
};

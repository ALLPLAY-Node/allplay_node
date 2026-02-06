import { Age, Level } from "@prisma/client";
export const clubListDtos = (data) => {
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
export const joinRequestDtos = (data) => {
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
export const clubResponseDto = (data) => {
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
//# sourceMappingURL=club.dto.js.map
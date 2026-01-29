interface ReviewPhoto {
  photo_id: bigint;
  review_id: bigint;
  photo_url: string | null;
  uploaded_at: Date | null;
}

export interface Review {
  id: bigint;
  user_id: bigint;
  facility_id: bigint;
  text: string | null;
  photos: ReviewPhoto[];
  created_at: Date | null;
  updated_at: Date | null;
}

export const reviewDto = (reviews: Review[]) => {
  return reviews.map((review) => {
    return {
      id: review.id.toString(),
      userId: review.user_id.toString(),
      facilityId: review.facility_id.toString(),
      photoUrl: review.photos
        .map((photo) => photo.photo_url)
        .filter((url): url is string => url !== null),
      text: review.text,
      createdAt: review.created_at,
    };
  });
};

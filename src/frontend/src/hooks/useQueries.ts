import { createActor } from "@/backend";
import { PhotoSection } from "@/backend";
import type { PhotoMeta } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";

export function usePhotosBySection(section: PhotoSection) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<PhotoMeta[]>({
    queryKey: ["photos", section],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listPhotosBySection(section);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useHeroPhotos() {
  return usePhotosBySection(PhotoSection.hero);
}

export function useGalleryPhotos() {
  return usePhotosBySection(PhotoSection.gallery);
}

export function useServicesPhotos() {
  return usePhotosBySection(PhotoSection.services);
}

export function useFacilitiesPhotos() {
  return usePhotosBySection(PhotoSection.facilities);
}

export function useTestimonialsPhotos() {
  return usePhotosBySection(PhotoSection.testimonials);
}

/** Convert a storageRef from object-storage into a displayable URL */
export function getPhotoUrl(storageRef: string): string {
  return storageRef;
}

import type { backendInterface } from "../backend";
import { PhotoSection } from "../backend";

export const mockBackend: backendInterface = {
  addPhotoMeta: async (input, token) => ({
    id: BigInt(1),
    displayOrder: input.displayOrder,
    section: input.section,
    filename: input.filename,
    storageRef: input.storageRef,
    uploadedAt: BigInt(Date.now()),
  }),

  adminLogin: async (username, password) => ({
    __kind__: "ok",
    ok: "mock-admin-token-12345",
  }),

  deletePhoto: async (id, token) => true,

  getEnquiry: async (id, token) => ({
    id: BigInt(1),
    name: "Priya Sharma",
    submittedAt: BigInt(Date.now()),
    email: "priya@example.com",
    message: "I am interested in joining Bollywood dance classes.",
    classInterest: "Bollywood Dance",
    phone: "+91 98765 43210",
  }),

  listAllPhotos: async () => [
    {
      id: BigInt(1),
      displayOrder: BigInt(1),
      section: PhotoSection.gallery,
      filename: "studio-1.jpg",
      storageRef: "https://picsum.photos/seed/dance1/400/300",
      uploadedAt: BigInt(Date.now()),
    },
    {
      id: BigInt(2),
      displayOrder: BigInt(2),
      section: PhotoSection.gallery,
      filename: "studio-2.jpg",
      storageRef: "https://picsum.photos/seed/dance2/400/300",
      uploadedAt: BigInt(Date.now()),
    },
    {
      id: BigInt(3),
      displayOrder: BigInt(3),
      section: PhotoSection.hero,
      filename: "hero-1.jpg",
      storageRef: "https://picsum.photos/seed/dance3/800/500",
      uploadedAt: BigInt(Date.now()),
    },
  ],

  listEnquiries: async (token) => [
    {
      id: BigInt(1),
      name: "Priya Sharma",
      submittedAt: BigInt(Date.now()),
      email: "priya@example.com",
      message: "I am interested in joining Bollywood dance classes.",
      classInterest: "Bollywood Dance",
      phone: "+91 98765 43210",
    },
    {
      id: BigInt(2),
      name: "Ananya Patel",
      submittedAt: BigInt(Date.now() - 86400000),
      email: "ananya@example.com",
      message: "Looking for Zumba classes for my daughter.",
      classInterest: "Kids Dance Classes",
      phone: "+91 87654 32109",
    },
  ],

  listPhotosBySection: async (section) => [
    {
      id: BigInt(1),
      displayOrder: BigInt(1),
      section: section,
      filename: "photo-1.jpg",
      storageRef: "https://picsum.photos/seed/dance1/400/300",
      uploadedAt: BigInt(Date.now()),
    },
  ],

  submitEnquiry: async (input) => ({
    id: BigInt(3),
    name: input.name,
    submittedAt: BigInt(Date.now()),
    email: input.email,
    message: input.message,
    classInterest: input.classInterest,
    phone: input.phone,
  }),

  updatePhotoOrder: async (id, newOrder, token) => true,

  validateAdminToken: async (token) => token === "mock-admin-token-12345",
};

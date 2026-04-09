import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Timestamp = bigint;
export type PhotoId = bigint;
export interface EnquiryInput {
    name: string;
    email: string;
    message: string;
    classInterest: string;
    phone: string;
}
export interface PhotoMetaInput {
    displayOrder: bigint;
    section: PhotoSection;
    filename: string;
    storageRef: string;
}
export type LoginResult = {
    __kind__: "ok";
    ok: string;
} | {
    __kind__: "err";
    err: string;
};
export interface PhotoMeta {
    id: PhotoId;
    displayOrder: bigint;
    section: PhotoSection;
    filename: string;
    storageRef: string;
    uploadedAt: Timestamp;
}
export interface Enquiry {
    id: EnquiryId;
    name: string;
    submittedAt: Timestamp;
    email: string;
    message: string;
    classInterest: string;
    phone: string;
}
export type EnquiryId = bigint;
export enum PhotoSection {
    hero = "hero",
    facilities = "facilities",
    testimonials = "testimonials",
    services = "services",
    gallery = "gallery"
}
export interface backendInterface {
    addPhotoMeta(input: PhotoMetaInput, token: string): Promise<PhotoMeta>;
    adminLogin(username: string, password: string): Promise<LoginResult>;
    deletePhoto(id: PhotoId, token: string): Promise<boolean>;
    getEnquiry(id: EnquiryId, token: string): Promise<Enquiry | null>;
    listAllPhotos(): Promise<Array<PhotoMeta>>;
    listEnquiries(token: string): Promise<Array<Enquiry>>;
    listPhotosBySection(section: PhotoSection): Promise<Array<PhotoMeta>>;
    submitEnquiry(input: EnquiryInput): Promise<Enquiry>;
    updatePhotoOrder(id: PhotoId, newOrder: bigint, token: string): Promise<boolean>;
    validateAdminToken(token: string): Promise<boolean>;
}

// lib/types/material.ts
export type MaterialType = "pdf" | "slides" | "video" | "document" | "link";

export type AccessLevel = "all" | "department" | "specific";

export interface Material {
  id: string;
  title: string;
  type: MaterialType;
  sessionId: string;
  sessionTitle: string;
  uploadedBy: string;
  uploadedAt: string;
  size: string;
  accessLevel: AccessLevel;
  description?: string;
  url?: string;
  fileName?: string;
}
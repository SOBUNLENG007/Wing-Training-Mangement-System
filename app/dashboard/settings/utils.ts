export function splitFullName(name?: string) {
  const parts = (name ?? "").trim().split(" ");
  return {
    firstName: parts[0] ?? "",
    lastName:  parts.slice(1).join(" "),
  };
}

export function buildDefaultAvatar(name?: string) {
  const seed = encodeURIComponent(name || "User");
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=ffdfbf`;
}

export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
export const MAX_IMAGE_SIZE      = 2 * 1024 * 1024; // 2 MB
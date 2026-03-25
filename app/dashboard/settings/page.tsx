"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-store";

import { ProfileForm, PasswordForm } from "@/lib/types/setting";
import { AvatarUpload, ProfileSection, PasswordSection } from "./components";
import { buildDefaultAvatar, splitFullName }             from "./utils";
export default function SettingsPage() {
  const { user, restoreSession } = useAuth();
  const router = useRouter();

  const [hydrated, setHydrated] = useState(false);

  // ── Bootstrap ──────────────────────────────────────────────────────────────
  useEffect(() => { restoreSession(); setHydrated(true); }, [restoreSession]);
  useEffect(() => { if (hydrated && !user) router.push("/login"); }, [hydrated, user, router]);

  // ── Derived from auth user ─────────────────────────────────────────────────
  const defaultAvatar = useMemo(() => buildDefaultAvatar(user?.name), [user?.name]);
  const nameParts     = useMemo(() => splitFullName(user?.name),      [user?.name]);

  // ── Form state ─────────────────────────────────────────────────────────────
  const [profile, setProfile] = useState<ProfileForm>({
    firstName: "", lastName: "", email: "",
    phone: "", birthDate: "", gender: "", address: "",
  });
  const [password,      setPassword]      = useState<PasswordForm>({ currentPassword: "", newPassword: "" });
  const [avatarPreview, setAvatarPreview] = useState("");
  const [avatarFile,    setAvatarFile]    = useState<File | null>(null);

  // Seed form once user loads
  useEffect(() => {
    if (!user) return;
    setProfile({
      firstName: nameParts.firstName,
      lastName:  nameParts.lastName,
      email:     user.email      ?? "",
      phone:     "",
      birthDate: "",
      gender:    "",
      address:   user.department ?? "",
    });
    setAvatarPreview(defaultAvatar);
  }, [user, nameParts, defaultAvatar]);

  // ── Handlers ───────────────────────────────────────────────────────────────
  function handleSaveProfile() {
    const payload = { ...profile, profileImageName: avatarFile?.name ?? null };
    console.log("Save profile:", payload);
  }

  function handleChangePassword() {
    console.log("Change password:", password);
  }

  // ── Guard ──────────────────────────────────────────────────────────────────
  if (!hydrated || !user) return null;

  return (
    <div className="w-full animate-in fade-in pb-10 duration-500">

      {/* Breadcrumb */}
      <div className="mb-8 flex items-center gap-2 text-sm font-medium text-slate-500">
        <span className="text-slate-400">Setting</span>
        <span>{">"}</span>
        <span className="text-slate-700">User</span>
      </div>

      {/* Profile header */}
      <div className="mb-10 flex items-center gap-5">
        <AvatarUpload
          preview={avatarPreview}
          defaultUrl={defaultAvatar}
          onPreview={setAvatarPreview}
          onFile={setAvatarFile}
        />
        <div>
          <h1 className="text-[22px] font-bold text-[#1f6fff]">Profile</h1>
          <p className="mt-0.5 text-[13px] text-slate-500">Manage your Profile setting</p>
          <p className="mt-1 text-[13px] font-medium text-slate-700">{user.name}</p>
          <p className="mt-0.5 text-[12px] capitalize text-slate-500">{user.role}</p>
        </div>
      </div>

      {/* Form sections */}
      <div className="space-y-10">
        <ProfileSection
          form={profile}
          onChange={(patch) => setProfile((prev) => ({ ...prev, ...patch }))}
        />

        <PasswordSection
          form={password}
          onChange={(patch) => setPassword((prev) => ({ ...prev, ...patch }))}
          onSubmit={handleChangePassword}
        />

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 pt-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-xl border border-slate-200 bg-white px-6 py-2.5 text-[14px] font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSaveProfile}
            className="rounded-xl bg-[#1f6fff] px-8 py-2.5 text-[14px] font-medium text-white shadow-sm hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
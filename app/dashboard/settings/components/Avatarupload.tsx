import { useRef, useState } from "react";
import { Camera, Pencil, X } from "lucide-react";
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_SIZE } from "../utils";

type Props = {
  preview:    string;
  defaultUrl: string;
  onPreview:  (url: string) => void;
  onFile:     (file: File | null) => void;
};

export function AvatarUpload({ preview, defaultUrl, onPreview, onFile }: Props) {
  const inputRef     = useRef<HTMLInputElement>(null);
  const objectUrlRef = useRef<string | null>(null);

  const [file,  setFile]  = useState<File | null>(null);
  const [error, setError] = useState("");

  function openPicker() {
    inputRef.current?.click();
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const picked = e.target.files?.[0];
    if (!picked) return;

    if (!ALLOWED_IMAGE_TYPES.includes(picked.type)) {
      setError("Only JPG, PNG, WEBP, or GIF images are allowed.");
      e.target.value = "";
      return;
    }
    if (picked.size > MAX_IMAGE_SIZE) {
      setError("Image size must be smaller than 2 MB.");
      e.target.value = "";
      return;
    }

    // Revoke old blob before creating new one
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);

    const url          = URL.createObjectURL(picked);
    objectUrlRef.current = url;

    setError("");
    setFile(picked);
    onFile(picked);
    onPreview(url);
    e.target.value = "";
  }

  function handleRemove() {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
    setFile(null);
    onFile(null);
    onPreview(defaultUrl);
    setError("");
  }

  return (
    <div className="flex items-center gap-5">

      {/* Avatar circle */}
      <div className="relative">
        <div className="flex size-20 overflow-hidden rounded-full border border-slate-100 bg-[#FFE4E6]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview} alt="Profile Avatar" className="h-full w-full object-cover" />
        </div>

        <input
          ref={inputRef}
          type="file"
          accept={ALLOWED_IMAGE_TYPES.join(",")}
          className="hidden"
          onChange={handleChange}
        />

        <button
          type="button"
          onClick={openPicker}
          className="absolute bottom-0 right-0 rounded-full border-2 border-white bg-[#1f6fff] p-1.5 text-white shadow-sm hover:bg-blue-700"
        >
          <Pencil className="size-3.5" />
        </button>
      </div>

      {/* Actions + feedback */}
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={openPicker}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
          >
            <Camera className="size-3.5" /> Upload Photo
          </button>

          {file && (
            <button
              type="button"
              onClick={handleRemove}
              className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
            >
              <X className="size-3.5" /> Remove
            </button>
          )}
        </div>

        {file  && <p className="mt-2 text-[12px] text-slate-500">{file.name}</p>}
        {error && <p className="mt-2 text-[12px] font-medium text-red-500">{error}</p>}
      </div>
    </div>
  );
}
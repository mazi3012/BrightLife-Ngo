"use client";

import { ImagePlus, X } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget, type CloudinaryUploadWidgetResults } from "next-cloudinary";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ImageUploadProps = {
  name?: string;
  value?: string;
  onChange?: (value?: string) => void;
};

export function ImageUpload({ name = "imageUrl", value, onChange }: ImageUploadProps) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  const [imageUrl, setImageUrl] = useState(value ?? "");

  const uploadConfig = useMemo(
    () =>
      cloudName
        ? {
            cloud: {
              cloudName,
            },
          }
        : undefined,
    [cloudName],
  );

  const handleSuccess = (results: CloudinaryUploadWidgetResults) => {
    const secureUrl =
      typeof results.info === "object" && results.info && "secure_url" in results.info
        ? results.info.secure_url
        : undefined;
    if (!secureUrl) return;

    setImageUrl(secureUrl);
    onChange?.(secureUrl);
  };

  const handleRemove = () => {
    setImageUrl("");
    onChange?.(undefined);
  };

  if (!cloudName || !uploadPreset) {
    return (
      <div className="rounded-xl border border-dashed border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
        Set <code>NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME</code> and{" "}
        <code>NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET</code> in <code>.env.local</code>.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <input type="hidden" name={name} value={imageUrl} />

      <CldUploadWidget
        uploadPreset={uploadPreset}
        config={uploadConfig}
        options={{
          multiple: false,
          sources: ["local", "url"],
          maxFiles: 1,
        }}
        onSuccess={handleSuccess}
      >
        {({ open }) => (
          <div>
            {imageUrl ? (
              <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                <div className="relative aspect-video w-full">
                  <Image
                    src={imageUrl}
                    alt="Uploaded post image"
                    fill
                    sizes="(max-width: 768px) 100vw, 768px"
                    className="object-cover"
                  />
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute right-3 top-3 z-10"
                  onClick={handleRemove}
                >
                  <X className="h-4 w-4" />
                  Remove Image
                </Button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => open?.()}
                className={cn(
                  "group flex w-full flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center transition-colors",
                  "hover:border-emerald-300 hover:bg-emerald-50/50",
                )}
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 transition-colors group-hover:bg-emerald-100">
                  <ImagePlus className="h-6 w-6" />
                </span>
                <span className="text-sm font-medium text-slate-700">
                  Click or Drag &amp; Drop to upload post image
                </span>
                <span className="text-xs text-slate-500">
                  PNG, JPG, WEBP supported via Cloudinary
                </span>
              </button>
            )}
          </div>
        )}
      </CldUploadWidget>
    </div>
  );
}

"use client";

import { ImagePlus, Trash2 } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget, type CloudinaryUploadWidgetResults } from "next-cloudinary";
import { useMemo, useState } from "react";

import { cn, parseImageUrls, serializeImageUrls } from "@/lib/utils";

type ImageUploadProps = {
  name?: string;
  value?: string;
  onChange?: (value?: string) => void;
};

export function ImageUpload({ name = "imageUrl", value, onChange }: ImageUploadProps) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  // Initialize with parsed URLs
  const [images, setImages] = useState<string[]>(() => parseImageUrls(value));

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

    setImages((prev) => {
      const newImages = [...prev, secureUrl];
      onChange?.(serializeImageUrls(newImages));
      return newImages;
    });
  };

  const handleRemove = (indexToRemove: number) => {
    setImages((prev) => {
      const newImages = prev.filter((_, index) => index !== indexToRemove);
      onChange?.(newImages.length > 0 ? serializeImageUrls(newImages) : "");
      return newImages;
    });
  };

  if (!cloudName || !uploadPreset) {
    return (
      <div className="rounded-xl border border-dashed border-amber-300 bg-amber-50/50 p-4 text-sm text-amber-900">
        Set <code>NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME</code> and{" "}
        <code>NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET</code> in <code>.env.local</code>.
      </div>
    );
  }

  // Hidden field stores the JSON string of image URLs
  const serializedValue = images.length > 0 ? serializeImageUrls(images) : "";

  return (
    <div className="space-y-4">
      <input type="hidden" name={name} value={serializedValue} />

      <CldUploadWidget
        uploadPreset={uploadPreset}
        config={uploadConfig}
        options={{
          multiple: true,
          sources: ["local", "url"],
          maxFiles: 10,
        }}
        onSuccess={handleSuccess}
      >
        {({ open }) => {
          return (
            <div className="space-y-4">
              {/* Thumbnail grid */}
              {images.length > 0 ? (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                  {images.map((url, index) => (
                    <div
                      key={url + "-" + index}
                      className="group relative aspect-square overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-sm transition-all hover:shadow-md"
                    >
                      <Image
                        src={url}
                        alt={`Post image ${index + 1}`}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                      <button
                        type="button"
                        onClick={() => handleRemove(index)}
                        className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-lg bg-red-600 text-white opacity-0 shadow transition-all hover:bg-red-700 group-hover:opacity-100"
                        title="Delete image"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <div className="absolute bottom-2 left-2 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
                        {index + 1}
                      </div>
                    </div>
                  ))}

                  {/* Add more button box inside the grid if under maxFiles */}
                  {images.length < 10 && (
                    <button
                      type="button"
                      onClick={() => open?.()}
                      className={cn(
                        "flex aspect-square flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/50 text-center transition-all cursor-pointer",
                        "hover:border-emerald-500 hover:bg-emerald-50/30 hover:text-emerald-700"
                      )}
                    >
                      <ImagePlus className="h-5 w-5 text-slate-500 hover:text-emerald-600" />
                      <span className="text-xs font-medium text-slate-600">Add More</span>
                    </button>
                  )}
                </div>
              ) : (
                /* Empty state / dropzone */
                <button
                  type="button"
                  onClick={() => open?.()}
                  className={cn(
                    "group flex w-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-slate-300 bg-white px-6 py-12 text-center transition-all cursor-pointer",
                    "hover:border-emerald-500 hover:bg-emerald-50/30"
                  )}
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 transition-colors group-hover:bg-emerald-100 group-hover:scale-105 duration-200">
                    <ImagePlus className="h-6 w-6" />
                  </span>
                  <div className="space-y-1">
                    <span className="block text-sm font-semibold text-slate-700">
                      Upload photos of the event
                    </span>
                    <span className="block text-xs text-slate-500">
                      You can select multiple images (up to 10) · PNG, JPG, WEBP
                    </span>
                  </div>
                </button>
              )}
            </div>
          );
        }}
      </CldUploadWidget>
    </div>
  );
}

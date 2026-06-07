"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Calendar, User } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { parseImageUrls } from "@/lib/utils";

type PostCardProps = {
  title: string;
  content: string;
  imageUrl?: string;
  createdAt: Date;
  authorEmail?: string | null;
};

export function PostCard({ title, content, imageUrl, createdAt, authorEmail }: PostCardProps) {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const images = parseImageUrls(imageUrl);

  const formattedDate = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
  }).format(new Date(createdAt));

  // Lightbox keyboard navigation
  useEffect(() => {
    if (activeImageIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveImageIndex(null);
      } else if (e.key === "ArrowRight") {
        setActiveImageIndex((prev) =>
          prev !== null && prev < images.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === "ArrowLeft") {
        setActiveImageIndex((prev) =>
          prev !== null && prev > 0 ? prev - 1 : images.length - 1
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImageIndex, images.length]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) =>
      prev !== null && prev > 0 ? prev - 1 : images.length - 1
    );
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) =>
      prev !== null && prev < images.length - 1 ? prev + 1 : 0
    );
  };

  // Render different layouts depending on image count
  const renderImageCollage = () => {
    if (images.length === 0) return null;

    if (images.length === 1) {
      return (
        <div
          onClick={() => setActiveImageIndex(0)}
          className="relative aspect-video w-full overflow-hidden bg-slate-100 cursor-zoom-in transition-all duration-300 hover:brightness-95"
        >
          <Image
            src={images[0]}
            alt={title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
          />
        </div>
      );
    }

    if (images.length === 2) {
      return (
        <div className="grid grid-cols-2 gap-1.5 overflow-hidden bg-slate-200">
          {images.map((url, index) => (
            <div
              key={url + index}
              onClick={() => setActiveImageIndex(index)}
              className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 cursor-zoom-in transition-all duration-300 hover:brightness-95"
            >
              <Image
                src={url}
                alt={`${title} - image ${index + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, 400px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      );
    }

    // 3 or more images
    const remaining = images.length - 3;
    return (
      <div className="grid grid-cols-3 gap-1.5 overflow-hidden bg-slate-200">
        {/* Main large image */}
        <div
          onClick={() => setActiveImageIndex(0)}
          className="relative col-span-2 aspect-[4/3] w-full overflow-hidden bg-slate-100 cursor-zoom-in transition-all duration-300 hover:brightness-95 md:aspect-video"
        >
          <Image
            src={images[0]}
            alt={title}
            fill
            sizes="(max-width: 768px) 66vw, 530px"
            className="object-cover"
          />
        </div>

        {/* Column of 2 images */}
        <div className="grid grid-rows-2 gap-1.5">
          <div
            onClick={() => setActiveImageIndex(1)}
            className="relative h-full min-h-[90px] overflow-hidden bg-slate-100 cursor-zoom-in transition-all duration-300 hover:brightness-95"
          >
            <Image
              src={images[1]}
              alt={`${title} - image 2`}
              fill
              sizes="(max-width: 768px) 33vw, 270px"
              className="object-cover"
            />
          </div>
          <div
            onClick={() => setActiveImageIndex(2)}
            className="relative h-full min-h-[90px] overflow-hidden bg-slate-100 cursor-zoom-in transition-all duration-300 hover:brightness-95"
          >
            <Image
              src={images[2]}
              alt={`${title} - image 3`}
              fill
              sizes="(max-width: 768px) 33vw, 270px"
              className="object-cover"
            />
            {remaining > 0 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 font-semibold text-white backdrop-blur-[2px]">
                <span className="text-lg md:text-xl">+{remaining}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Card className="group overflow-hidden border border-slate-100 bg-white/70 shadow-sm backdrop-blur-[2px] transition-all duration-300 hover:border-emerald-100 hover:shadow-md hover:shadow-emerald-50/20">
        {renderImageCollage()}

        <CardHeader className="space-y-2.5 pb-2">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-emerald-600/70" />
              {formattedDate}
            </span>
            {authorEmail && (
              <span className="flex items-center gap-1 font-medium text-emerald-800/80 bg-emerald-50 px-2 py-0.5 rounded-full">
                <User className="h-3.5 w-3.5" />
                Brightlife NGO
              </span>
            )}
          </div>
          <CardTitle className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-emerald-950 transition-colors">
            {title}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="whitespace-pre-wrap text-[15px] leading-7 text-slate-600 group-hover:text-slate-700 transition-colors">
            {content}
          </p>
        </CardContent>
      </Card>

      {/* Lightbox Modal */}
      {activeImageIndex !== null && (
        <div
          onClick={() => setActiveImageIndex(null)}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 p-4 backdrop-blur-md transition-opacity duration-300"
        >
          {/* Top Panel */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white">
            <span className="text-sm font-medium">
              Image {activeImageIndex + 1} of {images.length}
            </span>
            <button
              onClick={() => setActiveImageIndex(null)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 cursor-pointer"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Main Image Container */}
          <div className="relative flex h-full max-h-[80vh] w-full max-w-[90vw] items-center justify-center">
            {images.length > 1 && (
              <button
                onClick={handlePrev}
                className="absolute left-0 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 cursor-pointer"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
            )}

            <div className="relative h-full w-full select-none">
              <Image
                src={images[activeImageIndex]}
                alt={`${title} - full image ${activeImageIndex + 1}`}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </div>

            {images.length > 1 && (
              <button
                onClick={handleNext}
                className="absolute right-0 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 cursor-pointer"
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            )}
          </div>

          {/* Captions/Meta */}
          <div className="absolute bottom-6 left-6 right-6 text-center text-slate-300">
            <p className="text-base font-semibold text-white line-clamp-1">{title}</p>
            <p className="text-xs text-slate-400 mt-1">Uploaded · Barpeta, Assam</p>
          </div>
        </div>
      )}
    </>
  );
}

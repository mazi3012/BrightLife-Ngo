import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type PostCardProps = {
  title: string;
  content: string;
  imageUrl?: string;
  createdAt: Date;
};

export function PostCard({ title, content, imageUrl, createdAt }: PostCardProps) {
  const formattedDate = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
  }).format(createdAt);

  return (
    <Card className="overflow-hidden shadow-none">
      {imageUrl ? (
        <div className="relative aspect-video w-full bg-slate-100">
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>
      ) : null}
      <CardHeader className={imageUrl ? "pt-6" : ""}>
        <p className="text-sm text-slate-500">{formattedDate}</p>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="whitespace-pre-wrap leading-7 text-slate-700">{content}</p>
      </CardContent>
    </Card>
  );
}

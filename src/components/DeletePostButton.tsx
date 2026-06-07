"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deletePost } from "@/lib/actions";

type DeletePostButtonProps = {
  postId: number;
};

export function DeletePostButton({ postId }: DeletePostButtonProps) {
  return (
    <form
      action={deletePost}
      onSubmit={(e) => {
        if (!confirm("Are you sure you want to delete this update? This action cannot be undone.")) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={postId} />
      <Button
        type="submit"
        variant="ghost"
        size="sm"
        className="text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg cursor-pointer"
        title="Delete update"
      >
        <Trash2 className="h-4.5 w-4.5" />
      </Button>
    </form>
  );
}

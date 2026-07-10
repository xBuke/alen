"use client";

import Image from "next/image";

import type { ImageAsset } from "@/types";
import { cn } from "@/lib/utils";

type SiteImageProps = {
  image: ImageAsset;
  className?: string;
  imageClassName?: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  showTemporaryBadge?: boolean;
};

const isDevelopment = process.env.NODE_ENV === "development";

export function SiteImage({
  image,
  className,
  imageClassName,
  fill = false,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  showTemporaryBadge,
}: SiteImageProps) {
  const shouldShowBadge =
    showTemporaryBadge ?? (isDevelopment && image.temporary === true);

  const width = image.width ?? 1200;
  const height = image.height ?? 800;

  return (
    <figure className={cn("relative overflow-hidden", className)}>
      <Image
        src={image.src}
        alt={image.alt}
        {...(fill
          ? { fill: true }
          : {
              width,
              height,
            })}
        priority={priority}
        sizes={sizes}
        className={cn("object-cover", imageClassName)}
      />
      {shouldShowBadge ? (
        <figcaption className="absolute bottom-3 left-3 max-w-[calc(100%-1.5rem)] rounded-sm bg-background/80 px-2 py-1 font-body text-[0.65rem] uppercase tracking-wider text-text-muted backdrop-blur-sm">
          Privremena fotografija sa postojeće službene stranice
        </figcaption>
      ) : null}
    </figure>
  );
}

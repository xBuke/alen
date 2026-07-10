"use client";

import Image from "next/image";
import { useState } from "react";

import type { ImageAsset } from "@/types";
import { cn } from "@/lib/utils";

type SiteImageProps = {
  image: ImageAsset;
  className?: string;
  imageClassName?: string;
  objectPosition?: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  showTemporaryBadge?: boolean;
  fallbackClassName?: string;
  onError?: () => void;
};

const isDevelopment = process.env.NODE_ENV === "development";

export function SiteImage({
  image,
  className,
  imageClassName,
  objectPosition,
  fill = false,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  showTemporaryBadge,
  fallbackClassName,
  onError,
}: SiteImageProps) {
  const [hasError, setHasError] = useState(false);

  const shouldShowBadge =
    showTemporaryBadge ?? (isDevelopment && image.temporary === true);

  const width = image.width ?? 1200;
  const height = image.height ?? 800;
  const aspectRatio = width / height;

  if (hasError) {
    return (
      <figure
        className={cn(
          "relative overflow-hidden bg-surface",
          !fill && "w-full",
          className,
          fallbackClassName,
        )}
        style={!fill ? { aspectRatio } : undefined}
        role="img"
        aria-label={image.alt}
      >
        <div
          className={cn(
            "flex h-full w-full items-center justify-center bg-gradient-to-br from-surface to-background",
            fill && "absolute inset-0",
          )}
        >
          <span className="sr-only">{image.alt}</span>
        </div>
      </figure>
    );
  }

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
        style={objectPosition ? { objectPosition } : undefined}
        onError={() => {
          setHasError(true);
          onError?.();
        }}
      />
      {shouldShowBadge ? (
        <figcaption className="absolute bottom-3 left-3 max-w-[calc(100%-1.5rem)] rounded-sm bg-background/80 px-2 py-1 font-body text-[0.65rem] uppercase tracking-wider text-text-muted backdrop-blur-sm">
          Privremena fotografija sa postojeće službene stranice
        </figcaption>
      ) : null}
    </figure>
  );
}

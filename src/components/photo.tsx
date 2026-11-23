import Image from "next/image";
import { Camera } from "lucide-react";
import type { Photo } from "@/data/site-config";

export function PhotoFrame({ photo, placeholder, caption, className = "", sizes, priority = false }: {
  photo: Photo; placeholder: string; caption: string; className?: string; sizes: string; priority?: boolean;
}) {
  return (
    <figure className={`polaroid ${className}`}>
      <div className="photo-window">
        {photo.src ? <Image src={photo.src} alt={photo.alt} fill sizes={sizes}
          loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined}
          style={{ objectPosition: photo.position }} /> : (
          <div className="photo-placeholder"><Camera size={25} aria-hidden="true" /><span>{placeholder}</span></div>
        )}
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

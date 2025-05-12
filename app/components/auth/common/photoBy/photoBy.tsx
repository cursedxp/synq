import { FiMapPin, FiAperture } from "react-icons/fi";
import Link from "next/link";
import React from "react";

interface PhotoByProps {
  location: string;
  photographer: string;
  photoUrl: string;
}

export default function PhotoBy({
  location,
  photographer,
  photoUrl,
}: PhotoByProps) {
  return (
    <div className="absolute bottom-4 right-4 h-10 px-4 min-w-2 rounded-full bg-zinc-900 flex items-center justify-center">
      <div className="text-sm flex items-center gap-2 text-white">
        <FiMapPin aria-hidden="true" />
        <span>{location}</span>
        <FiAperture aria-hidden="true" />
        <Link
          className="font-semibold underline"
          href={photoUrl}
          aria-label={`Photo by ${photographer}`}
        >
          {photographer}
        </Link>
      </div>
    </div>
  );
}

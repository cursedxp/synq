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
    <div className="absolute bottom-4 right-2 py-2 px-2 w-md rounded-full bg-zinc-900">
      <div className="flex justify-center text-sm items-center gap-2 text-white">
        <FiMapPin aria-hidden="true" />
        <div>{location}</div>
        <FiAperture aria-hidden="true" />
        <Link
          className="font-semibold underline"
          href={photoUrl}
          target="_blank"
          aria-label={`Photo by ${photographer}`}
        >
          {photographer}
        </Link>
      </div>
    </div>
  );
}

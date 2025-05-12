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
    <div className="absolute bottom-4 right-4 py-2 px-2 rounded-full shadow-lg bg-zinc-900 max-w-md group cursor-pointer">
      <FiAperture
        aria-hidden="true"
        className="text-white group-hover:hidden"
      />
      <div className="justify-center text-sm items-center gap-2 mx-2 text-white hidden group-hover:flex group-hover:transition-all group-hover:duration-300">
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

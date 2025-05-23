"use client";
import { FiMapPin, FiAperture, FiFileText } from "react-icons/fi";
import Link from "next/link";
import React from "react";
import { useState, useRef, useEffect } from "react";

interface PhotoByProps {
  location?: string;
  photographer: string;
  photoUrl: string;
  shortText?: string;
}

export default function PhotoBy({
  location,
  photographer,
  photoUrl,
  shortText,
}: PhotoByProps) {
  const [showContent, setShowContent] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setShowContent(!showContent);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node)
      ) {
        setShowContent(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div
      className="absolute bottom-4 right-4 py-2 px-2 rounded-full shadow-lg bg-zinc-900 max-w-md cursor-pointer group"
      onClick={handleClick}
    >
      {!showContent ? (
        <FiAperture
          aria-hidden="true"
          className="text-white group-hover:rotate-360 transition-all duration-400"
        />
      ) : (
        <div
          className={`flex justify-center text-sm items-center gap-2 mx-2 text-white `}
          ref={contentRef}
        >
          {shortText ? (
            <FiFileText aria-hidden="true" />
          ) : (
            <FiMapPin aria-hidden="true" />
          )}
          <div>{shortText || location}</div>
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
      )}
    </div>
  );
}

"use client";

import Image from "next/image";
import React from "react";

interface ImageComponentProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function ImageComponent({
  src,
  alt = "image",
  width = 80,
  height = 80,
  className = "",
}: ImageComponentProps) {
  return (
    <span className={`inline-block border-2 rounded-2xl overflow-hidden ${className}`}>
      <Image
        src={src}
        width={width}
        height={height}
        alt={alt}
        loading="lazy"
        className="object-cover"
      />
    </span>
  );
}
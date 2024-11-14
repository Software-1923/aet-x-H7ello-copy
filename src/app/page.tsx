// src/app/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Analytics } from "@vercel/analytics/next";

export default function Home() {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const cloudinaryBaseUrl = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
    if (cloudinaryBaseUrl) {
      setImageUrl(`${cloudinaryBaseUrl}/f_auto,q_auto/w0evajdkwstiimmm7rvc`);
    } else {
      console.error("Cloudinary URL environment variable is missing.");
    }
  }, []);

  return (
    <div className="relative w-full h-screen">
      {/* Arka Plan Resmi */}
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="Background"
          fill
          style={{ objectFit: "cover" }}
          quality={100}
          priority
        />
      )}

      {/* Sayfa İçeriği */}
      <section className="relative z-10 bg-opacity-50 bg-zinc-900 py-20">
        <div className="w-full lg:w-9/12 mx-auto flex flex-col items-center gap-8">
          <button
            type="button"
            className="text-orange-500 px-4 hover:bg-zinc-800 border border-zinc-600 rounded-full text-sm flex items-center gap-4"
          >
            💼 E-Commerce ⚚ - Professional - Fastest \Accessibility
            <IconArrowRightShort height={22} width={22} />
          </button>

          <p className="text-zinc-100 w-full lg:w-9/12 text-4xl md:text-6xl text-center">
            Aether/H7ello
          </p>
          <p className="text-zinc-400 md:w-7/12 text-center">
            Turn your dreams into reality with Multi-Application Infrastructure.
            We’re here to provide the momentum you need and save you time with
            first-class service—a reality beyond dreams.
          </p>

          <div className="space-x-4 flex items-center">
          </div>
        </div>
      </section>

      <Analytics />
    </div>
  );
}

function IconArrowRightShort(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 16 16"
      height="1em"
      width="1em"
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M4 8a.5.5 0 01.5-.5h5.793L8.146 5.354a.5.5 0 11.708-.708l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L10.293 8.5H4.5A.5.5 0 014 8z"
      />
    </svg>
  );
}

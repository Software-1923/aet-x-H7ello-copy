// src/app/page.tsx
"use client";

import React, { useEffect, useState } from "react";
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
    <div className="relative w-full h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Background remains gradient, image loaded but not displayed */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Cloudinary Image"
          style={{ display: "none" }} // Hidden from view
        />
      )}

      {/* Main Content */}
      <section className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-semibold mb-6">
          Explore a New Level of Product
        </h1>
        <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-md mx-auto">
          Just Win. 1st E-Commerce infrastructure in its field. +WEB3 +DApp
        </p>
        <div className="flex justify-center space-x-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full text-sm font-medium">
            Pre-order Now
          </button>
          <button className="bg-transparent border border-blue-500 hover:bg-blue-500 text-white px-6 py-3 rounded-full text-sm font-medium">
            Learn More
          </button>
        </div>
      </section>

      <Analytics />
    </div>
  );
}

// src/app/page.tsx
"use client";

import React from "react";
import Image from "next/image";
import { Button } from "../../../@/components/ui/button";

export function ButtonLink() {
  return (
    <Button
      asChild
      variant="link"
      className="text-blue-600 hover:underline"
    >
      <a href="https://www.hizlisoft.com/" target="_blank" rel="noopener noreferrer">
        Visit our official website
      </a>
    </Button>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-4 py-8 md:px-16 lg:px-32">
      {/* Main Content */}
      <main className="flex flex-col md:flex-row items-start mt-12 w-full max-w-4xl space-y-8 md:space-y-0 md:space-x-8">
        {/* Left Section: Text and Signature */}
        <div className="flex-1 space-y-4">
          <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900">
            About Us
          </h2>
          <p className="text-2xl text-gray-500 font-signature">Project Founder</p>

          {/* Paragraph Content */}
          <p className="text-gray-700">
            Aether is a DApp application built on Next.js based on Web3. We are here to make a potential e-commerce revolution a reality. This app is a sample company backed by Fast Soft Inc., the app is a real-time reality.
          </p>
          <p className="text-gray-700">
            Our official website is located here:
          </p>
          {/* ButtonLink Component */}
          <ButtonLink />
        </div>

        {/* Right Section: Image and Testimonial */}
        <div className="flex-1">
          <Image
            src="/image.png"
            alt="Project Founder"
            width={600}
            height={400}
            className="rounded-md shadow-md"
          />
          <blockquote className="mt-4 text-gray-600 italic border-l-4 border-gray-400 pl-4">
            "We're here for the best."
          </blockquote>
          <p className="text-gray-500 mt-2">Hızlı Soft Inc.</p>
        </div>
      </main>
    </div>
  );
}

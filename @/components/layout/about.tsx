// src/app/page.tsx
"use client";

import React from "react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-4 py-8 md:px-16 lg:px-32">
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center py-4 border-b border-gray-300">
        <h1 className="text-lg font-bold">THEPODCASTSHOW</h1>
        <ul className="hidden md:flex space-x-6 text-gray-600">
          <li>Browse Category</li>
          <li>About</li>
          <li>Pricing</li>
          <li>Blog</li>
        </ul>
        <div className="hidden md:flex space-x-4">
          <button className="text-gray-600">Login</button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Signup</button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex flex-col md:flex-row items-start mt-12 w-full max-w-4xl space-y-8 md:space-y-0 md:space-x-8">
        {/* Left Section: Text and Signature */}
        <div className="flex-1 space-y-4">
          <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900">
            I REALLY LOVE TO TALK WITH PEOPLE
          </h2>
          <p className="text-2xl text-gray-500 font-signature">Torne Hope</p>
          
          {/* Paragraph Content */}
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor ut labore et dolore magna aliqua. 
          </p>

          <p className="text-gray-700">
            Laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>

          {/* Social Media Links */}
          <div>
            <h3 className="font-bold text-gray-800 mb-2">Follow Us</h3>
            <ul className="space-y-1 text-blue-600">
              <li>Instagram</li>
              <li>Youtube</li>
            </ul>
          </div>
        </div>

        {/* Right Section: Image and Testimonial */}
        <div className="flex-1">
          <Image
            src="/path-to-your-image.jpg"
            alt="Torne Hope"
            width={600}
            height={400}
            className="rounded-md shadow-md"
          />
          <blockquote className="mt-4 text-gray-600 italic border-l-4 border-gray-400 pl-4">
            "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur."
          </blockquote>
          <p className="text-gray-500 mt-2">TESTIMONIAL BY Cynthia Summer</p>
        </div>
      </main>
    </div>
  );
}

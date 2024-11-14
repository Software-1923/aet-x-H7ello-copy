// src/components/layout/navbar.tsx

"use client";

import React from "react";
import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton, ClerkProvider } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || ""}>
      <div className="fixed top-0 left-0 right-0 z-50 bg-gray-800 text-white py-4 px-6 flex items-center">
        
        {/* Navbar Linkleri (Sol Kısım) */}
        <div className="flex space-x-4">
          <Link href="/" className="hover:bg-gray-700 px-4 py-2 rounded">
            Dashboard
          </Link>
          <Link href="/about" className="hover:bg-gray-700 px-4 py-2 rounded">
            About
          </Link>
          <Link href="/services" className="hover:bg-gray-700 px-4 py-2 rounded">
            Shop
          </Link>
          <Link href="/contact" className="hover:bg-gray-700 px-4 py-2 rounded">
            Contact
          </Link>
        </div>

        {/* Clerk Oturum Bileşeni (Sağda, Sağ Kenardan Uzak) */}
        <div className="ml-auto flex items-center" style={{ marginRight: "20px" }}>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">
                Login
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </ClerkProvider>
  );
};

export default Navbar;

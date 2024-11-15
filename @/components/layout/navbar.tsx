// src/components/layout/navbar.tsx

"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton, ClerkProvider, useAuth } from "@clerk/nextjs";
import { init } from "@instantdb/react";

// InstantDB'yi .env dosyasındaki uygulama kimliği ile başlatıyoruz
const db = init({ appId: process.env.NEXT_PUBLIC_INSTANTDB_APP_ID || "" });

const Navbar = () => {
  const { getToken, signOut } = useAuth();

  // Clerk'ten alınan idToken ile Instant'da oturum açmayı sağlayan fonksiyon
  const signInToInstantWithClerkToken = async () => {
    const idToken = await getToken();

    if (!idToken) {
      return; // idToken yoksa oturum açma işlemi yapılmaz
    }

    db.auth.signInWithIdToken({
      clientName: process.env.NEXT_PUBLIC_APP_NAME_SECRET || "",
      idToken: idToken,
    });
  };

  useEffect(() => {
    signInToInstantWithClerkToken();
  }, []);

  const { isLoading, user, error } = db.useAuth();

  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || ""}>
      <div className="fixed top-0 left-0 right-0 z-50 bg-gray-800 text-white py-4 px-6 flex items-center">
        
        {/* Navbar Linkleri (Sol Kısım) */}
        <div className="flex space-x-4">
          <Link href="/" className="hover:bg-gray-700 px-4 py-2 rounded">
            Dashboard
          </Link>
          <Link href="/about" className="hover:bg-gray-700 px-4 py-2 rounded">
            About Us
          </Link>
          <Link href="/services" className="hover:bg-gray-700 px-4 py-2 rounded">
            Shop
          </Link>
          <Link href="/contact" className="hover:bg-gray-700 px-4 py-2 rounded">
            Contact
          </Link>
        </div>

        {/* Clerk ve Instant Oturum Bileşenleri (Sağda, Sağ Kenardan Uzak) */}
        <div className="ml-auto flex items-center" style={{ marginRight: "20px" }}>
          {isLoading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error signing in to Instant! {error.message}</div>
          ) : user ? (
            <>
              <p></p>
              <UserButton />
            </>
          ) : (
            <SignedOut>
              <SignInButton mode="modal">
                <button className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">
                  Login
                </button>
              </SignInButton>
            </SignedOut>
          )}
        </div>
      </div>
    </ClerkProvider>
  );
};

export default Navbar;

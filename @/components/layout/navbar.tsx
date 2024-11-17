"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton, ClerkProvider, useAuth } from "@clerk/nextjs";
import { init } from "@instantdb/react";

// InstantDB'yi başlat
const db = init({ appId: process.env.NEXT_PUBLIC_INSTANTDB_APP_ID || "" });

const Navbar = () => {
  const { getToken } = useAuth();

  const signInToInstantWithClerkToken = async () => {
    const idToken = await getToken();
    if (!idToken) return;

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
        <div className="flex space-x-4">
          <Link href="/" className="hover:bg-gray-700 px-4 py-2 rounded">Dashboard</Link>
          <Link href="/about" className="hover:bg-gray-700 px-4 py-2 rounded">About Us</Link>
          <Link href="/shopping" className="hover:bg-gray-700 px-4 py-2 rounded">Shop</Link>
          <Link href="/contact" className="hover:bg-gray-700 px-4 py-2 rounded">Contact</Link>
        </div>

        <div className="ml-auto flex items-center" style={{ marginRight: "20px" }}>
          {isLoading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error signing in to Instant! {error.message}</div>
          ) : user ? (
            <UserButton />
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

'use client';

import React from 'react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';

export default function Home() {
  const [imageUrl, setImageUrl] = useState('');

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
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="Background"
          fill
          style={{ objectFit: 'cover' }}
          quality={100}
          priority
        />
      )}
      <Analytics />
    </div>
  );
}

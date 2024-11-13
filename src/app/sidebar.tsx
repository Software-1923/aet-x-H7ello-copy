// src/app/sidebar.tsx

'use client';

import { useState } from 'react';
import { HomeIcon, SunIcon, FileTextIcon } from '@radix-ui/react-icons';

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState('home');

  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 w-11/12 max-w-screen-lg bg-teal-800 text-white p-4 rounded-xl">
      <ul className="flex justify-around">
        <li
          className={`flex items-center p-2 cursor-pointer ${activeItem === 'home' ? 'bg-teal-600' : ''} rounded-lg`}
          onClick={() => setActiveItem('home')}
        >
          <HomeIcon className="mr-2" />
          Home
        </li>
        <li
          className={`flex items-center p-2 cursor-pointer ${activeItem === 'features' ? 'bg-teal-600' : ''} rounded-lg`}
          onClick={() => setActiveItem('features')}
        >
          <SunIcon className="mr-2" />
          New Features
        </li>
        <li
          className={`flex items-center p-2 cursor-pointer ${activeItem === 'docs' ? 'bg-teal-600' : ''} rounded-lg`}
          onClick={() => setActiveItem('docs')}
        >
          <FileTextIcon className="mr-2" />
          Docs
        </li>
      </ul>
    </div>
  );
}

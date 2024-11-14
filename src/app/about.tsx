// src/pages/about.tsx

"use client";

import React from "react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@radix-ui/react-tooltip";
import { Info, Users, Globe, Phone, Mail, Target } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Page Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Hakkımızda</h1>
          <p className="text-lg text-gray-600">
            İleri teknolojilerle işletmenizin büyümesine katkı sağlıyoruz. Vizyon, değer ve uzman kadromuzla hedeflerinizi birlikte hayata geçiriyoruz.
          </p>
        </header>

        {/* Mission and Vision */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Mission */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center space-x-4 mb-4">
              <Target className="text-indigo-500 w-8 h-8" />
              <h2 className="text-2xl font-semibold text-gray-900">Misyonumuz</h2>
            </div>
            <p className="text-gray-700">
              Misyonumuz, müşterilerimize yenilikçi çözümler sunarak dijital dönüşüm yolculuklarını desteklemektir. Mükemmelliği ve güveni sağlamak için çalışıyoruz.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center space-x-4 mb-4">
              <Globe className="text-indigo-500 w-8 h-8" />
              <h2 className="text-2xl font-semibold text-gray-900">Vizyonumuz</h2>
            </div>
            <p className="text-gray-700">
              Teknoloji alanında lider bir global oyuncu olmayı hedefliyoruz. Sürekli inovasyon yaparak dünya çapında bir etki yaratmayı amaçlıyoruz.
            </p>
          </div>
        </section>

        {/* Our Values */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Değerlerimiz</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <Info className="text-indigo-500 w-10 h-10 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Güven</h3>
              <p className="text-gray-700">
                Tüm müşterilerimize karşı şeffaflık ve güvenle yaklaşırız.
              </p>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <Users className="text-indigo-500 w-10 h-10 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Takım Ruhu</h3>
              <p className="text-gray-700">
                Birlikte başarma tutkusuyla çalışırız, güçlü bir ekip oluştururuz.
              </p>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <Globe className="text-indigo-500 w-10 h-10 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">İnovasyon</h3>
              <p className="text-gray-700">
                Sürekli olarak yeni fikirler geliştirir ve çözümler sunarız.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Ekibimiz</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Example team member */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <img
                src="https://via.placeholder.com/150"
                alt="Team Member"
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Ahmet Yılmaz</h3>
              <p className="text-gray-600">CEO & Kurucu</p>
              <Tooltip>
                <TooltipTrigger className="mt-4 text-indigo-500">Detaylı Bilgi</TooltipTrigger>
                <TooltipContent className="bg-gray-800 text-white p-2 rounded-md">
                  Ahmet Yılmaz, 20 yılı aşkın deneyimiyle şirketin kurucu ortaklarından biridir.
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-indigo-500 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Bizimle İletişime Geçin</h2>
          <p className="mb-4">
            İşbirliği yapmak veya daha fazla bilgi almak için bize ulaşın.
          </p>
          <div className="flex flex-col items-center space-y-2">
            <div className="flex items-center space-x-2">
              <Phone className="w-6 h-6" />
              <span>+90 555 555 5555</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-6 h-6" />
              <span>info@yourcompany.com</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;

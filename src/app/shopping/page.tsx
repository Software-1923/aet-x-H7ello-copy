"use client";

import React, { useEffect, useState } from "react";
import "./shop.css";
import { useUser } from "@clerk/nextjs";

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string | null;
}

const ProductCard: React.FC<Product> = ({ id, name, price, imageUrl }) => {
  const cloudinaryUrl =
    process.env.NEXT_PUBLIC_CLOUDINARY_URL ||
    "https://res.cloudinary.com/your-cloud-name/image/upload"; // Varsayılan URL
  const fullImageUrl = imageUrl
    ? `${cloudinaryUrl}/${imageUrl}`
    : `${cloudinaryUrl}/fl_preserve_transparency/v1731698565/product1_mcmwzc.jpg`; // Yedek görsel

  const addToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    cartItems.push({ id, name, price });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    alert("Ürün sepete eklendi!");
  };

  return (
    <div className="product-card bg-gray-800 rounded-lg p-4">
      <img
        src={fullImageUrl}
        alt={name}
        className="w-full h-40 object-cover rounded-lg mb-4"
      />
      <h2 className="text-lg font-semibold text-white mb-2">{name}</h2>
      <p className="text-gray-400 text-md mb-4">{price} $</p>
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full font-medium text-sm transition-colors duration-200"
        onClick={addToCart}
      >
        Add to Cart
      </button>
    </div>
  );
};

const ProductGrid: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setError(null); // Önceki hataları temizle
        const response = await fetch("/api/products");
        if (!response.ok) {
          throw new Error("Ürünler alınırken bir hata oluştu");
        }
        const productData: Product[] = await response.json();
        setProducts(productData);
      } catch (err: any) {
        setError(err.message);
        console.error("Ürünler alınırken hata oluştu:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="container mx-auto py-8 px-4 mt-16">
      <h1 className="text-2xl font-semibold text-white mb-8">
        {user ? `${user.fullName} için Ürünler` : "Ürünler"}
      </h1>
      <section className="flex flex-wrap gap-4 justify-end mx-8 mr-[clamp(2rem,10%,700px)]">
        {loading ? (
          <p className="text-white">Yükleniyor...</p>
        ) : error ? (
          <p className="text-red-500">Hata: {error}</p>
        ) : products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              imageUrl={product.imageUrl}
            />
          ))
        ) : (
          <p className="text-white">Ürün bulunamadı.</p>
        )}
      </section>
    </main>
  );
};

export default ProductGrid;

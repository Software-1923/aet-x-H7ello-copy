"use client";

import React, { useEffect, useState } from "react";
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
    "https://res.cloudinary.com/your-cloud-name/image/upload";
  const fullImageUrl = imageUrl
    ? `${cloudinaryUrl}/${imageUrl}`
    : `${cloudinaryUrl}/fl_preserve_transparency/v1731698565/product1_mcmwzc.jpg`;

  const addToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    cartItems.push({ id, name, price });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    alert("Ürün sepete eklendi!");
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition">
      <img
        src={fullImageUrl}
        alt={name}
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <h2 className="text-lg font-semibold text-white mb-2">{name}</h2>
      <p className="text-gray-400 text-md mb-4">{price} $</p>
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
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
        setError(null);
        const response = await fetch("/api/products");
        if (!response.ok) {
          throw new Error("Ürünler alınırken bir hata oluştu");
        }
        const productData: Product[] = await response.json();
        setProducts(productData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-semibold text-black mb-8">
        {user ? `${user.fullName} için Ürünler` : "Ürünler"}
      </h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
      </div>
    </main>
  );
};

export default ProductGrid;

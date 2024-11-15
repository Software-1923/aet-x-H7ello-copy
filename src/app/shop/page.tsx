import React from 'react';
import ProductCard from '../../../@/components/ui/button';

const products = [
  {
    imageSrc: '/images/product1.png', // Ürün görsellerinizi buraya ekleyin
    name: 'Racing Ways Jacket',
    price: '$66.00',
    rating: 4.9,
    reviewCount: 1208,
  },
  {
    imageSrc: '/images/product2.png',
    name: 'Racing Ways Jacket',
    price: '$66.00',
    rating: 4.9,
    reviewCount: 1208,
  },
];

const ShopPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex justify-center items-center">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Shop</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;

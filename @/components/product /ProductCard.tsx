import React from 'react';

interface ProductCardProps {
  imageSrc: string;
  name: string;
  price: string;
  rating: number;
  reviewCount: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ imageSrc, name, price, rating, reviewCount }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
      <img src={imageSrc} alt={name} className="w-32 h-32 object-cover rounded-md" />
      <h3 className="mt-4 font-medium text-lg">{name}</h3>
      <div className="flex items-center mt-2 text-yellow-500">
        <span className="text-sm font-medium">{rating}</span>
        <span className="ml-1 text-gray-500 text-sm">({reviewCount} Reviews)</span>
      </div>
      <p className="text-xl font-semibold mt-2">{price}</p>
    </div>
  );
};

export default ProductCard;

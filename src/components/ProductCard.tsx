import { useCart } from '@/lib/useCart'
import type { Product } from '@/types/product'
import { Link } from '@tanstack/react-router'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img 
        src={product.images[0]} 
        alt={product.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
        <p className="text-gray-600 mb-2 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold">${product.price}</span>
          <Link 
            to="/products/$productId" 
            params={{ productId: product.id.toString() }}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            View Details
          </Link>
        </div>
      </div>
      <div className="p-4">
        <button
          onClick={() => addItem(product)}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}
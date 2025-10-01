import { useCart } from '@/lib/useCart'
import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import { CartModal } from './CartModal'

export default function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { items } = useCart()

  return (
    <>
      <header className="p-2 flex gap-2 bg-white text-black justify-between">
        <nav className="flex flex-row">
          <div className="px-2 font-bold">
            <Link to="/">Products</Link>
          </div>
        </nav>

        <button
          onClick={() => setIsCartOpen(true)}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          <span>Cart</span>
          <span className="bg-white text-blue-500 px-2 py-0.5 rounded-full text-sm">
            {items.length}
          </span>
        </button>
      </header>

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </>
  )
}
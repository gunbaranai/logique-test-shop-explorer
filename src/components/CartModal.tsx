import { useCart } from '@/lib/useCart'
import { Fragment, useEffect } from 'react'

interface CartModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CartModal({ isOpen, onClose }: CartModalProps) {
  const { items, removeItem, updateQuantity, getTotal } = useCart()

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <Fragment>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-white rounded-lg shadow-xl">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-medium">Shopping Cart</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                ×
              </button>
            </div>

            {/* Content */}
            <div className="p-4">
              {items.length === 0 ? (
                <p className="text-gray-500 text-center">Your cart is empty</p>
              ) : (
                <div className="space-y-4">
                  {items.map(({ product, quantity }) => (
                    <div key={product.id} className="flex items-center gap-4">
                      <img 
                        src={product.images[0]} 
                        alt={product.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{product.title}</h4>
                        <p className="text-gray-500">${product.price}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity({ productId: product.id, quantity: quantity - 1 })}
                          className="w-8 h-8 rounded-full border hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{quantity}</span>
                        <button
                          onClick={() => updateQuantity({ productId: product.id, quantity: quantity + 1 })}
                          className="w-8 h-8 rounded-full border hover:bg-gray-100"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeItem(product.id)}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Total */}
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between font-medium">
                      <span>Total:</span>
                      <span>${getTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t">
              <button
                onClick={onClose}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
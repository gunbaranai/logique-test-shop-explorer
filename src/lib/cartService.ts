import type { CartItem, Product } from '@/types/product'

const CART_STORAGE_KEY = 'shopping-cart'

export const CartService = {
  getItems(): CartItem[] {
    const items = localStorage.getItem(CART_STORAGE_KEY)
    return items ? JSON.parse(items) : []
  },

  saveItems(items: CartItem[]): void {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  },

  addItem(product: Product): CartItem[] {
    const items = this.getItems()
    const existingItem = items.find(item => item.product.id === product.id)

    if (existingItem) {
      const updatedItems = items.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
      this.saveItems(updatedItems)
      return updatedItems
    }

    const updatedItems = [...items, { product, quantity: 1 }]
    this.saveItems(updatedItems)
    return updatedItems
  },

  removeItem(productId: number): CartItem[] {
    const items = this.getItems()
    const updatedItems = items.filter(item => item.product.id !== productId)
    this.saveItems(updatedItems)
    return updatedItems
  },

  updateQuantity(productId: number, quantity: number): CartItem[] {
    const items = this.getItems()
    const updatedItems = items
      .map(item =>
        item.product.id === productId
          ? { ...item, quantity: Math.max(0, quantity) }
          : item
      )
      .filter(item => item.quantity > 0)
    this.saveItems(updatedItems)
    return updatedItems
  },

  getTotal(items: CartItem[]): number {
    return items.reduce((total, item) => total + (item.product.price * item.quantity), 0)
  }
}
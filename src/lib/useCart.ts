import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { Product } from '@/types/product'
import { CartService } from './cartService'

export function useCart() {
  const queryClient = useQueryClient()
  const cartQuery = useQuery({
    queryKey: ['cart'],
    queryFn: CartService.getItems,
    staleTime: Infinity
  })

  const addItem = useMutation({
    mutationFn: (product: Product) => Promise.resolve(CartService.addItem(product)),
    onSuccess: (newItems) => {
      console.log('Cart updated:', newItems)
      queryClient.setQueryData(['cart'], newItems)
      console.log('Cart after update:', queryClient.getQueryData(['cart']))
    }
  })

  const removeItem = useMutation({
    mutationFn: (productId: number) => Promise.resolve(CartService.removeItem(productId)),
    onSuccess: (newItems) => {
      queryClient.setQueryData(['cart'], newItems)
    }
  })

  const updateQuantity = useMutation({
    mutationFn: ({ productId, quantity }: { productId: number; quantity: number }) =>
      Promise.resolve(CartService.updateQuantity(productId, quantity)),
    onSuccess: (newItems) => {
      queryClient.setQueryData(['cart'], newItems)
    }
  })

  return {
    items: cartQuery.data ?? [],
    isLoading: cartQuery.isLoading,
    addItem: addItem.mutate,
    removeItem: removeItem.mutate,
    updateQuantity: updateQuantity.mutate,
    getTotal: () => CartService.getTotal(cartQuery.data ?? [])
  }
}
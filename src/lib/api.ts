import type { Category, Product } from "@/types/product"

const API_URL = 'https://api.escuelajs.co/api/v1'

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${API_URL}/products`)
  return response.json()
}

export async function getProduct(id: number): Promise<Product> {
  const response = await fetch(`${API_URL}/products/${id}`)
  return response.json()
}

export async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${API_URL}/categories`)
  return response.json()
}
export interface Product {
    id: number
    title: string
    slug: string
    description: string
    price: number
    category: Category
    images: string[]
    creationAt: string
    updatedAt: string
}

export interface ProductsResponse {
    products: Product[]
    total: number
    skip: number
    limit: number
}

export interface Category {
    id: number,
    name: string,
    slug: string,
    image: string,
    creationAt: string,
    updatedAt: string
}
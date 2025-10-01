import { createFileRoute } from '@tanstack/react-router'
import { ProductsPage } from './products'

export const Route = createFileRoute('/')({
  component: ProductsPage,
})

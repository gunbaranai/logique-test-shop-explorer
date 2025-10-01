import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { getProduct } from '@/lib/api'

export const Route = createFileRoute('/products/$productId')({
  component: ProductDetail,
})

function ProductDetail() {
  const { productId } = Route.useParams()
  
  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProduct(Number(productId)),
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading product</div>
  if (!product) return null

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img 
            src={product.images[0]} 
            alt={product.title}
            className="w-full h-96 object-cover"
          />
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <span className="font-semibold">Price:</span> ${product.price}
              </div>
              <div>
                <span className="font-semibold">Category:</span> {product.category.name}
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <img 
                  key={index}
                  src={image}
                  alt={`${product.title} ${index + 1}`}
                  className="w-full h-24 object-cover rounded"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
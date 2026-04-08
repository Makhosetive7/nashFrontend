import React, { useState, useEffect } from 'react'
import { Package, Plus, Edit, Trash2 } from 'lucide-react'
import { getProducts, deleteProduct } from '../api/api'
import { showSuccess, showError } from '../utils/toast'
import LoadingSpinner from '../components/LoadingSpinner'

const ProductsPage = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const data = await getProducts()
      setProducts(data)
    } catch (error) {
      showError('Failed to load products. Please try again.')
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id, name) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return

    try {
      setDeleting(id)
      await deleteProduct(id)
      setProducts(products.filter(p => p.id !== id))
      showSuccess(`Product "${name}" deleted successfully`)
    } catch (error) {
      showError('Failed to delete product. Please try again.')
      console.error('Error deleting product:', error)
    } finally {
      setDeleting(null)
    }
  }

  if (loading) {
    return <LoadingSpinner message="Loading products..." size="large" />
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Package className="w-8 h-8" />
          Products
        </h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
          <Plus className="w-5 h-5" />
          Add Product
        </button>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p>No products found. Add your first product!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">{product.product_name}</h3>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <div className="flex justify-between items-center mt-4">
                <div>
                  <p className="text-2xl font-bold text-blue-600">${product.price}</p>
                  <p className="text-sm text-gray-500">Stock: {product.quantity_in_stock}</p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id, product.product_name)}
                    disabled={deleting === product.id}
                    className="p-2 text-red-600 hover:bg-red-50 rounded disabled:opacity-50"
                  >
                    {deleting === product.id ? (
                      <LoadingSpinner size="small" />
                    ) : (
                      <Trash2 className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductsPage

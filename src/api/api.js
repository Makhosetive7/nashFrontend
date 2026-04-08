const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8001/api'

const handleResponse = async (response) => {
  const data = await response.json()
  
  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Request failed')
  }
  
  return data.data
}

export const getProducts = async () => {
  const response = await fetch(`${API_BASE_URL}/get_products.php`)
  return handleResponse(response)
}

export const createProduct = async (productData) => {
  const formData = new FormData()
  Object.keys(productData).forEach(key => {
    formData.append(key, productData[key])
  })

  const response = await fetch(`${API_BASE_URL}/create_product.php`, {
    method: 'POST',
    body: formData
  })
  return handleResponse(response)
}

export const deleteProduct = async (id) => {
  const response = await fetch(`${API_BASE_URL}/delete_product.php?id=${id}`, {
    method: 'DELETE'
  })
  return handleResponse(response)
}

export const getSales = async () => {
  const response = await fetch(`${API_BASE_URL}/get_sales.php`)
  return handleResponse(response)
}

export const createSale = async (saleData) => {
  const response = await fetch(`${API_BASE_URL}/create_sale.php`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(saleData)
  })
  return handleResponse(response)
}

export const getDashboard = async () => {
  const response = await fetch(`${API_BASE_URL}/dashboard.php`)
  return handleResponse(response)
}

// FILE: src/pages/Products.jsx
// Copy this ENTIRE file into your src/pages/Products.jsx

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../api/api';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

const PageTitle = styled.h2`
  font-size: 32px;
  font-weight: 700;
  color: #333;
`;

const Button = styled.button`
  padding: 12px 24px;
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
`;

const ProductCard = styled.div`
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 20px;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
`;

const ProductName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const ProductDescription = styled.p`
  font-size: 14px;
  color: #6c757d;
  margin-bottom: 12px;
`;

const ProductMeta = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const Price = styled.span`
  font-size: 24px;
  font-weight: 700;
  color: #667eea;
`;

const Stock = styled.span`
  font-size: 14px;
  padding: 4px 12px;
  border-radius: 12px;
  background: ${props => props.$low ? '#dc3545' : '#28a745'};
  color: white;
`;

const CardActions = styled.div`
  display: flex;
  gap: 8px;
`;

const SmallButton = styled.button`
  flex: 1;
  padding: 8px;
  background: ${props => props.$danger ? '#dc3545' : '#667eea'};
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  padding: 32px;
  max-width: 500px;
  width: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-weight: 600;
  font-size: 14px;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ced4da;
  border-radius: 6px;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const TextArea = styled.textarea`
  padding: 12px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  min-height: 80px;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
`;

const CancelButton = styled(Button)`
  background: #6c757d;
`;

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    product_name: '',
    description: '',
    price: '',
    quantity_in_stock: '',
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setFormData({ product_name: '', description: '', price: '', quantity_in_stock: '' });
    setShowModal(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setFormData({
      product_name: product.product_name,
      description: product.description || '',
      price: product.price,
      quantity_in_stock: product.quantity_in_stock,
    });
    setShowModal(true);
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await deleteProduct(id);
      loadProducts();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('product_name', formData.product_name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('quantity_in_stock', formData.quantity_in_stock);

      if (editingProduct) {
        await updateProduct(editingProduct.id, formData);
      } else {
        await createProduct(formDataToSend);
      }
      setShowModal(false);
      loadProducts();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save');
    }
  };

  if (loading) return <div style={{textAlign:'center',padding:'60px'}}>Loading...</div>;

  return (
    <div>
      <Header>
        <PageTitle>Products</PageTitle>
        <Button onClick={handleAddProduct}>+ Add Product</Button>
      </Header>

      <ProductGrid>
        {products.map(product => (
          <ProductCard key={product.id}>
            <ProductName>{product.product_name}</ProductName>
            <ProductDescription>{product.description || 'No description'}</ProductDescription>
            <ProductMeta>
              <Price>${parseFloat(product.price).toFixed(2)}</Price>
              <Stock $low={product.quantity_in_stock <= 10}>
                {product.quantity_in_stock} in stock
              </Stock>
            </ProductMeta>
            <CardActions>
              <SmallButton onClick={() => handleEditProduct(product)}>Edit</SmallButton>
              <SmallButton $danger onClick={() => handleDeleteProduct(product.id)}>Delete</SmallButton>
            </CardActions>
          </ProductCard>
        ))}
      </ProductGrid>

      {showModal && (
        <Modal onClick={() => setShowModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h3>{editingProduct ? 'Edit Product' : 'Add Product'}</h3>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Product Name *</Label>
                <Input
                  type="text"
                  value={formData.product_name}
                  onChange={(e) => setFormData({...formData, product_name: e.target.value})}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Description</Label>
                <TextArea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </FormGroup>
              <FormGroup>
                <Label>Price *</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Stock *</Label>
                <Input
                  type="number"
                  value={formData.quantity_in_stock}
                  onChange={(e) => setFormData({...formData, quantity_in_stock: e.target.value})}
                  required
                />
              </FormGroup>
              <ButtonGroup>
                <CancelButton type="button" onClick={() => setShowModal(false)}>Cancel</CancelButton>
                <Button type="submit">{editingProduct ? 'Update' : 'Create'}</Button>
              </ButtonGroup>
            </Form>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}

export default Products;
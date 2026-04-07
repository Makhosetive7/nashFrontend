// FILE: src/pages/Sales.jsx
// Copy this ENTIRE file into your src/pages/Sales.jsx

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getSales, getProducts, createSale, updateSale, deleteSale } from '../api/api';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

const PageTitle = styled.h2`
  font-size: 32px;
  font-weight: 700;
`;

const Button = styled.button`
  padding: 12px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  padding: 16px 12px;
  text-align: left;
  font-weight: 600;
  background: #f8f9fa;
  border-bottom: 2px solid #dee2e6;
`;

const Td = styled.td`
  padding: 16px 12px;
  border-bottom: 1px solid #dee2e6;
`;

const SmallButton = styled.button`
  padding: 6px 12px;
  background: ${props => props.$danger ? '#dc3545' : '#667eea'};
  color: white;
  border: none;
  border-radius: 6px;
  margin-right: 8px;
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

const Select = styled.select`
  padding: 12px;
  border: 1px solid #ced4da;
  border-radius: 6px;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
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

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
`;

const CancelButton = styled(Button)`
  background: #6c757d;
`;

function Sales() {
  const [sales, setSales] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingSale, setEditingSale] = useState(null);
  const [formData, setFormData] = useState({
    product_id: '',
    quantity_sold: '',
  });

  useEffect(() => {
    loadSales();
    loadProducts();
  }, []);

  const loadSales = async () => {
    try {
      const response = await getSales();
      setSales(response.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddSale = () => {
    setEditingSale(null);
    setFormData({ product_id: '', quantity_sold: '' });
    setShowModal(true);
  };

  const handleEditSale = (sale) => {
    setEditingSale(sale);
    setFormData({
      product_id: sale.product_id,
      quantity_sold: sale.quantity_sold,
    });
    setShowModal(true);
  };

  const handleDeleteSale = async (id) => {
    if (!window.confirm('Delete this sale? Stock will be restored.')) return;
    try {
      await deleteSale(id);
      loadSales();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingSale) {
        await updateSale(editingSale.id, {
          quantity_sold: parseInt(formData.quantity_sold),
        });
      } else {
        await createSale({
          product_id: parseInt(formData.product_id),
          quantity_sold: parseInt(formData.quantity_sold),
        });
      }
      setShowModal(false);
      loadSales();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save sale');
    }
  };

  if (loading) return <div style={{textAlign:'center',padding:'60px'}}>Loading...</div>;

  return (
    <div>
      <Header>
        <PageTitle>Sales</PageTitle>
        <Button onClick={handleAddSale}>+ Record Sale</Button>
      </Header>

      <Table>
        <thead>
          <tr>
            <Th>ID</Th>
            <Th>Product</Th>
            <Th>Quantity</Th>
            <Th>Price</Th>
            <Th>Total</Th>
            <Th>Date</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {sales.map(sale => (
            <tr key={sale.id}>
              <Td>#{sale.id}</Td>
              <Td>{sale.product_name}</Td>
              <Td>{sale.quantity_sold}</Td>
              <Td>${parseFloat(sale.price).toFixed(2)}</Td>
              <Td>${parseFloat(sale.total_price).toFixed(2)}</Td>
              <Td>{new Date(sale.date_of_sale).toLocaleDateString()}</Td>
              <Td>
                <SmallButton onClick={() => handleEditSale(sale)}>Edit</SmallButton>
                <SmallButton $danger onClick={() => handleDeleteSale(sale.id)}>Delete</SmallButton>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>

      {showModal && (
        <Modal onClick={() => setShowModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h3>{editingSale ? 'Edit Sale' : 'Record Sale'}</h3>
            <Form onSubmit={handleSubmit}>
              {!editingSale && (
                <FormGroup>
                  <Label>Product *</Label>
                  <Select
                    value={formData.product_id}
                    onChange={(e) => setFormData({...formData, product_id: e.target.value})}
                    required
                  >
                    <option value="">Select product</option>
                    {products.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.product_name} (Stock: {p.quantity_in_stock})
                      </option>
                    ))}
                  </Select>
                </FormGroup>
              )}
              <FormGroup>
                <Label>Quantity *</Label>
                <Input
                  type="number"
                  min="1"
                  value={formData.quantity_sold}
                  onChange={(e) => setFormData({...formData, quantity_sold: e.target.value})}
                  required
                />
              </FormGroup>
              <ButtonGroup>
                <CancelButton type="button" onClick={() => setShowModal(false)}>Cancel</CancelButton>
                <Button type="submit">{editingSale ? 'Update' : 'Record'}</Button>
              </ButtonGroup>
            </Form>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}

export default Sales;
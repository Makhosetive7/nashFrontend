import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getDashboard } from '../api/api';

const DashboardContainer = styled.div``;

const PageTitle = styled.h2`
  font-size: 36px;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 32px;

  @media (max-width: 768px) {
    font-size: 28px;
    margin-bottom: 24px;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const StatCard = styled.div`
  background: linear-gradient(135deg, ${props => props.$color1}, ${props => props.$color2});
  padding: 32px;
  border-radius: 16px;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
  }

  @media (max-width: 768px) {
    padding: 24px;
  }
`;

const StatLabel = styled.div`
  font-size: 14px;
  opacity: 0.9;
  margin-bottom: 8px;
  font-weight: 500;
`;

const StatValue = styled.div`
  font-size: 36px;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const Section = styled.section`
  margin-bottom: 40px;
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    padding: 16px;
    margin-bottom: 24px;
  }
`;

const SectionTitle = styled.h3`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 20px;
  color: ${props => props.theme.colors.primary};

  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 16px;
  }
`;

const TableContainer = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
`;

const Thead = styled.thead`
  background: ${props => props.theme.colors.background};
`;

const Th = styled.th`
  padding: 12px;
  text-align: left;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  border-bottom: 2px solid ${props => props.theme.colors.grayLight};
  font-size: 14px;
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid ${props => props.theme.colors.grayLight};
  font-size: 14px;
`;

const Badge = styled.span`
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  background: ${props => props.$danger ? props.theme.colors.danger : props.theme.colors.success};
  color: white;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px;
  font-size: 18px;
  color: ${props => props.theme.colors.primary};
`;

const ErrorMessage = styled.div`
  background: #f8d7da;
  color: #721c24;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const response = await getDashboard();
      setDashboard(response.data.data);
      setError(null);
    } catch (err) {
      setError('Failed to load dashboard data. Make sure the backend is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner>Loading dashboard...</LoadingSpinner>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  if (!dashboard) {
    return <ErrorMessage>No dashboard data available</ErrorMessage>;
  }

  return (
    <DashboardContainer>
      <PageTitle>Dashboard</PageTitle>

      <StatsGrid>
        <StatCard $color1="#28587B" $color2="#7F7CAF">
          <StatLabel>Total Products</StatLabel>
          <StatValue>{dashboard.summary.total_products}</StatValue>
        </StatCard>
        <StatCard $color1="#7F7CAF" $color2="#9FB4C7">
          <StatLabel>Total Stock Value</StatLabel>
          <StatValue>${dashboard.summary.total_stock_value.toFixed(2)}</StatValue>
        </StatCard>
        <StatCard $color1="#9FB4C7" $color2="#28587B">
          <StatLabel>Total Sales</StatLabel>
          <StatValue>{dashboard.summary.total_sales_count}</StatValue>
        </StatCard>
        <StatCard $color1="#28587B" $color2="#9FB4C7">
          <StatLabel>Total Revenue</StatLabel>
          <StatValue>${dashboard.summary.total_sales_amount.toFixed(2)}</StatValue>
        </StatCard>
      </StatsGrid>

      {dashboard.low_stock_products && dashboard.low_stock_products.length > 0 && (
        <Section>
          <SectionTitle>Low Stock Alerts</SectionTitle>
          <TableContainer>
            <Table>
              <Thead>
                <tr>
                  <Th>Product Name</Th>
                  <Th>Stock Level</Th>
                  <Th>Status</Th>
                </tr>
              </Thead>
              <tbody>
                {dashboard.low_stock_products.map(product => (
                  <tr key={product.id}>
                    <Td>{product.product_name}</Td>
                    <Td>{product.quantity_in_stock} units</Td>
                    <Td>
                      <Badge $danger>{product.quantity_in_stock === 0 ? 'Out of Stock' : 'Low Stock'}</Badge>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableContainer>
        </Section>
      )}

      {dashboard.top_products && dashboard.top_products.length > 0 && (
        <Section>
          <SectionTitle>Top Selling Products</SectionTitle>
          <TableContainer>
            <Table>
              <Thead>
                <tr>
                  <Th>Product Name</Th>
                  <Th>Total Sold</Th>
                  <Th>Revenue</Th>
                </tr>
              </Thead>
              <tbody>
                {dashboard.top_products.map(product => (
                  <tr key={product.id}>
                    <Td>{product.product_name}</Td>
                    <Td>{product.total_sold} units</Td>
                    <Td>${parseFloat(product.total_revenue).toFixed(2)}</Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableContainer>
        </Section>
      )}

      {dashboard.recent_sales && dashboard.recent_sales.length > 0 && (
        <Section>
          <SectionTitle>Recent Sales</SectionTitle>
          <TableContainer>
            <Table>
              <Thead>
                <tr>
                  <Th>Product</Th>
                  <Th>Quantity</Th>
                  <Th>Total Price</Th>
                  <Th>Date</Th>
                </tr>
              </Thead>
              <tbody>
                {dashboard.recent_sales.map(sale => (
                  <tr key={sale.id}>
                    <Td>{sale.product_name}</Td>
                    <Td>{sale.quantity_sold}</Td>
                    <Td>${parseFloat(sale.total_price).toFixed(2)}</Td>
                    <Td>{new Date(sale.date_of_sale).toLocaleDateString()}</Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableContainer>
        </Section>
      )}
    </DashboardContainer>
  );
}

export default Dashboard;
import React from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';

const LayoutContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.background};
`;

const Content = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;

  @media (max-width: 768px) {
    padding: 20px 15px;
  }
`;

function Layout({ children }) {
  return (
    <LayoutContainer>
      <Navbar />
      <Content>
        {children}
      </Content>
    </LayoutContainer>
  );
}

export default Layout;
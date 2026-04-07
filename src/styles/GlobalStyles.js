import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    -webkit-font-smoothing: antialiased;
    background: #f5f7fa;
    min-height: 100vh;
    color: #333;
  }

  code {
    font-family: 'Courier New', monospace;
  }

  button {
    font-family: inherit;
  }

  input, textarea, select {
    font-family: inherit;
  }
`;

export const theme = {
  colors: {
    primary: '#28587B',      // Dark blue
    secondary: '#7F7CAF',    // Purple
    accent: '#9FB4C7',       // Light blue
    success: '#28a745',
    danger: '#dc3545',
    warning: '#ffc107',
    white: '#ffffff',
    gray: '#6c757d',
    grayLight: '#e9ecef',
    background: '#f5f7fa',
  },
  shadows: {
    small: '0 2px 4px rgba(0,0,0,0.1)',
    medium: '0 4px 8px rgba(0,0,0,0.1)',
    large: '0 8px 16px rgba(0,0,0,0.1)',
  },
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '12px',
  },
};
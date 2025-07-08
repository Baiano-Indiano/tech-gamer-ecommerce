import styled from 'styled-components';
import type { DefaultTheme } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      primaryDark: string;
      text: string;
      textSecondary: string;
      textTertiary: string;
      background: string;
      border: string;
      warning: string;
      info: string;
      success: string;
      error: string;
      [key: string]: string;
    };
    radii: {
      sm: string;
      md: string;
    };
    shadows: {
      sm: string;
    };
  }
}

// Base styled components with proper theme typing
const ThemedComponent = styled.div<{ theme: DefaultTheme }>`
  /* Base styles */
`;

export const Container = styled(ThemedComponent)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

export const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary};
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 1.5rem;
  padding: 0.5rem 0;
  
  &:hover {
    text-decoration: underline;
  }
  
  svg {
    font-size: 1.25rem;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  
  h1 {
    margin: 0 0 0.5rem;
    color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.text};
  }
`;

export const OrderDate = styled.p`
  margin: 0;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.textSecondary};
  font-size: 0.9375rem;
`;

interface StatusBadgeProps {
  $color: keyof DefaultTheme['colors'] | string;
}

export const StatusBadge = styled.span<StatusBadgeProps>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: white;
  background-color: ${({ theme, $color }) => {
    const colorKey = $color as keyof typeof theme.colors;
    return theme.colors[colorKey] || $color || theme.colors.primary;
  }};
  
  svg {
    color: inherit;
    font-size: 1.25rem;
  }
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const Section = styled.section`
  background: ${({ theme }: { theme: DefaultTheme }) => theme.colors.background};
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const SectionTitle = styled.h2`
  font-size: 1.25rem;
  margin: 0 0 1.5rem;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.text};
`;

export const ItemsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 2rem;
  border-bottom: 1px solid ${({ theme }: { theme: DefaultTheme }) => theme.colors.border};
`;

export const Item = styled.li`
  display: flex;
  padding: 1rem 0;
  border-bottom: 1px solid ${({ theme }: { theme: DefaultTheme }) => theme.colors.border};
  
  &:last-child {
    border-bottom: none;
  }
`;

export const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 1rem;
`;

export const ItemDetails = styled.div`
  flex: 1;
`;

export const ItemName = styled.h3`
  margin: 0 0 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.text};
`;

export const ItemPrice = styled.p`
  margin: 0;
  font-size: 0.9375rem;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.textSecondary};
`;

export const ItemSubtotal = styled.div`
  font-weight: 600;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.text};
`;

export const OrderSummary = styled.div`
  margin-top: 2rem;
`;

export const SummaryRow = styled.div.withConfig({
  shouldForwardProp: (prop) => !['$isTotal', '$isDiscount'].includes(prop),
})<{ $isTotal?: boolean; $isDiscount?: boolean }>`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  font-size: 0.9375rem;
  
  ${({ $isTotal }) => $isTotal && `
    margin-top: 1rem;
    padding-top: 1rem;
    font-size: 1.125rem;
    font-weight: 600;
    color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.text};
    border-top: 1px solid ${({ theme }: { theme: DefaultTheme }) => theme.colors.border};
  `}
  
  ${({ $isDiscount }) => $isDiscount && `
    color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.success};
  `}
`;

export const TrackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.75rem 1.5rem;
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 1rem;
  
  &:hover {
    background: ${({ theme }: { theme: DefaultTheme }) => theme.colors.primaryDark};
  }
  
  svg {
    font-size: 1.25rem;
  }
`;

export const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-row: 1;
  }
`;

export const InfoCard = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const InfoCardTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 0 1rem;
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.text};
  
  svg {
    color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary};
  }
`;

export const AddressText = styled.p`
  margin: 0 0 0.5rem;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.text};
  line-height: 1.6;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const PaymentInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  .payment-method {
    font-weight: 500;
  }
  
  .payment-details {
    font-size: 0.875rem;
    color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.textSecondary};
  }
  
  .total {
    margin-top: 0.5rem;
    font-weight: 600;
    color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.text};
  }
`;

export const TrackingInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  .tracking-number {
    font-weight: 500;
  }
  
  .delivery-estimate {
    font-size: 0.875rem;
    color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.textSecondary};
  }
  
  p {
    margin: 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.text};
    
    svg {
      color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary};
    }
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  font-size: 1.2rem;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.textSecondary};
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  font-size: 1.2rem;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.textSecondary};
  text-align: center;
`;

import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styled from 'styled-components';

const SkeletonContainer = styled.div`
  width: 100%;
  padding: 1rem;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.background};
  
  .dark & {
    background: ${({ theme }) => theme.colors.backgroundDark};
  }
`;

type ProductSkeletonProps = {
  count?: number;
};

export const ProductSkeleton = ({ count = 1 }: ProductSkeletonProps) => {
  return (
    <>
      {Array(count).fill(0).map((_, index) => (
        <SkeletonContainer key={index}>
          <Skeleton height={200} style={{ marginBottom: '1rem' }} />
          <Skeleton height={24} width="80%" style={{ marginBottom: '0.5rem' }} />
          <Skeleton height={20} width="60%" style={{ marginBottom: '1rem' }} />
          <Skeleton height={40} width="100%" />
        </SkeletonContainer>
      ))}
    </>
  );
};

export default ProductSkeleton;

import React from 'react';
import styled from 'styled-components';
import ProductCard from '../../../../components/ProductCard';

const List = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.space[4]};
  margin-top: ${({ theme }) => theme.space[4]};
`;

import type { Product } from '../../../../types/product';

interface ProductListProps {
  products: Array<Omit<Product, 'image' | 'images'> & { image: string }>;
}

export const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <List>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </List>
  );
};

export default ProductList;

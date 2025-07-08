import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('product.details')} - {id}</h1>
      {/* Detalhes do produto serão exibidos aqui */}
    </div>
  );
};

export default ProductDetails;

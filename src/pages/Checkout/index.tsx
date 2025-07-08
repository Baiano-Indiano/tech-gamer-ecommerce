import React from 'react';
import { useTranslation } from 'react-i18next';

const Checkout: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('checkout.title')}</h1>
      {/* Formulário de checkout será exibido aqui */}
    </div>
  );
};

export default Checkout;

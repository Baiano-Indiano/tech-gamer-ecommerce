import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { I18nextProvider } from 'react-i18next';

// Providers
import { AppProviders } from '@/app/providers/AppProviders';
import { theme } from '@/theme';
import i18n from '@/i18n/config';

// Components
import { App } from '@/app/App';

// Styles
import '@/styles/globals.css';
import 'react-loading-skeleton/dist/skeleton.css';

// Configuração global do toast
const toastOptions = {
  style: {
    background: theme.colors.background,
    color: theme.colors.text.primary,
    border: `1px solid ${theme.colors.border}`,
  },
  duration: 4000,
};

// Adicionar classe de tema ao body
document.body.classList.add('light-theme');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <AppProviders>
        <App />
        <Toaster position="top-right" toastOptions={toastOptions} />
      </AppProviders>
    </I18nextProvider>
  </StrictMode>
);

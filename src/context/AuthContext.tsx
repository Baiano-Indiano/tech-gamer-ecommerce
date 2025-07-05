import { createContext } from 'react';
import type { AuthContextType } from './AuthContext.types';

/**
 * Contexto de autenticação que fornece o estado do usuário e métodos de autenticação
 * para toda a aplicação.
 * 
 * @see AuthProvider - Provedor do contexto de autenticação
 * @see useAuth - Hook para acessar o contexto de autenticação
 */
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// O componente AuthProvider foi movido para ./AuthProvider.tsx
// O hook useAuth foi movido para ./useAuth.ts

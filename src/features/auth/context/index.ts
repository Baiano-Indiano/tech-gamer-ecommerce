import type { ReactNode } from 'react';
import { AuthContext } from './AuthContext';
import { AuthProvider } from './AuthProvider';
import { useAuth } from './useAuth';
import type { UserProfile, UserAddress, UserPaymentMethod } from '../../../types/user';
import type { AuthContextType } from './AuthContext.types';

export type { UserProfile, UserAddress, UserPaymentMethod };
export type { AuthContextType };

export interface AuthProviderProps {
  children: ReactNode;
}

export { AuthContext, AuthProvider, useAuth };

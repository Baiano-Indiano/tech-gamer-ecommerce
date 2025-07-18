import type { UserProfile, UserAddress, UserPaymentMethod } from '../../../types/user';

export interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Omit<UserProfile, 'id' | 'createdAt' | 'updatedAt' | 'orders' | 'wishlist'> & { password: string }) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<UserProfile>) => Promise<void>;
  addAddress: (address: Omit<UserAddress, 'id' | 'isDefault'>) => Promise<void>;
  updateAddress: (id: string, address: Partial<Omit<UserAddress, 'id' | 'isDefault'>>) => Promise<void>;
  removeAddress: (id: string) => Promise<void>;
  setDefaultAddress: (id: string) => Promise<void>;
  addPaymentMethod: (method: Omit<UserPaymentMethod, 'id' | 'isDefault'>) => Promise<void>;
  removePaymentMethod: (id: string) => Promise<void>;
  setDefaultPaymentMethod: (id: string) => Promise<void>;
  addToWishlist: (productId: string) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
}

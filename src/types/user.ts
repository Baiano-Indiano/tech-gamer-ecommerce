export interface UserAddress {
  id: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
  nickname: string;
}

export interface UserPaymentMethod {
  id: string;
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  isDefault: boolean;
  nickname: string;
}

export interface UserOrder {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  cpf?: string;
  birthDate?: string;
  avatar?: string;
  addresses: UserAddress[];
  paymentMethods: UserPaymentMethod[];
  orders: UserOrder[];
  wishlist: string[]; // Array de productIds
  newsletter: boolean;
  createdAt: string;
  updatedAt: string;
}

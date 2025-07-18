import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import api from '../../../services/api';
import type { UserProfile, UserAddress, UserPaymentMethod } from '../../../types/user';
import { AuthContext } from './AuthContext';
import type { AuthContextType } from './AuthContext.types';

// Mapeia os dados do usuário da API para o formato do frontend
interface ApiUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  cpf?: string;
  birthDate?: string;
  avatar?: string;
  addresses?: UserAddress[];
  paymentMethods?: UserPaymentMethod[];
  orders?: Array<{ id: string }>;
  wishlist?: string[];
  createdAt: string;
  updatedAt: string;
}

const mapApiUserToProfile = (user: ApiUser): UserProfile => ({
  id: user.id,
  name: user.name,
  email: user.email,
  avatar: user.avatar,
  phone: '', // Preencher com os dados reais quando disponíveis na API
  cpf: '', // Preencher com os dados reais quando disponíveis na API
  birthDate: '', // Preencher com os dados reais quando disponíveis na API
  addresses: [], // Preencher com os dados reais quando disponíveis na API
  paymentMethods: [], // Preencher com os dados reais quando disponíveis na API
  orders: [], // Preencher com os dados reais quando disponíveis na API
  wishlist: [], // Preencher com os dados reais quando disponíveis na API
  newsletter: false, // Preencher com os dados reais quando disponíveis na API
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Removed unused isValidUserData function

  // Carrega o usuário na inicialização
  const loadUser = useCallback(async () => {
    try {
      const token = localStorage.getItem('@techgamer:token');
      
      if (!token) {
        setIsLoading(false);
        return;
      }
      
      const userData = await api.auth.getMe();
      const mappedUser = mapApiUserToProfile(userData);
      
      setUser(mappedUser);
      setIsAuthenticated(true);
      localStorage.setItem('@techgamer:user', JSON.stringify(mappedUser));
    } catch (error) {
      console.error('Erro ao carregar usuário:', error);
      // Em caso de erro, limpa os dados de autenticação
      localStorage.removeItem('@techgamer:token');
      localStorage.removeItem('@techgamer:refreshToken');
      localStorage.removeItem('@techgamer:user');
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Efeito para carregar o usuário na inicialização
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const login = useCallback(async (email: string, password: string) => {
    try {
      // Validação básica
      if (!email || !password) {
        throw new Error('E-mail e senha são obrigatórios');
      }
      
      setIsLoading(true);
      
      const { user: userData, token } = await api.auth.login({ email, password });
      
      // Save token to localStorage
      localStorage.setItem('@techgamer:token', token);
      
      // Map API user data to our UserProfile type
      const userProfile = mapApiUserToProfile(userData);
      
      // Save user data to localStorage
      localStorage.setItem('@techgamer:user', JSON.stringify(userProfile));
      
      // Update state
      setUser(userProfile);
      setIsAuthenticated(true);
      
      // Redirect to home page
      navigate('/');
      
      toast.success('Login realizado com sucesso!');
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Falha no login. Verifique suas credenciais.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  // Tipo para os dados de registro, incluindo a senha
  type RegisterData = Omit<UserProfile, 'id' | 'orders' | 'wishlist' | 'createdAt' | 'updatedAt'> & {
    password: string;
  };

  const register = useCallback(async (userData: RegisterData) => {
    try {
      setIsLoading(true);
      // Cria os dados de registro com a senha fornecida
      const registerData = {
        name: userData.name,
        email: userData.email,
        password: userData.password, // Usando a senha fornecida
        ...(userData.phone && { phone: userData.phone }),
        ...(userData.cpf && { cpf: userData.cpf }),
        ...(userData.birthDate && { birthDate: userData.birthDate }),
        // Inclui outros campos opcionais
        ...(userData.avatar && { avatar: userData.avatar }),
        ...(userData.addresses && { addresses: userData.addresses }),
        ...(userData.paymentMethods && { paymentMethods: userData.paymentMethods }),
        ...(userData.newsletter !== undefined && { newsletter: userData.newsletter })
      };
      
      const response = await api.auth.register(registerData);
      const { user: registeredUser, token } = response;
      
      // Save token to localStorage
      localStorage.setItem('@techgamer:token', token);
      
      // Map API user data to our UserProfile type
      const userProfile = mapApiUserToProfile(registeredUser);
      
      // Save user data to localStorage
      localStorage.setItem('@techgamer:user', JSON.stringify(userProfile));
      
      // Update state
      setUser(userProfile);
      setIsAuthenticated(true);
      
      // Redirect to home page
      navigate('/');
      
      toast.success('Cadastro realizado com sucesso!');
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Falha no cadastro. Tente novamente.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  const handleLogout = useCallback(async () => {
    try {
      await api.auth.logout();
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      localStorage.removeItem('@techgamer:token');
      localStorage.removeItem('@techgamer:refreshToken');
      localStorage.removeItem('@techgamer:user');
      setUser(null);
      setIsAuthenticated(false);
    }
  }, []);

  const updateProfile = useCallback(async (data: Partial<UserProfile>) => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      const updatedUser = await api.auth.updateProfile({
        name: data.name || user.name || '',
        email: data.email || user.email || '',
        ...(data.phone && { phone: data.phone }),
        ...(data.cpf && { cpf: data.cpf }),
        ...(data.birthDate && { birthDate: data.birthDate }),
        ...(data.avatar && { avatar: data.avatar }),
      });
      
      const mappedUser = mapApiUserToProfile(updatedUser);
      
      // Atualiza o localStorage
      const storedUser = localStorage.getItem('@techgamer:user');
      if (storedUser) {
        localStorage.setItem('@techgamer:user', JSON.stringify({
          ...JSON.parse(storedUser),
          ...mappedUser
        }));
      }
      
      // Atualiza o estado
      setUser(mappedUser);
      
      toast.success('Perfil atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      toast.error('Erro ao atualizar perfil. Tente novamente.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const addAddress = useCallback(async (addressData: Omit<UserAddress, 'id' | 'isDefault'>): Promise<void> => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      
      const newAddress: UserAddress = {
        ...addressData,
        id: Date.now().toString(),
        isDefault: user.addresses.length === 0,
        street: addressData.street,
        number: addressData.number,
        neighborhood: addressData.neighborhood,
        city: addressData.city,
        state: addressData.state,
        zipCode: addressData.zipCode,
        nickname: addressData.nickname || ''
      };

      const updatedUser = {
        ...user,
        addresses: [...user.addresses, newAddress]
      };

      setUser(updatedUser);
      localStorage.setItem('@techgamer:user', JSON.stringify(updatedUser));
      toast.success('Endereço adicionado com sucesso!');
      
      return;
    } catch (error) {
      console.error('Erro ao adicionar endereço:', error);
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Falha ao adicionar endereço';
      toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const updateAddress = useCallback(async (id: string, addressData: Partial<Omit<UserAddress, 'id' | 'isDefault'>>) => {
    if (!user) {
      throw new Error('Usuário não autenticado');
    }
    
    try {
      setIsLoading(true);
      
      // Verifica se o endereço existe
      const addressExists = user.addresses.some(addr => addr.id === id);
      if (!addressExists) {
        throw new Error('Endereço não encontrado');
      }
      
      // Valida CEP se fornecido
      if (addressData.zipCode && !/^\d{5}-?\d{3}$/.test(addressData.zipCode.replace(/\D/g, ''))) {
        throw new Error('CEP inválido');
      }
      
      // Em uma aplicação real, faríamos uma chamada para a API
      // const response = await api.put(`/users/${user.id}/addresses/${id}`, address);
      // const updatedAddress = response.data;
      
      // Atualização local para demonstração
      const updatedAddresses = user.addresses.map(addr =>
        addr.id === id 
          ? { 
              ...addr, 
              ...addressData, 
              // Garante que o ID e isDefault não sejam sobrescritos
              id: addr.id,
              isDefault: addr.isDefault,
              // Mantém os campos não fornecidos
              street: addressData.street ?? addr.street,
              number: addressData.number ?? addr.number,
              complement: addressData.complement ?? addr.complement,
              neighborhood: addressData.neighborhood ?? addr.neighborhood,
              city: addressData.city ?? addr.city,
              state: addressData.state ?? addr.state,
              zipCode: addressData.zipCode ?? addr.zipCode,
              nickname: addressData.nickname ?? addr.nickname,
            } 
          : addr
      );
      
      // Cria uma cópia atualizada do usuário
      const updatedUser: UserProfile = {
        ...user,
        addresses: updatedAddresses,
        updatedAt: new Date().toISOString(),
      };
      
      // Atualiza o estado e o localStorage
      setUser(updatedUser);
      localStorage.setItem('@techgamer:user', JSON.stringify(updatedUser));
      
    } catch (error) {
      console.error('Falha ao atualizar endereço:', error);
      throw new Error(
        error instanceof Error 
          ? error.message 
          : 'Falha ao atualizar o endereço. Tente novamente.'
      );
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const removeAddress = useCallback(async (id: string) => {
    if (!user) {
      throw new Error('Usuário não autenticado');
    }
    
    try {
      setIsLoading(true);
      
      // Verifica se o endereço existe
      const addressExists = user.addresses.some(addr => addr.id === id);
      if (!addressExists) {
        throw new Error('Endereço não encontrado');
      }
      
      // Verifica se o endereço não é o único endereço do usuário
      if (user.addresses.length <= 1) {
        throw new Error('Não é possível remover o único endereço cadastrado');
      }
      
      // Verifica se o endereço a ser removido é o padrão
      const addressToRemove = user.addresses.find(addr => addr.id === id);
      const isRemovingDefault = addressToRemove?.isDefault;
      
      // Em uma aplicação real, faríamos uma chamada para a API
      // await api.delete(`/users/${user.id}/addresses/${id}`);
      
      // Remove o endereço da lista
      const updatedAddresses = user.addresses.filter(addr => addr.id !== id);
      
      // Se o endereço removido era o padrão, define o primeiro da lista como padrão
      if (isRemovingDefault && updatedAddresses.length > 0) {
        updatedAddresses[0].isDefault = true;
      }
      
      // Cria uma cópia atualizada do usuário
      const updatedUser: UserProfile = {
        ...user,
        addresses: updatedAddresses,
        updatedAt: new Date().toISOString(),
      };
      
      // Atualiza o estado e o localStorage
      setUser(updatedUser);
      localStorage.setItem('@techgamer:user', JSON.stringify(updatedUser));
      
    } catch (error) {
      console.error('Falha ao remover endereço:', error);
      throw new Error(
        error instanceof Error 
          ? error.message 
          : 'Falha ao remover o endereço. Tente novamente.'
      );
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const setDefaultAddress = useCallback(async (id: string) => {
    if (!user) {
      throw new Error('Usuário não autenticado');
    }
    
    try {
      setIsLoading(true);
      
      // Verifica se o endereço existe
      const addressExists = user.addresses.some(addr => addr.id === id);
      if (!addressExists) {
        throw new Error('Endereço não encontrado');
      }
      
      // Verifica se o endereço já é o padrão
      const currentDefault = user.addresses.find(addr => addr.isDefault);
      if (currentDefault?.id === id) {
        return; // Já é o endereço padrão, não há nada para fazer
      }
      
      // Em uma aplicação real, faríamos uma chamada para a API
      // await api.patch(`/users/${user.id}/addresses/${id}/set-default`);
      
      // Atualiza os endereços, definindo apenas o endereço especificado como padrão
      const updatedAddresses = user.addresses.map(addr => ({
        ...addr,
        isDefault: addr.id === id,
      }));
      
      // Cria uma cópia atualizada do usuário
      const updatedUser: UserProfile = {
        ...user,
        addresses: updatedAddresses,
        updatedAt: new Date().toISOString(),
      };
      
      // Atualiza o estado e o localStorage
      setUser(updatedUser);
      localStorage.setItem('@techgamer:user', JSON.stringify(updatedUser));
      
    } catch (error) {
      console.error('Falha ao definir endereço padrão:', error);
      throw new Error(
        error instanceof Error 
          ? error.message 
          : 'Falha ao definir o endereço padrão. Tente novamente.'
      );
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const addPaymentMethod = useCallback(async (method: Omit<UserPaymentMethod, 'id' | 'isDefault'>) => {
    if (!user) {
      throw new Error('Usuário não autenticado');
    }
    
    try {
      setIsLoading(true);
      
      // Validações básicas dos dados do método de pagamento
      const requiredFields: Array<keyof typeof method> = [
        'cardNumber', 'cardHolder', 'expiryDate', 'nickname'
      ] as const;
      
      const missingFields = requiredFields.filter(field => !method[field]);
      if (missingFields.length > 0) {
        throw new Error(`Os seguintes campos são obrigatórios: ${missingFields.join(', ')}`);
      }
      
      // Validação básica do número do cartão (apenas dígitos e comprimento)
      const cardNumber = method.cardNumber.replace(/\D/g, ''); // Remove não dígitos
      if (cardNumber.length < 13 || cardNumber.length > 19) {
        throw new Error('Número do cartão inválido');
      }
      
      // Validação básica da data de expiração (MM/YY)
      if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(method.expiryDate)) {
        throw new Error('Data de expiração inválida. Use o formato MM/AA');
      }
      
      // Em uma aplicação real, faríamos uma chamada para a API
      // const response = await api.post(`/users/${user.id}/payment-methods`, method);
      // const newMethod = response.data;
      
      // Mock de resposta para demonstração
      const newMethod: UserPaymentMethod = {
        ...method,
        id: Math.random().toString(36).substr(2, 9),
        isDefault: user.paymentMethods.length === 0, // Primeiro método é definido como padrão
        // Garante que o número do cartão esteja mascarado no armazenamento
        cardNumber: `•••• •••• •••• ${cardNumber.slice(-4)}`,
      };
      
      // Cria uma cópia atualizada do usuário com o novo método de pagamento
      const updatedUser: UserProfile = {
        ...user,
        paymentMethods: [...user.paymentMethods, newMethod],
        updatedAt: new Date().toISOString(),
      };
      
      // Atualiza o estado e o localStorage
      setUser(updatedUser);
      localStorage.setItem('@techgamer:user', JSON.stringify(updatedUser));
      
    } catch (error) {
      console.error('Falha ao adicionar método de pagamento:', error);
      throw new Error(
        error instanceof Error 
          ? error.message 
          : 'Falha ao adicionar método de pagamento. Tente novamente.'
      );
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const removePaymentMethod = useCallback(async (id: string) => {
    if (!user) {
      throw new Error('Usuário não autenticado');
    }
    
    try {
      setIsLoading(true);
      
      // Verifica se o método de pagamento existe
      const methodExists = user.paymentMethods.some(method => method.id === id);
      if (!methodExists) {
        throw new Error('Método de pagamento não encontrado');
      }
      
      // Verifica se não é o único método de pagamento do usuário
      if (user.paymentMethods.length <= 1) {
        throw new Error('Não é possível remover o único método de pagamento cadastrado');
      }
      
      // Verifica se o método a ser removido é o padrão
      const methodToRemove = user.paymentMethods.find(method => method.id === id);
      const isRemovingDefault = methodToRemove?.isDefault;
      
      // Em uma aplicação real, faríamos uma chamada para a API
      // await api.delete(`/users/${user.id}/payment-methods/${id}`);
      
      // Remove o método de pagamento da lista
      const updatedMethods = user.paymentMethods.filter(method => method.id !== id);
      
      // Se o método removido era o padrão, define o primeiro da lista como padrão
      if (isRemovingDefault && updatedMethods.length > 0) {
        updatedMethods[0].isDefault = true;
      }
      
      // Cria uma cópia atualizada do usuário
      const updatedUser: UserProfile = {
        ...user,
        paymentMethods: updatedMethods,
        updatedAt: new Date().toISOString(),
      };
      
      // Atualiza o estado e o localStorage
      setUser(updatedUser);
      localStorage.setItem('@techgamer:user', JSON.stringify(updatedUser));
      
    } catch (error) {
      console.error('Falha ao remover método de pagamento:', error);
      throw new Error(
        error instanceof Error 
          ? error.message 
          : 'Falha ao remover método de pagamento. Tente novamente.'
      );
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const setDefaultPaymentMethod = useCallback(async (id: string) => {
    if (!user) {
      throw new Error('Usuário não autenticado');
    }
    
    try {
      setIsLoading(true);
      
      // Verifica se o método de pagamento existe
      const methodExists = user.paymentMethods.some(method => method.id === id);
      if (!methodExists) {
        throw new Error('Método de pagamento não encontrado');
      }
      
      // Verifica se o método já é o padrão
      const currentDefault = user.paymentMethods.find(method => method.isDefault);
      if (currentDefault?.id === id) {
        return; // Já é o método padrão, não há nada para fazer
      }
      
      // Em uma aplicação real, faríamos uma chamada para a API
      // await api.patch(`/users/${user.id}/payment-methods/${id}/set-default`);
      
      // Atualiza os métodos de pagamento, definindo apenas o método especificado como padrão
      const updatedMethods = user.paymentMethods.map(method => ({
        ...method,
        isDefault: method.id === id,
      }));
      
      // Cria uma cópia atualizada do usuário
      const updatedUser: UserProfile = {
        ...user,
        paymentMethods: updatedMethods,
        updatedAt: new Date().toISOString(),
      };
      
      // Atualiza o estado e o localStorage
      setUser(updatedUser);
      localStorage.setItem('@techgamer:user', JSON.stringify(updatedUser));
      
    } catch (error) {
      console.error('Falha ao definir método de pagamento padrão:', error);
      throw new Error(
        error instanceof Error 
          ? error.message 
          : 'Falha ao definir método de pagamento padrão. Tente novamente.'
      );
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const addToWishlist = useCallback(async (productId: string) => {
    if (!user) {
      throw new Error('Usuário não autenticado');
    }
    
    try {
      setIsLoading(true);
      
      // Validação básica do ID do produto
      if (!productId || typeof productId !== 'string') {
        throw new Error('ID do produto inválido');
      }
      
      // Verifica se o produto já está na lista de desejos
      if (user.wishlist.includes(productId)) {
        return; // Já está na lista de desejos, não faz nada
      }
      
      // Em uma aplicação real, faríamos uma chamada para a API
      // await api.post(`/users/${user.id}/wishlist`, { productId });
      
      // Cria uma cópia atualizada do usuário com o novo produto na lista de desejos
      const updatedUser: UserProfile = {
        ...user,
        wishlist: [...user.wishlist, productId],
        updatedAt: new Date().toISOString(),
      };
      
      // Atualiza o estado e o localStorage
      setUser(updatedUser);
      localStorage.setItem('@techgamer:user', JSON.stringify(updatedUser));
      
    } catch (error) {
      console.error('Falha ao adicionar à lista de desejos:', error);
      throw new Error(
        error instanceof Error 
          ? error.message 
          : 'Falha ao adicionar à lista de desejos. Tente novamente.'
      );
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const removeFromWishlist = useCallback(async (productId: string) => {
    if (!user) {
      throw new Error('Usuário não autenticado');
    }
    
    try {
      setIsLoading(true);
      
      // Validação básica do ID do produto
      if (!productId || typeof productId !== 'string') {
        throw new Error('ID do produto inválido');
      }
      
      // Verifica se o produto está na lista de desejos
      const productInWishlist = user.wishlist.includes(productId);
      if (!productInWishlist) {
        return; // O produto não está na lista de desejos, não faz nada
      }
      
      // Em uma aplicação real, faríamos uma chamada para a API
      // await api.delete(`/users/${user.id}/wishlist/${productId}`);
      
      // Remove o produto da lista de desejos
      const updatedWishlist = user.wishlist.filter(id => id !== productId);
      
      // Cria uma cópia atualizada do usuário sem o produto na lista de desejos
      const updatedUser: UserProfile = {
        ...user,
        wishlist: updatedWishlist,
        updatedAt: new Date().toISOString(),
      };
      
      // Atualiza o estado e o localStorage
      setUser(updatedUser);
      localStorage.setItem('@techgamer:user', JSON.stringify(updatedUser));
      
    } catch (error) {
      console.error('Falha ao remover da lista de desejos:', error);
      throw new Error(
        error instanceof Error 
          ? error.message 
          : 'Falha ao remover da lista de desejos. Tente novamente.'
      );
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const contextValue = useMemo<AuthContextType>(() => ({
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout: handleLogout,
    updateProfile,
    addAddress,
    updateAddress,
    removeAddress,
    setDefaultAddress,
    addPaymentMethod,
    removePaymentMethod,
    setDefaultPaymentMethod,
    addToWishlist,
    removeFromWishlist,
    loadUser,
  }), [
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    handleLogout,
    updateProfile,
    addAddress,
    updateAddress,
    removeAddress,
    addPaymentMethod,
    removePaymentMethod,
    setDefaultPaymentMethod,
    addToWishlist,
    removeFromWishlist,
    loadUser,
    setDefaultAddress,
  ]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

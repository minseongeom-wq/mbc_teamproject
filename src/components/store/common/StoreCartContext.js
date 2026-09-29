import { createContext, useContext } from 'react';

export const StoreCartContext = createContext(null);

export function useStoreCart() {
  const cart = useContext(StoreCartContext);
  if (!cart) throw new Error('useStoreCart must be used inside StoreCartLayout');
  return cart;
}

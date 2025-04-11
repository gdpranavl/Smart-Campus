"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CartItem, MenuItem, getMenuItemById, calculateCartTotal } from "@/utils/canteenData";

interface CartContextType {
  cart: CartItem[];
  addToCart: (menuItemId: string) => void;
  removeFromCart: (menuItemId: string) => void;
  updateQuantity: (menuItemId: string, quantity: number) => void;
  clearCart: () => void;
  totalAmount: number;
  getCartItemDetails: (cartItem: CartItem) => {
    menuItem: MenuItem | undefined;
    subtotal: number;
  };
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    // Calculate total amount when cart changes
    setTotalAmount(calculateCartTotal(cart));
  }, [cart]);

  const addToCart = (menuItemId: string) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.menuItemId === menuItemId);
      
      if (existingItem) {
        // Item already in cart, increase quantity
        return prevCart.map(item => 
          item.menuItemId === menuItemId 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        // Add new item to cart
        return [...prevCart, { menuItemId, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (menuItemId: string) => {
    setCart(prevCart => prevCart.filter(item => item.menuItemId !== menuItemId));
  };

  const updateQuantity = (menuItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(menuItemId);
      return;
    }

    setCart(prevCart => 
      prevCart.map(item => 
        item.menuItemId === menuItemId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartItemDetails = (cartItem: CartItem) => {
    const menuItem = getMenuItemById(cartItem.menuItemId);
    const subtotal = menuItem ? menuItem.price * cartItem.quantity : 0;
    
    return {
      menuItem,
      subtotal,
    };
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      totalAmount,
      getCartItemDetails
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

import { CartProvider } from '@/context/CartContext';

export default function CanteenLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
    </CartProvider>
  );
}

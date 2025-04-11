import React, { ReactNode } from 'react';
import Header from './layout/Header';
import { Footer } from './layout/Footer';
import { CartDrawer } from './ui/cart-drawer';

interface LayoutProps {
  children: ReactNode;
  containedMode?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, containedMode = false }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header containedMode={containedMode} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      
      {/* Cart Drawer */}
      <CartDrawer />
    </div>
  );
};

export default Layout; 
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { DropdownMenuContent } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Image } from '@/components/ui/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Clock, Download } from 'lucide-react';
import { ShoppingCart } from 'lucide-react';

const CartDropdown = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [language, setLanguage] = useState('en');
  const [isOpen, setIsOpen] = useState(false);

  const updateQuantity = (id, quantity) => {
    // Implementation of updateQuantity function
  };

  const removeFromCart = (id) => {
    // Implementation of removeFromCart function
  };

  const clearCart = () => {
    // Implementation of clearCart function
  };

  return (
    <DropdownMenuContent className="w-96 p-0 border-none bg-background rounded-xl shadow-lg overflow-hidden" align="end">
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="font-medium text-lg">{language === 'en' ? 'Your Cart' : 'Кошница'}</h2>
        <Badge variant="outline" className="ml-2">
          {totalItems} {language === 'en' ? 'items' : 'артикула'}
        </Badge>
      </div>
      
      {cartItems.length === 0 ? (
        <div className="p-6 text-center">
          <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">
            {language === 'en' ? 'Your cart is empty' : 'Кошницата е празна'}
          </p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => router.push('/shop')}
          >
            {language === 'en' ? 'Go to Shop' : 'Към магазина'}
          </Button>
        </div>
      ) : (
        <>
          <ScrollArea className="h-[300px]">
            <div className="p-4 flex flex-col gap-3">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3 py-2">
                  <div className="relative h-16 w-16 rounded-md overflow-hidden border">
                    <Image
                      src={item.coverImage}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                    {item.type === 'service' && (
                      <div className="absolute inset-0 bg-blue-500/80 flex items-center justify-center">
                        <Clock className="h-6 w-6 text-white" />
                      </div>
                    )}
                    {item.type === 'book' && item.itemData && 'digital' in item.itemData && item.itemData.digital && (
                      <div className="absolute inset-0 bg-green-500/80 flex items-center justify-center">
                        <Download className="h-6 w-6 text-white" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{item.title}</p>
                    <div className="flex items-center mt-1">
                      <p className="text-sm text-muted-foreground">{item.quantity} x {item.price}{language === 'en' ? ' BGN' : 'лв'}</p>
                      <Badge variant="secondary" className="ml-2 text-xs">
                        {item.type === 'book' ? (language === 'en' ? 'Book' : 'Книга') : (language === 'en' ? 'Service' : 'Услуга')}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex gap-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="flex items-center justify-center w-8">{item.quantity}</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                    <Button 
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive/80"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          
          <div className="p-4 border-t">
            <div className="flex items-center justify-between mb-4">
              <span className="font-medium">{language === 'en' ? 'Subtotal:' : 'Междинна сума:'}</span>
              <span className="font-bold">{subtotal.toFixed(2)}{language === 'en' ? ' BGN' : 'лв'}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="default" 
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={() => {
                  router.push('/checkout');
                  setIsOpen(false);
                }}
              >
                {language === 'en' ? 'Checkout' : 'Плащане'}
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={clearCart}
              >
                {language === 'en' ? 'Clear Cart' : 'Изчисти'}
              </Button>
            </div>
          </div>
        </>
      )}
    </DropdownMenuContent>
  );
};

export default CartDropdown; 
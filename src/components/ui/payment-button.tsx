"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/LanguageContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';

interface PaymentButtonProps {
  amount: number;
  currency?: string;
  metadata?: Record<string, any>;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  children: React.ReactNode;
  className?: string;
}

export function PaymentButton({
  amount,
  currency = 'bgn',
  metadata = {},
  onSuccess,
  onError,
  children,
  className,
}: PaymentButtonProps) {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { language } = useLanguage();

  // Safe amount value
  const safeAmount = amount || 0;
  
  const handleOpenModal = () => {
    setShowPaymentModal(true);
  };
  
  const handleCompletePayment = () => {
    setIsLoading(true);
    
    // Simulate payment process with a timeout
    setTimeout(() => {
      setIsLoading(false);
      setShowPaymentModal(false);
      
      // Simulate successful payment
      if (onSuccess) {
        onSuccess();
      }
      
      // Show success message
      alert(language === 'en' 
        ? 'Payment successful! Thank you for your purchase.' 
        : 'Плащането е успешно! Благодарим ви за покупката.');
    }, 1500);
  };

  return (
    <>
      <Button
        onClick={handleOpenModal}
        className={className}
      >
        {children}
      </Button>

      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {language === 'en' ? 'Complete Your Purchase' : 'Завършете Вашата Покупка'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <div className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-md">
                <h3 className="font-medium mb-2">
                  {language === 'en' ? 'Order Summary' : 'Детайли на Поръчката'}
                </h3>
                
                <div className="flex justify-between text-sm">
                  <span>{language === 'en' ? 'Subtotal' : 'Междинна сума'}</span>
                  <span>{safeAmount.toFixed(2)} {currency.toUpperCase()}</span>
                </div>
                
                <div className="flex justify-between text-sm mt-1">
                  <span>{language === 'en' ? 'Tax' : 'Данъци'}</span>
                  <span>0.00 {currency.toUpperCase()}</span>
                </div>
                
                <div className="border-t mt-2 pt-2 flex justify-between font-medium">
                  <span>{language === 'en' ? 'Total' : 'Обща сума'}</span>
                  <span>{safeAmount.toFixed(2)} {currency.toUpperCase()}</span>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground">
                {language === 'en' 
                  ? 'This is a demo version. No actual payment will be processed.' 
                  : 'Това е демо версия. Няма да бъде извършено реално плащане.'}
              </p>
            </div>
          </div>
          
          <DialogFooter className="flex space-x-2 sm:space-x-0">
            <DialogClose asChild>
              <Button variant="outline" type="button" className="flex-1">
                {language === 'en' ? 'Cancel' : 'Отказ'}
              </Button>
            </DialogClose>
            
            <Button 
              onClick={handleCompletePayment} 
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {language === 'en' ? 'Processing...' : 'Обработка...'}
                </span>
              ) : (
                language === 'en' ? 'Pay Now' : 'Плати Сега'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
} 
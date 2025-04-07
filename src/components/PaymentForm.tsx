'use client';

import { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Loader2, CreditCard } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

interface PaymentFormProps {
  onSuccess: (paymentIntent: any) => void;
  onError: (error: Error) => void;
}

export function PaymentForm({ onSuccess, onError }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const { language } = useLanguage();
  const translate = (bg: string, en: string) => language === "bg" ? bg : en;

  const handlePayment = async () => {
    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: 'if_required',
      });

      if (error) {
        onError(error);
      } else if (paymentIntent) {
        onSuccess(paymentIntent);
      }
    } catch (error) {
      onError(error as Error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="p-1 rounded-xl
      bg-gradient-to-br from-gray-50/80 via-white/90 to-gray-50/80 
      dark:from-gray-800/80 dark:via-gray-900/90 dark:to-gray-800/80
      shadow-[6px_6px_12px_rgba(0,0,0,0.1),-6px_-6px_12px_rgba(255,255,255,0.9)]
      dark:shadow-[6px_6px_12px_rgba(0,0,0,0.3),-6px_-6px_12px_rgba(30,30,30,0.2)]
      overflow-hidden">
      
      {/* Inner container with gradient and shadow effects */}
      <div className="bg-gradient-to-br from-gray-50/30 via-white/40 to-gray-50/30 dark:from-gray-900/20 dark:via-gray-900/20 dark:to-gray-900/20 p-5 rounded-xl relative">
        {/* Inner shadow effect */}
        <div className="absolute inset-1 bg-white/30 dark:bg-gray-900/30 rounded-lg backdrop-blur-sm shadow-inner pointer-events-none"></div>
        
        {/* Content */}
        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="rounded-full bg-gradient-to-br from-gray-100 to-white dark:from-gray-700 dark:to-gray-800 p-2.5
              shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8)]
              dark:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1)]">
              <CreditCard className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </div>
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              {translate("Платежна информация", "Payment Information")}
            </h2>
          </div>
          
          <div className="p-4 bg-white/80 dark:bg-gray-800/50 rounded-xl border border-gray-200/50 dark:border-gray-700/30 shadow-inner">
            <PaymentElement />
          </div>
          
          <Button
            type="button"
            onClick={handlePayment}
            disabled={!stripe || !elements || isProcessing}
            className="w-full relative overflow-hidden group bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-800 dark:to-gray-900 text-white hover:from-gray-800 hover:to-gray-950 text-base py-3 h-auto font-medium rounded-xl
              shadow-[3px_3px_6px_rgba(0,0,0,0.2),-2px_-2px_5px_rgba(255,255,255,0.1)]
              dark:shadow-[3px_3px_6px_rgba(0,0,0,0.3),-2px_-2px_5px_rgba(60,60,60,0.1)]
              transition-all duration-300 hover:shadow-[1px_1px_3px_rgba(0,0,0,0.2),-1px_-1px_2px_rgba(255,255,255,0.1)]"
          >
            {isProcessing ? (
              <span className="flex items-center justify-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {translate("Обработка...", "Processing...")}
              </span>
            ) : (
              <>
                {translate("Плати сега", "Pay Now")}
                {/* Button glow effect on hover */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </>
            )}
          </Button>
          
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            {translate(
              "Вашите данни са защитени с 256-битово криптиране",
              "Your payment information is secured with 256-bit encryption"
            )}
          </p>
        </div>
      </div>
    </div>
  );
} 
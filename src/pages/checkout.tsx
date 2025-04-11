import React, { useState } from 'react';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import OrderSummary from '@/components/checkout/OrderSummary';
import CheckoutForm, { FormData } from '@/components/checkout/CheckoutForm';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/lib/LanguageContext';
import Image from 'next/image';
import { Shield, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock order data for demonstration
const mockOrderData = {
  items: [
    { id: 1, name: 'Product 1', price: 49.99, quantity: 1, image: '/products/product-1.jpg' },
    { id: 2, name: 'Product 2', price: 29.99, quantity: 2, image: '/products/product-2.jpg' },
  ],
  subtotal: 109.97,
  shipping: 5.99,
  tax: 11.00,
  total: 126.96,
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.1,
    }
  }
};

const itemVariants = {
  hidden: { y: 10, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: 'spring', stiffness: 120 }
  }
};

export default function CheckoutPage() {
  const { toast } = useToast();
  const { language } = useLanguage();
  const translate = (bg: string, en: string) => language === 'bg' ? bg : en;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1); // Track checkout progress

  const handleSubmitOrder = async (formData: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Order submitted:', { formData, order: mockOrderData });
      
      toast({
        title: translate("Поръчката е направена успешно", "Order Placed Successfully"),
        description: translate(
          "Благодарим за поръчката! Ще получите имейл с потвърждение скоро.",
          "Thank you for your purchase! You will receive an email confirmation shortly."
        ),
        variant: "default",
      });
      
      setCheckoutStep(2); // Move to success step
    } catch (error) {
      console.error('Error submitting order:', error);
      
      toast({
        title: translate("Грешка при обработка на поръчката", "Error Processing Order"),
        description: translate(
          "Възникна проблем при обработката на поръчката. Моля, опитайте отново.",
          "There was a problem processing your order. Please try again."
        ),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <SEO 
        title={translate("Плащане | ELIS", "Checkout | ELIS")}
        description={translate(
          "Завършете вашата поръчка сигурно",
          "Complete your purchase securely"
        )}
      />
      
      <div className="w-full bg-gray-50/50 dark:bg-gray-900/50 min-h-screen">
        <div className="container mx-auto px-4 pt-24 pb-12">
          {/* Compact page header with neumorphic styling */}
          <div className="mb-6">
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-xl p-[2px]
                bg-gradient-to-br from-gray-200/80 via-white/90 to-gray-100/80 
                dark:from-gray-800/80 dark:via-gray-900/90 dark:to-gray-800/80
                shadow-[3px_3px_6px_rgba(0,0,0,0.05),-3px_-3px_6px_rgba(255,255,255,0.7)]
                dark:shadow-[3px_3px_6px_rgba(0,0,0,0.2),-3px_-3px_6px_rgba(30,30,30,0.1)]
                overflow-hidden"
            >
              <div className="bg-gradient-to-br from-gray-50/50 via-white/50 to-gray-50/50 dark:from-gray-900/50 dark:via-gray-900/30 dark:to-gray-900/50 p-3 rounded-xl relative">
                {/* Inner shadow effect */}
                <div className="absolute inset-1 bg-white/30 dark:bg-gray-900/30 rounded-lg backdrop-blur-sm shadow-inner pointer-events-none"></div>
                
                <div className="relative z-10">
                  <h1 className="text-2xl font-bold mb-1 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400">
                    {checkoutStep === 1 
                      ? translate("Плащане", "Checkout")
                      : translate("Поръчката е потвърдена", "Order Confirmed")
                    }
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {checkoutStep === 1 
                      ? translate(
                          "Завършете вашата поръчка, като въведете данните си по-долу",
                          "Complete your order by providing your details below"
                        )
                      : translate(
                          "Благодарим за поръчката! Вашата поръчка е успешно направена",
                          "Thank you for your purchase! Your order has been placed successfully"
                        )
                    }
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Checkout flow */}
          {checkoutStep === 1 ? (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8"
            >
              {/* Checkout Form */}
              <motion.div 
                variants={itemVariants}
                className="lg:col-span-2"
              >
                <div className="rounded-xl p-[2px]
                  bg-gradient-to-br from-gray-200/80 via-white/90 to-gray-100/80 
                  dark:from-gray-800/80 dark:via-gray-900/90 dark:to-gray-800/80
                  shadow-[4px_4px_8px_rgba(0,0,0,0.1),-4px_-4px_8px_rgba(255,255,255,0.9)]
                  dark:shadow-[4px_4px_8px_rgba(0,0,0,0.3),-4px_-4px_8px_rgba(30,30,30,0.2)]
                  overflow-hidden"
                >
                  <div className="bg-gradient-to-br from-gray-50/50 via-white/50 to-gray-50/50 dark:from-gray-900/50 dark:via-gray-900/30 dark:to-gray-900/50 p-4 rounded-xl relative">
                    {/* Inner shadow effect */}
                    <div className="absolute inset-1 bg-white/30 dark:bg-gray-900/30 rounded-lg backdrop-blur-sm shadow-inner pointer-events-none"></div>
                    
                    <div className="relative z-10">
                      <CheckoutForm 
                        onSubmit={handleSubmitOrder}
                        loading={isSubmitting}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Order Summary */}
              <motion.div 
                variants={itemVariants} 
                className="space-y-4"
              >
                <div className="rounded-xl p-[2px] sticky top-20
                  bg-gradient-to-br from-gray-200/80 via-white/90 to-gray-100/80 
                  dark:from-gray-800/80 dark:via-gray-900/90 dark:to-gray-800/80
                  shadow-[4px_4px_8px_rgba(0,0,0,0.1),-4px_-4px_8px_rgba(255,255,255,0.9)]
                  dark:shadow-[4px_4px_8px_rgba(0,0,0,0.3),-4px_-4px_8px_rgba(30,30,30,0.2)]
                  overflow-hidden"
                >
                  <div className="bg-gradient-to-br from-gray-50/50 via-white/50 to-gray-50/50 dark:from-gray-900/50 dark:via-gray-900/30 dark:to-gray-900/50 p-3 rounded-xl relative">
                    {/* Inner shadow effect */}
                    <div className="absolute inset-1 bg-white/30 dark:bg-gray-900/30 rounded-lg backdrop-blur-sm shadow-inner pointer-events-none"></div>
                    
                    <div className="relative z-10">
                      <OrderSummary 
                        items={mockOrderData.items}
                        subtotal={mockOrderData.subtotal}
                        shipping={mockOrderData.shipping}
                        tax={mockOrderData.tax}
                        total={mockOrderData.total}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Secure Payment Section */}
                <div className="rounded-xl p-[2px]
                  bg-gradient-to-br from-gray-200/80 via-white/90 to-gray-100/80 
                  dark:from-gray-800/80 dark:via-gray-900/90 dark:to-gray-800/80
                  shadow-[3px_3px_6px_rgba(0,0,0,0.05),-3px_-3px_6px_rgba(255,255,255,0.7)]
                  dark:shadow-[3px_3px_6px_rgba(0,0,0,0.2),-3px_-3px_6px_rgba(30,30,30,0.1)]
                  overflow-hidden"
                >
                  <div className="bg-gradient-to-br from-gray-50/50 via-white/50 to-gray-50/50 dark:from-gray-900/50 dark:via-gray-900/30 dark:to-gray-900/50 p-3 rounded-xl relative">
                    {/* Inner shadow effect */}
                    <div className="absolute inset-1 bg-white/30 dark:bg-gray-900/30 rounded-lg backdrop-blur-sm shadow-inner pointer-events-none"></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-1 mb-2">
                        <Shield className="h-4 w-4 text-green-600" />
                        <h3 className="font-semibold text-sm">{translate("Сигурно плащане", "Secure Payment")}</h3>
                      </div>
                      
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                        {translate(
                          "Всички транзакции са защитени и криптирани.",
                          "All transactions are secure and encrypted."
                        )}
                      </p>
                      
                      <div className="flex items-center gap-2 flex-wrap">
                        {/* Payment icons */}
                        <div className="w-10 h-6 relative grayscale hover:grayscale-0 transition-all duration-300 rounded-md bg-white p-1 shadow-sm">
                          <div className="w-full h-full flex items-center justify-center text-blue-600 font-bold text-xs">
                            VISA
                          </div>
                        </div>
                        <div className="w-10 h-6 relative grayscale hover:grayscale-0 transition-all duration-300 rounded-md bg-white p-1 shadow-sm">
                          <div className="w-full h-full flex items-center justify-center text-red-600 font-bold text-xs">
                            MC
                          </div>
                        </div>
                        <div className="w-10 h-6 relative grayscale hover:grayscale-0 transition-all duration-300 rounded-md bg-white p-1 shadow-sm">
                          <div className="w-full h-full flex items-center justify-center text-blue-800 font-bold text-xs">
                            PP
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            /* Order Success View */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="rounded-xl p-[2px] max-w-2xl mx-auto
                bg-gradient-to-br from-green-100/80 via-white/90 to-green-50/80 
                dark:from-green-900/30 dark:via-gray-900/90 dark:to-gray-800/80
                shadow-[4px_4px_8px_rgba(0,0,0,0.1),-4px_-4px_8px_rgba(255,255,255,0.9)]
                dark:shadow-[4px_4px_8px_rgba(0,0,0,0.3),-4px_-4px_8px_rgba(30,30,30,0.2)]
                overflow-hidden"
            >
              <div className="bg-gradient-to-br from-gray-50/50 via-white/50 to-gray-50/50 dark:from-gray-900/50 dark:via-gray-900/30 dark:to-gray-900/50 p-6 rounded-xl relative">
                {/* Inner shadow effect */}
                <div className="absolute inset-1 bg-white/30 dark:bg-gray-900/30 rounded-lg backdrop-blur-sm shadow-inner pointer-events-none"></div>
                
                <div className="relative z-10 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  
                  <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                    {translate("Поръчката е потвърдена!", "Order Confirmed!")}
                  </h2>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {translate(
                      "Благодарим ви за поръчката! Ще получите имейл с потвърждение и детайли за доставката.",
                      "Thank you for your order! You will receive an email confirmation with delivery details."
                    )}
                  </p>
                  
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {translate("Номер на поръчка", "Order number")}: <span className="font-medium">ORD-{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
} 
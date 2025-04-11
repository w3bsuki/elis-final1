import React, { useState } from 'react';
import SEO from '@/components/SEO';
import OrderSummary from '@/components/checkout/OrderSummary';
import CheckoutForm, { FormData } from '@/components/checkout/CheckoutForm';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/lib/LanguageContext';
import Image from 'next/image';
import { Shield, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Toaster } from '@/components/ui/toaster';

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
  const router = useRouter();

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
    <>
      <SEO 
        title={translate("Плащане | ELIS", "Checkout | ELIS")}
        description={translate(
          "Завършете вашата поръчка сигурно",
          "Complete your purchase securely"
        )}
      />
      
      <div className="pt-10 pb-12 relative">
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          {/* Primary gradient background */}
          <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>
          
          {/* Pattern background */}
          <div className="absolute inset-0 bg-[url('/images/pattern-light.svg')] dark:bg-[url('/images/pattern-dark.svg')] opacity-[0.03] bg-repeat bg-[length:24px_24px]"></div>
          
          {/* Decorative blobs */}
          <div className="absolute top-20 right-0 w-64 h-64 bg-gradient-to-br from-green-400/10 via-blue-300/5 to-purple-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-40 left-0 w-72 h-72 bg-gradient-to-tr from-blue-400/10 via-purple-300/5 to-pink-400/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4">
          {checkoutStep === 1 ? (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Checkout title */}
              <motion.h1 
                variants={itemVariants}
                className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400"
              >
                {translate("Завършване на поръчката", "Complete Your Order")}
              </motion.h1>
              
              {/* Checkout content */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8"
              >
                {/* Checkout Form */}
                <div className="lg:col-span-2">
                  <div className="rounded-xl p-[2px]
                    bg-gradient-to-br from-gray-100/80 via-white/90 to-gray-100/80 
                    dark:from-gray-800/80 dark:via-gray-900/90 dark:to-gray-800/80
                    shadow-[4px_4px_8px_rgba(0,0,0,0.05),-4px_-4px_8px_rgba(255,255,255,0.8)]
                    dark:shadow-[4px_4px_8px_rgba(0,0,0,0.2),-4px_-4px_8px_rgba(30,30,30,0.1)]
                    overflow-hidden"
                  >
                    <div className="bg-gradient-to-br from-gray-50/50 via-white/50 to-gray-50/50 dark:from-gray-900/50 dark:via-gray-900/30 dark:to-gray-900/50 p-5 rounded-xl relative">
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
                </div>
                
                {/* Order Summary */}
                <div className="space-y-4">
                  <div className="rounded-xl p-[2px] sticky top-20
                    bg-gradient-to-br from-gray-100/80 via-white/90 to-gray-100/80 
                    dark:from-gray-800/80 dark:via-gray-900/90 dark:to-gray-800/80
                    shadow-[4px_4px_8px_rgba(0,0,0,0.05),-4px_-4px_8px_rgba(255,255,255,0.8)]
                    dark:shadow-[4px_4px_8px_rgba(0,0,0,0.2),-4px_-4px_8px_rgba(30,30,30,0.1)]
                    overflow-hidden"
                  >
                    <div className="bg-gradient-to-br from-gray-50/50 via-white/50 to-gray-50/50 dark:from-gray-900/50 dark:via-gray-900/30 dark:to-gray-900/50 p-5 rounded-xl relative">
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
                    bg-gradient-to-br from-green-100/50 via-white/90 to-green-50/50 
                    dark:from-green-900/30 dark:via-gray-900/90 dark:to-green-900/20
                    shadow-[3px_3px_6px_rgba(0,0,0,0.05),-3px_-3px_6px_rgba(255,255,255,0.7)]
                    dark:shadow-[3px_3px_6px_rgba(0,0,0,0.2),-3px_-3px_6px_rgba(30,30,30,0.1)]
                    overflow-hidden"
                  >
                    <div className="bg-gradient-to-br from-gray-50/50 via-white/50 to-gray-50/50 dark:from-gray-900/50 dark:via-gray-900/30 dark:to-gray-900/50 p-4 rounded-xl relative">
                      {/* Inner shadow effect */}
                      <div className="absolute inset-1 bg-white/30 dark:bg-gray-900/30 rounded-lg backdrop-blur-sm shadow-inner pointer-events-none"></div>
                      
                      <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-3">
                          <Shield className="h-5 w-5 text-green-600 dark:text-green-500" />
                          <h3 className="font-semibold text-base text-gray-900 dark:text-gray-100">{translate("Сигурно плащане", "Secure Payment")}</h3>
                        </div>
                        
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          {translate(
                            "Всички транзакции са защитени и криптирани с най-високо ниво на сигурност. Вашите данни никога не се съхраняват.",
                            "All transactions are secured and encrypted with the highest level of security. Your data is never stored."
                          )}
                        </p>
                        
                        <div className="flex items-center gap-2 flex-wrap">
                          {/* Payment icons with improved styling */}
                          <div className="w-12 h-8 relative grayscale hover:grayscale-0 transition-all duration-300 rounded-md bg-white p-1 shadow-sm">
                            <div className="w-full h-full flex items-center justify-center text-blue-600 font-bold text-sm">
                              VISA
                            </div>
                          </div>
                          <div className="w-12 h-8 relative grayscale hover:grayscale-0 transition-all duration-300 rounded-md bg-white p-1 shadow-sm">
                            <div className="w-full h-full flex items-center justify-center text-red-600 font-bold text-sm">
                              MC
                            </div>
                          </div>
                          <div className="w-12 h-8 relative grayscale hover:grayscale-0 transition-all duration-300 rounded-md bg-white p-1 shadow-sm">
                            <div className="w-full h-full flex items-center justify-center text-blue-800 font-bold text-sm">
                              PP
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center text-center px-4 py-12 max-w-2xl mx-auto"
            >
              {/* Success animation */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 200, 
                  damping: 20,
                  delay: 0.2
                }}
                className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-green-600 
                  flex items-center justify-center mb-6
                  shadow-[0_0_30px_rgba(34,197,94,0.3)] dark:shadow-[0_0_30px_rgba(34,197,94,0.2)]"
              >
                <motion.div
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <CheckCircle className="h-12 w-12 text-white" strokeWidth={2.5} />
                </motion.div>
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-500 dark:from-green-500 dark:to-emerald-400"
              >
                {translate("Поръчката е успешно завършена!", "Order Successfully Completed!")}
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.7 }}
                className="text-gray-600 dark:text-gray-400 mb-8"
              >
                {translate(
                  "Благодарим Ви за поръчката! Изпратихме потвърждение на имейла Ви с всички детайли.",
                  "Thank you for your order! We've sent a confirmation to your email with all the details."
                )}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.8 }}
                className="rounded-xl p-[2px] w-full max-w-md
                  bg-gradient-to-br from-gray-100/80 via-white/90 to-gray-100/80 
                  dark:from-gray-800/80 dark:via-gray-900/90 dark:to-gray-800/80
                  shadow-[4px_4px_8px_rgba(0,0,0,0.05),-4px_-4px_8px_rgba(255,255,255,0.8)]
                  dark:shadow-[4px_4px_8px_rgba(0,0,0,0.2),-4px_-4px_8px_rgba(30,30,30,0.1)]
                  overflow-hidden mb-6"
              >
                <div className="bg-gradient-to-br from-gray-50/50 via-white/50 to-gray-50/50 dark:from-gray-900/50 dark:via-gray-900/30 dark:to-gray-900/50 p-5 rounded-xl relative">
                  {/* Inner shadow effect */}
                  <div className="absolute inset-1 bg-white/30 dark:bg-gray-900/30 rounded-lg backdrop-blur-sm shadow-inner pointer-events-none"></div>
                  
                  <div className="relative z-10">
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
                        {translate("Данни за поръчката", "Order Details")}
                      </h3>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">
                            {translate("Номер на поръчка", "Order Number")}:
                          </span>
                          <span className="font-medium text-gray-900 dark:text-gray-100">
                            #ORD-{Math.floor(100000 + Math.random() * 900000)}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">
                            {translate("Дата", "Date")}:
                          </span>
                          <span className="font-medium text-gray-900 dark:text-gray-100">
                            {new Date().toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">
                            {translate("Обща сума", "Total")}:
                          </span>
                          <span className="font-semibold text-green-600 dark:text-green-500">
                            ${mockOrderData.total.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.9 }}
                className="flex gap-4"
              >
                <Button 
                  onClick={() => router.push('/shop')} 
                  variant="outline"
                  className="rounded-full bg-white dark:bg-gray-800 
                    px-5 py-6 h-auto shadow-sm hover:shadow-md transition-all 
                    border-gray-200 dark:border-gray-700"
                >
                  {translate("Продължи пазаруването", "Continue Shopping")}
                </Button>
                
                <Button 
                  onClick={() => router.push('/account')} 
                  className="rounded-full bg-gradient-to-r from-green-500 to-green-600 
                    hover:from-green-600 hover:to-green-700 text-white px-5 py-6 h-auto
                    shadow-sm hover:shadow-md transition-all"
                >
                  {translate("Преглед на поръчките", "View Your Orders")}
                </Button>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
      
      <Toaster />
    </>
  );
} 
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useLanguage } from '@/lib/LanguageContext';
import { useCart } from '@/lib/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, ShoppingBag, CreditCard, Truck, CheckCircle, AlertCircle } from 'lucide-react';

export default function CheckoutPage() {
  const { language } = useLanguage();
  const translate = (bg: string, en: string) => language === 'bg' ? bg : en;
  const { cartItems, subtotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();
  
  // Shipping cost calculation
  const shippingCost = subtotal > 50 ? 0 : 5;
  const tax = 0; // Assuming no tax for now
  const totalAmount = subtotal + shippingCost + tax;
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Bulgaria',
    notes: '',
    paymentMethod: 'cod' // Cash on delivery by default
  });
  
  // Form validation state
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // If cart is empty, redirect to shop
  useEffect(() => {
    if (cartItems.length === 0 && !orderComplete) {
      router.push('/shop');
    }
  }, [cartItems, router, orderComplete]);
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  // Handle payment method selection
  const handlePaymentMethodChange = (value: string) => {
    setFormData(prev => ({ ...prev, paymentMethod: value }));
  };
  
  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Required fields
    if (!formData.firstName.trim()) newErrors.firstName = translate('Това поле е задължително', 'This field is required');
    if (!formData.lastName.trim()) newErrors.lastName = translate('Това поле е задължително', 'This field is required');
    if (!formData.address.trim()) newErrors.address = translate('Това поле е задължително', 'This field is required');
    if (!formData.city.trim()) newErrors.city = translate('Това поле е задължително', 'This field is required');
    if (!formData.postalCode.trim()) newErrors.postalCode = translate('Това поле е задължително', 'This field is required');
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = translate('Това поле е задължително', 'This field is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = translate('Невалиден имейл адрес', 'Invalid email address');
    }
    
    // Phone validation (optional but must be valid if provided)
    if (formData.phone && !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(formData.phone)) {
      newErrors.phone = translate('Невалиден телефонен номер', 'Invalid phone number');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: translate('Грешка във формата', 'Form Error'),
        description: translate('Моля, попълнете всички задължителни полета правилно', 'Please fill in all required fields correctly'),
        variant: 'destructive'
      });
      return;
    }
    
    setLoading(true);
    setOrderError(null);
    
    try {
      // Prepare the order data
      const orderData = {
        customer: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone
        },
        shipping: {
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country
        },
        items: cartItems.map(item => ({
          id: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
          type: item.type || 'book'
        })),
        paymentMethod: formData.paymentMethod,
        notes: formData.notes,
        subtotal,
        shippingCost,
        tax,
        totalAmount
      };
      
      // Submit the order
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to process order');
      }
      
      const result = await response.json();
      
      // Order successful
      setOrderId(result.orderId);
      setOrderComplete(true);
      clearCart();
      
      toast({
        title: translate('Поръчката е успешна!', 'Order Successful!'),
        description: translate(`Поръчка #${result.orderId} е приета`, `Order #${result.orderId} has been placed`),
        variant: 'default'
      });
      
    } catch (error) {
      console.error('Checkout error:', error);
      setOrderError(error instanceof Error ? error.message : 'An unknown error occurred');
      
      toast({
        title: translate('Грешка при поръчката', 'Order Error'),
        description: error instanceof Error ? error.message : translate('Възникна неизвестна грешка', 'An unknown error occurred'),
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Render order success page
  if (orderComplete) {
    return (
      <>
        <Head>
          <title>{translate('Поръчка успешна | Elis Books', 'Order Success | Elis Books')}</title>
          <meta name="description" content={translate('Вашата поръчка беше успешно приета', 'Your order has been successfully placed')} />
        </Head>
        
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16 pb-24">
          <div className="container max-w-4xl mx-auto px-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
              <div className="mb-6 flex justify-center">
                <CheckCircle className="h-16 w-16 text-green-500" />
              </div>
              
              <h1 className="text-2xl font-bold mb-4">
                {translate('Поръчката е приета!', 'Order Received!')}
              </h1>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {translate(
                  `Благодарим ви за поръчката. Вашата поръчка #${orderId} е приета и се обработва.`,
                  `Thank you for your order. Your order #${orderId} has been received and is being processed.`
                )}
              </p>
              
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                {translate(
                  'Изпратихме потвърждение на имейла ви. Ще получите известие, когато поръчката ви бъде изпратена.',
                  'We have sent a confirmation to your email. You will receive a notification when your order ships.'
                )}
              </p>
              
              <div className="flex justify-center gap-4">
                <Button variant="default" onClick={() => router.push('/shop')}>
                  {translate('Продължи пазаруването', 'Continue Shopping')}
                </Button>
                
                <Button variant="outline" onClick={() => router.push('/')}>
                  {translate('Начална страница', 'Home Page')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  
  return (
    <>
      <Head>
        <title>{translate('Плащане | Elis Books', 'Checkout | Elis Books')}</title>
        <meta name="description" content={translate('Завършете вашата поръчка', 'Complete your order')} />
      </Head>
      
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16 pb-24">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 text-center">{translate('Плащане', 'Checkout')}</h1>
          
          {orderError && (
            <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 p-4 rounded-md flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">{translate('Възникна грешка', 'An error occurred')}</p>
                <p className="text-sm">{orderError}</p>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Column */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                {/* Customer Information */}
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <ShoppingBag className="h-5 w-5 mr-2 text-green-600 dark:text-green-400" />
                    {translate('Информация за клиента', 'Customer Information')}
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="block mb-1">
                        {translate('Име', 'First Name')} <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={errors.firstName ? 'border-red-500' : ''}
                        placeholder={translate('Въведете вашето име', 'Enter your first name')}
                      />
                      {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                    </div>
                    
                    <div>
                      <Label htmlFor="lastName" className="block mb-1">
                        {translate('Фамилия', 'Last Name')} <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={errors.lastName ? 'border-red-500' : ''}
                        placeholder={translate('Въведете вашата фамилия', 'Enter your last name')}
                      />
                      {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                    </div>
                    
                    <div>
                      <Label htmlFor="email" className="block mb-1">
                        {translate('Имейл', 'Email')} <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={errors.email ? 'border-red-500' : ''}
                        placeholder={translate('Въведете вашия имейл', 'Enter your email')}
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    
                    <div>
                      <Label htmlFor="phone" className="block mb-1">
                        {translate('Телефон', 'Phone')}
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={errors.phone ? 'border-red-500' : ''}
                        placeholder={translate('Въведете вашия телефон', 'Enter your phone number')}
                      />
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                {/* Shipping Information */}
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <Truck className="h-5 w-5 mr-2 text-green-600 dark:text-green-400" />
                    {translate('Информация за доставка', 'Shipping Information')}
                  </h2>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <Label htmlFor="address" className="block mb-1">
                        {translate('Адрес', 'Address')} <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className={errors.address ? 'border-red-500' : ''}
                        placeholder={translate('Въведете вашия адрес', 'Enter your address')}
                      />
                      {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city" className="block mb-1">
                          {translate('Град', 'City')} <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className={errors.city ? 'border-red-500' : ''}
                          placeholder={translate('Въведете вашия град', 'Enter your city')}
                        />
                        {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                      </div>
                      
                      <div>
                        <Label htmlFor="postalCode" className="block mb-1">
                          {translate('Пощенски код', 'Postal Code')} <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="postalCode"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          className={errors.postalCode ? 'border-red-500' : ''}
                          placeholder={translate('Въведете вашия пощенски код', 'Enter your postal code')}
                        />
                        {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>}
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="country" className="block mb-1">
                        {translate('Държава', 'Country')}
                      </Label>
                      <Input
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        disabled
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="notes" className="block mb-1">
                        {translate('Бележки към поръчката', 'Order Notes')}
                      </Label>
                      <Textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        placeholder={translate('Специални инструкции за доставка или други бележки', 'Special delivery instructions or other notes')}
                        className="h-24"
                      />
                    </div>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                {/* Payment Method */}
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <CreditCard className="h-5 w-5 mr-2 text-green-600 dark:text-green-400" />
                    {translate('Метод на плащане', 'Payment Method')}
                  </h2>
                  
                  <RadioGroup
                    value={formData.paymentMethod}
                    onValueChange={handlePaymentMethodChange}
                    className="space-y-4"
                  >
                    <div className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-700 p-4 rounded-md border border-gray-200 dark:border-gray-600">
                      <RadioGroupItem value="cod" id="cod" />
                      <Label htmlFor="cod" className="flex-1 cursor-pointer">
                        {translate('Наложен платеж', 'Cash on Delivery')}
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {translate('Плащате при доставка', 'Pay when you receive your order')}
                        </p>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-700 p-4 rounded-md border border-gray-200 dark:border-gray-600">
                      <RadioGroupItem value="bank" id="bank" />
                      <Label htmlFor="bank" className="flex-1 cursor-pointer">
                        {translate('Банков превод', 'Bank Transfer')}
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {translate('Ще получите банкова информация по имейл', 'Bank details will be sent to your email')}
                        </p>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </form>
            </div>
            
            {/* Order Summary Column */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">{translate('Резюме на поръчката', 'Order Summary')}</h2>
                  
                  <div className="mb-4 max-h-80 overflow-y-auto pr-2">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center py-3 border-b last:border-b-0">
                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
                          {item.image && (
                            <Image
                              src={item.image}
                              alt={item.title}
                              width={64}
                              height={64}
                              className="h-full w-full object-cover object-center"
                            />
                          )}
                        </div>
                        
                        <div className="ml-4 flex-1">
                          <p className="font-medium">{item.title}</p>
                          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-1">
                            <p>{item.price.toFixed(2)} лв.</p>
                            <p>× {item.quantity}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-2 pt-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">{translate('Междинна сума', 'Subtotal')}</span>
                      <span>{subtotal.toFixed(2)} лв.</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">{translate('Доставка', 'Shipping')}</span>
                      <span>
                        {shippingCost === 0 
                          ? translate('Безплатно', 'Free') 
                          : `${shippingCost.toFixed(2)} лв.`
                        }
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">{translate('Данък', 'Tax')}</span>
                      <span>{tax.toFixed(2)} лв.</span>
                    </div>
                    
                    <Separator className="my-2" />
                    
                    <div className="flex justify-between text-lg font-bold">
                      <span>{translate('Общо', 'Total')}</span>
                      <span className="text-green-600 dark:text-green-400">{totalAmount.toFixed(2)} лв.</span>
                    </div>
                  </div>
                  
                  <Button
                    className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white"
                    size="lg"
                    onClick={handleSubmit}
                    disabled={loading || cartItems.length === 0}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {translate('Обработка...', 'Processing...')}
                      </>
                    ) : (
                      translate('Завърши поръчката', 'Place Order')
                    )}
                  </Button>
                  
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
                    {translate(
                      'Натискайки бутона, вие се съгласявате с нашите условия за доставка и политика за поверителност.',
                      'By clicking the button, you agree to our terms of delivery and privacy policy.'
                    )}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 
"use client";

import React from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowRight, CreditCard, Banknote } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 characters.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  postalCode: z.string().min(4, {
    message: "Postal code must be at least 4 characters.",
  }),
  paymentMethod: z.enum(["cash", "card", "paypal"], {
    required_error: "Please select a payment method.",
  }),
});

type CheckoutFormValues = z.infer<typeof formSchema>;

interface CheckoutFormProps {
  onSubmit: (data: CheckoutFormValues) => void;
  loading?: boolean;
}

export default function CheckoutForm({ onSubmit, loading = false }: CheckoutFormProps) {
  const { language } = useLanguage();
  const translate = (bg: string, en: string) => (language === "bg" ? bg : en);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      paymentMethod: "cash",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-h-[calc(100vh-180px)] overflow-y-auto px-1">
        {/* Customer Information */}
        <div className="space-y-4">
          <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm pb-2">
            <h2 className="text-lg font-semibold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
              {translate("Информация за клиента", "Customer Information")}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-700 dark:text-gray-300">
                    {translate("Име", "First Name")}
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder={translate("Въведете име", "Enter first name")} 
                      {...field}
                      className="h-11 bg-gray-50/50 dark:bg-gray-900/50 border-0 rounded-lg
                        shadow-[inset_2px_2px_4px_rgba(0,0,0,0.04),inset_-2px_-2px_4px_rgba(255,255,255,0.4)]
                        dark:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.15),inset_-2px_-2px_4px_rgba(30,30,30,0.1)]
                        focus:ring-2 focus:ring-primary/20 focus:shadow-none transition-all duration-200"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-700 dark:text-gray-300">
                    {translate("Фамилия", "Last Name")}
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder={translate("Въведете фамилия", "Enter last name")} 
                      {...field}
                      className="h-11 bg-gray-50/50 dark:bg-gray-900/50 border-0 rounded-lg
                        shadow-[inset_2px_2px_4px_rgba(0,0,0,0.04),inset_-2px_-2px_4px_rgba(255,255,255,0.4)]
                        dark:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.15),inset_-2px_-2px_4px_rgba(30,30,30,0.1)]
                        focus:ring-2 focus:ring-primary/20 focus:shadow-none transition-all duration-200"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-700 dark:text-gray-300">
                    {translate("Имейл", "Email")}
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder={translate("Въведете имейл", "Enter email")} 
                      type="email" 
                      {...field}
                      className="h-11 bg-gray-50/50 dark:bg-gray-900/50 border-0 rounded-lg
                        shadow-[inset_2px_2px_4px_rgba(0,0,0,0.04),inset_-2px_-2px_4px_rgba(255,255,255,0.4)]
                        dark:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.15),inset_-2px_-2px_4px_rgba(30,30,30,0.1)]
                        focus:ring-2 focus:ring-primary/20 focus:shadow-none transition-all duration-200"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-700 dark:text-gray-300">
                    {translate("Телефон", "Phone")}
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder={translate("Въведете телефон", "Enter phone")} 
                      type="tel" 
                      {...field}
                      className="h-11 bg-gray-50/50 dark:bg-gray-900/50 border-0 rounded-lg
                        shadow-[inset_2px_2px_4px_rgba(0,0,0,0.04),inset_-2px_-2px_4px_rgba(255,255,255,0.4)]
                        dark:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.15),inset_-2px_-2px_4px_rgba(30,30,30,0.1)]
                        focus:ring-2 focus:ring-primary/20 focus:shadow-none transition-all duration-200"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Shipping Information */}
        <div className="space-y-4">
          <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm pb-2">
            <h2 className="text-lg font-semibold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
              {translate("Информация за доставка", "Shipping Information")}
            </h2>
          </div>

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm text-gray-700 dark:text-gray-300">
                  {translate("Адрес", "Address")}
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder={translate("Въведете адрес", "Enter address")} 
                    {...field}
                    className="h-11 bg-gray-50/50 dark:bg-gray-900/50 border-0 rounded-lg
                      shadow-[inset_2px_2px_4px_rgba(0,0,0,0.04),inset_-2px_-2px_4px_rgba(255,255,255,0.4)]
                      dark:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.15),inset_-2px_-2px_4px_rgba(30,30,30,0.1)]
                      focus:ring-2 focus:ring-primary/20 focus:shadow-none transition-all duration-200"
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-700 dark:text-gray-300">
                    {translate("Град", "City")}
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder={translate("Въведете град", "Enter city")} 
                      {...field}
                      className="h-11 bg-gray-50/50 dark:bg-gray-900/50 border-0 rounded-lg
                        shadow-[inset_2px_2px_4px_rgba(0,0,0,0.04),inset_-2px_-2px_4px_rgba(255,255,255,0.4)]
                        dark:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.15),inset_-2px_-2px_4px_rgba(30,30,30,0.1)]
                        focus:ring-2 focus:ring-primary/20 focus:shadow-none transition-all duration-200"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-700 dark:text-gray-300">
                    {translate("Пощенски код", "Postal Code")}
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder={translate("Въведете пощенски код", "Enter postal code")} 
                      {...field}
                      className="h-11 bg-gray-50/50 dark:bg-gray-900/50 border-0 rounded-lg
                        shadow-[inset_2px_2px_4px_rgba(0,0,0,0.04),inset_-2px_-2px_4px_rgba(255,255,255,0.4)]
                        dark:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.15),inset_-2px_-2px_4px_rgba(30,30,30,0.1)]
                        focus:ring-2 focus:ring-primary/20 focus:shadow-none transition-all duration-200"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Payment Method */}
        <div className="space-y-4">
          <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm pb-2">
            <h2 className="text-lg font-semibold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
              {translate("Начин на плащане", "Payment Method")}
            </h2>
          </div>

          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                  >
                    <FormItem className="relative">
                      <FormControl>
                        <RadioGroupItem value="cash" className="sr-only peer" />
                      </FormControl>
                      <FormLabel className="flex flex-col items-center justify-center h-24 rounded-xl border-2 border-gray-200 dark:border-gray-800 
                        peer-aria-checked:border-primary peer-aria-checked:ring-2 peer-aria-checked:ring-primary/20 
                        peer-aria-checked:bg-primary/5 cursor-pointer transition-all duration-200
                        hover:bg-gray-50 dark:hover:bg-gray-900/50 relative group">
                        <Banknote className="h-6 w-6 mb-2 text-gray-600 dark:text-gray-400 peer-aria-checked:text-primary 
                          group-hover:scale-110 transition-transform duration-200" />
                        <span className="text-sm font-medium">
                          {translate("Наложен платеж", "Cash on Delivery")}
                        </span>
                        <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary opacity-0 
                          peer-aria-checked:opacity-100 transition-opacity duration-200"></div>
                      </FormLabel>
                    </FormItem>
                    
                    <FormItem className="relative">
                      <FormControl>
                        <RadioGroupItem value="card" className="sr-only peer" />
                      </FormControl>
                      <FormLabel className="flex flex-col items-center justify-center h-24 rounded-xl border-2 border-gray-200 dark:border-gray-800 
                        peer-aria-checked:border-primary peer-aria-checked:ring-2 peer-aria-checked:ring-primary/20 
                        peer-aria-checked:bg-primary/5 cursor-pointer transition-all duration-200
                        hover:bg-gray-50 dark:hover:bg-gray-900/50 relative group">
                        <CreditCard className="h-6 w-6 mb-2 text-gray-600 dark:text-gray-400 peer-aria-checked:text-primary 
                          group-hover:scale-110 transition-transform duration-200" />
                        <span className="text-sm font-medium text-center">
                          {translate("Кредитна/Дебитна карта", "Credit/Debit Card")}
                        </span>
                        <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary opacity-0 
                          peer-aria-checked:opacity-100 transition-opacity duration-200"></div>
                      </FormLabel>
                    </FormItem>
                    
                    <FormItem className="relative">
                      <FormControl>
                        <RadioGroupItem value="paypal" className="sr-only peer" />
                      </FormControl>
                      <FormLabel className="flex flex-col items-center justify-center h-24 rounded-xl border-2 border-gray-200 dark:border-gray-800 
                        peer-aria-checked:border-primary peer-aria-checked:ring-2 peer-aria-checked:ring-primary/20 
                        peer-aria-checked:bg-primary/5 cursor-pointer transition-all duration-200
                        hover:bg-gray-50 dark:hover:bg-gray-900/50 relative group">
                        <svg className="h-6 w-6 mb-2 text-[#00457C] dark:text-[#0079C1] group-hover:scale-110 transition-transform duration-200" 
                          viewBox="0 0 24 24" fill="currentColor">
                          <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.494a.641.641 0 0 1 .632-.544h7.168c3.073 0 5.317 1.802 5.112 4.374-.274 3.414-3.655 5.393-7.178 5.393h-2.58c-.36 0-.668.264-.724.622l-1.264 7.998h.964zm1.447-9.673h2.58c2.037 0 3.842-1.148 3.989-2.643.147-1.496-1.326-2.643-3.363-2.643H9.063L7.076 21.337z"/>
                        </svg>
                        <span className="text-sm font-medium">PayPal</span>
                        <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary opacity-0 
                          peer-aria-checked:opacity-100 transition-opacity duration-200"></div>
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage className="text-xs mt-2" />
              </FormItem>
            )}
          />
        </div>

        <div className="sticky bottom-0 z-10 pt-4 pb-2 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm">
          <Button 
            type="submit" 
            disabled={loading}
            className="w-full h-12 text-base font-medium rounded-xl bg-gradient-to-r from-primary to-primary/90
              shadow-[2px_2px_4px_rgba(0,0,0,0.08),-2px_-2px_4px_rgba(255,255,255,0.7)]
              dark:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.15)]
              hover:shadow-[1px_1px_2px_rgba(0,0,0,0.04),-1px_-1px_2px_rgba(255,255,255,0.6)]
              dark:hover:shadow-[1px_1px_2px_rgba(0,0,0,0.1),-1px_-1px_2px_rgba(30,30,30,0.05)]
              transition-all duration-200"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                {translate("Обработване...", "Processing...")}
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                {translate("Завърши поръчката", "Complete Order")}
                <ArrowRight className="w-5 h-5" />
              </span>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
} 
"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Send, CheckCircle, AlertCircle, Gift, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

// Form validation schema
const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

// Custom hook that safely uses language context
function useSafeLanguage() {
  const [language, setLanguage] = useState('bg'); // Default to Bulgarian
  
  useEffect(() => {
    try {
      const context = useLanguage();
      setLanguage(context.language);
    } catch (e) {
      console.warn("Language context not available in NewsletterSignup", e);
      // Keep using default language
    }
  }, []);
  
  return { language };
}

export type NewsletterSignupProps = {
  variant?: "default" | "accent" | "premium" | "minimal" | "card";
  showIcon?: boolean;
  showFreeOffer?: boolean;
  buttonText?: string;
  placeholder?: string;
  successMessage?: string;
  errorMessage?: string;
  className?: string;
  inputClassName?: string;
  buttonClassName?: string;
};

export function NewsletterSignup({
  variant = "default",
  showIcon = true,
  showFreeOffer = false,
  buttonText,
  placeholder,
  successMessage,
  errorMessage,
  className,
  inputClassName,
  buttonClassName,
}: NewsletterSignupProps) {
  const { language } = useSafeLanguage();
  const { toast } = useToast();
  const translate = (bg: string, en: string) => (language === "bg" ? bg : en);

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setStatus("loading");

      // Validate email
      await newsletterSchema.parseAsync({ email });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Success
      setStatus("success");
      setEmail("");

      // Show toast
      toast({
        variant: "success",
        title: translate("Успешно абониране!", "Successfully subscribed!"),
        description: translate(
          "Благодарим ви! Ще получите имейл с потвърждение.",
          "Thank you! You'll receive a confirmation email shortly."
        ),
        icon: <CheckCircle className="h-5 w-5" />,
      });

      // Reset after delay
      setTimeout(() => {
        setStatus("idle");
      }, 3000);
    } catch (error) {
      console.error("Newsletter error:", error);
      setStatus("error");

      // Show toast
      if (error instanceof z.ZodError) {
        toast({
          variant: "destructive",
          title: translate("Грешка при абониране", "Subscription Error"),
          description: translate(
            "Моля, въведете валиден имейл адрес.",
            "Please enter a valid email address."
          ),
          icon: <AlertCircle className="h-5 w-5" />,
        });
      }

      // Reset after delay
      setTimeout(() => {
        setStatus("idle");
      }, 3000);
    }
  };

  // Variant styling
  const getContainerStyles = () => {
    switch (variant) {
      case "premium":
        return "bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-950/30 dark:to-amber-900/20 p-6 rounded-xl border border-amber-200 dark:border-amber-800/50 shadow-lg";
      case "accent":
        return "bg-accent/10 dark:bg-accent/5 p-6 rounded-xl border border-accent/20 dark:border-accent/10 shadow-md";
      case "card":
        return "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/10 p-8 rounded-xl border border-blue-200 dark:border-blue-800/50 shadow-lg";
      case "minimal":
        return "";
      default:
        return "p-4 rounded-lg bg-background/80 dark:bg-background/30 backdrop-blur-sm shadow-md border border-border";
    }
  };

  const getButtonVariant = () => {
    switch (variant) {
      case "premium":
        return "premium";
      case "accent":
        return "accent";
      case "card":
        return "success";
      case "minimal":
        return "default";
      default:
        return status === "success" ? "success" : "default";
    }
  };

  // Default messages
  const defaultButtonText = translate("Абонирай се", "Subscribe");
  const defaultPlaceholder = translate("Вашият имейл адрес", "Your email address");
  const defaultSuccessMessage = translate("Успешно се абонирахте!", "Successfully subscribed!");
  const defaultErrorMessage = translate(
    "Моля, въведете валиден имейл адрес.",
    "Please enter a valid email address."
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(getContainerStyles(), className)}
    >
      {showFreeOffer && (
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-amber-500 rounded-full p-2.5">
            <Gift className="h-5 w-5 text-white" />
          </div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {translate(
              "Абонирайте се и получете безплатна електронна книга",
              "Subscribe and get a free ebook"
            )}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="relative">
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={cn(
            "pr-32 text-base h-12 border-2 focus:border-primary focus:ring-primary",
            inputClassName
          )}
          placeholder={placeholder || defaultPlaceholder}
          disabled={status === "loading" || status === "success"}
          required
        />

        <Button
          type="submit"
          variant={getButtonVariant()}
          size="lg"
          animation={status === "success" ? "pulse" : "none"}
          rounded="md"
          isLoading={status === "loading"}
          loadingText={translate("Обработва се...", "Processing...")}
          rightIcon={status === "success" ? <CheckCircle className="h-4 w-4" /> : null}
          leftIcon={showIcon && status === "idle" ? <Send className="h-4 w-4" /> : null}
          disabled={status === "loading" || status === "success"}
          className={cn(
            "absolute right-1 top-1 bottom-1 px-4 min-w-[120px]",
            buttonClassName
          )}
        >
          {status === "success"
            ? translate("Абониран", "Subscribed")
            : buttonText || defaultButtonText}
        </Button>
      </form>

      {status === "error" && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-2 text-red-500 text-sm flex items-center gap-1.5"
        >
          <AlertCircle className="h-4 w-4" />
          {errorMessage || defaultErrorMessage}
        </motion.div>
      )}
    </motion.div>
  );
} 
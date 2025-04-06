import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { useState, useEffect } from "react";

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export default function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  // Use a try/catch to handle potential context errors
  const [lang, setLang] = useState<string>('en');
  
  // Safe translation function that works even without context
  const translate = (bg: string, en: string) => {
    return lang === 'bg' ? bg : en;
  };
  
  // Try to get language from context if available
  useEffect(() => {
    try {
      const { language } = useLanguage();
      setLang(language);
    } catch (e) {
      // If useLanguage fails, default to English
      console.warn("Language context not available in ErrorFallback");
    }
  }, []);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center text-center px-4">
      <div className="mb-6 rounded-full bg-red-100 p-3 text-red-600 dark:bg-red-900/30 dark:text-red-400">
        <AlertTriangle className="h-8 w-8" />
      </div>
      
      <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
        {translate("Упс! Нещо се обърка.", "Oops! Something went wrong.")}
      </h1>
      
      <div className="mb-6 max-w-md text-gray-600 dark:text-gray-400">
        <p className="mb-4">
          {translate(
            "Съжаляваме, но възникна грешка при обработката на вашата заявка.",
            "We're sorry, but an error occurred while processing your request."
          )}
        </p>
        
        <div className="px-4 py-2 mt-2 mb-4 rounded-md bg-gray-100 dark:bg-gray-800 overflow-auto text-left">
          <p className="text-sm font-mono text-red-600 dark:text-red-400">
            {error.message}
          </p>
        </div>
      </div>
      
      <div className="flex gap-4">
        <Button 
          onClick={() => window.location.href = '/'}
          variant="outline"
        >
          {translate("Връщане към началната страница", "Return to home page")}
        </Button>
        
        <Button 
          onClick={resetErrorBoundary}
          variant="default"
          className="gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          {translate("Опитайте отново", "Try again")}
        </Button>
      </div>
      
      <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
        {translate(
          "Ако проблемът продължава, моля свържете се с нас на",
          "If the problem persists, please contact us at"
        )} <a href="mailto:support@elisauthor.com" className="text-primary hover:underline">support@elisauthor.com</a>
      </div>
    </div>
  );
} 
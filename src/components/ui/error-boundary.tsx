"use client";

import React, { useState, useEffect } from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { Button } from './button';
import { AlertTriangle, RefreshCw } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

/**
 * Main error fallback UI component with full styling and i18n support
 */
export function ErrorFallbackUI({ error, resetErrorBoundary }: ErrorFallbackProps) {
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
          {error.stack && (
            <details className="mt-2">
              <summary className="cursor-pointer text-blue-500 text-xs">
                {translate("Показване на техническа информация", "Show technical details")}
              </summary>
              <div className="mt-2 whitespace-pre-wrap text-xs font-mono text-gray-600 dark:text-gray-400">
                {error.stack}
              </div>
            </details>
          )}
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

/**
 * Simplified error fallback UI component for inline component errors
 */
export function SimpleErrorFallbackUI({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div className="p-4 border border-red-200 rounded-md bg-red-50 dark:bg-red-900/20 dark:border-red-900/30 text-red-800 dark:text-red-400">
      <h2 className="text-lg font-semibold mb-2">Something went wrong</h2>
      <p className="mb-4">An error occurred while loading this component.</p>
      <pre className="bg-white dark:bg-gray-900 p-2 rounded text-xs overflow-auto max-h-40 mb-4">
        {error.message}
        {error.stack && (
          <details>
            <summary className="cursor-pointer text-blue-500">Stack trace</summary>
            <div className="mt-2 whitespace-pre-wrap">{error.stack}</div>
          </details>
        )}
      </pre>
      <Button onClick={resetErrorBoundary} variant="secondary">
        Try again
      </Button>
    </div>
  );
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, info: { componentStack: string }) => void;
  onReset?: () => void;
  simple?: boolean;
}

/**
 * SafeComponent wraps children in an error boundary with fallback UI
 */
export function SafeComponent({ 
  children, 
  fallback,
  onError,
  onReset,
  simple = false
}: ErrorBoundaryProps) {
  return (
    <ReactErrorBoundary
      FallbackComponent={
        fallback 
          ? () => <>{fallback}</> 
          : simple 
            ? SimpleErrorFallbackUI 
            : ErrorFallbackUI
      }
      onError={onError}
      onReset={onReset}
    >
      {children}
    </ReactErrorBoundary>
  );
}

/**
 * HOC to wrap a component with an error boundary
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorFallback?: React.ReactNode,
  simple?: boolean
) {
  const WithErrorBoundary = (props: P) => (
    <SafeComponent fallback={errorFallback} simple={simple}>
      <Component {...props} />
    </SafeComponent>
  );
  
  WithErrorBoundary.displayName = `WithErrorBoundary(${Component.displayName || Component.name || 'Component'})`;
  
  return WithErrorBoundary;
}

/**
 * Default export for backward compatibility with existing imports
 */
export default ErrorFallbackUI; 
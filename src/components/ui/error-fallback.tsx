"use client";

import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { Button } from './button';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

function ErrorFallbackUI({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div className="p-4 border border-red-200 rounded-md bg-red-50 text-red-800">
      <h2 className="text-lg font-semibold mb-2">Something went wrong</h2>
      <p className="mb-4">An error occurred while loading this component.</p>
      <pre className="bg-white p-2 rounded text-xs overflow-auto max-h-40 mb-4">
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
}

export function SafeComponent({ 
  children, 
  fallback,
  onError,
  onReset
}: ErrorBoundaryProps) {
  return (
    <ReactErrorBoundary
      FallbackComponent={fallback ? () => <>{fallback}</> : ErrorFallbackUI}
      onError={onError}
      onReset={onReset}
    >
      {children}
    </ReactErrorBoundary>
  );
}

export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorFallback?: React.ReactNode
) {
  const WithErrorBoundary = (props: P) => (
    <SafeComponent fallback={errorFallback}>
      <Component {...props} />
    </SafeComponent>
  );
  
  WithErrorBoundary.displayName = `WithErrorBoundary(${Component.displayName || Component.name || 'Component'})`;
  
  return WithErrorBoundary;
} 
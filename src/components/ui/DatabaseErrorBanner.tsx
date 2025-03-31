import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface DatabaseErrorBannerProps {
  showAdminInfo?: boolean;
}

export function DatabaseErrorBanner({ showAdminInfo = false }: DatabaseErrorBannerProps) {
  if (typeof window === 'undefined') return null;
  
  // Only show to admins or in development
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const isDev = process.env.NODE_ENV === 'development';
  
  if (!showAdminInfo && !isAdmin && !isDev) return null;
  
  // Count stored failed submissions
  const contactSubmissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
  const orderSubmissions = JSON.parse(sessionStorage.getItem('lastOrder') || 'null');
  const hasFailedOrder = orderSubmissions && (orderSubmissions.rls_error || orderSubmissions.api_error);
  
  if (contactSubmissions.length === 0 && !hasFailedOrder) return null;
  
  return (
    <div className="fixed bottom-0 right-0 z-50 p-4 max-w-md">
      <div className="bg-amber-100 border-l-4 border-amber-500 text-amber-900 p-4 rounded shadow-lg">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="h-6 w-6 text-amber-600" />
          <h3 className="font-medium">Database Connection Issue</h3>
        </div>
        <p className="mt-2 text-sm">
          There are items stored locally that couldn't be saved to the database. 
          This is likely due to Row Level Security (RLS) settings in Supabase.
        </p>
        {(isAdmin || isDev) && (
          <div className="mt-2 text-xs">
            <p className="font-semibold">Admin Info:</p>
            <ul className="list-disc list-inside">
              {contactSubmissions.length > 0 && (
                <li>Contact submissions: {contactSubmissions.length}</li>
              )}
              {hasFailedOrder && (
                <li>Order: #{orderSubmissions.orderNumber} (local only)</li>
              )}
            </ul>
            <p className="mt-2">
              Please update RLS policies in Supabase to fix this issue.
              See SUPABASE_RLS_FIX.md for instructions.
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 
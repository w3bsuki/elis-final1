'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { DatabaseErrorBanner } from './ui/DatabaseErrorBanner';

export function DatabaseErrorManager() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    
    // Check for RLS errors in localStorage/sessionStorage periodically
    const checkInterval = setInterval(() => {
      const bannerContainer = document.getElementById('database-error-banner-container');
      if (!bannerContainer) return;
      
      // This will trigger re-render if needed
      setMounted(prev => !prev);
      
      // Force a re-render to update the banner
      setMounted(true);
    }, 5000);
    
    return () => {
      clearInterval(checkInterval);
    };
  }, []);
  
  if (!mounted) return null;
  
  const portalContainer = document.getElementById('database-error-banner-container');
  
  if (!portalContainer) return null;
  
  return createPortal(
    <DatabaseErrorBanner showAdminInfo={true} />,
    portalContainer
  );
} 
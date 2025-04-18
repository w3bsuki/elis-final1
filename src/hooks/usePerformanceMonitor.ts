import { useEffect } from 'react';

export const usePerformanceMonitor = (componentName: string) => {
  useEffect(() => {
    // Track render time only in development mode
    if (process.env.NODE_ENV !== 'development') return;
    
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      // Log if render takes too long (potential performance issue)
      if (renderTime > 16.67) { // 60fps threshold (16.67ms)
        console.warn(`[Performance] ${componentName} rendered slowly: ${renderTime.toFixed(2)}ms`);
      }
    };
  }, [componentName]);
}; 
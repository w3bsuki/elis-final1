"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { 
  CheckCircle,
  Info,
  AlertTriangle,
  AlertCircle,
  Bell,
  ShoppingCart
} from 'lucide-react';

export function ToastDemo() {
  const { toast } = useToast();

  const demoToasts = [
    {
      variant: 'default',
      title: 'Default Toast',
      description: 'This is a default toast notification',
      icon: <Bell className="h-5 w-5" />,
      action: 'Show',
    },
    {
      variant: 'success',
      title: 'Success!',
      description: 'Your file has been uploaded successfully',
      icon: <CheckCircle className="h-5 w-5" />,
      action: 'View',
    },
    {
      variant: 'info',
      title: 'Information',
      description: 'Your password will expire in 7 days',
      icon: <Info className="h-5 w-5" />,
      action: 'Renew',
    },
    {
      variant: 'warning',
      title: 'Warning',
      description: 'Your disk space is running low',
      icon: <AlertTriangle className="h-5 w-5" />,
      action: 'Fix',
    },
    {
      variant: 'destructive',
      title: 'Error',
      description: 'There was a problem with your request',
      icon: <AlertCircle className="h-5 w-5" />,
      action: 'Try Again',
    },
    {
      variant: 'premium',
      title: 'Premium Offer',
      description: 'Upgrade to premium for exclusive access',
      icon: <ShoppingCart className="h-5 w-5" />,
      action: 'Upgrade',
    }
  ];

  return (
    <div className="space-y-8 p-8 max-w-4xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold gradient-text">Enhanced Toast System</h2>
        <p className="text-muted-foreground">
          Click on the buttons below to preview different toast variants
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {demoToasts.map((item, index) => (
          <div 
            key={index} 
            className="p-4 border rounded-lg flex flex-col items-center justify-between gap-4 paper-texture card-shadow-hover"
          >
            <div className="text-center">
              <div className="mb-2 flex justify-center">
                <div className={`
                  rounded-full p-3
                  ${item.variant === 'success' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : ''}
                  ${item.variant === 'info' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : ''}
                  ${item.variant === 'warning' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' : ''}
                  ${item.variant === 'destructive' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' : ''}
                  ${item.variant === 'premium' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' : ''}
                  ${item.variant === 'default' ? 'bg-gray-100 text-gray-600 dark:bg-gray-900/30 dark:text-gray-400' : ''}
                `}>
                  {item.icon}
                </div>
              </div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>

            <Button 
              variant={
                item.variant === 'success' ? 'success' :
                item.variant === 'info' ? 'info' :
                item.variant === 'warning' ? 'warning' :
                item.variant === 'destructive' ? 'destructive' :
                item.variant === 'premium' ? 'premium' :
                'default'
              }
              animation={
                item.variant === 'premium' ? 'glow' :
                item.variant === 'success' ? 'pulse' :
                'ripple'
              }
              className="w-full"
              onClick={() => {
                if (item.variant === 'default') {
                  toast({
                    title: item.title,
                    description: item.description,
                    variant: item.variant as any,
                  });
                } else if (item.variant === 'success') {
                  toast.success({
                    title: item.title,
                    description: item.description,
                  });
                } else if (item.variant === 'info') {
                  toast.info({
                    title: item.title,
                    description: item.description,
                  });
                } else if (item.variant === 'warning') {
                  toast.warning({
                    title: item.title,
                    description: item.description,
                  });
                } else if (item.variant === 'destructive') {
                  toast.error({
                    title: item.title,
                    description: item.description,
                  });
                } else if (item.variant === 'premium') {
                  toast.premium({
                    title: item.title,
                    description: item.description,
                  });
                }
              }}
            >
              Show {item.variant} toast
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
} 
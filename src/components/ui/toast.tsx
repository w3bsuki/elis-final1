"use client"

import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { cva, type VariantProps } from "class-variance-authority"
import { X, AlertTriangle, CheckCircle, Info } from "lucide-react"

import { cn } from "@/lib/utils"

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-lg border p-4 pr-6 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full backdrop-blur-sm",
  {
    variants: {
      variant: {
        default: "border bg-background/90 text-foreground",
        destructive:
          "destructive group border-destructive/30 bg-destructive/10 text-destructive dark:border-destructive/30 dark:bg-destructive/20",
        success:
          "success group border-green-500/30 bg-green-500/10 text-green-700 dark:border-green-500/30 dark:bg-green-500/20 dark:text-green-400",
        warning:
          "warning group border-amber-500/30 bg-amber-500/10 text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/20 dark:text-amber-400",
        info:
          "info group border-blue-500/30 bg-blue-500/10 text-blue-700 dark:border-blue-500/30 dark:bg-blue-500/20 dark:text-blue-400",
        premium:
          "premium group border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-amber-600/10 text-amber-700 dark:border-amber-500/30 dark:from-amber-500/20 dark:to-amber-600/20 dark:text-amber-400",
      },
      size: {
        default: "p-4",
        sm: "p-3 text-sm",
        lg: "p-5 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface ToastIconMap {
  success: React.ReactNode
  warning: React.ReactNode
  info: React.ReactNode
  destructive: React.ReactNode
  default: React.ReactNode
  premium: React.ReactNode
}

const toastIconMap: ToastIconMap = {
  success: <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />,
  warning: <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />,
  info: <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
  destructive: <AlertTriangle className="h-5 w-5 text-destructive" />,
  default: null,
  premium: <Info className="h-5 w-5 text-amber-600 dark:text-amber-400" />,
}

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants> & {
      showIcon?: boolean
    }
>(({ className, variant, size, showIcon = true, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant, size }), 
        "card-shadow-hover transition-transform hover:-translate-y-1", 
        className)}
      {...props}
    />
  )
})
Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border border-muted bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-destructive/30 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive/30 group-[.destructive]:focus:ring-destructive group-[.success]:border-green-500/30 group-[.success]:hover:border-green-500/30 group-[.success]:hover:bg-green-500/30 group-[.success]:focus:ring-green-500 group-[.warning]:border-amber-500/30 group-[.warning]:hover:border-amber-500/30 group-[.warning]:hover:bg-amber-500/30 group-[.warning]:focus:ring-amber-500 group-[.info]:border-blue-500/30 group-[.info]:hover:border-blue-500/30 group-[.info]:hover:bg-blue-500/30 group-[.info]:focus:ring-blue-500 group-[.premium]:border-amber-500/30 group-[.premium]:hover:border-amber-500/30 group-[.premium]:hover:bg-amber-500/30 group-[.premium]:focus:ring-amber-500",
      className
    )}
    {...props}
  />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-1 top-1 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-400 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600 group-[.success]:text-green-400 group-[.success]:hover:text-green-500 group-[.warning]:text-amber-400 group-[.warning]:hover:text-amber-500 group-[.info]:text-blue-400 group-[.info]:hover:text-blue-500 group-[.premium]:text-amber-400 group-[.premium]:hover:text-amber-500",
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("text-sm font-semibold", className)}
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("text-sm opacity-90", className)}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

const ToastIcon = React.forwardRef<
  HTMLDivElement,
  { variant?: keyof ToastIconMap }
>(({ variant = "default" }, ref) => (
  <div ref={ref} className="shrink-0 mr-2">
    {toastIconMap[variant]}
  </div>
))
ToastIcon.displayName = "ToastIcon"

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

type ToastActionElement = React.ReactElement<typeof ToastAction>

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
  ToastIcon,
} 
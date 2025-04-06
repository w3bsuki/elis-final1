import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        accent: "bg-accent text-accent-foreground hover:bg-accent/90",
        success: "bg-[#10b981] text-white hover:bg-[#059669]",
        amber: "bg-[#f59e0b] text-white hover:bg-[#d97706]",
        navy: "bg-[#1e3a8a] text-white hover:bg-[#1e40af]",
        "outline-primary": "border-2 border-primary text-primary hover:bg-primary/10",
        "outline-amber": "border-2 border-[#f59e0b] text-[#f59e0b] hover:bg-[#f59e0b]/10",
        "outline-navy": "border-2 border-[#1e3a8a] text-[#1e3a8a] hover:bg-[#1e3a8a]/10",
        glow: "bg-primary text-primary-foreground hover:shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]",
        gradient: "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:opacity-90",
        "gradient-amber": "bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-white hover:opacity-90",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-12 rounded-md px-10 text-base",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8",
        "icon-lg": "h-12 w-12",
        "icon-xl": "h-14 w-14",
        full: "w-full h-10 px-4 py-2",
      },
      rounded: {
        default: "rounded-md",
        sm: "rounded-sm",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  isLoading?: boolean
  loadingText?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    rounded,
    asChild = false, 
    children,
    leftIcon,
    rightIcon,
    isLoading,
    loadingText,
    ...props 
  }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    // Create a single React element for the button content
    const buttonContent = (
      <>
        {isLoading && (
          <span className="mr-2">
            <Loader2 className="h-4 w-4 animate-spin" />
          </span>
        )}
        {leftIcon && !isLoading && leftIcon}
        {isLoading && loadingText ? loadingText : children}
        {rightIcon && rightIcon}
      </>
    )
    
    return (
      <Comp
        className={cn(buttonVariants({ 
          variant, 
          size, 
          rounded,
          isLoading,
          className 
        }))}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {buttonContent}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

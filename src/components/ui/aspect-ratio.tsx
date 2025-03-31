"use client"

import * as React from "react"
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"

import { cn } from "@/lib/utils"

interface AspectRatioProps extends React.ComponentProps<typeof AspectRatioPrimitive.Root> {
  className?: string;
  ratio?: number;
}

function AspectRatio({
  className,
  ratio = 1,
  ...props
}: AspectRatioProps) {
  return (
    <AspectRatioPrimitive.Root 
      ratio={ratio}
      data-slot="aspect-ratio" 
      className={cn(className)}
      {...props} 
    />
  )
}

export { AspectRatio }

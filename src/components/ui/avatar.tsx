"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  )
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full", className)}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className
      )}
      {...props}
    />
  )
}

function AvatarBadge({
  className,
  position = "bottom-right",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left"
}) {
  const positionClasses = {
    "top-right": "-right-1 -top-1",
    "top-left": "-left-1 -top-1",
    "bottom-right": "-right-1 -bottom-1",
    "bottom-left": "-left-1 -bottom-1",
  }

  return (
    <div
      data-slot="avatar-badge"
      className={cn(
        "absolute flex h-5 w-5 items-center justify-center rounded-full border-2 border-background bg-green-500 text-[10px] font-medium text-white",
        positionClasses[position],
        className
      )}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback, AvatarBadge }

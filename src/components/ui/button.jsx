import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-bold font-heading ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 overflow-hidden relative group",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-heading shadow-md hover:-translate-y-1",
        outline: "border-2 border-heading text-heading bg-transparent hover:bg-primary hover:text-white hover:border-primary shadow-sm hover:-translate-y-1",
        ghost: "hover:bg-primary/10 text-heading",
        danger: "bg-red-500 text-white hover:bg-red-600 rounded-lg",
      },
      size: {
        default: "h-12 px-8 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-14 px-10 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button, buttonVariants }

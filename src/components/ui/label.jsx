import * as React from "react"
import { cn } from "../../lib/utils"

const Label = React.forwardRef(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      "text-sm font-bold font-heading leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-heading mb-2 block",
      className
    )}
    {...props}
  />
))
Label.displayName = "Label"

export { Label }

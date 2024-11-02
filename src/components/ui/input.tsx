import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  startElem?: React.ReactNode;
  endElem?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, startElem, endElem, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex items-center justify-between gap-2 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm [&:has(:focus-visible)]:outline-none [&:has(:focus-visible)]:ring-2 [&:has(:focus-visible)]:ring-ring [&:has(:focus-visible)]:ring-offset-2 ",
          className,
        )}
      >
        <div className="flex w-full items-center gap-2">
          {startElem && startElem}
          <input
            type={type}
            className={cn(
              "w-full ring-offset-background outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
              className,
            )}
            ref={ref}
            {...props}
          />
        </div>
        {endElem && endElem}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };

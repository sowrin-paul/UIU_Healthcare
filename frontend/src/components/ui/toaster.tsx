import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "../ui/toast"
import { useToast } from "../../hooks/useToast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, type, ...props }) {
        // Map our toast types to the Toast component variants
        let variant: "default" | "destructive" | "success" | "warning" = "default";
        
        if (type === "destructive") variant = "destructive";
        else if (type === "success") variant = "success";
        else if (type === "warning") variant = "warning";
        
        return (
          <Toast key={id} {...props} variant={variant}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
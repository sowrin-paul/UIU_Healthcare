import { useState, useCallback, useEffect } from "react"

type ToastType = "default" | "success" | "warning" | "destructive"

interface Toast {
  id: string
  title?: string
  description?: string
  type: ToastType
  duration?: number
}

interface ToastState {
  toasts: Toast[]
}

let toastCount = 0
const listeners: Array<(state: ToastState) => void> = []

let memoryState: ToastState = { toasts: [] }

function dispatch(action: { type: string; toast?: Toast; toastId?: string }) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

function reducer(state: ToastState, action: { type: string; toast?: Toast; toastId?: string }): ToastState {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast!, ...state.toasts],
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast!.id ? { ...t, ...action.toast! } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      if (toastId) {
        return {
          ...state,
          toasts: state.toasts.filter((t) => t.id !== toastId),
        }
      } else {
        return {
          ...state,
          toasts: [],
        }
      }
    }

    case "REMOVE_TOAST":
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }

  return state
}

function genId() {
  toastCount = (toastCount + 1) % Number.MAX_VALUE
  return toastCount.toString()
}

interface ToastMessage {
  title?: string
  description?: string
}

type Toaster = {
  success: (message: string | ToastMessage) => string
  error: (message: string | ToastMessage) => string
  warning: (message: string | ToastMessage) => string
  info: (message: string | ToastMessage) => string
  dismiss: (toastId?: string) => void
}

const toast: Toaster = {
  success: (message) => {
    const id = genId()
    
    const toast: Toast = {
      id,
      type: "success",
      duration: 5000,
      ...(typeof message === "string" 
        ? { description: message } 
        : message
      ),
    }

    dispatch({ type: "ADD_TOAST", toast })
    
    // Auto dismiss after duration
    setTimeout(() => {
      dispatch({ type: "DISMISS_TOAST", toastId: id })
    }, toast.duration)

    return id
  },

  error: (message) => {
    const id = genId()
    
    const toast: Toast = {
      id,
      type: "destructive",
      duration: 6000, // Show errors a bit longer
      ...(typeof message === "string" 
        ? { description: message } 
        : message
      ),
    }

    dispatch({ type: "ADD_TOAST", toast })
    
    // Auto dismiss after duration
    setTimeout(() => {
      dispatch({ type: "DISMISS_TOAST", toastId: id })
    }, toast.duration)

    return id
  },

  warning: (message) => {
    const id = genId()
    
    const toast: Toast = {
      id,
      type: "warning",
      duration: 5000,
      ...(typeof message === "string" 
        ? { description: message } 
        : message
      ),
    }

    dispatch({ type: "ADD_TOAST", toast })
    
    // Auto dismiss after duration
    setTimeout(() => {
      dispatch({ type: "DISMISS_TOAST", toastId: id })
    }, toast.duration)

    return id
  },

  info: (message) => {
    const id = genId()
    
    const toast: Toast = {
      id,
      type: "default",
      duration: 4000,
      ...(typeof message === "string" 
        ? { description: message } 
        : message
      ),
    }

    dispatch({ type: "ADD_TOAST", toast })
    
    // Auto dismiss after duration
    setTimeout(() => {
      dispatch({ type: "DISMISS_TOAST", toastId: id })
    }, toast.duration)

    return id
  },

  dismiss: (toastId) => {
    dispatch({ type: "DISMISS_TOAST", toastId })
  },
}

function useToast() {
  const [state, setState] = useState<ToastState>(memoryState)

  const subscribe = useCallback((listener: (state: ToastState) => void) => {
    listeners.push(listener)
    return () => {
      const index = listeners.indexOf(listener)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [])

  useEffect(() => {
    const unsubscribe = subscribe(setState)
    return unsubscribe
  }, [subscribe])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

export { useToast, toast }
export type { Toast, ToastType }
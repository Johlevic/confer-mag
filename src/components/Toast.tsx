'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faExclamationCircle, faXmark } from '@fortawesome/free-solid-svg-icons'

type ToastType = 'success' | 'error'

interface ToastItem {
  id: number
  message: string
  type: ToastType
}

interface ToastContextType {
  toast: (message: string, type?: ToastType) => void
}

const ToastContext = createContext<ToastContextType>({ toast: () => {} })

export function useToast() {
  return useContext(ToastContext)
}

let nextId = 0

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([])

  const toast = useCallback((message: string, type: ToastType = 'success') => {
    const id = nextId++
    setItems(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setItems(prev => prev.filter(t => t.id !== id))
    }, 4000)
  }, [])

  function remove(id: number) {
    setItems(prev => prev.filter(t => t.id !== id))
  }

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
        {items.map(item => (
          <div
            key={item.id}
            className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl text-sm font-medium animate-slide-up ${
              item.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
            }`}
          >
            <FontAwesomeIcon icon={item.type === 'success' ? faCheckCircle : faExclamationCircle} className="text-base flex-shrink-0" />
            <span className="flex-1">{item.message}</span>
            <button onClick={() => remove(item.id)} className="opacity-70 hover:opacity-100 transition-opacity flex-shrink-0">
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

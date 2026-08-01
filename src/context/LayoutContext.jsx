// src/context/LayoutContext.jsx
import { createContext, useEffect, useState } from 'react'

export const LayoutContext = createContext(null)

export function LayoutProvider({ children }) {
  const [collapsed, setCollapsed] = useState(
    () => localStorage.getItem('lifeos_sidebar_collapsed') === 'true'
  )

  useEffect(() => {
    localStorage.setItem('lifeos_sidebar_collapsed', collapsed)
  }, [collapsed])

  const toggleCollapsed = () => setCollapsed((prev) => !prev)

  return (
    <LayoutContext.Provider value={{ collapsed, toggleCollapsed }}>
      {children}
    </LayoutContext.Provider>
  )
}
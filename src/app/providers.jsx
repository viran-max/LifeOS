// src/app/providers.jsx
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '../context/AuthContext'
import { LayoutProvider } from '../context/LayoutContext'

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <LayoutProvider>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: { background: '#18181b', color: '#f4f4f5', border: '1px solid #27272a' },
          }}
        />
      </LayoutProvider>
    </AuthProvider>
  )
}
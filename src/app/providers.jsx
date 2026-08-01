import { Toaster } from 'react-hot-toast'
import { LayoutProvider } from '../context/LayoutContext'

export default function Providers({ children }) {
  return (
    <LayoutProvider>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          style: { background: '#18181b', color: '#f4f4f5', border: '1px solid #27272a' },
        }}
      />
    </LayoutProvider>
  )
}
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import SignupModal from './components/SignupModal'
import MainScreen from './components/MainScreen'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 1000 * 30, retry: 1 },
  },
})

export default function App() {
  const [username, setUsername] = useState(
    () => localStorage.getItem('codeleap_username') || ''
  )

  const handleEnter = (name) => {
    localStorage.setItem('codeleap_username', name)
    setUsername(name)
  }

  const handleLogout = () => {
    localStorage.removeItem('codeleap_username')
    setUsername('')
  }

  return (
    <QueryClientProvider client={queryClient}>
      {!username ? (
        <SignupModal onEnter={handleEnter} />
      ) : (
        <MainScreen username={username} onLogout={handleLogout} />
      )}
    </QueryClientProvider>
  )
}

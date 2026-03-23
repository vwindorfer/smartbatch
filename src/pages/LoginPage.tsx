import { useNavigate } from 'react-router-dom'
import { useStore } from '../store/useStore'
import type { User } from '../types'

const DEMO_USER: User = {
  id: 'demo-1',
  name: 'Maria Schmidt',
  email: 'maria.schmidt@tum.de',
  role: 'kitchen-manager',
  cafeteriaId: 'mensa-garching',
}

export default function LoginPage() {
  const navigate = useNavigate()
  const login = useStore((s) => s.login)

  function handleDemoLogin() {
    login(DEMO_USER)
    navigate('/dashboard', { replace: true })
  }

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-white">SB</span>
          </div>
          <h1 className="text-2xl font-bold text-neutral-900">SmartBatch</h1>
          <p className="text-sm text-neutral-900/50 mt-1">
            TU Munich Mensa Garching
          </p>
        </div>

        <div className="bg-surface rounded-2xl p-6 shadow-sm space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-900/70 mb-1.5">
              Email
            </label>
            <input
              type="email"
              placeholder="name@university.de"
              className="w-full h-12 px-4 rounded-xl border border-neutral-900/10 text-base focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-900/70 mb-1.5">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full h-12 px-4 rounded-xl border border-neutral-900/10 text-base focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-5 h-5 rounded accent-primary" />
            <span className="text-sm text-neutral-900/70">Remember me</span>
          </label>

          <button
            onClick={handleDemoLogin}
            className="w-full h-14 bg-primary text-white text-base font-semibold rounded-xl tap-feedback hover:bg-primary/90 transition-colors"
          >
            Sign In
          </button>

          <button
            className="w-full h-12 border border-neutral-900/10 text-neutral-900/70 text-sm font-medium rounded-xl tap-feedback hover:bg-neutral-100 transition-colors"
          >
            Sign in with SSO
          </button>
        </div>

        <button
          onClick={handleDemoLogin}
          className="w-full mt-4 h-12 text-primary text-sm font-semibold tap-feedback"
        >
          Skip to Demo Mode
        </button>
      </div>
    </div>
  )
}

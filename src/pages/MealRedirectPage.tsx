import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Clock, Phone, Mail, HandHeart, PackageCheck } from 'lucide-react'
import PageHeader from '../components/layout/PageHeader'
import StatusChip from '../components/shared/StatusChip'
import EmptyState from '../components/shared/EmptyState'
import Toast from '../components/shared/Toast'
import { getDishById } from '../data/dishes'
import { useToast } from '../hooks/useToast'

interface RedirectEntry {
  id: string
  dishId: string
  trays: number
  portions: number
  timeRemaining: string
  status: 'available' | 'claimed' | 'expired'
  claimedBy?: string
}

const PARTNERS = [
  {
    name: 'Münchner Tafel',
    phone: '+49 89 123 4567',
    email: 'abholung@muenchner-tafel.de',
  },
  {
    name: 'TU Social Fund',
    phone: '+49 89 289 0001',
    email: 'food@tum-social.de',
  },
]

export default function MealRedirectPage() {
  const navigate = useNavigate()
  const toast = useToast()
  const [items, setItems] = useState<RedirectEntry[]>([
    { id: 'rd1', dishId: 'gemuese-lasagne', trays: 2, portions: 60, timeRemaining: '1h 30m', status: 'available' },
    { id: 'rd2', dishId: 'kartoffelsuppe', trays: 1, portions: 50, timeRemaining: '3h 00m', status: 'available' },
    { id: 'rd3', dishId: 'schweinebraten', trays: 1, portions: 40, timeRemaining: '—', status: 'claimed', claimedBy: 'Münchner Tafel' },
    { id: 'rd4', dishId: 'salatteller', trays: 1, portions: 25, timeRemaining: '0m', status: 'expired' },
  ])

  function handleClaim(id: string) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: 'claimed' as const, claimedBy: 'Münchner Tafel' } : item
      )
    )
    toast.show()
  }

  return (
    <div>
      <PageHeader
        title="Redirect Meal"
        subtitle="Pass on surplus"
        actions={
          <button
            onClick={() => navigate('/waste')}
            className="w-12 h-12 flex items-center justify-center rounded-xl tap-feedback text-neutral-900/40"
            aria-label="Back"
          >
            <ArrowLeft size={22} />
          </button>
        }
      />

      <div className="p-4 space-y-5">
        {/* Surplus items */}
        <section>
          <h2 className="text-base font-bold text-neutral-900 mb-3">
            Available Surplus
          </h2>
          {items.filter((i) => i.status === 'available').length === 0 && (
            <EmptyState
              icon={<PackageCheck size={40} />}
              title="No surplus available"
              description="All meals have been distributed or expired."
            />
          )}
          <div className="space-y-4">
            {items.map((item) => {
              const dish = getDishById(item.dishId)
              return (
                <div
                  key={item.id}
                  className={`
                    bg-surface rounded-2xl shadow-sm p-4
                    ${item.status === 'expired' ? 'opacity-50' : ''}
                  `}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-neutral-900 truncate">
                        {dish?.name ?? item.dishId}
                      </h3>
                      <p className="text-sm text-neutral-900/40 mt-0.5">
                        {item.trays} tray{item.trays > 1 ? 's' : ''} · {item.portions} portions
                      </p>
                    </div>
                    <StatusChip status={item.status} size="md" />
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-1.5 text-neutral-900/50">
                      <Clock size={14} />
                      <span className="text-base tabular-nums">
                        {item.status === 'expired'
                          ? 'Expired'
                          : item.status === 'claimed'
                            ? `Claimed by ${item.claimedBy}`
                            : `${item.timeRemaining} remaining`
                        }
                      </span>
                    </div>

                    {item.status === 'available' && (
                      <button
                        onClick={() => handleClaim(item.id)}
                        className="h-11 px-4 bg-primary text-white text-sm font-semibold rounded-xl tap-feedback hover:bg-primary/90 transition-colors flex items-center gap-1.5"
                      >
                        <HandHeart size={16} />
                        Report Redirect
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Partner contacts */}
        <section>
          <h2 className="text-base font-bold text-neutral-900 mb-3">
            Partner Organizations
          </h2>
          <div className="space-y-4">
            {PARTNERS.map((partner) => (
              <div key={partner.name} className="bg-surface rounded-2xl shadow-sm p-4">
                <h3 className="text-sm font-bold text-neutral-900 mb-2">
                  {partner.name}
                </h3>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-neutral-900/50">
                    <Phone size={14} />
                    <span className="text-sm">{partner.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-900/50">
                    <Mail size={14} />
                    <span className="text-sm">{partner.email}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Toast
        visible={toast.visible}
        exiting={toast.exiting}
        message="Redirect reported"
        variant="success"
      />
    </div>
  )
}

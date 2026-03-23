import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Check, RefreshCw, Database, CheckCircle2, Unplug } from 'lucide-react'
import PageHeader from '../components/layout/PageHeader'
import Toast from '../components/shared/Toast'
import { DISHES } from '../data/dishes'
import { useToast } from '../hooks/useToast'

interface FormState {
  name: string
  capacity: string
  hoursStart: string
  hoursEnd: string
  cooks: string
  prepHelpers: string
  lowConfidence: boolean
  prepReminders: boolean
  dailyReport: boolean
}

const EQUIPMENT = [
  { id: 'e1', name: 'Combi Oven #1', type: 'Combi Oven', capacity: '20 GN 1/1' },
  { id: 'e2', name: 'Combi Oven #2', type: 'Combi Oven', capacity: '20 GN 1/1' },
  { id: 'e3', name: 'Combi Oven #3', type: 'Combi Oven', capacity: '10 GN 1/1' },
  { id: 'e4', name: 'Holding Cabinet #1', type: 'Holding Cabinet', capacity: '8 GN 1/1' },
  { id: 'e5', name: 'Holding Cabinet #2', type: 'Holding Cabinet', capacity: '8 GN 1/1' },
  { id: 'e6', name: 'Salamander', type: 'Salamander', capacity: '4 GN 1/1' },
]

export default function SettingsPage() {
  const navigate = useNavigate()
  const toast = useToast()
  const [form, setForm] = useState<FormState>({
    name: 'TU Munich Mensa Garching',
    capacity: '1200',
    hoursStart: '11:00',
    hoursEnd: '14:00',
    cooks: '8',
    prepHelpers: '4',
    lowConfidence: true,
    prepReminders: true,
    dailyReport: false,
  })

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div>
      <PageHeader
        title="Settings"
        actions={
          <button
            onClick={() => navigate('/dashboard')}
            className="w-12 h-12 flex items-center justify-center rounded-xl tap-feedback text-neutral-900/40"
            aria-label="Back"
          >
            <ArrowLeft size={22} />
          </button>
        }
      />

      <div className="p-4 space-y-5">
        {/* Kitchen profile */}
        <Section title="Kitchen Profile">
          <Field label="Name">
            <input
              type="text"
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              className="input-field"
            />
          </Field>
          <Field label="Daily Capacity (portions)">
            <input
              type="number"
              value={form.capacity}
              onChange={(e) => update('capacity', e.target.value)}
              className="input-field"
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Opening">
              <input
                type="time"
                value={form.hoursStart}
                onChange={(e) => update('hoursStart', e.target.value)}
                className="input-field"
              />
            </Field>
            <Field label="Closing">
              <input
                type="time"
                value={form.hoursEnd}
                onChange={(e) => update('hoursEnd', e.target.value)}
                className="input-field"
              />
            </Field>
          </div>
        </Section>

        {/* Data Integrations */}
        <Section title="Data Integrations">
          <BookkeepingConnection />
        </Section>

        {/* Equipment */}
        <Section title="Equipment">
          <div className="space-y-2">
            {EQUIPMENT.map((eq) => (
              <div
                key={eq.id}
                className="flex items-center justify-between py-2 border-b border-neutral-100 last:border-0"
              >
                <div>
                  <span className="text-base font-semibold text-neutral-900">{eq.name}</span>
                  <span className="text-sm text-neutral-900/40 block">{eq.type}</span>
                </div>
                <span className="text-sm text-neutral-900/60 tabular-nums">{eq.capacity}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Staff */}
        <Section title="Staff per Shift">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Cooks">
              <input
                type="number"
                value={form.cooks}
                onChange={(e) => update('cooks', e.target.value)}
                className="input-field"
              />
            </Field>
            <Field label="Prep Helpers">
              <input
                type="number"
                value={form.prepHelpers}
                onChange={(e) => update('prepHelpers', e.target.value)}
                className="input-field"
              />
            </Field>
          </div>
        </Section>

        {/* Tray defaults */}
        <Section title="Tray Sizes (Default)">
          <div className="space-y-2">
            {DISHES.map((dish) => (
              <div
                key={dish.id}
                className="flex items-center justify-between py-2 border-b border-neutral-100 last:border-0"
              >
                <span className="text-sm text-neutral-900 truncate flex-1 min-w-0">
                  {dish.name}
                </span>
                <span className="text-sm font-bold text-primary tabular-nums shrink-0 ml-2">
                  {dish.traySize} port.
                </span>
              </div>
            ))}
          </div>
        </Section>

        {/* Notifications */}
        <Section title="Notifications">
          <Toggle
            label="Low Confidence Warning"
            description="For forecasts below 70%"
            checked={form.lowConfidence}
            onChange={(v) => update('lowConfidence', v)}
          />
          <Toggle
            label="Prep Reminders"
            description="30 min before each time block"
            checked={form.prepReminders}
            onChange={(v) => update('prepReminders', v)}
          />
          <Toggle
            label="Daily Report"
            description="Summary at 3:00 PM"
            checked={form.dailyReport}
            onChange={(v) => update('dailyReport', v)}
          />
        </Section>

        {/* Save */}
        <button
          onClick={toast.show}
          className="w-full h-14 bg-primary text-white rounded-xl text-base font-semibold tap-feedback hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
        >
          <Check size={18} />
          Save
        </button>
      </div>

      <Toast
        visible={toast.visible}
        exiting={toast.exiting}
        message="Settings saved"
        variant="success"
      />
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-surface rounded-2xl shadow-sm p-4">
      <h2 className="text-sm font-bold text-neutral-900 mb-3">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-neutral-900/60 mb-1.5">
        {label}
      </label>
      {children}
    </div>
  )
}

const STORAGE_KEY = 'smartbatch:bookkeeping-connected'

function BookkeepingConnection() {
  const [status, setStatus] = useState<'idle' | 'connecting' | 'connected'>('idle')

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'true') setStatus('connected')
  }, [])

  const handleConnect = useCallback(() => {
    setStatus('connecting')
    setTimeout(() => {
      setStatus('connected')
      localStorage.setItem(STORAGE_KEY, 'true')
    }, 3000)
  }, [])

  function handleDisconnect() {
    setStatus('idle')
    localStorage.removeItem(STORAGE_KEY)
  }

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className={`
          w-10 h-10 rounded-xl flex items-center justify-center shrink-0
          ${status === 'connected' ? 'bg-success/10' : 'bg-neutral-900/5'}
        `}>
          <Database size={18} className={status === 'connected' ? 'text-success' : 'text-neutral-900/40'} />
        </div>
        <div className="min-w-0">
          <span className="text-base font-semibold text-neutral-900 block">
            Bookkeeping Software
          </span>
          <span className="text-sm text-neutral-900/40 block">
            {status === 'connected'
              ? 'Orders & supplies synced'
              : 'Import orders and supply data'}
          </span>
        </div>
      </div>

      {status === 'idle' && (
        <button
          onClick={handleConnect}
          className="h-12 px-5 bg-primary text-white text-sm font-semibold rounded-xl tap-feedback hover:bg-primary/90 transition-colors shrink-0"
        >
          Connect
        </button>
      )}

      {status === 'connecting' && (
        <div className="h-12 px-5 bg-primary/10 text-primary text-sm font-semibold rounded-xl flex items-center gap-2 shrink-0">
          <RefreshCw size={16} className="animate-spin" />
          Connecting...
        </div>
      )}

      {status === 'connected' && (
        <div className="flex items-center gap-2 shrink-0">
          <div className="h-12 px-4 bg-success/10 text-success text-sm font-semibold rounded-xl flex items-center gap-1.5">
            <CheckCircle2 size={16} />
            Connected
          </div>
          <button
            onClick={handleDisconnect}
            className="w-12 h-12 flex items-center justify-center rounded-xl tap-feedback text-neutral-900/30 hover:text-danger hover:bg-danger/5 transition-colors"
            aria-label="Disconnect"
          >
            <Unplug size={16} />
          </button>
        </div>
      )}
    </div>
  )
}

function Toggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string
  description: string
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <label className="flex items-center justify-between py-1 cursor-pointer min-h-[48px]">
      <div>
        <span className="text-base font-semibold text-neutral-900">{label}</span>
        <span className="text-sm text-neutral-900/40 block">{description}</span>
      </div>
      <div
        className={`
          relative w-12 h-7 rounded-full transition-colors shrink-0 ml-3
          ${checked ? 'bg-primary' : 'bg-neutral-900/15'}
        `}
        onClick={() => onChange(!checked)}
      >
        <div
          className={`
            absolute top-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform
            ${checked ? 'translate-x-5.5' : 'translate-x-0.5'}
          `}
        />
      </div>
    </label>
  )
}

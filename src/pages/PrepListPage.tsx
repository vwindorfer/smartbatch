import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Clock, Link2, PartyPopper } from 'lucide-react'
import PageHeader from '../components/layout/PageHeader'
import EmptyState from '../components/shared/EmptyState'
import { useStore } from '../store/useStore'
import { getDishById } from '../data/dishes'
import { TIME_BLOCK_LABELS } from '../data/prepList'
import type { TimeBlock } from '../types'

const BLOCK_ORDER: TimeBlock[] = ['early-am', 'mid-am', 'before-service']

export default function PrepListPage() {
  const navigate = useNavigate()
  const prepItems = useStore((s) => s.prepItems)
  const togglePrepItem = useStore((s) => s.togglePrepItem)
  const [flashId, setFlashId] = useState<string | null>(null)

  const totalItems = prepItems.length
  const completedItems = prepItems.filter((p) => p.completed).length
  const progress = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0

  const totalMinutes = prepItems.reduce((sum, p) => sum + p.estimatedMinutes, 0)
  const remainingMinutes = prepItems
    .filter((p) => !p.completed)
    .reduce((sum, p) => sum + p.estimatedMinutes, 0)

  function handleToggle(id: string) {
    togglePrepItem(id)
    setFlashId(id)
    setTimeout(() => setFlashId(null), 400)
  }

  return (
    <div>
      <PageHeader
        title="Prep List"
        subtitle="Thursday, March 19, 2026"
        actions={
          <button
            onClick={() => navigate('/cook-plan')}
            className="w-12 h-12 flex items-center justify-center rounded-xl tap-feedback text-neutral-900/40"
            aria-label="Back"
          >
            <ArrowLeft size={22} />
          </button>
        }
      />

      <div className="p-4 space-y-5">
        {/* Progress bar */}
        <div className="bg-surface rounded-2xl shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-base font-bold text-neutral-900">
              Progress
            </span>
            <span className="text-base font-bold text-primary tabular-nums">
              {completedItems}/{totalItems}
            </span>
          </div>
          <div className="h-3 bg-neutral-100 rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-sm text-neutral-900/40">
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span className="tabular-nums">Total: {totalMinutes} min</span>
            </div>
            <span className="tabular-nums">Remaining: {remainingMinutes} min</span>
          </div>
        </div>

        {/* All done celebration */}
        {progress === 100 && (
          <EmptyState
            icon={<PartyPopper size={48} className="text-success" />}
            title="All done!"
            description="All prep tasks are complete. Ready for service."
          />
        )}

        {/* Time blocks */}
        {BLOCK_ORDER.map((block) => {
          const blockItems = prepItems.filter((p) => p.timeBlock === block)
          const blockDone = blockItems.every((p) => p.completed)

          return (
            <section key={block}>
              <div className="flex items-center gap-2 mb-3">
                <h2 className="text-base font-bold text-neutral-900">
                  {TIME_BLOCK_LABELS[block]}
                </h2>
                {blockDone && (
                  <div className="w-5 h-5 rounded-full bg-success flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 12 12" className="check-draw">
                      <path
                        d="M2 6 L5 9 L10 3"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <div className="space-y-3">
                {blockItems.map((item) => {
                  const dishNames = item.associatedDishes
                    .map((id) => getDishById(id)?.name.split(' ')[0] ?? id)
                    .join(', ')

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleToggle(item.id)}
                      className={`
                        w-full bg-surface rounded-xl p-4 shadow-sm tap-feedback text-left
                        flex items-start gap-3 transition-opacity
                        ${item.completed ? 'opacity-60' : ''}
                        ${flashId === item.id ? 'row-flash' : ''}
                      `}
                    >
                      {/* Checkbox */}
                      <div
                        className={`
                          w-7 h-7 rounded-lg border-2 flex items-center justify-center shrink-0 mt-0.5
                          transition-colors
                          ${item.completed
                            ? 'bg-success border-success'
                            : 'border-neutral-900/20'
                          }
                        `}
                      >
                        {item.completed && (
                          <svg width="16" height="16" viewBox="0 0 16 16" className="check-draw">
                            <path
                              d="M3 8 L6.5 11.5 L13 4.5"
                              fill="none"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <span
                          className={`
                            text-base font-semibold block
                            ${item.completed ? 'line-through text-neutral-900/40' : 'text-neutral-900'}
                          `}
                        >
                          {item.ingredient}
                        </span>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <span className="text-sm text-neutral-900/40 tabular-nums">
                            {item.quantity}
                          </span>
                          <span className="text-sm text-neutral-900/30">·</span>
                          <span className="text-sm text-neutral-900/40 tabular-nums">
                            ~{item.estimatedMinutes} min
                          </span>
                          {item.isShared && (
                            <>
                              <span className="text-sm text-neutral-900/30">·</span>
                              <span className="text-sm text-accent font-medium flex items-center gap-0.5">
                                <Link2 size={12} />
                                Shared
                              </span>
                            </>
                          )}
                        </div>
                        <span className="text-sm text-neutral-900/30 mt-0.5 block">
                          {dishNames}
                        </span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}

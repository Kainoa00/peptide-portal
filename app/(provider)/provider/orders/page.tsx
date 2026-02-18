'use client'

import { useState } from 'react'
import OrderStatusTable from '@/components/provider/OrderStatusTable'

// ─── Types ─────────────────────────────────────────────────────────────────
const STAGES = ['processing', 'compounding', 'shipped', 'delivered'] as const
type Stage = typeof STAGES[number]

type FilterTab = 'all' | Stage

interface Order {
  id: string
  patientName: string
  peptideName: string
  status: Stage
  trackingNumber: string | null
  updatedAt: string
}

// ─── Mock Data ─────────────────────────────────────────────────────────────
const INITIAL_ORDERS: Order[] = [
  { id: 'ord-001', patientName: 'Sarah Chen', peptideName: 'CJC-1295 / Ipamorelin', status: 'shipped', trackingNumber: 'USPS-9400111899223456789', updatedAt: '2026-02-16' },
  { id: 'ord-002', patientName: 'Tom Bradley', peptideName: 'Tirzepatide', status: 'delivered', trackingNumber: 'USPS-9400111899223456790', updatedAt: '2026-02-14' },
  { id: 'ord-003', patientName: 'Lisa Monroe', peptideName: 'Semax', status: 'compounding', trackingNumber: null, updatedAt: '2026-02-17' },
  { id: 'ord-004', patientName: 'Mark Tanner', peptideName: 'BPC-157 + TB-500', status: 'processing', trackingNumber: null, updatedAt: '2026-02-17' },
]

const TABS: { key: FilterTab; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'processing', label: 'Processing' },
  { key: 'compounding', label: 'Compounding' },
  { key: 'shipped', label: 'Shipped' },
  { key: 'delivered', label: 'Delivered' },
]

// ─── Toast ──────────────────────────────────────────────────────────────────
function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '32px',
        right: '32px',
        background: 'var(--surface-3)',
        border: '1px solid rgba(45,214,168,0.3)',
        borderRadius: '10px',
        padding: '14px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        zIndex: 1000,
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        animation: 'fade-up 0.3s ease both',
      }}
    >
      <span style={{ fontSize: '14px', color: 'var(--teal)' }}>✓</span>
      <span style={{ fontSize: '13px', color: 'var(--text)' }}>{message}</span>
      <button
        onClick={onClose}
        style={{ background: 'transparent', border: 'none', color: 'var(--text-2)', cursor: 'pointer', fontSize: '16px', padding: '0 0 0 4px', lineHeight: 1 }}
      >
        ×
      </button>
    </div>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────
export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS)
  const [activeTab, setActiveTab] = useState<FilterTab>('all')
  const [toast, setToast] = useState<string | null>(null)

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(null), 3500)
  }

  function handleAdvance(orderId: string, newStatus: Stage) {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o
        const today = new Date().toISOString().slice(0, 10)
        return {
          ...o,
          status: newStatus,
          updatedAt: today,
          trackingNumber: newStatus === 'shipped' && !o.trackingNumber
            ? `USPS-${Math.floor(Math.random() * 9000000000000000 + 1000000000000000)}`
            : o.trackingNumber,
        }
      })
    )
    const label = newStatus.charAt(0).toUpperCase() + newStatus.slice(1)
    showToast(`Order marked as ${label}`)
  }

  const filteredOrders = activeTab === 'all'
    ? orders
    : orders.filter((o) => o.status === activeTab)

  const countByStatus = (s: Stage) => orders.filter((o) => o.status === s).length

  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh', padding: '40px 32px' }}>

      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 className="font-display" style={{ fontSize: '36px', fontWeight: 600, color: 'var(--text)', margin: '0 0 6px 0', letterSpacing: '-0.01em' }}>
          Order Management
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-2)', margin: 0 }}>
          Simulated pharmacy fulfillment
        </p>
      </div>

      {/* Info Banner */}
      <div
        style={{
          background: 'var(--amber-dim)',
          border: '1px solid rgba(212,151,90,0.25)',
          borderRadius: '12px',
          padding: '14px 20px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
          marginBottom: '28px',
        }}
      >
        <span style={{ fontSize: '16px', flexShrink: 0, marginTop: '1px' }}>ℹ</span>
        <div>
          <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--amber)', margin: '0 0 4px 0' }}>
            Mock Fulfillment Stage
          </p>
          <p style={{ fontSize: '13px', color: 'var(--text-2)', margin: 0 }}>
            This panel simulates the pharmacy fulfillment pipeline. Use &quot;Mark [Next Stage]&quot; to advance an order through processing → compounding → shipped → delivered. No real orders are created.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '4px',
          marginBottom: '24px',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '10px',
          padding: '4px',
          width: 'fit-content',
        }}
      >
        {TABS.map(({ key, label }) => {
          const count = key === 'all' ? orders.length : countByStatus(key)
          const isActive = activeTab === key
          return (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              style={{
                padding: '7px 14px',
                borderRadius: '7px',
                fontSize: '13px',
                fontWeight: isActive ? 600 : 400,
                color: isActive ? 'var(--text)' : 'var(--text-2)',
                background: isActive ? 'var(--surface-3)' : 'transparent',
                border: isActive ? '1px solid var(--border)' : '1px solid transparent',
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'all 0.15s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              {label}
              {count > 0 && (
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    color: isActive ? 'var(--amber)' : 'var(--text-3)',
                    background: isActive ? 'var(--amber-dim)' : 'var(--surface-2)',
                    borderRadius: '100px',
                    padding: '1px 6px',
                  }}
                >
                  {count}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Table Card */}
      <div
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          overflow: 'hidden',
        }}
      >
        {filteredOrders.length === 0 ? (
          <div style={{ padding: '60px 32px', textAlign: 'center' }}>
            <p style={{ fontSize: '28px', margin: '0 0 12px 0' }}>📭</p>
            <p style={{ fontSize: '15px', color: 'var(--text-2)', margin: '0 0 6px 0' }}>No orders in this category</p>
            <p style={{ fontSize: '13px', color: 'var(--text-3)', margin: 0 }}>
              Try switching to a different filter tab.
            </p>
          </div>
        ) : (
          <OrderStatusTable orders={filteredOrders} onAdvance={handleAdvance} />
        )}
      </div>

      {/* Toast */}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </main>
  )
}

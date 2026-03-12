'use client'

import { useState, useEffect } from 'react'

/* ─── Types ─────────────────────────────────────────────────────────────── */
type Status = 'new' | 'contacted' | 'interested' | 'demo_scheduled' | 'closed_won' | 'closed_lost'
type NoteType = 'call' | 'email' | 'note'

interface LeadNote { date: string; content: string; type: NoteType }

interface Lead {
  id: string
  clinic_name: string
  contact_name: string | null
  title: string | null
  phone: string | null
  email: string | null
  city: string | null
  tier: number
  status: Status
  services_offered: string[]
  why_good_fit: string | null
  objections: string | null
  website_url: string | null
  source: string | null
  deal_value: number
  last_contacted_at: string | null
  next_followup_at: string | null
  notes: LeadNote[]
  created_at: string
}

/* ─── Constants ─────────────────────────────────────────────────────────── */
const COLUMNS: { id: Status; label: string; dot: string }[] = [
  { id: 'new',            label: 'New',            dot: '#9CA3AF' },
  { id: 'contacted',      label: 'Contacted',      dot: '#3B82F6' },
  { id: 'interested',     label: 'Interested',     dot: '#8B5CF6' },
  { id: 'demo_scheduled', label: 'Demo Scheduled', dot: '#D4A574' },
  { id: 'closed_won',     label: 'Closed Won',     dot: '#10B981' },
  { id: 'closed_lost',    label: 'Closed Lost',    dot: '#EF4444' },
]

const ALL_SERVICES = [
  { id: 'peptides',     label: 'Peptides' },
  { id: 'trt',          label: 'TRT' },
  { id: 'iv_therapy',   label: 'IV Therapy' },
  { id: 'weight_loss',  label: 'Weight Loss' },
  { id: 'aesthetics',   label: 'Aesthetics' },
  { id: 'functional',   label: 'Functional' },
  { id: 'naturopathic', label: 'Naturopathic' },
  { id: 'regenerative', label: 'Regenerative' },
  { id: 'concierge',    label: 'Concierge' },
  { id: 'mens_health',  label: "Men's Health" },
  { id: 'wellness',     label: 'Wellness' },
]

const SVC: Record<string, string> = Object.fromEntries(ALL_SERVICES.map(s => [s.id, s.label]))

const TIER_STYLE: Record<number, { bg: string; text: string }> = {
  1: { bg: '#DCFCE7', text: '#166534' },
  2: { bg: '#FEF9C3', text: '#854D0E' },
  3: { bg: '#F3F4F6', text: '#374151' },
}

/* ─── Helpers ────────────────────────────────────────────────────────────── */
function fmtDeal(cents: number) { return `$${cents / 100}/mo` }

function fpStatus(d: string | null): 'overdue' | 'today' | 'upcoming' | null {
  if (!d) return null
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const target = new Date(d)
  const t = new Date(target.getFullYear(), target.getMonth(), target.getDate())
  if (t < today) return 'overdue'
  if (t.getTime() === today.getTime()) return 'today'
  return 'upcoming'
}

function fmtDate(d: string | null) {
  if (!d) return null
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

/* ─── Email templates ────────────────────────────────────────────────────── */
function genEmail(tpl: 'first' | 'followup' | 'demo', lead: Lead) {
  const hi = lead.contact_name ? `Hi ${lead.contact_name.split(' ')[0]},` : 'Hi there,'
  const svcs = lead.services_offered.map(s => SVC[s] || s).join(', ')

  if (tpl === 'first') return {
    subject: `Helping ${lead.clinic_name} scale peptide therapy`,
    body: `${hi}\n\n${
      lead.services_offered.includes('peptides')
        ? `Saw that ${lead.clinic_name} is already offering peptide therapy — great positioning in the ${lead.city || 'local'} market.`
        : `Noticed ${lead.clinic_name} offers ${svcs || 'wellness services'} — there's a natural fit with peptide therapy I'd love to show you.`
    }\n\nI'm Kai, founder of Peptide Portal. We help clinics like yours grow peptide revenue without adding admin work:\n\n- Patients complete intake online (no paper forms)\n- You review and approve protocols in one click\n- Subscriptions recur automatically each month\n\nWe're offering Utah clinics a 30-day free pilot right now.\n\nWould you be open to a 10-minute call this week?\n\nBest,\nKai\nPeptide Portal\nhttps://peptide-portal.vercel.app/provider`,
  }

  if (tpl === 'followup') return {
    subject: `Re: Helping ${lead.clinic_name} scale peptide therapy`,
    body: `${hi}\n\nJust following up on my earlier email about Peptide Portal. We help ${lead.city || 'Utah'} clinics automate peptide intake and build recurring revenue — takes about 10 minutes to set up.\n\nIf timing isn't right, no worries — just let me know when works best.\n\nBest,\nKai`,
  }

  return {
    subject: `10-min demo — Peptide Portal for ${lead.clinic_name}`,
    body: `${hi}\n\nThanks for your interest! Book a 10-minute demo here:\nhttps://calendly.com/kainoa-peptideportal/demo\n\nI'll show you:\n- The patient intake flow (3 minutes for patients)\n- Your dashboard for approving protocols in one click\n- How recurring billing works automatically\n\nLooking forward to connecting.\n\nBest,\nKai`,
  }
}

/* ─── API helpers ────────────────────────────────────────────────────────── */
async function apiUpdate(id: string, patch: object) {
  const res = await fetch(`/api/crm/leads/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patch),
  })
  return res.json()
}

/* ─── LeadCard ───────────────────────────────────────────────────────────── */
function LeadCard({
  lead, onClick, onDragStart,
}: {
  lead: Lead
  onClick: () => void
  onDragStart: (e: React.DragEvent, id: string) => void
}) {
  const status = fpStatus(lead.next_followup_at)
  const tier = TIER_STYLE[lead.tier] ?? TIER_STYLE[3]

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, lead.id)}
      onClick={onClick}
      className="bg-white rounded-xl border border-[#E5E7EB] p-4 cursor-pointer hover:shadow-md hover:border-[#D4A574] transition-all duration-150 select-none"
    >
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-[#131811] leading-snug truncate">{lead.clinic_name}</p>
          {lead.city && <p className="text-xs text-[#9CA3AF] mt-0.5">{lead.city}</p>}
        </div>
        <span
          className="shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded-md"
          style={{ background: tier.bg, color: tier.text }}
        >T{lead.tier}</span>
      </div>

      {lead.contact_name && (
        <p className="text-xs text-[#6B7280] mb-2">
          {lead.contact_name}{lead.title ? `, ${lead.title}` : ''}
        </p>
      )}

      {lead.services_offered.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {lead.services_offered.slice(0, 3).map(s => (
            <span key={s} className="text-[10px] px-1.5 py-0.5 rounded bg-[#F1F4F0] text-[#6B7280]">
              {SVC[s] || s}
            </span>
          ))}
          {lead.services_offered.length > 3 && (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#F1F4F0] text-[#9CA3AF]">
              +{lead.services_offered.length - 3}
            </span>
          )}
        </div>
      )}

      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-[#D4A574]">{fmtDeal(lead.deal_value)}</span>
        {status && (
          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
            status === 'overdue' ? 'bg-red-100 text-red-700' :
            status === 'today'   ? 'bg-amber-100 text-amber-700' :
                                   'bg-gray-100 text-gray-500'
          }`}>
            {status === 'overdue' ? '⚠ Overdue' : status === 'today' ? '● Today' : fmtDate(lead.next_followup_at) ?? ''}
          </span>
        )}
      </div>
    </div>
  )
}

/* ─── DetailPanel ────────────────────────────────────────────────────────── */
function DetailPanel({
  lead, onClose, onUpdate, onDelete,
}: {
  lead: Lead
  onClose: () => void
  onUpdate: (updated: Lead) => void
  onDelete: (id: string) => void
}) {
  const [saving, setSaving] = useState(false)
  const [noteType, setNoteType] = useState<NoteType>('note')
  const [noteText, setNoteText] = useState('')
  const [addingNote, setAddingNote] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)
  const [editField, setEditField] = useState<string | null>(null)
  const [editValue, setEditValue] = useState('')
  const [confirmDelete, setConfirmDelete] = useState(false)

  const tier = TIER_STYLE[lead.tier] ?? TIER_STYLE[3]
  const status = fpStatus(lead.next_followup_at)

  async function updateField(field: string, value: unknown) {
    setSaving(true)
    const { data } = await apiUpdate(lead.id, { [field]: value })
    if (data) onUpdate(data)
    setSaving(false)
    setEditField(null)
  }

  async function handleStatusChange(s: Status) {
    setSaving(true)
    const { data } = await apiUpdate(lead.id, { status: s, last_contacted_at: new Date().toISOString() })
    if (data) onUpdate(data)
    setSaving(false)
  }

  async function handleAddNote() {
    if (!noteText.trim()) return
    setAddingNote(true)
    const note: LeadNote = { date: new Date().toISOString(), content: noteText.trim(), type: noteType }
    const { data } = await apiUpdate(lead.id, { add_note: note } as object)
    if (data) onUpdate(data)
    setNoteText('')
    setAddingNote(false)
  }

  async function handleDelete() {
    await fetch(`/api/crm/leads/${lead.id}`, { method: 'DELETE' })
    onDelete(lead.id)
    onClose()
  }

  function copyEmail(tpl: 'first' | 'followup' | 'demo') {
    const { subject, body } = genEmail(tpl, lead)
    navigator.clipboard.writeText(`Subject: ${subject}\n\n${body}`)
    setCopied(tpl)
    setTimeout(() => setCopied(null), 2000)
  }

  function startEdit(field: string, current: string | null) {
    setEditField(field)
    setEditValue(current ?? '')
  }

  const CONTACT_FIELDS = [
    { key: 'contact_name', label: 'Name',    icon: '👤' },
    { key: 'title',        label: 'Title',   icon: '🏥' },
    { key: 'phone',        label: 'Phone',   icon: '📞' },
    { key: 'email',        label: 'Email',   icon: '📧' },
    { key: 'website_url',  label: 'Website', icon: '🔗' },
  ] as const

  return (
    <>
      <div className="fixed inset-0 bg-black/25 z-40 backdrop-blur-[2px]" onClick={onClose} />
      <div
        className="fixed inset-y-0 right-0 z-50 bg-white shadow-2xl overflow-y-auto flex flex-col"
        style={{ width: 'min(440px, 100vw)' }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#E5E7EB] px-6 py-4 flex items-start justify-between gap-4 z-10">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base font-semibold text-[#131811] truncate">{lead.clinic_name}</h2>
              <span
                className="shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded-md"
                style={{ background: tier.bg, color: tier.text }}
              >T{lead.tier}</span>
            </div>
            {lead.city && <p className="text-xs text-[#9CA3AF] mt-0.5">{lead.city}</p>}
          </div>
          <button
            onClick={onClose}
            className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-[#9CA3AF] hover:bg-[#F1F4F0] hover:text-[#131811] transition-colors cursor-pointer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="px-6 py-5 space-y-6 flex-1">

          {/* Stage + Deal */}
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF] mb-1.5 block">Stage</label>
              <select
                value={lead.status}
                onChange={(e) => handleStatusChange(e.target.value as Status)}
                disabled={saving}
                className="w-full text-sm border border-[#E5E7EB] rounded-lg px-3 py-2 bg-white text-[#131811] cursor-pointer focus:outline-none focus:border-[#D4A574]"
              >
                {COLUMNS.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF] mb-1.5 block">Deal</label>
              <select
                value={lead.deal_value}
                onChange={(e) => updateField('deal_value', parseInt(e.target.value))}
                disabled={saving}
                className="text-sm border border-[#E5E7EB] rounded-lg px-3 py-2 bg-white text-[#D4A574] font-semibold cursor-pointer focus:outline-none focus:border-[#D4A574]"
              >
                <option value={19900}>$199/mo</option>
                <option value={39900}>$399/mo</option>
              </select>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF] mb-3">Contact Info</p>
            <div className="space-y-2">
              {CONTACT_FIELDS.map(({ key, label, icon }) => (
                <div key={key} className="flex items-center gap-2 group min-h-[28px]">
                  <span className="text-sm w-5 shrink-0 text-center">{icon}</span>
                  {editField === key ? (
                    <div className="flex gap-2 flex-1">
                      <input
                        autoFocus
                        value={editValue}
                        onChange={e => setEditValue(e.target.value)}
                        onKeyDown={e => {
                          if (e.key === 'Enter') updateField(key, editValue)
                          if (e.key === 'Escape') setEditField(null)
                        }}
                        className="flex-1 text-sm border border-[#D4A574] rounded-lg px-2 py-1 focus:outline-none"
                      />
                      <button onClick={() => updateField(key, editValue)} className="text-xs text-[#D4A574] font-medium cursor-pointer">Save</button>
                      <button onClick={() => setEditField(null)} className="text-xs text-[#9CA3AF] cursor-pointer">✕</button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <button
                        onClick={() => startEdit(key, lead[key] as string | null)}
                        className="flex-1 text-left text-sm text-[#131811] hover:text-[#D4A574] transition-colors cursor-pointer truncate"
                      >
                        {lead[key] || <span className="text-[#D1D5DB] italic text-xs">Add {label}</span>}
                      </button>
                      {(key === 'phone' || key === 'email') && lead[key] && (
                        <button
                          onClick={() => navigator.clipboard.writeText(lead[key] as string)}
                          className="opacity-0 group-hover:opacity-100 text-[10px] text-[#9CA3AF] hover:text-[#D4A574] cursor-pointer transition-opacity shrink-0"
                        >copy</button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Follow-up */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF] mb-2">Next Follow-up</p>
            <input
              type="date"
              defaultValue={lead.next_followup_at ? lead.next_followup_at.split('T')[0] : ''}
              onChange={(e) => updateField('next_followup_at', e.target.value ? new Date(e.target.value + 'T12:00:00').toISOString() : null)}
              className={`text-sm border rounded-lg px-3 py-2 focus:outline-none focus:border-[#D4A574] ${
                status === 'overdue' ? 'border-red-300 bg-red-50 text-red-700' :
                status === 'today'   ? 'border-amber-300 bg-amber-50 text-amber-700' :
                                       'border-[#E5E7EB]'
              }`}
            />
            {status === 'overdue' && (
              <p className="text-xs text-red-600 mt-1">⚠ Overdue — follow up now</p>
            )}
          </div>

          {/* Sales Intel */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF] mb-3">Sales Intel</p>

            {/* Services */}
            <div className="mb-3">
              <p className="text-xs text-[#6B7280] mb-1.5">Services offered</p>
              <div className="flex flex-wrap gap-1.5">
                {ALL_SERVICES.map(s => {
                  const active = lead.services_offered.includes(s.id)
                  return (
                    <button
                      key={s.id}
                      onClick={() => {
                        const updated = active
                          ? lead.services_offered.filter(x => x !== s.id)
                          : [...lead.services_offered, s.id]
                        updateField('services_offered', updated)
                      }}
                      className={`text-xs px-2 py-1 rounded-full border transition-all cursor-pointer ${
                        active ? 'bg-[#D4A574] text-white border-[#D4A574]' : 'bg-white text-[#6B7280] border-[#E5E7EB] hover:border-[#D4A574]'
                      }`}
                    >{s.label}</button>
                  )
                })}
              </div>
            </div>

            {/* Why good fit */}
            <div className="mb-3">
              <p className="text-xs text-[#6B7280] mb-1">Why good fit</p>
              {editField === 'why_good_fit' ? (
                <div className="space-y-1">
                  <textarea
                    autoFocus value={editValue}
                    onChange={e => setEditValue(e.target.value)}
                    rows={3}
                    className="w-full text-sm border border-[#D4A574] rounded-lg px-3 py-2 focus:outline-none resize-none"
                  />
                  <div className="flex gap-2">
                    <button onClick={() => updateField('why_good_fit', editValue)} className="text-xs text-[#D4A574] font-medium cursor-pointer">Save</button>
                    <button onClick={() => setEditField(null)} className="text-xs text-[#9CA3AF] cursor-pointer">Cancel</button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => startEdit('why_good_fit', lead.why_good_fit)}
                  className="w-full text-left text-sm text-[#131811] hover:text-[#D4A574] transition-colors cursor-pointer"
                >
                  {lead.why_good_fit || <span className="text-[#D1D5DB] italic text-xs">Add pitch angle...</span>}
                </button>
              )}
            </div>

            {/* Objections */}
            <div>
              <p className="text-xs text-[#6B7280] mb-1">Objections</p>
              {editField === 'objections' ? (
                <div className="space-y-1">
                  <textarea
                    autoFocus value={editValue}
                    onChange={e => setEditValue(e.target.value)}
                    rows={2}
                    className="w-full text-sm border border-[#D4A574] rounded-lg px-3 py-2 focus:outline-none resize-none"
                  />
                  <div className="flex gap-2">
                    <button onClick={() => updateField('objections', editValue)} className="text-xs text-[#D4A574] font-medium cursor-pointer">Save</button>
                    <button onClick={() => setEditField(null)} className="text-xs text-[#9CA3AF] cursor-pointer">Cancel</button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => startEdit('objections', lead.objections)}
                  className="w-full text-left text-sm text-[#131811] hover:text-[#D4A574] transition-colors cursor-pointer"
                >
                  {lead.objections || <span className="text-[#D1D5DB] italic text-xs">Note any objections...</span>}
                </button>
              )}
            </div>
          </div>

          {/* Email Templates */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF] mb-3">Email Templates</p>
            <div className="space-y-2">
              {(['first', 'followup', 'demo'] as const).map(tpl => {
                const labels = { first: 'First Outreach', followup: 'Day 3 Follow-up', demo: 'Demo Invite' }
                return (
                  <div key={tpl} className="border border-[#E5E7EB] rounded-xl p-3 hover:border-[#D4A574] transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs font-semibold text-[#131811]">{labels[tpl]}</p>
                      <button
                        onClick={() => copyEmail(tpl)}
                        className="text-xs px-2.5 py-1 rounded-full bg-[#F1F4F0] text-[#6B7280] hover:bg-[#D4A574] hover:text-white transition-all cursor-pointer font-medium"
                      >
                        {copied === tpl ? '✓ Copied!' : 'Copy'}
                      </button>
                    </div>
                    <p className="text-[11px] text-[#9CA3AF] truncate">
                      Subject: {genEmail(tpl, lead).subject}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Activity Log */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF] mb-3">Activity Log</p>

            {/* Add note */}
            <div className="border border-[#E5E7EB] rounded-xl p-3 mb-4 bg-[#FAFAF9]">
              <div className="flex gap-1.5 mb-2">
                {(['note', 'call', 'email'] as const).map(t => (
                  <button
                    key={t}
                    onClick={() => setNoteType(t)}
                    className={`text-xs px-2.5 py-1 rounded-full font-medium cursor-pointer transition-all ${
                      noteType === t ? 'bg-[#D4A574] text-white' : 'bg-white text-[#6B7280] border border-[#E5E7EB] hover:border-[#D4A574]'
                    }`}
                  >
                    {t === 'call' ? '📞 Call' : t === 'email' ? '📧 Email' : '📝 Note'}
                  </button>
                ))}
              </div>
              <textarea
                value={noteText}
                onChange={e => setNoteText(e.target.value)}
                placeholder={`Log a ${noteType}...`}
                rows={2}
                onKeyDown={e => { if (e.key === 'Enter' && e.metaKey) handleAddNote() }}
                className="w-full text-sm border border-[#E5E7EB] rounded-lg px-3 py-2 focus:outline-none focus:border-[#D4A574] resize-none bg-white"
              />
              <button
                onClick={handleAddNote}
                disabled={!noteText.trim() || addingNote}
                className="mt-2 text-xs px-3 py-1.5 rounded-full bg-[#131811] text-white font-medium cursor-pointer hover:bg-[#D4A574] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {addingNote ? 'Saving...' : 'Save  ⌘↵'}
              </button>
            </div>

            {/* Timeline */}
            {lead.notes.length > 0 ? (
              <div className="space-y-3">
                {[...lead.notes].reverse().map((n, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="shrink-0 w-6 h-6 rounded-full bg-[#F1F4F0] flex items-center justify-center text-xs">
                      {n.type === 'call' ? '📞' : n.type === 'email' ? '📧' : '📝'}
                    </div>
                    <div>
                      <p className="text-[11px] text-[#9CA3AF] mb-0.5">
                        {new Date(n.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                      <p className="text-sm text-[#131811]">{n.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-[#D1D5DB] italic text-center py-4">No activity yet</p>
            )}
          </div>

          {/* Danger zone */}
          <div className="pt-2 border-t border-[#F1F4F0]">
            {confirmDelete ? (
              <div className="flex items-center gap-2">
                <p className="text-xs text-red-600 flex-1">Delete this lead permanently?</p>
                <button onClick={handleDelete} className="text-xs px-3 py-1.5 rounded-full bg-red-600 text-white cursor-pointer hover:bg-red-700 transition-colors">Delete</button>
                <button onClick={() => setConfirmDelete(false)} className="text-xs text-[#9CA3AF] cursor-pointer">Cancel</button>
              </div>
            ) : (
              <button
                onClick={() => setConfirmDelete(true)}
                className="text-xs text-[#9CA3AF] hover:text-red-500 cursor-pointer transition-colors"
              >
                Delete lead
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

/* ─── AddLeadModal ───────────────────────────────────────────────────────── */
const BLANK: {
  clinic_name: string; contact_name: string; title: string; phone: string
  email: string; city: string; tier: number; status: Status
  services_offered: string[]; why_good_fit: string; website_url: string
  source: string; deal_value: number; next_followup_at: string
} = {
  clinic_name: '', contact_name: '', title: '', phone: '', email: '',
  city: '', tier: 1, status: 'new', services_offered: [],
  why_good_fit: '', website_url: '', source: 'google',
  deal_value: 19900, next_followup_at: '',
}

function AddLeadModal({ onClose, onAdd }: { onClose: () => void; onAdd: (lead: Lead) => void }) {
  const [form, setForm] = useState({ ...BLANK })
  const [saving, setSaving] = useState(false)

  function toggleSvc(id: string) {
    setForm(f => ({
      ...f,
      services_offered: f.services_offered.includes(id)
        ? f.services_offered.filter(x => x !== id)
        : [...f.services_offered, id],
    }))
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.clinic_name.trim()) return
    setSaving(true)
    try {
      const res = await fetch('/api/crm/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          next_followup_at: form.next_followup_at
            ? new Date(form.next_followup_at + 'T12:00:00').toISOString()
            : null,
        }),
      })
      const { data } = await res.json()
      if (data) { onAdd(data); onClose() }
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <form
        onSubmit={submit}
        onClick={e => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-white border-b border-[#E5E7EB] px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-base font-semibold text-[#131811]">Add Lead</h2>
          <button type="button" onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center text-[#9CA3AF] hover:bg-[#F1F4F0] cursor-pointer transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="px-6 py-5 space-y-4">
          <div>
            <label className="text-xs font-medium text-[#6B7280] mb-1 block">Clinic Name *</label>
            <input
              required value={form.clinic_name}
              onChange={e => setForm(f => ({ ...f, clinic_name: e.target.value }))}
              className="w-full text-sm border border-[#E5E7EB] rounded-lg px-3 py-2 focus:outline-none focus:border-[#D4A574]"
              placeholder="Modern SLC Injections"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-[#6B7280] mb-1 block">Contact Name</label>
              <input value={form.contact_name}
                onChange={e => setForm(f => ({ ...f, contact_name: e.target.value }))}
                className="w-full text-sm border border-[#E5E7EB] rounded-lg px-3 py-2 focus:outline-none focus:border-[#D4A574]"
                placeholder="Dr. Smith"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-[#6B7280] mb-1 block">Title</label>
              <input value={form.title}
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                className="w-full text-sm border border-[#E5E7EB] rounded-lg px-3 py-2 focus:outline-none focus:border-[#D4A574]"
                placeholder="MD"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-[#6B7280] mb-1 block">Phone</label>
              <input value={form.phone}
                onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                className="w-full text-sm border border-[#E5E7EB] rounded-lg px-3 py-2 focus:outline-none focus:border-[#D4A574]"
                placeholder="(801) 555-0100"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-[#6B7280] mb-1 block">Email</label>
              <input type="email" value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className="w-full text-sm border border-[#E5E7EB] rounded-lg px-3 py-2 focus:outline-none focus:border-[#D4A574]"
                placeholder="hello@clinic.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-medium text-[#6B7280] mb-1 block">City</label>
              <input value={form.city}
                onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
                className="w-full text-sm border border-[#E5E7EB] rounded-lg px-3 py-2 focus:outline-none focus:border-[#D4A574]"
                placeholder="Salt Lake City"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-[#6B7280] mb-1 block">Tier</label>
              <select value={form.tier}
                onChange={e => setForm(f => ({ ...f, tier: parseInt(e.target.value) }))}
                className="w-full text-sm border border-[#E5E7EB] rounded-lg px-3 py-2 bg-white focus:outline-none focus:border-[#D4A574] cursor-pointer"
              >
                <option value={1}>Tier 1</option>
                <option value={2}>Tier 2</option>
                <option value={3}>Tier 3</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-[#6B7280] mb-1 block">Deal</label>
              <select value={form.deal_value}
                onChange={e => setForm(f => ({ ...f, deal_value: parseInt(e.target.value) }))}
                className="w-full text-sm border border-[#E5E7EB] rounded-lg px-3 py-2 bg-white focus:outline-none focus:border-[#D4A574] cursor-pointer"
              >
                <option value={19900}>$199/mo</option>
                <option value={39900}>$399/mo</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-[#6B7280] mb-1 block">Website</label>
            <input value={form.website_url}
              onChange={e => setForm(f => ({ ...f, website_url: e.target.value }))}
              className="w-full text-sm border border-[#E5E7EB] rounded-lg px-3 py-2 focus:outline-none focus:border-[#D4A574]"
              placeholder="https://clinic.com"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-[#6B7280] mb-2 block">Services Offered</label>
            <div className="flex flex-wrap gap-1.5">
              {ALL_SERVICES.map(s => {
                const active = form.services_offered.includes(s.id)
                return (
                  <button key={s.id} type="button" onClick={() => toggleSvc(s.id)}
                    className={`text-xs px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                      active ? 'bg-[#D4A574] text-white border-[#D4A574]' : 'bg-white text-[#6B7280] border-[#E5E7EB] hover:border-[#D4A574]'
                    }`}
                  >{s.label}</button>
                )
              })}
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-[#6B7280] mb-1 block">Why Good Fit</label>
            <textarea value={form.why_good_fit}
              onChange={e => setForm(f => ({ ...f, why_good_fit: e.target.value }))}
              rows={2}
              className="w-full text-sm border border-[#E5E7EB] rounded-lg px-3 py-2 focus:outline-none focus:border-[#D4A574] resize-none"
              placeholder="Already offers peptides, high-income patients..."
            />
          </div>

          <div>
            <label className="text-xs font-medium text-[#6B7280] mb-1 block">Next Follow-up</label>
            <input type="date" value={form.next_followup_at}
              onChange={e => setForm(f => ({ ...f, next_followup_at: e.target.value }))}
              className="text-sm border border-[#E5E7EB] rounded-lg px-3 py-2 focus:outline-none focus:border-[#D4A574]"
            />
          </div>
        </div>

        <div className="px-6 pb-6 flex gap-3">
          <button type="button" onClick={onClose}
            className="flex-1 py-2.5 rounded-full border border-[#E5E7EB] text-sm font-medium text-[#6B7280] hover:bg-[#F6F8F6] transition-colors cursor-pointer"
          >Cancel</button>
          <button type="submit" disabled={saving}
            className="flex-1 py-2.5 rounded-full bg-[#131811] text-white text-sm font-medium hover:bg-[#D4A574] transition-colors cursor-pointer disabled:opacity-50"
          >{saving ? 'Adding...' : 'Add Lead'}</button>
        </div>
      </form>
    </div>
  )
}

/* ─── Main CRMClient ─────────────────────────────────────────────────────── */
export default function CRMClient() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [showAdd, setShowAdd] = useState(false)
  const [draggedId, setDraggedId] = useState<string | null>(null)
  const [dragOverCol, setDragOverCol] = useState<Status | null>(null)
  const [filterOverdue, setFilterOverdue] = useState(false)

  useEffect(() => {
    fetch('/api/crm/leads')
      .then(r => r.json())
      .then(({ data }) => { if (data) setLeads(data) })
      .finally(() => setLoading(false))
  }, [])

  function updateLead(updated: Lead) {
    setLeads(ls => ls.map(l => l.id === updated.id ? updated : l))
    setSelectedLead(updated)
  }

  function deleteLead(id: string) {
    setLeads(ls => ls.filter(l => l.id !== id))
  }

  function onDragStart(e: React.DragEvent, id: string) {
    setDraggedId(id)
    e.dataTransfer.effectAllowed = 'move'
  }

  async function onDrop(status: Status) {
    if (!draggedId) return
    const lead = leads.find(l => l.id === draggedId)
    if (!lead || lead.status === status) { setDraggedId(null); setDragOverCol(null); return }
    setLeads(ls => ls.map(l => l.id === draggedId ? { ...l, status } : l))
    if (selectedLead?.id === draggedId) setSelectedLead(sl => sl ? { ...sl, status } : sl)
    setDraggedId(null)
    setDragOverCol(null)
    await apiUpdate(draggedId, { status })
  }

  const todayLeads = leads
    .filter(l => { const s = fpStatus(l.next_followup_at); return s === 'overdue' || s === 'today' })
    .sort((a, b) => {
      const sa = fpStatus(a.next_followup_at)
      const sb = fpStatus(b.next_followup_at)
      if (sa === 'overdue' && sb !== 'overdue') return -1
      if (sb === 'overdue' && sa !== 'overdue') return 1
      return 0
    })

  const display = filterOverdue
    ? leads.filter(l => { const s = fpStatus(l.next_followup_at); return s === 'overdue' || s === 'today' })
    : leads

  const totalPipeline = leads
    .filter(l => l.status !== 'closed_lost')
    .reduce((s, l) => s + l.deal_value, 0)
  const closedWon = leads
    .filter(l => l.status === 'closed_won')
    .reduce((s, l) => s + l.deal_value, 0)
  const demoCount = leads.filter(l => l.status === 'demo_scheduled').length

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-8 h-8 border-2 border-[#D4A574] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF] mb-1">Sales Pipeline</p>
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h1 className="font-display text-3xl text-[#131811] font-normal tracking-tight">CRM</h1>
          <button
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#131811] text-white text-sm font-medium hover:bg-[#D4A574] transition-colors cursor-pointer"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Add Lead
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-xl border border-[#E5E7EB] px-4 py-3">
          <p className="text-xs text-[#9CA3AF] mb-1">Active Pipeline</p>
          <p className="text-xl font-semibold text-[#131811]">${(totalPipeline / 100).toLocaleString()}/mo</p>
        </div>
        <div className="bg-white rounded-xl border border-[#E5E7EB] px-4 py-3">
          <p className="text-xs text-[#9CA3AF] mb-1">Closed Won</p>
          <p className="text-xl font-semibold text-emerald-600">${(closedWon / 100).toLocaleString()}/mo</p>
        </div>
        <div className="bg-white rounded-xl border border-[#E5E7EB] px-4 py-3">
          <p className="text-xs text-[#9CA3AF] mb-1">Demos Booked</p>
          <p className="text-xl font-semibold text-[#D4A574]">{demoCount}</p>
        </div>
      </div>

      {/* Today's actions banner */}
      {todayLeads.length > 0 && (
        <div className="mb-5 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-amber-700 font-semibold text-sm">
                ⚡ {todayLeads.length} lead{todayLeads.length !== 1 ? 's' : ''} need attention
              </span>
              <div className="flex gap-1.5 flex-wrap">
                {todayLeads.slice(0, 4).map(l => (
                  <button
                    key={l.id}
                    onClick={() => setSelectedLead(l)}
                    className="text-xs px-2.5 py-0.5 rounded-full bg-white border border-amber-200 text-amber-700 hover:bg-amber-100 cursor-pointer transition-colors"
                  >
                    {l.clinic_name.split(' ')[0]}
                    {fpStatus(l.next_followup_at) === 'overdue' ? ' ⚠' : ''}
                  </button>
                ))}
                {todayLeads.length > 4 && <span className="text-xs text-amber-600">+{todayLeads.length - 4} more</span>}
              </div>
            </div>
            <button
              onClick={() => setFilterOverdue(f => !f)}
              className="text-xs text-amber-700 underline cursor-pointer"
            >
              {filterOverdue ? 'Show all' : 'Filter to overdue'}
            </button>
          </div>
        </div>
      )}

      {/* Pipeline board */}
      <div className="overflow-x-auto pb-4 -mx-6 md:-mx-10 px-6 md:px-10">
        <div className="flex gap-4 min-w-max">
          {COLUMNS.map(col => {
            const colLeads = display.filter(l => l.status === col.id)
            const isOver = dragOverCol === col.id

            return (
              <div
                key={col.id}
                onDragOver={e => { e.preventDefault(); setDragOverCol(col.id) }}
                onDragLeave={() => setDragOverCol(null)}
                onDrop={() => onDrop(col.id)}
                className="flex flex-col rounded-2xl transition-all duration-150"
                style={{
                  width: 278,
                  minHeight: 420,
                  background: isOver ? 'rgba(212,165,116,0.07)' : '#F6F8F6',
                  border: isOver ? '2px dashed #D4A574' : '2px solid transparent',
                }}
              >
                {/* Column header */}
                <div className="flex items-center justify-between px-4 pt-4 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ background: col.dot }} />
                    <span className="text-xs font-semibold text-[#131811]">{col.label}</span>
                  </div>
                  <span className="text-xs text-[#9CA3AF] font-medium">{colLeads.length}</span>
                </div>

                {/* Cards */}
                <div className="flex flex-col gap-3 px-3 pb-4 flex-1">
                  {colLeads.length === 0 ? (
                    <div className="text-center py-10 text-xs text-[#D1D5DB] italic">
                      {isOver ? 'Drop here' : 'No leads'}
                    </div>
                  ) : (
                    colLeads.map(lead => (
                      <LeadCard
                        key={lead.id}
                        lead={lead}
                        onClick={() => setSelectedLead(lead)}
                        onDragStart={onDragStart}
                      />
                    ))
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {selectedLead && (
        <DetailPanel
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onUpdate={updateLead}
          onDelete={deleteLead}
        />
      )}

      {showAdd && (
        <AddLeadModal
          onClose={() => setShowAdd(false)}
          onAdd={lead => setLeads(ls => [lead, ...ls])}
        />
      )}
    </div>
  )
}

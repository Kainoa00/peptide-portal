interface IntakeData {
  patientName: string
  state: string
  age: string
  goals: string[]
  experienceLevel: string
  activityLevel?: string
  sleepQuality?: string
  weight?: string
  height?: string
  medicalHistory: Record<string, boolean>
  contraindications: string[]
  currentMedications?: string
}

interface Props {
  data: IntakeData
}

const GOAL_LABELS: Record<string, string> = {
  recovery: 'Recovery',
  longevity: 'Longevity',
  weight_loss: 'Weight Loss',
  cognitive: 'Cognitive',
  performance: 'Performance',
  sleep: 'Sleep',
  hormone: 'Hormone Optimization',
}

export default function IntakeReviewPanel({ data }: Props) {
  const flaggedConditions = Object.entries(data.medicalHistory).filter(([, val]) => val)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* Patient Info Card */}
      <div
        style={{
          background: 'var(--surface-2)',
          border: '1px solid var(--border)',
          borderLeft: '3px solid var(--amber)',
          borderRadius: '12px',
          padding: '20px 24px',
        }}
      >
        <p
          style={{
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--text-2)',
            marginBottom: '12px',
          }}
        >
          Patient Information
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {[
            { label: 'Full Name', value: data.patientName },
            { label: 'State', value: data.state },
            { label: 'Age', value: data.age },
            { label: 'Experience', value: data.experienceLevel },
            ...(data.activityLevel ? [{ label: 'Activity Level', value: data.activityLevel }] : []),
            ...(data.sleepQuality ? [{ label: 'Sleep Quality', value: data.sleepQuality }] : []),
            ...(data.weight ? [{ label: 'Weight', value: data.weight }] : []),
            ...(data.height ? [{ label: 'Height', value: data.height }] : []),
          ].map(({ label, value }) => (
            <div key={label}>
              <p style={{ fontSize: '11px', color: 'var(--text-2)', marginBottom: '2px' }}>{label}</p>
              <p style={{ color: 'var(--text)', fontSize: '14px', textTransform: 'capitalize' }}>{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Goals */}
      <div>
        <p
          style={{
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--text-2)',
            marginBottom: '10px',
          }}
        >
          Treatment Goals
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {data.goals.map((g) => (
            <span
              key={g}
              style={{
                background: 'var(--amber-dim)',
                color: 'var(--amber)',
                border: '1px solid rgba(212,151,90,0.25)',
                borderRadius: '100px',
                fontSize: '12px',
                fontWeight: 500,
                padding: '4px 12px',
              }}
            >
              {GOAL_LABELS[g] ?? g}
            </span>
          ))}
        </div>
      </div>

      {/* Current Medications */}
      {data.currentMedications && (
        <div>
          <p
            style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--text-2)',
              marginBottom: '8px',
            }}
          >
            Current Medications
          </p>
          <p style={{ color: 'var(--text)', fontSize: '14px' }}>{data.currentMedications}</p>
        </div>
      )}

      {/* Contraindications Warning */}
      {data.contraindications.length > 0 && (
        <div
          style={{
            background: 'var(--rose-dim)',
            border: '1px solid rgba(232,112,112,0.3)',
            borderRadius: '12px',
            padding: '16px 20px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <span style={{ fontSize: '16px' }}>⚠</span>
            <p
              style={{
                fontSize: '13px',
                fontWeight: 700,
                color: 'var(--rose)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Flagged Contraindications
            </p>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {data.contraindications.map((c) => (
              <li
                key={c}
                style={{
                  color: 'var(--rose)',
                  fontSize: '13px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--rose)', flexShrink: 0, display: 'inline-block' }} />
                <span style={{ textTransform: 'capitalize' }}>{c.replace(/_/g, ' ')}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Medical History Grid */}
      <div>
        <p
          style={{
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--text-2)',
            marginBottom: '12px',
          }}
        >
          Medical History
        </p>
        <div
          style={{
            background: 'var(--surface-2)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            overflow: 'hidden',
          }}
        >
          {Object.entries(data.medicalHistory).map(([key, val], i, arr) => (
            <div
              key={key}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 16px',
                borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none',
                background: val ? 'rgba(232,112,112,0.05)' : 'transparent',
              }}
            >
              <span
                style={{
                  fontSize: '13px',
                  color: 'var(--text-2)',
                  textTransform: 'capitalize',
                }}
              >
                {key.replace(/_/g, ' ')}
              </span>
              <span
                style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: val ? 'var(--rose)' : 'var(--text-3)',
                }}
              >
                {val ? 'Yes' : 'No'}
              </span>
            </div>
          ))}
        </div>

        {flaggedConditions.length > 0 && (
          <p style={{ fontSize: '12px', color: 'var(--rose)', marginTop: '8px' }}>
            {flaggedConditions.length} flagged condition{flaggedConditions.length > 1 ? 's' : ''} detected
          </p>
        )}
      </div>
    </div>
  )
}

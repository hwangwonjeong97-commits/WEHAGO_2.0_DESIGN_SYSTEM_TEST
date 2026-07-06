import React from 'react'

// Components 페이지(ComponentsSection)와 동일한 디자인 언어를 Foundation에서도 쓰기 위한 공용 레이아웃.

export function DocsPage({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <div style={{ maxWidth: 980, margin: '0 auto', padding: '80px 24px', width: '100%', boxSizing: 'border-box', minWidth: 0 }}>
      <div style={{ marginBottom: 56 }}>
        <p style={{ fontSize: 12, fontWeight: 500, color: '#0066cc', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8 }}>
          {eyebrow}
        </p>
        <h2 style={{ fontSize: 40, fontWeight: 600, color: '#1d1d1f', letterSpacing: '-0.3px', lineHeight: 1.1, marginBottom: 12 }}>
          {title}
        </h2>
        <p style={{ fontSize: 17, color: '#6e6e73', letterSpacing: '-0.374px', lineHeight: 1.47, wordBreak: 'keep-all' }}>
          {description}
        </p>
      </div>
      {children}
    </div>
  )
}

export function DocsSection({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 56, width: '100%', minWidth: 0 }}>
      {title && (
        <h3 style={{ fontSize: 21, fontWeight: 600, color: '#1d1d1f', letterSpacing: '-0.3px', marginBottom: 16 }}>{title}</h3>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 20, width: '100%' }}>{children}</div>
    </section>
  )
}

export function DocsCard({
  title,
  description,
  children,
}: {
  title?: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <div style={{ borderRadius: 18, border: '1px solid #e0e0e0', width: '100%', boxSizing: 'border-box', overflow: 'hidden' }}>
      {(title || description) && (
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #e0e0e0', background: '#ffffff' }}>
          {title && <h4 style={{ fontSize: 17, fontWeight: 600, color: '#1d1d1f', letterSpacing: '-0.3px', margin: 0 }}>{title}</h4>}
          {description && (
            <p style={{ fontSize: 14, color: '#6e6e73', marginTop: 4, letterSpacing: '-0.224px', lineHeight: 1.4 }}>{description}</p>
          )}
        </div>
      )}
      <div style={{ background: '#f9f9f9', padding: 24, overflowX: 'auto' }}>{children}</div>
    </div>
  )
}

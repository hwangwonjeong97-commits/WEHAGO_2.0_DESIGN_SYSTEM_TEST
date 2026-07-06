import React from 'react'

// ─── Figma specs ──────────────────────────────────────────────────────────────
// FormTable: stroke #d3d3d3, r=8, w=650 (648 내부)
// 4컬럼 그리드: 120px | 204px | 120px | 204px = 648px
// Label cell:   bg=#f7f8fa, border-right+bottom #e1e1e1, px=16px, h=56px
// Content cell: bg=#ffffff, border-right+bottom #e1e1e1, px=12px, h=56px
// Full-width content: col2~4 병합 (528px)
// Label text: 14px Medium #333 / * 13px #fa4553

// ─── Types ────────────────────────────────────────────────────────────────────

export interface FormTableCell {
  label: string
  required?: boolean
  content: React.ReactNode
  /** 콘텐츠 셀이 오른쪽 절반까지 span하는지 (기본 false = 절반) */
  fullWidth?: boolean
}

export interface FormTableRow {
  cells: FormTableCell[]
  /** 행 높이 (기본 56px) */
  height?: number
}

export interface FormTableProps {
  rows: FormTableRow[]
  className?: string
}

// ─── Shared cell style helpers ────────────────────────────────────────────────

const cellBase: React.CSSProperties = {
  verticalAlign: 'middle',
  boxSizing: 'border-box',
}

// ─── FormTable ────────────────────────────────────────────────────────────────

export const FormTable: React.FC<FormTableProps> = ({ rows, className = '' }) => (
  <div className={['w-full overflow-x-auto', className].join(' ')}>
  <div
    className="inline-block overflow-hidden"
    style={{ border: '1px solid #d3d3d3', borderRadius: 8 }}
  >
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '120px 204px 120px 204px',
      }}
    >
      {rows.map((row, rIdx) => {
        const isLastRow = rIdx === rows.length - 1
        const h = row.height ?? 56

        return (
          <React.Fragment key={rIdx}>
            {row.cells.map((cell, cIdx) => {
              const isLastCell = cIdx === row.cells.length - 1
              const isFullWidth = cell.fullWidth || row.cells.length === 1

              return (
                <React.Fragment key={cIdx}>
                  {/* Label */}
                  <div
                    style={{
                      ...cellBase,
                      height: h,
                      backgroundColor: '#f7f8fa',
                      borderRight: '1px solid #e1e1e1',
                      borderBottom: isLastRow ? 'none' : '1px solid #e1e1e1',
                      padding: '0 16px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <span style={{ fontSize: 14, fontWeight: 500, color: '#333333', letterSpacing: '-0.5px' }}>
                      {cell.label}
                    </span>
                    {cell.required && (
                      <span style={{ fontSize: 13, fontWeight: 500, color: '#fa4553', marginLeft: 2 }}>*</span>
                    )}
                  </div>

                  {/* Content */}
                  <div
                    style={{
                      ...cellBase,
                      gridColumn: isFullWidth ? '2 / 5' : undefined,
                      height: h,
                      backgroundColor: '#ffffff',
                      borderRight: (!isFullWidth && !isLastCell) ? '1px solid #e1e1e1' : 'none',
                      borderBottom: isLastRow ? 'none' : '1px solid #e1e1e1',
                      padding: '0 12px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {cell.content}
                  </div>
                </React.Fragment>
              )
            })}
          </React.Fragment>
        )
      })}
    </div>
  </div>
  </div>
)

export default FormTable

import React, { useState, useCallback } from 'react';

export type SortDirection = 'asc' | 'desc';

export interface TableColumn<T extends Record<string, unknown> = Record<string, unknown>> {
  key: string;
  header: string;
  width?: number;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  render?: (value: unknown, row: T) => React.ReactNode;
}

export interface TableProps<T extends Record<string, unknown> = Record<string, unknown>> {
  columns: TableColumn<T>[];
  data: T[];
  selectable?: boolean;
  selectedIds?: string[];
  onSelectionChange?: (ids: string[]) => void;
  onSort?: (key: string, direction: SortDirection) => void;
  onDelete?: (id: string) => void;
  rowKey?: string;
  rowHeight?: 'compact' | 'default' | 'tall';
  className?: string;
  emptyMessage?: string;
}

// ─── Sort Icons ───────────────────────────────────────────────────────────────
// Figma 헤더 구조: [ic_descending(14)] gap=2px [text] gap=2px [ic_arrow_down(12)]
// ic_descending: 항상 표시, 항상 fill=#777777
// ic_arrow_down: 항상 표시, 정렬 방향에 따라 회전

// ic_descending 14×14 — 피그마 원본 (항상 #777777)
const IcDescending: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="shrink-0">
    <path d="M9.54476 11.5548C9.66983 11.6797 9.8582 11.7175 10.0216 11.6499C10.0855 11.6234 10.1404 11.5822 10.1839 11.532L12.1424 9.57349C12.3132 9.40265 12.3132 9.12569 12.1424 8.95483C11.9716 8.78398 11.6946 8.78398 11.5238 8.95483L10.2916 10.187V3.33398C10.2916 3.09239 10.0957 2.89653 9.85408 2.89648C9.61253 2.89656 9.41658 3.09241 9.41658 3.33398V10.1893L8.18726 8.95996C8.0164 8.7891 7.73946 8.78911 7.5686 8.95996C7.39794 9.13083 7.39782 9.40782 7.5686 9.57861L9.54476 11.5548Z" fill="#777777"/>
    <path d="M7.58398 3.93783C7.82557 3.93783 8.02142 3.7419 8.02148 3.50033C8.02148 3.2587 7.82561 3.06283 7.58398 3.06283H2.33398C2.09236 3.06283 1.89648 3.2587 1.89648 3.50033C1.89655 3.7419 2.0924 3.93783 2.33398 3.93783H7.58398Z" fill="#777777"/>
    <path d="M6.41732 7.43783C6.6589 7.43783 6.85475 7.2419 6.85482 7.00033C6.85482 6.7587 6.65894 6.56283 6.41732 6.56283H2.33398C2.09236 6.56283 1.89648 6.7587 1.89648 7.00033C1.89655 7.2419 2.0924 7.43783 2.33398 7.43783H6.41732Z" fill="#777777"/>
    <path d="M6.41732 10.9378C6.6589 10.9378 6.85475 10.7419 6.85482 10.5003C6.85482 10.2587 6.65894 10.0628 6.41732 10.0628H2.33398C2.09236 10.0628 1.89648 10.2587 1.89648 10.5003C1.89655 10.7419 2.0924 10.9378 2.33398 10.9378H6.41732Z" fill="#777777"/>
  </svg>
)

// ic_arrow_down 12×12 — 피그마 원본 (항상 표시, asc=rotate-180)
const IcArrowDown: React.FC<{ direction: SortDirection | null }> = ({ direction }) => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"
    className={['shrink-0 transition-transform duration-150', direction === 'asc' ? 'rotate-180' : ''].join(' ')}>
    <path d="M9.85983 3.73581C10.0063 3.58936 10.2437 3.58936 10.3901 3.73581C10.5365 3.88226 10.5365 4.11965 10.3901 4.26608L6.26511 8.39109L6.23679 8.41696C6.08951 8.53712 5.87214 8.52836 5.73484 8.39109L1.60983 4.26608C1.46339 4.11964 1.46339 3.88226 1.60983 3.73581C1.75628 3.58936 1.99366 3.58936 2.14011 3.73581L5.99997 7.59567L9.85983 3.73581Z" fill="#777777"/>
  </svg>
)

// ─── Checkbox ─────────────────────────────────────────────────────────────────
// Figma: 14×14, r=4 / 미선택: fill=#fff stroke=#d3d3d3 / 선택: fill=#719bfc(primary-300)

const Checkbox: React.FC<{
  checked: boolean;
  indeterminate?: boolean;
  onChange: (checked: boolean) => void;
  'aria-label'?: string;
}> = ({ checked, indeterminate = false, onChange, 'aria-label': ariaLabel }) => {
  const active = checked || indeterminate;
  return (
    <label className="inline-flex items-center justify-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        aria-label={ariaLabel}
        onChange={e => onChange(e.target.checked)}
        className="sr-only"
      />
      <span
        className="flex items-center justify-center shrink-0"
        style={{
          width: 14, height: 14, borderRadius: 4,
          backgroundColor: active ? '#719bfc' : '#ffffff',
          border: active ? 'none' : '1px solid #d3d3d3',
        }}
      >
        {checked && !indeterminate && (
          <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
            <path d="M1 3.5L3.5 6L8 1" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
        {indeterminate && (
          <svg width="8" height="2" viewBox="0 0 8 2" fill="none">
            <path d="M1 1H7" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        )}
      </span>
    </label>
  );
};

// ─── Close Icon ───────────────────────────────────────────────────────────────

const CloseIcon: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M11 3L3 11M3 3l8 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

// ─── Empty State ──────────────────────────────────────────────────────────────

const EmptyState: React.FC<{ message: string }> = ({ message }) => (
  <div className="flex flex-col items-center justify-center py-16 text-secondary-400">
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="mb-3">
      <rect x="8" y="10" width="32" height="28" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <line x1="8" y1="18" x2="40" y2="18" stroke="currentColor" strokeWidth="1.5" />
      <line x1="14" y1="26" x2="34" y2="26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="14" y1="32" x2="28" y2="32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
    <p className="text-body4 text-secondary-600">{message}</p>
  </div>
);

// ─── Row height ───────────────────────────────────────────────────────────────

const ROW_H: Record<string, number> = { compact: 40, default: 48, tall: 64 };

// ─── Table ────────────────────────────────────────────────────────────────────

// Figma 컴포넌트명: DataListTable (Table은 하위호환 alias)
export function DataListTable<T extends Record<string, unknown> = Record<string, unknown>>({
  columns,
  data,
  selectable = false,
  selectedIds = [],
  onSelectionChange,
  onSort,
  onDelete,
  rowKey = 'id',
  rowHeight = 'default',
  className = '',
  emptyMessage = '데이터가 없습니다.',
}: TableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const getRowId = useCallback((row: T) => String(row[rowKey] ?? ''), [rowKey]);

  const isAllSelected = data.length > 0 && data.every(r => selectedIds.includes(getRowId(r)));
  const isIndeterminate = !isAllSelected && data.some(r => selectedIds.includes(getRowId(r)));

  const handleHeaderCheck = (checked: boolean) => {
    if (!onSelectionChange) return;
    onSelectionChange(checked ? data.map(getRowId) : []);
  };

  const handleRowCheck = (row: T, checked: boolean) => {
    if (!onSelectionChange) return;
    const id = getRowId(row);
    onSelectionChange(checked ? [...selectedIds, id] : selectedIds.filter(s => s !== id));
  };

  const handleSort = (key: string) => {
    if (!onSort) return;
    const dir: SortDirection = sortKey === key && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortKey(key);
    setSortDirection(dir);
    onSort(key, dir);
  };

  const rh = ROW_H[rowHeight];

  const tdBase = [
    'align-middle px-4 overflow-hidden',
    rowHeight !== 'tall' ? 'whitespace-nowrap' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={['w-full overflow-x-auto', className].filter(Boolean).join(' ')}>
      {/* table-layout:fixed + column widths → truncation works */}
      <table className="w-full border-collapse" style={{ tableLayout: 'fixed' }}>
        <colgroup>
          {selectable && <col style={{ width: 44 }} />}
          {columns.map(col => (
            <col key={col.key} style={{ width: col.width ?? 'auto' }} />
          ))}
          {onDelete && <col style={{ width: 44 }} />}
        </colgroup>

        {/* Header — bg:#f7f8fa(neutral-30), h:28px, text:12px #777777 */}
        <thead className="sticky top-0 z-10 bg-neutral-30">
          <tr style={{ height: 28, borderBottom: '1px solid #e1e1e1' }}>
            {selectable && (
              <th className="pl-4" style={{ verticalAlign: 'middle' }}>
                <div className="flex items-center justify-start">
                  <Checkbox
                    checked={isAllSelected}
                    indeterminate={isIndeterminate}
                    onChange={handleHeaderCheck}
                    aria-label="모두 선택"
                  />
                </div>
              </th>
            )}
            {columns.map(col => (
              <th
                key={col.key}
                className={[
                  'px-4 align-middle text-body5 font-regular text-secondary-600 select-none whitespace-nowrap overflow-hidden',
                  col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left',
                  col.sortable && onSort ? 'cursor-pointer hover:text-secondary-800' : '',
                ].filter(Boolean).join(' ')}
                onClick={() => col.sortable && handleSort(col.key)}
                aria-sort={sortKey === col.key ? (sortDirection === 'asc' ? 'ascending' : 'descending') : undefined}
              >
                {/* Figma 순서: ic_descending → text → ic_arrow_down, gap=2px */}
                <span className="inline-flex items-center" style={{ gap: '2px' }}>
                  {col.sortable && onSort && <IcDescending />}
                  <span>{col.header}</span>
                  {col.sortable && onSort && (
                    <IcArrowDown direction={sortKey === col.key ? sortDirection : null} />
                  )}
                </span>
              </th>
            ))}
            {onDelete && <th />}
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (selectable ? 1 : 0) + (onDelete ? 1 : 0)}>
                <EmptyState message={emptyMessage} />
              </td>
            </tr>
          ) : data.map(row => {
            const id = getRowId(row);
            const isSelected = selectedIds.includes(id);
            return (
              <tr
                key={id}
                style={{
                  height: rh,
                  borderBottom: '1px solid #e1e1e1',
                  backgroundColor: isSelected ? 'rgba(16,90,255,0.05)' : undefined,
                }}
                className={!isSelected ? 'hover:bg-black/[0.03] transition-colors' : ''}
              >
                {selectable && (
                  <td className="pl-4 overflow-hidden" style={{ verticalAlign: 'middle' }}>
                    <div className="flex items-center justify-start">
                      <Checkbox
                        checked={isSelected}
                        onChange={checked => handleRowCheck(row, checked)}
                        aria-label={`행 ${id} 선택`}
                      />
                    </div>
                  </td>
                )}
                {columns.map(col => (
                  <td
                    key={col.key}
                    className={[
                      tdBase,
                      'text-body3 text-secondary-800',
                      col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left',
                    ].filter(Boolean).join(' ')}
                  >
                    {col.render
                      ? col.render(row[col.key], row)
                      : <span className="block truncate">{String(row[col.key] ?? '')}</span>
                    }
                  </td>
                ))}
                {onDelete && (
                  <td className="overflow-hidden" style={{ verticalAlign: 'middle' }}>
                    <div
                      className="flex items-center justify-end"
                      style={{ height: rh, paddingRight: 16 }}
                    >
                      <button
                        type="button"
                        aria-label="행 삭제"
                        onClick={() => onDelete(id)}
                        className="flex items-center justify-center text-secondary-400 hover:text-secondary-800 transition-colors focus:outline-none"
                      >
                        <CloseIcon />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export { DataListTable as Table };
export default DataListTable;

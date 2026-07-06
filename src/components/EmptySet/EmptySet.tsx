import React from 'react'

// ─── Figma specs ──────────────────────────────────────────────────────────────
// EmptySet (COMPONENT_SET):
//   Size=Medium:  icon 96×96, text 14px Regular #777777, 2-line center
//   Size=Small:   icon 72×72, text 14px Regular #777777
//   Size=XSmall:  icon 52×52, text 12px Regular #777777
//   Optional action button below text

type EmptySize = 'md' | 'sm' | 'xs'

interface EmptySetProps {
  size?: EmptySize
  icon?: React.ReactNode
  description?: string
  action?: React.ReactNode
}

const sizeMap: Record<EmptySize, { icon: string; text: string }> = {
  md: { icon: 'w-24 h-24',      text: 'text-body3 font-regular' },   // 96px, 14px
  sm: { icon: 'w-[72px] h-[72px]', text: 'text-body3 font-regular' }, // 72px, 14px
  xs: { icon: 'w-[52px] h-[52px]', text: 'text-body5 font-regular' }, // 52px, 12px
}

// ─── Default empty search illustration ───────────────────────────────────────

// ─── ic_empty_search (Figma에서 직접 추출) ───────────────────────────────────

const EmptySearchIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <g clipPath="url(#es-clip)">
      {/* Document with shadow */}
      <g filter="url(#es-f0)">
        <path d="M71 12H25C21.686 12 19 14.686 19 18V78C19 81.314 21.686 84 25 84H71C74.314 84 77 81.314 77 78V18C77 14.686 74.314 12 71 12Z" fill="white"/>
        <path d="M75 18C75 15.791 73.209 14 71 14H25C22.791 14 21 15.791 21 18V78C21 80.209 22.791 82 25 82H71C73.209 82 75 80.209 75 78V18ZM77 78C77 81.314 74.314 84 71 84H25C21.686 84 19 81.314 19 78V18C19 14.686 21.686 12 25 12H71C74.314 12 77 14.686 77 18V78Z" fill="#ABABAB"/>
        {/* List items */}
        <circle cx="31" cy="68" r="3" fill="#E8E8E8"/>
        <rect x="37" y="66.5" width="15" height="3" rx="1.5" fill="#E8E8E8"/>
        <circle cx="31" cy="58" r="3" fill="#E8E8E8"/>
        <rect x="37" y="56.5" width="15" height="3" rx="1.5" fill="#E8E8E8"/>
        <circle cx="31" cy="48" r="3" fill="#E8E8E8"/>
        <rect x="37" y="46.5" width="15" height="3" rx="1.5" fill="#E8E8E8"/>
        <circle cx="31" cy="38" r="3" fill="#E8E8E8"/>
        <rect x="37" y="36.5" width="27" height="3" rx="1.5" fill="#E8E8E8"/>
        <circle cx="31" cy="28" r="3" fill="#E8E8E8"/>
        <rect x="37" y="27" width="27.5" height="3" rx="1.5" fill="#E8E8E8"/>
      </g>
      {/* Magnifier with shadow */}
      <g filter="url(#es-f1)">
        <path d="M89.278 77.23C88.494 77.23 87.758 76.925 87.204 76.372L81.403 70.569C78.807 72.337 75.767 73.271 72.614 73.271C68.437 73.271 64.51 71.645 61.557 68.691C58.603 65.738 56.977 61.811 56.977 57.634C56.977 53.457 58.603 49.53 61.557 46.576C64.51 43.623 68.437 41.996 72.614 41.996C76.791 41.996 80.718 43.623 83.672 46.576C86.625 49.53 88.252 53.457 88.252 57.634C88.252 60.787 87.317 63.826 85.549 66.423L91.35 72.224C91.903 72.777 92.208 73.514 92.208 74.298C92.208 75.082 91.903 75.819 91.35 76.372C90.797 76.925 90.061 77.23 89.278 77.23ZM72.614 45.906C69.481 45.906 66.536 47.126 64.321 49.341C62.106 51.556 60.886 54.501 60.886 57.634C60.886 60.766 62.106 63.712 64.321 65.927C66.536 68.142 69.481 69.362 72.614 69.362C75.747 69.362 78.692 68.142 80.907 65.927C83.123 63.711 84.343 60.766 84.343 57.634C84.343 54.501 83.123 51.556 80.907 49.341C78.692 47.126 75.747 45.906 72.614 45.906Z" fill="#ABABAB"/>
        <circle cx="72.605" cy="57.638" r="11.728" fill="#F4F4F4"/>
      </g>
    </g>
    <defs>
      <filter id="es-f0" x="19" y="12" width="66" height="80" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dx="4" dy="4"/><feGaussianBlur stdDeviation="2"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"/>
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_11331_8524"/>
        <feBlend in="SourceGraphic" in2="effect1_dropShadow_11331_8524" result="shape"/>
      </filter>
      <filter id="es-f1" x="52.977" y="41.996" width="43.231" height="43.234" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dy="4"/><feGaussianBlur stdDeviation="2"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0.808 0 0 0 0 0.808 0 0 0 0 0.808 0 0 0 0.28 0"/>
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_11331_8524"/>
        <feBlend in="SourceGraphic" in2="effect1_dropShadow_11331_8524" result="shape"/>
      </filter>
      <clipPath id="es-clip"><rect width="96" height="96" fill="white"/></clipPath>
    </defs>
  </svg>
)

// ─── Component ────────────────────────────────────────────────────────────────

export const EmptySet: React.FC<EmptySetProps> = ({
  size = 'md',
  icon,
  description = '검색결과가 없습니다.\n검색어를 다시 확인해주세요.',
  action,
}) => {
  const { icon: iconSize, text } = sizeMap[size]

  return (
    <div className="flex flex-col items-center justify-center text-center py-8 px-4">
      {/* Icon — 기본: ic_empty_search (Figma 원본) / icon prop으로 커스텀 가능 */}
      <div className={['flex items-center justify-center mb-3', iconSize].join(' ')}>
        {icon ?? <EmptySearchIcon className="w-full h-full" />}
      </div>

      {/* Description — pre-line for \n line breaks */}
      <p
        className={['text-secondary-600 whitespace-pre-line', text].join(' ')}
      >
        {description}
      </p>

      {/* Action */}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}

export default EmptySet

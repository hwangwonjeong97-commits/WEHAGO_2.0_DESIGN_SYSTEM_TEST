import React, { forwardRef, HTMLAttributes, useState } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

// Figma 10 sizes: 18/24/32/36/40/44/48/52/56/60
// xs=24, sm=32, md=40, lg=48, xl=56 (기존 alias 유지)
type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '18' | '36' | '44' | '52' | '60'

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string
  name?: string
  alt?: string
  size?: AvatarSize
  online?: boolean
}

// ─── Size map (Figma 실측 cornerRadius) ──────────────────────────────────────
// px : radius / ic_user
// 18 : r=6  / 12px
// 24 : r=10 / 14px  (xs)
// 32 : r=12 / 18px  (sm)
// 36 : r=14 / 18px
// 40 : r=14 / 24px  (md)
// 44 : r=16 / 24px
// 48 : r=16 / 24px  (lg)
// 52 : r=18 / 24px
// 56 : r=20 / 32px  (xl)
// 60 : r=24 / 32px

const sizeMap: Record<AvatarSize, { box: string; dot: string; iconSize: number }> = {
  '18': { box: 'w-[18px] h-[18px] text-[8px]  rounded-[6px]',  dot: 'w-1 h-1 border',       iconSize: 12 },
  xs:   { box: 'w-6 h-6 text-body6 rounded-[10px]',             dot: 'w-1.5 h-1.5 border',   iconSize: 14 },
  sm:   { box: 'w-8 h-8 text-body5 rounded-xl',                 dot: 'w-2 h-2 border',        iconSize: 18 },
  '36': { box: 'w-9 h-9 text-body5 rounded-[14px]',             dot: 'w-2 h-2 border',        iconSize: 18 },
  md:   { box: 'w-10 h-10 text-body3 rounded-[14px]',           dot: 'w-2.5 h-2.5 border-2', iconSize: 24 },
  '44': { box: 'w-11 h-11 text-body3 rounded-2xl',              dot: 'w-2.5 h-2.5 border-2', iconSize: 24 },
  lg:   { box: 'w-12 h-12 text-body2 rounded-2xl',              dot: 'w-3 h-3 border-2',      iconSize: 24 },
  '52': { box: 'w-[52px] h-[52px] text-body1 rounded-[18px]',   dot: 'w-3 h-3 border-2',     iconSize: 24 },
  xl:   { box: 'w-14 h-14 text-body1 rounded-[20px]',           dot: 'w-3.5 h-3.5 border-2', iconSize: 32 },
  '60': { box: 'w-[60px] h-[60px] text-heading2 rounded-3xl',   dot: 'w-3.5 h-3.5 border-2', iconSize: 32 },
}

// ─── ic_user SVG — 피그마 원본 경로 ─────────────────────────────────────────

const IcUser: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <path d="M19.834 17.1878C24.6284 17.4589 28.3327 21.656 28.3327 26.667C28.3326 27.2192 27.8849 27.667 27.3327 27.667C26.7805 27.667 26.3328 27.2192 26.3327 26.667C26.3327 22.6103 23.3587 19.3915 19.7155 19.1839L19.3613 19.1735H12.6413L12.2871 19.1852C8.65356 19.4035 5.67762 22.624 5.66602 26.6696C5.66444 27.2218 5.21558 27.6684 4.66341 27.667C4.11127 27.6654 3.66466 27.2165 3.66602 26.6644C3.68074 21.5073 7.62571 17.204 12.6283 17.1735H19.3665L19.834 17.1878Z" fill="white"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M15.9994 2.66699C19.4972 2.66699 22.3327 5.50252 22.3327 9.00033C22.3327 12.4981 19.4972 15.3337 15.9994 15.3337C12.5015 15.3337 9.66602 12.4981 9.66602 9.00033C9.66602 5.50252 12.5015 2.66699 15.9994 2.66699ZM15.9994 4.66699C13.6061 4.66699 11.666 6.60709 11.666 9.00033C11.666 11.3936 13.6061 13.3337 15.9994 13.3337C18.3926 13.3337 20.3327 11.3936 20.3327 9.00033C20.3327 6.60709 18.3926 4.66699 15.9994 4.66699Z" fill="white"/>
  </svg>
)

// 결정론적 배경색 (이름 해시 기반)
const bgOptions = [
  'bg-[#ffdbdb]', 'bg-[#dbeafe]', 'bg-[#dcfce7]',
  'bg-[#fef9c3]', 'bg-[#f3e8ff]', 'bg-[#ffedd5]',
]

function getBg(name: string) {
  let h = 0
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h)
  return bgOptions[Math.abs(h) % bgOptions.length]
}

function getInitial(name: string) {
  return name.trim().charAt(0) || '?'
}

// ─── Component ────────────────────────────────────────────────────────────────

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, name = '', alt, size = 'md', online, className = '', ...props }, ref) => {
    const [imgError, setImgError] = useState(false)
    const showImage = src && !imgError
    const { box, dot, iconSize } = sizeMap[size]
    const isEmpty = !name && !src
    const bg = isEmpty ? 'bg-[#c1cbdd]' : getBg(name || '?')
    const label = alt ?? name ?? '아바타'

    return (
      <div
        ref={ref}
        className={['relative inline-flex flex-shrink-0', className].filter(Boolean).join(' ')}
        {...props}
      >
        <div
          role="img"
          aria-label={label}
          className={[
            'overflow-hidden flex items-center justify-center select-none font-medium',
            box,
            showImage ? '' : bg,
          ].filter(Boolean).join(' ')}
        >
          {showImage ? (
            <img
              src={src}
              alt={label}
              className="w-full h-full object-cover"
              onError={() => setImgError(true)}
            />
          ) : isEmpty ? (
            <IcUser size={iconSize} />
          ) : (
            <span className="text-secondary-800 leading-none" aria-hidden="true">
              {getInitial(name)}
            </span>
          )}
        </div>

        {/* 온라인 상태 표시 — Figma: #6cd3ff (cyan-blue) */}
        {online !== undefined && (
          <span
            aria-label={online ? '온라인' : '오프라인'}
            className={[
              'absolute bottom-0 right-0 rounded-full border-white',
              dot,
              online ? 'bg-[#6cd3ff]' : 'bg-secondary-300',
            ].join(' ')}
          />
        )}
      </div>
    )
  }
)

Avatar.displayName = 'Avatar'
export default Avatar

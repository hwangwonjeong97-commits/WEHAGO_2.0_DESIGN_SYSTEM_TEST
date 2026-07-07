import React, { forwardRef, HTMLAttributes, useState } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

// Figma Avatar/Default 5 sizes(정확): XSmall 18(r6) · Small 20(r8) · Medium 32(r12) · Large 40(r16) · XLarge 52(r20)
// 하위호환용 legacy alias(xs/sm/md/lg/xl, 24/36/44/48/56/60)도 유지
type AvatarSize =
  | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'
  | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  | '18' | '20' | '36' | '44' | '52' | '60'

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

type SizeSpec = { box: string; dot: string; iconSize: number }

// ── Figma Avatar/Default 5 사이즈 (정확) ──
const XSMALL: SizeSpec = { box: 'w-[18px] h-[18px] text-[8px] rounded-[6px]',  dot: 'w-1 h-1 border',       iconSize: 12 }
const SMALL:  SizeSpec = { box: 'w-5 h-5 text-[9px] rounded-[8px]',            dot: 'w-1 h-1 border',       iconSize: 14 }
const MEDIUM: SizeSpec = { box: 'w-8 h-8 text-body5 rounded-[12px]',           dot: 'w-2 h-2 border',       iconSize: 18 }
const LARGE:  SizeSpec = { box: 'w-10 h-10 text-body3 rounded-[16px]',         dot: 'w-2.5 h-2.5 border-2', iconSize: 24 }
const XLARGE: SizeSpec = { box: 'w-[52px] h-[52px] text-body1 rounded-[20px]', dot: 'w-3 h-3 border-2',     iconSize: 24 }

const sizeMap: Record<AvatarSize, SizeSpec> = {
  // Figma 명칭
  xsmall: XSMALL, small: SMALL, medium: MEDIUM, large: LARGE, xlarge: XLARGE,
  // 숫자
  '18': XSMALL, '20': SMALL,
  // legacy alias (px 유지, radius는 Figma 규칙으로 보정)
  xs:   { box: 'w-6 h-6 text-body6 rounded-[10px]',           dot: 'w-1.5 h-1.5 border',   iconSize: 14 },
  sm:   MEDIUM,
  '36': { box: 'w-9 h-9 text-body5 rounded-[14px]',           dot: 'w-2 h-2 border',       iconSize: 18 },
  md:   LARGE,
  '44': { box: 'w-11 h-11 text-body3 rounded-2xl',            dot: 'w-2.5 h-2.5 border-2', iconSize: 24 },
  lg:   { box: 'w-12 h-12 text-body2 rounded-2xl',            dot: 'w-3 h-3 border-2',     iconSize: 24 },
  '52': XLARGE,
  xl:   { box: 'w-14 h-14 text-body1 rounded-[20px]',         dot: 'w-3.5 h-3.5 border-2', iconSize: 32 },
  '60': { box: 'w-[60px] h-[60px] text-heading2 rounded-3xl', dot: 'w-3.5 h-3.5 border-2', iconSize: 32 },
}

// ─── ic_user SVG — 피그마 원본 경로 ─────────────────────────────────────────

// Figma 원본 ic_user (viewBox 12×12, white)
const IcUser: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M7.43799 6.44531C9.23589 6.54696 10.625 8.12089 10.625 10C10.625 10.2071 10.4571 10.375 10.25 10.375C10.0429 10.375 9.87503 10.2071 9.875 10C9.875 8.47874 8.75976 7.27169 7.39356 7.19385L7.26074 7.18994H4.74072L4.60791 7.19434C3.24533 7.27618 2.12935 8.48388 2.125 10.001C2.12441 10.2081 1.95609 10.3755 1.74902 10.375C1.54197 10.3744 1.37449 10.2061 1.375 9.99902C1.38052 8.06512 2.85989 6.45139 4.73584 6.43994H7.2627L7.43799 6.44531Z" fill="white"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M6 1C7.31168 1 8.375 2.06332 8.375 3.375C8.375 4.68668 7.31168 5.75 6 5.75C4.68833 5.75 3.625 4.68668 3.625 3.375C3.625 2.06332 4.68833 1 6 1ZM6 1.75C5.10254 1.75 4.375 2.47754 4.375 3.375C4.375 4.27246 5.10254 5 6 5C6.89746 5 7.625 4.27246 7.625 3.375C7.625 2.47754 6.89746 1.75 6 1.75Z" fill="white"/>
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
            // 공통 outline stroke (Figma variable): rgba(0,0,0,0.06) 1px
            'border border-black/[0.06] box-border',
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
              online ? 'bg-[#6cd3ff]' : 'bg-[#d3d3d3]',
            ].join(' ')}
          />
        )}
      </div>
    )
  }
)

Avatar.displayName = 'Avatar'

// ─── AvatarGroup (Figma Avatar/MultiGroup) ──────────────────────────────────
// Multi : 2~4명 클러스터 (2명 대각선 / 3명 삼각 / 4명 2×2), 박스 32/36/40, 흰 링
// Group : 가로 겹침(아바타 20/24, overlap 4px) + "+N" 칩(흰 링+내부 #ededed 원+#777 Regular)

type AvatarGroupSize = 'small' | 'medium' | 'large'

// px 지정 미니 아바타 (흰 링). src 있으면 이미지, 없으면 Empty(ic_user)
const MiniAvatar: React.FC<{ src?: string; name?: string; px: number }> = ({ src, name, px }) => {
  const radius = Math.round(px * 0.375)
  return (
    <div
      style={{
        width: px, height: px, borderRadius: radius, overflow: 'hidden',
        // 흰 링 + 공통 outline stroke rgba(0,0,0,0.06)
        boxShadow: '0 0 0 2px #fff, inset 0 0 0 1px rgba(0,0,0,0.06)', flexShrink: 0,
        background: '#c1cbdd', display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      {src
        ? <img src={src} alt={name ?? ''} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        : <IcUser size={Math.round(px * 0.6)} />}
    </div>
  )
}

export interface AvatarGroupProps {
  avatars: { src?: string; name?: string }[]
  size?: AvatarGroupSize
  type?: 'multi' | 'group'
  max?: number          // (group) 초과분은 +N 칩으로 표시
  className?: string
}

// Multi 클러스터 박스 크기
const MULTI_BOX: Record<AvatarGroupSize, number> = { small: 32, medium: 36, large: 40 }
// Group 아바타 크기 (Figma: Small 20 / Medium·Large 24)
const GROUP_AV: Record<AvatarGroupSize, number> = { small: 20, medium: 24, large: 24 }

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  avatars,
  size = 'medium',
  type = 'multi',
  max,
  className = '',
}) => {
  // ── Multi: 클러스터 ──
  if (type === 'multi') {
    const S = MULTI_BOX[size]
    const list = avatars.slice(0, 4)
    const n = list.length
    // 아바타 크기 a, 상대 좌표 (Figma 실측 비율)
    const a = Math.round(S * (n === 2 ? 0.61 : n >= 3 ? 0.56 : 1))
    const off = S - a
    const pos: [number, number][] =
      n <= 1 ? [[0, 0]]
      : n === 2 ? [[0, 0], [off, off]]
      : n === 3 ? [[Math.round(off / 2), 0], [0, off], [off, off]]
      : [[0, 0], [off, 0], [0, off], [off, off]]
    return (
      <div className={['relative inline-block', className].filter(Boolean).join(' ')} style={{ width: S, height: S }}>
        {list.map((av, i) => (
          <div key={i} style={{ position: 'absolute', left: pos[i][0], top: pos[i][1], zIndex: i }}>
            <MiniAvatar src={av.src} name={av.name} px={a} />
          </div>
        ))}
      </div>
    )
  }

  // ── Group: 가로 겹침 + "+N" ──
  const a = GROUP_AV[size]
  const step = a - 4                       // overlap 4px
  const radius = Math.round(a * 0.375)
  const limit = max ?? avatars.length
  const shown = avatars.slice(0, limit)
  const rest = avatars.length - shown.length

  return (
    <div className={['inline-flex items-center', className].filter(Boolean).join(' ')}>
      {shown.map((av, i) => (
        <span key={i} style={{ marginLeft: i === 0 ? 0 : -(a - step), zIndex: i }}>
          <MiniAvatar src={av.src} name={av.name} px={a} />
        </span>
      ))}
      {rest > 0 && (
        <span
          style={{
            marginLeft: -(a - step), zIndex: shown.length,
            width: a, height: a, borderRadius: radius,
            boxShadow: '0 0 0 2px #fff', background: '#ededed', flexShrink: 0,
          }}
          className="inline-flex items-center justify-center select-none"
        >
          {/* +N: #777 Regular, ls -0.5, 11(small)/12(md) */}
          <span style={{ fontSize: a <= 20 ? 11 : 12, fontWeight: 400, color: '#777777', letterSpacing: '-0.5px', lineHeight: 1 }}>
            +{rest}
          </span>
        </span>
      )}
    </div>
  )
}

AvatarGroup.displayName = 'AvatarGroup'

export default Avatar

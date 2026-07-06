import React from 'react'

// ─── Figma FileThumbnail — 정확한 측정값 ─────────────────────────────────────
// 외부 컨테이너: 190×161, r:12
// 내부 Item:    182×153 (4px 패딩 all sides)
//
// preview-image: 182×104, r:8
//   Default:  이미지 fill + stroke rgba(0,0,0,0.06) + overlay rgba(0,0,0,0.16)
//   Selected: 이미지 fill + stroke #105aff (border, NOT ring) + overlay
//   Hovered:  이미지 fill + stroke rgba(0,0,0,0.06) + overlay + action bar 하단
//   File:     bg #ffffff + stroke rgba(0,0,0,0.06) + 파일아이콘 40×40 중앙
//   Warning:  bg #ffffff + stroke rgba(0,0,0,0.06) + 경고아이콘 중앙
//
// Checkbox: 24×24, top:6px right:6px (item 기준)
// Action bar (Hovered): h:26, bg rgba(0,0,0,0.4), 하단 중앙 정렬
//
// 이미지↔Info 간격: 2px
// Info: 182×47
//   내부 padding: top 4px, left 4px
//   Filename:  14px Regular #333333, h:21
//   Subtext:   12px Regular #777777, h:18 (시간아이콘+작성자+용량+공유아이콘)

type ThumbnailState = 'default' | 'selected' | 'hovered' | 'file' | 'warning'

interface ThumbnailProps {
  src?: string
  filename?: string
  extension?: string
  author?: string
  fileSize?: string
  state?: ThumbnailState
  fileType?: string
  selectable?: boolean
  selected?: boolean
  onSelect?: () => void
  onExport?: () => void
  onDownload?: () => void
  onDelete?: () => void
  className?: string
}

// ─── File icon — Figma 원본 ic_file_pdf_m (40×40) ─────────────────────────────

const PdfFileIcon: React.FC = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
    <path d="M27.419 2.728H6.364A1.818 1.818 0 0 0 4.546 4.546V35.455A1.818 1.818 0 0 0 6.364 37.273H33.637A1.818 1.818 0 0 0 35.455 35.455V10.663L27.419 2.728Z" fill="white"/>
    <path d="M6.364 37.727a2.273 2.273 0 0 1-2.273-2.272V4.545a2.273 2.273 0 0 1 2.273-2.273h21.239L35.91 10.473V35.455a2.273 2.273 0 0 1-2.273 2.272H6.364ZM5 4.545v30.91c0 .75.608 1.363 1.364 1.363H33.636A1.364 1.364 0 0 0 35 35.455V11.105h-6.67a1.364 1.364 0 0 1-1.364-1.364V3.182H6.364A1.364 1.364 0 0 0 5 4.545Zm22.875 5.196c0 .252.205.455.456.455h6.007L27.875 3.81v5.931Z" fill="#D3D3D3"/>
    <path d="M4.091 25.908H35.91V35.908A1.818 1.818 0 0 1 34.091 37.726H5.909A1.818 1.818 0 0 1 4.091 35.908V25.908Z" fill="#EF5959"/>
    <path d="M5 26.817v9.091c0 .503.407.91.91.91H34.09a.91.91 0 0 0 .91-.91v-9.09H5ZM4.091 25.908H35.91v10A1.818 1.818 0 0 1 34.091 37.726H5.909A1.818 1.818 0 0 1 4.091 35.908v-10Z" fill="black" fillOpacity="0.1"/>
    <path d="M12.703 35.454v-6.363h2.162c1.494 0 2.17.888 2.17 2.021 0 1.126-.676 2.031-2.161 2.031H13.494v2.311H12.703ZM13.494 32.44h1.345c1.01 0 1.415-.572 1.415-1.328 0-.764-.405-1.318-1.424-1.318H13.494V32.44ZM19.941 35.454h-1.977v-6.363h2.056c1.855 0 2.953 1.195 2.953 3.173 0 1.986-1.098 3.19-3.032 3.19ZM18.755 34.75h1.134c1.564 0 2.311-.94 2.311-2.487 0-1.537-.747-2.469-2.233-2.469h-1.212V34.75ZM23.953 35.454v-6.363h3.832v.703H24.745v2.127h2.75v.694h-2.75v3.34H23.953Z" fill="white"/>
    <path d="M17.995 16.242c.387-.777.822-1.652 1.176-2.531l.14-.353c-.46-1.792-.736-3.23-.49-4.16a.54.54 0 0 1 .213-.316.54.54 0 0 1 .368-.057h.214c.402-.006.592.516.613.72.003.307-.036.613-.117.91.02-.316-.025-.631-.132-.929-.167-.372-.325-.596-.467-.636a.497.497 0 0 0-.135.223.497.497 0 0 0-.007.262c-.042.264-.063.532-.063.8.021.785.143 1.565.363 2.32l.109-.38c.049-.19.363-1.437.363-1.437s-.078 1.663-.188 2.165l-.086.413c.365 1.075.975 2.05 1.782 2.849.315.28.66.524 1.03.727.692-.107 1.39-.16 2.09-.161.563-.059 1.128.07 1.61.365.109.11.174.256.182.41a1.4 1.4 0 0 1-.038.238c.008-.044.008-.256-.628-.464-.846-.164-1.715-.177-2.565-.036 1.303.651 2.57.975 2.972.78a1.4 1.4 0 0 0 .28-.216 2.17 2.17 0 0 1-.137.453 1.4 1.4 0 0 1-.318.234c-1.322.029-2.622-.344-3.727-1.069-1.627.255-3.23.645-4.793 1.165-1.393 2.496-2.44 3.643-3.291 3.206l-.313-.161a.497.497 0 0 1-.164-.328.497.497 0 0 1 .076-.295c.099-.497.708-1.245 1.932-1.993.131-.081.718-.398.718-.398s-.435.43-.536.514c-.779.558-1.366 1.343-1.679 2.248v.034c.83-.12 2.074-1.848 3.673-5.048m.52.252c-.267.514-.53.992-.77 1.43 1.331-.546 2.718-.946 4.135-1.196a10.21 10.21 0 0 1-.537-.56 8.195 8.195 0 0 1-1.372-1.862c-.307.857-.671 1.692-1.09 2.499" fill="#D3D3D3" stroke="#D3D3D3" strokeWidth="0.2"/>
  </svg>
)

// ─── File icon (타입별 분기) ──────────────────────────────────────────────────

const FileTypeIcon: React.FC<{ type?: string }> = ({ type = 'FILE' }) => {
  const isPdf = type?.toUpperCase() === 'PDF'
  if (isPdf) return <PdfFileIcon />
  return (
    <div className="relative w-10 h-10 flex items-center justify-center">
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <path d="M27.419 2.728H6.364A1.818 1.818 0 0 0 4.546 4.546V35.455A1.818 1.818 0 0 0 6.364 37.273H33.637A1.818 1.818 0 0 0 35.455 35.455V10.663L27.419 2.728Z" fill="white"/>
        <path d="M6.364 37.727a2.273 2.273 0 0 1-2.273-2.272V4.545a2.273 2.273 0 0 1 2.273-2.273h21.239L35.91 10.473V35.455a2.273 2.273 0 0 1-2.273 2.272H6.364ZM5 4.545v30.91c0 .75.608 1.363 1.364 1.363H33.636A1.364 1.364 0 0 0 35 35.455V11.105h-6.67a1.364 1.364 0 0 1-1.364-1.364V3.182H6.364A1.364 1.364 0 0 0 5 4.545Z" fill="#D3D3D3"/>
        <rect x="4" y="26" width="32" height="12" rx="1.8" fill="#949daf"/>
      </svg>
      <span className="absolute bottom-[3px] left-1/2 -translate-x-1/2 bg-neutral-600 text-white text-[7px] font-bold px-0.5 rounded-sm leading-[10px]">
        {type.slice(0, 3).toUpperCase()}
      </span>
    </div>
  )
}

// ─── Warning icon — Figma 원본 ic_warning_fill (24×24) ───────────────────────

const WarningIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M12.001 2c.468 0 .928.122 1.332.354.404.232.738.565.967.965l7.362 12.829c.225.393.341.838.337 1.289a2.706 2.706 0 0 1-.388 1.385 2.71 2.71 0 0 1-1.005.942 2.716 2.716 0 0 1-1.268.236H4.639a2.716 2.716 0 0 1-1.268-.235 2.71 2.71 0 0 1-1.011-.938A2.706 2.706 0 0 1 2 17.435a2.7 2.7 0 0 1 .339-1.29L9.701 3.32A2.71 2.71 0 0 1 12.001 2ZM12 15.4a1.3 1.3 0 1 0 0 2.6 1.3 1.3 0 0 0 0-2.6ZM12 6a1.3 1.3 0 0 0-1.3 1.333V12.667A1.3 1.3 0 1 0 13.3 12.667V7.333A1.3 1.3 0 0 0 12 6Z" fill="#FFA000"/>
  </svg>
)

// ─── CheckboxSingle — Figma 원본 SVG (24×24, 원형) ───────────────────────────

const CheckboxSingle: React.FC<{ checked: boolean }> = ({ checked }) =>
  checked ? (
    // State=Selected: #719BFC 원 + 흰 체크마크
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2C10.022 2 8.089 2.586 6.444 3.685 4.8 4.784 3.518 6.346 2.761 8.173c-.757 1.828-.955 3.838-.569 5.778.386 1.94 1.338 3.722 2.737 5.12 1.398 1.4 3.18 2.352 5.12 2.738 1.939.386 3.95.188 5.777-.569 1.827-.757 3.389-2.04 4.488-3.684C21.413 15.912 22 13.978 22 12a10 10 0 0 0-10-10Z" fill="#719BFC"/>
      <path d="M15.951 8.493 10.984 13.408l-2.334-2.394a1 1 0 0 0-1.41 1.42l3.043 3.104c.187.186.441.291.705.291s.518-.105.694-.291l5.677-5.626a1 1 0 0 0-1.408-1.419Z" fill="white"/>
    </svg>
  ) : (
    // State=Default: 흰 원 + #E1E1E1 border
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2.5a9.5 9.5 0 1 0 0 19 9.5 9.5 0 0 0 0-19Z" fill="white" stroke="#E1E1E1"/>
    </svg>
  )

// ─── Action bar (Hovered state) ───────────────────────────────────────────────
// h:26, bg rgba(0,0,0,0.4), 하단 중앙

const HoverActionBar: React.FC<{
  onExport?: () => void
  onDownload?: () => void
  onDelete?: () => void
}> = ({ onExport, onDownload, onDelete }) => (
  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center bg-black/40 rounded h-[26px] px-2 gap-0">
    {onExport && (
      <button type="button" onClick={onExport} className="flex items-center justify-center w-[18px] h-[18px] text-white hover:opacity-80" aria-label="내보내기">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 9v3h10V9M7 1v7M4 4l3-3 3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
    )}
    {onExport && onDownload && <div className="w-px h-3 bg-white/40 mx-1"/>}
    {onDownload && (
      <button type="button" onClick={onDownload} className="flex items-center justify-center w-[18px] h-[18px] text-white hover:opacity-80" aria-label="다운로드">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 9v3h10V9M7 1v7M4 8l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
    )}
    {onDownload && onDelete && <div className="w-px h-3 bg-white/40 mx-1"/>}
    {onDelete && (
      <button type="button" onClick={onDelete} className="flex items-center justify-center w-[18px] h-[18px] text-white hover:opacity-80" aria-label="삭제">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 3.5h10M5 3.5V2h4v1.5M5.5 5.5v5M8.5 5.5v5M3 3.5l.5 8.5h7l.5-8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
    )}
  </div>
)

// ─── Thumbnail ────────────────────────────────────────────────────────────────

const Thumbnail: React.FC<ThumbnailProps> = ({
  src,
  filename = '파일명',
  extension = '',
  author,
  fileSize,
  state = 'default',
  fileType,
  selectable = false,
  selected = false,
  onSelect,
  onExport,
  onDownload,
  onDelete,
  className = '',
}) => {
  const isSelected = state === 'selected' || selected
  const isHovered  = state === 'hovered'
  const isFile     = state === 'file'
  const isWarning  = state === 'warning'

  // 이미지 border 색상 — Default/Hovered: rgba(0,0,0,0.06) / Selected: #105aff
  const imageBorderClass = isSelected
    ? 'border-2 border-primary-base'
    : 'border border-black/[0.06]'

  return (
    // 외부: 190×161, r:12
    <div
      className={[
        'w-full rounded-xl overflow-hidden',
        className,
      ].join(' ')}
    >
      {/* 4px 패딩: outer 12px radius와 image 8px radius 사이 공간 확보 */}
      <div className="pt-1 px-1">
      {/* preview-image: r:8 */}
      <div
        className={[
          'relative w-full aspect-[182/104] rounded-[8px] overflow-hidden flex items-center justify-center',
          isFile || isWarning ? 'bg-white' : '',
          imageBorderClass,
        ].join(' ')}
      >
        {/* 이미지 — src 없으면 풍경 플레이스홀더 */}
        {!isFile && !isWarning && (
          <img
            src={src || 'https://picsum.photos/seed/wehago/182/104'}
            alt={filename}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* 파일 아이콘 (State=File) */}
        {isFile && <FileTypeIcon type={fileType}/>}

        {/* 경고 아이콘 (State=Warning) */}
        {isWarning && <WarningIcon/>}

        {/* 어두운 오버레이 */}
        {!isFile && !isWarning && (
          <div className="absolute inset-0 bg-black/[0.16] pointer-events-none"/>
        )}

        {/* Action bar (Hovered) */}
        {isHovered && (
          <HoverActionBar onExport={onExport} onDownload={onDownload} onDelete={onDelete}/>
        )}

        {/* Checkbox: top 6px, right 6px, 24×24 */}
        {selectable && (
          <button
            type="button"
            onClick={onSelect}
            className="absolute top-[6px] right-[6px] focus:outline-none"
            aria-label={isSelected ? '선택 해제' : '선택'}
          >
            <CheckboxSingle checked={isSelected}/>
          </button>
        )}
      </div>
      </div>{/* /pt-1 px-1 wrapper */}

      {/* Info */}
      <div className="px-2 pt-1.5 pb-2">
        {/* Filename: 14px Regular #333333, h:21 */}
        <p className="text-body3 font-regular text-secondary-800 truncate leading-[21px]">
          {filename}{extension}
        </p>
        {/* Subtext: 12px Regular #777777, h:18 */}
        {(author || fileSize) && (
          <div className="flex items-center gap-1 text-body5 font-regular text-secondary-600 overflow-hidden leading-[18px]">
            {author && <span className="truncate">{author}</span>}
            {author && fileSize && (
              <span className="w-px shrink-0" style={{ height: 10, backgroundColor: '#e1e1e1' }} aria-hidden="true" />
            )}
            {fileSize && <span className="truncate">{fileSize}</span>}
          </div>
        )}
      </div>
    </div>
  )
}

export default Thumbnail

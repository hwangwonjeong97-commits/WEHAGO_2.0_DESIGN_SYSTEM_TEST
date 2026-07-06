import React, { useRef, useState, useCallback } from 'react'

// ─── Figma specs ──────────────────────────────────────────────────────────────
// FileUpload (Type=Default):
//   bg #f7f8fa (neutral-30), cornerRadius: 12, NO dashed border
//   Icon: document add 40×40 (top-center)
//   Text: "파일을 직접 선택하거나..." 13px Medium #333333
//   Sub:  "(2GB 이하..." 11px Regular #777777
//   Buttons: "내 PC" (62×28) + "WE Drive" (80×28), border #b4b4b4, r:6, 12px Regular
//
// FileUpload (Type=Result):
//   Same bg, shows file list
//   Each file: file icon(18px) + name(13px Regular #333333) + close(14px)
//
// FileUploadBar:
//   bg rgba(0,0,0,0.6), r:8, white text
//   Progress bar: bg rgba(0,0,0,0.6), filled #719bfc (primary-300), r:20

// ─── Icons ────────────────────────────────────────────────────────────────────

// ic_docu_add_thin 40×40 — 피그마 원본
const DocAddIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
    <path d="M21.6758 15.3337C22.136 15.3337 22.5091 15.7068 22.5091 16.167V19.8894H26.2331C26.693 19.8898 27.0664 20.2627 27.0664 20.7227C27.0664 21.1827 26.693 21.5556 26.2331 21.556H22.5091V25.2784C22.5087 25.7382 22.1358 26.1117 21.6758 26.1117C21.2158 26.1117 20.8429 25.7382 20.8424 25.2784V21.556H17.1217C16.6615 21.556 16.2884 21.1829 16.2884 20.7227C16.2884 20.2625 16.6615 19.8894 17.1217 19.8894H20.8424V16.167C20.8424 15.7068 21.2155 15.3337 21.6758 15.3337Z" fill="#B4B4B4"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M24.2067 3.33337C24.4362 3.33352 24.659 3.40097 24.848 3.52543L25.0254 3.66866L33.152 11.6748C33.3748 11.8943 33.5005 12.1938 33.5003 12.5066L33.4987 13.1739C33.5036 13.2103 33.5101 13.2468 33.5101 13.2845C33.5101 13.3223 33.5036 13.3588 33.4987 13.3952L33.4775 30.503C33.4762 31.594 32.8571 32.5386 31.9525 33.0111V34.1667C31.9525 35.5474 30.8332 36.6667 29.4525 36.6667H11.5C8.83055 36.6667 6.66592 34.5022 6.66602 31.8327L6.66764 10.8334C6.66769 9.45268 7.78695 8.33335 9.16764 8.33337H9.8431V7.8337C9.8431 5.34842 11.8581 3.33337 14.3434 3.33337H24.2067ZM9.16764 10C8.70741 10 8.33433 10.3731 8.33431 10.8334L8.33268 31.8327C8.33262 33.5817 9.75105 35 11.5 35H29.4525C29.9127 35 30.2858 34.6269 30.2858 34.1667V33.3334H12.6768C11.1119 33.3334 9.8431 32.0645 9.8431 30.4997V10H9.16764ZM14.3434 5.00004C12.7786 5.00004 11.5098 6.26889 11.5098 7.8337V30.4997C11.5098 31.144 12.0324 31.6667 12.6768 31.6667H30.6439C31.2876 31.6667 31.8101 31.1451 31.8109 30.5013L31.8304 14.1179H25.901C24.6165 14.1176 23.4275 13.1709 23.4271 11.8148V5.00004H14.3434ZM25.0938 11.8148C25.0942 12.086 25.3633 12.4509 25.901 12.4512H31.5667L25.0938 6.07589V11.8148Z" fill="#B4B4B4"/>
  </svg>
)

const FileIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className="flex-shrink-0">
    <path d="M4 2h7l5 5v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" stroke="#949daf" strokeWidth="1.2" fill="none" />
    <path d="M11 2v5h5" stroke="#949daf" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
)

const CloseIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M3 3l8 8M11 3L3 11" stroke="#949daf" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
)

// ic_upload 14×14 — 피그마 원본
const UploadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M11.8125 8.45833C12.0541 8.45833 12.25 8.65421 12.25 8.89583V10.5291C12.25 11.4794 11.4794 12.25 10.5291 12.25H3.47095C2.55032 12.25 1.79847 11.5271 1.75228 10.6179L1.75 10.5291V8.89583C1.75 8.65421 1.94588 8.45833 2.1875 8.45833C2.42912 8.45833 2.625 8.65421 2.625 8.89583V10.5291L2.62956 10.6156C2.67288 11.0422 3.03301 11.375 3.47095 11.375H10.5291C10.9962 11.375 11.375 10.9962 11.375 10.5291V8.89583C11.375 8.65421 11.5709 8.45833 11.8125 8.45833Z" fill="#4A4A4A"/>
    <path d="M7 1.75C7.12765 1.75 7.24131 1.80578 7.32129 1.89299C7.33113 1.90139 7.34103 1.90989 7.35034 1.91919L9.64266 4.21151C9.81351 4.38236 9.81351 4.65931 9.64266 4.83016C9.4718 5.00101 9.19486 5.00101 9.02401 4.83016L7.4375 3.24365V9.47917C7.4375 9.72079 7.24162 9.91667 7 9.91667C6.75838 9.91667 6.5625 9.72079 6.5625 9.47917V3.24365L4.97599 4.83016C4.80514 5.00101 4.52819 5.00101 4.35734 4.83016C4.18652 4.6593 4.1865 4.38235 4.35734 4.21151L6.64966 1.91919C6.65887 1.90999 6.66842 1.90131 6.67814 1.89299C6.75813 1.80562 6.87221 1.75 7 1.75Z" fill="#4A4A4A"/>
  </svg>
)

// ic_cloud 14×14 — 피그마 원본
const CloudIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M6.99935 2.77084C8.76178 2.77084 10.2672 3.91558 10.6788 5.4961C11.9198 5.83154 12.8327 6.9653 12.8327 8.31251C12.8327 9.92334 11.5268 11.2292 9.91602 11.2292H4.08268C2.47185 11.2292 1.16602 9.92334 1.16602 8.31251C1.16602 6.96595 2.07806 5.83272 3.3182 5.49667C3.72956 3.91561 5.23668 2.77084 6.99935 2.77084ZM6.99935 3.64584C5.53654 3.64584 4.35356 4.6401 4.1237 5.9017C4.08633 6.10681 3.92533 6.26586 3.72152 6.30217C2.76625 6.4724 2.04102 7.30838 2.04102 8.31251C2.04102 9.44009 2.9551 10.3542 4.08268 10.3542H9.91602C11.0436 10.3542 11.9577 9.44009 11.9577 8.31251C11.9577 7.30824 11.2321 6.47222 10.2766 6.30217C10.0728 6.26586 9.91181 6.10681 9.87443 5.9017C9.64452 4.64004 8.46202 3.64584 6.99935 3.64584Z" fill="#4A4A4A"/>
  </svg>
)

// ─── Types ────────────────────────────────────────────────────────────────────

interface UploadedFile {
  file: File
  id: string
  error?: string
}

interface FileUploadProps {
  onUpload?: (files: File[]) => void
  onWeDrive?: () => void
  accept?: string
  multiple?: boolean
  maxSize?: number          // MB 단위
  maxCount?: number
}

// ─── FileUpload ───────────────────────────────────────────────────────────────

const FileUpload: React.FC<FileUploadProps> = ({
  onUpload,
  onWeDrive,
  accept,
  multiple = true,
  maxSize = 2048,   // 2GB
  maxCount = 5,
}) => {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const addFiles = useCallback((newFiles: FileList | null) => {
    if (!newFiles) return
    const arr = Array.from(newFiles)
    const valid = arr.filter(f => {
      if (maxSize && f.size > maxSize * 1024 * 1024) return false
      return true
    })
    const added: UploadedFile[] = valid.map(f => ({
      file: f,
      id: `${f.name}-${Date.now()}-${Math.random()}`,
    }))
    setFiles(prev => {
      const next = [...prev, ...added].slice(0, maxCount)
      onUpload?.(next.map(f => f.file))
      return next
    })
  }, [maxSize, maxCount, onUpload])

  const removeFile = (id: string) => {
    setFiles(prev => {
      const next = prev.filter(f => f.id !== id)
      onUpload?.(next.map(f => f.file))
      return next
    })
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(true)
  }

  const handleDragLeave = () => setDragging(false)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    addFiles(e.dataTransfer.files)
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={[
        'rounded-xl transition-colors duration-150',
        dragging ? 'bg-primary-50 ring-2 ring-primary-300' : 'bg-neutral-30',
      ].join(' ')}
    >
      {/* Drop zone */}
      <div className="flex flex-col items-center gap-3 px-4 pt-6 pb-3">
        <DocAddIcon />

        <div className="text-center space-y-1">
          <p className="text-body4 font-medium text-secondary-800">
            파일을 직접 선택하거나 여기로 드래그해 업로드하세요.
          </p>
          <p className="text-body6 font-regular text-secondary-600">
            ({maxSize >= 1024 ? `${maxSize / 1024}GB` : `${maxSize}MB`} 이하 파일을 최대 {maxCount}개까지 첨부할 수 있습니다.)
          </p>
        </div>

        {/* Upload buttons */}
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="inline-flex items-center gap-1 h-7 px-2.5 rounded-md border border-secondary-400 bg-white text-body5 font-regular text-secondary-800 hover:bg-secondary-50 transition-colors"
          >
            <UploadIcon />
            내 PC
          </button>
          {onWeDrive && (
            <button
              type="button"
              onClick={onWeDrive}
              className="inline-flex items-center gap-1 h-7 px-2.5 rounded-md border border-secondary-400 bg-white text-body5 font-regular text-secondary-800 hover:bg-secondary-50 transition-colors"
            >
              <CloudIcon />
              WE Drive
            </button>
          )}
        </div>

        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          onChange={e => addFiles(e.target.files)}
        />
      </div>

      {/* File list */}
      {files.length > 0 && (
        <ul className="px-4 pb-3 space-y-1">
          {files.map(({ id, file }) => (
            <li key={id} className="flex items-center gap-2 h-5">
              <FileIcon />
              <span className="flex-1 min-w-0 text-body4 font-regular text-secondary-800 truncate">
                {file.name}
              </span>
              <button
                type="button"
                onClick={() => removeFile(id)}
                aria-label={`${file.name} 제거`}
                className="flex-shrink-0 flex items-center justify-center hover:opacity-60 transition-opacity focus:outline-none"
              >
                <CloseIcon size={14} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

// ─── FileUploadBar ────────────────────────────────────────────────────────────
// Figma: bg rgba(0,0,0,0.6), r:8, white text
// Progress filled: #719bfc (primary-300)

interface FileUploadBarProps {
  title: string
  filename?: string
  fileSize?: string
  progress: number      // 0-100
  expanded?: boolean
  onCancel?: () => void
  onClose?: () => void
}

export const FileUploadBar: React.FC<FileUploadBarProps> = ({
  title,
  filename,
  fileSize,
  progress,
  expanded = false,
  onCancel,
  onClose,
}) => {
  return (
    <div className={[
      'bg-black/60 rounded-lg text-white',
      expanded ? 'flex items-center gap-4 px-4 py-3' : 'px-4 py-3',
    ].join(' ')}>
      {expanded ? (
        <>
          {/* Left: title + subtitle */}
          <div className="flex-shrink-0 w-56">
            <p className="text-body3 font-bold truncate">{title}</p>
            {filename && (
              <p className="text-body4 font-regular text-white/80 truncate">
                {filename} {fileSize && <span>{fileSize}</span>}
              </p>
            )}
          </div>
          {/* Progress bar */}
          <div className="flex-1 flex items-center gap-2">
            <div className="flex-1 h-1.5 rounded-full bg-black/60">
              <div
                className="h-full rounded-full bg-[#719bfc] transition-all duration-300"
                style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
              />
            </div>
            <span className="text-body3 font-bold w-10 text-right">{progress}%</span>
          </div>
          {/* Cancel button */}
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-shrink-0 h-8 px-3 rounded-md border border-secondary-400 text-body3 font-regular text-white hover:bg-white/10 transition-colors"
            >
              다운로드 취소
            </button>
          )}
        </>
      ) : (
        <>
          <div className="flex items-center justify-between mb-2">
            <p className="text-body3 font-medium truncate flex-1">{title}</p>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="flex-shrink-0 ml-2 hover:opacity-60 transition-opacity focus:outline-none"
                aria-label="닫기"
              >
                <CloseIcon size={18} />
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 rounded-full bg-black/60">
              <div
                className="h-full rounded-full bg-[#719bfc] transition-all duration-300"
                style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
              />
            </div>
            <span className="text-body3 font-bold w-10 text-right">{progress}%</span>
          </div>
        </>
      )}
    </div>
  )
}

export default FileUpload

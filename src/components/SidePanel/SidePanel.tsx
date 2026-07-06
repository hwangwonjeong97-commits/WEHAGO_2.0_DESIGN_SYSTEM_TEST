import React, { useEffect, useRef } from 'react';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export type SidePanelWidth = 'sm' | 'md' | 'lg';

export interface SidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  width?: SidePanelWidth;
  closeOnOverlayClick?: boolean;
  className?: string;
}

// ─────────────────────────────────────────────
// Width map
// ─────────────────────────────────────────────

const widthMap: Record<SidePanelWidth, string> = {
  sm: 'w-[320px]',
  md: 'w-[480px]',
  lg: 'w-[640px]',
};

// ─────────────────────────────────────────────
// Close Icon
// ─────────────────────────────────────────────

const CloseIcon: React.FC = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M5 5L15 15M15 5L5 15"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

// ─────────────────────────────────────────────
// SidePanel
// ─────────────────────────────────────────────

export const SidePanel: React.FC<SidePanelProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  width = 'md',
  closeOnOverlayClick = true,
  className = '',
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus management: focus close button when panel opens
  useEffect(() => {
    if (isOpen) {
      const frame = requestAnimationFrame(() => {
        closeButtonRef.current?.focus();
      });
      return () => cancelAnimationFrame(frame);
    }
  }, [isOpen]);

  // Keyboard: close on Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        className={[
          'fixed inset-0 z-40 bg-black/40 transition-opacity duration-300',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        ]
          .filter(Boolean)
          .join(' ')}
        aria-hidden={!isOpen}
        onClick={closeOnOverlayClick ? onClose : undefined}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        aria-hidden={!isOpen}
        className={[
          'fixed top-0 right-0 h-full z-50 bg-white shadow-xl flex flex-col transition-transform duration-300',
          widthMap[width],
          isOpen ? 'translate-x-0' : 'translate-x-full',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {/* Header */}
        <div className="h-14 flex-shrink-0 px-5 border-b border-secondary-100 flex items-center justify-between gap-3">
          {title && (
            <h2 className="text-body1 font-bold text-secondary-900 truncate flex-1">
              {title}
            </h2>
          )}
          {!title && <div className="flex-1" aria-hidden="true" />}
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="패널 닫기"
            onClick={onClose}
            className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-md text-secondary-600 hover:bg-secondary-50 hover:text-secondary-800 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-base"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex-shrink-0 border-t border-secondary-100 px-5 py-4 flex items-center justify-end gap-2">
            {footer}
          </div>
        )}
      </div>
    </>
  );
};

export default SidePanel;

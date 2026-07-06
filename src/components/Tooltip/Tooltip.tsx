import React, { useRef, useState } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

interface TooltipProps {
  content: string;
  placement?: TooltipPlacement;
  // React 19: ReactElement props default to unknown → <any>로 명시해 cloneElement/props 접근 허용
  children: React.ReactElement<any>;
}

// ─── Arrow styles (CSS border trick) ─────────────────────────────────────────
// Each arrow is an absolutely-positioned element whose borders create a triangle.

const arrowBase = 'absolute w-0 h-0 pointer-events-none';

const arrowStyles: Record<TooltipPlacement, { wrapper: string; arrow: string }> = {
  top: {
    wrapper: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    arrow: [
      arrowBase,
      'top-full left-1/2 -translate-x-1/2',
      'border-l-[5px] border-l-transparent',
      'border-r-[5px] border-r-transparent',
      'border-t-[5px] border-t-secondary-900',
    ].join(' '),
  },
  bottom: {
    wrapper: 'top-full left-1/2 -translate-x-1/2 mt-2',
    arrow: [
      arrowBase,
      'bottom-full left-1/2 -translate-x-1/2',
      'border-l-[5px] border-l-transparent',
      'border-r-[5px] border-r-transparent',
      'border-b-[5px] border-b-secondary-900',
    ].join(' '),
  },
  left: {
    wrapper: 'right-full top-1/2 -translate-y-1/2 mr-2',
    arrow: [
      arrowBase,
      'left-full top-1/2 -translate-y-1/2',
      'border-t-[5px] border-t-transparent',
      'border-b-[5px] border-b-transparent',
      'border-l-[5px] border-l-secondary-900',
    ].join(' '),
  },
  right: {
    wrapper: 'left-full top-1/2 -translate-y-1/2 ml-2',
    arrow: [
      arrowBase,
      'right-full top-1/2 -translate-y-1/2',
      'border-t-[5px] border-t-transparent',
      'border-b-[5px] border-b-transparent',
      'border-r-[5px] border-r-secondary-900',
    ].join(' '),
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  placement = 'top',
  children,
}) => {
  const [visible, setVisible] = useState(false);
  const showTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => {
    showTimer.current = setTimeout(() => setVisible(true), 300);
  };

  const hide = () => {
    if (showTimer.current) {
      clearTimeout(showTimer.current);
      showTimer.current = null;
    }
    setVisible(false);
  };

  const { wrapper, arrow } = arrowStyles[placement];

  // Clone the trigger child to attach event handlers
  const trigger = React.cloneElement(children, {
    onMouseEnter: (e: React.MouseEvent) => {
      show();
      children.props.onMouseEnter?.(e);
    },
    onMouseLeave: (e: React.MouseEvent) => {
      hide();
      children.props.onMouseLeave?.(e);
    },
    onFocus: (e: React.FocusEvent) => {
      show();
      children.props.onFocus?.(e);
    },
    onBlur: (e: React.FocusEvent) => {
      hide();
      children.props.onBlur?.(e);
    },
  });

  return (
    <span className="relative inline-flex">
      {trigger}

      {visible && (
        <span
          role="tooltip"
          className={[
            // Figma: bg #222222, r:6, text 11px Regular white, px:12 py:8
            'absolute z-50 whitespace-nowrap',
            'bg-[#222222] text-white',
            'text-body6 font-regular px-3 py-2 rounded-md shadow-[0_4px_12px_rgba(0,0,0,0.1)]',
            wrapper,
          ].join(' ')}
        >
          {content}
          <span className={arrow} aria-hidden="true" />
        </span>
      )}
    </span>
  );
};

export default Tooltip;

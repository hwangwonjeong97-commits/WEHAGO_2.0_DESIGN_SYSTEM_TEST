import React from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type LoadingVariant = 'spinner' | 'skeleton' | 'dots';
export type LoadingSize = 'sm' | 'md' | 'lg';

// ─── Spinner ──────────────────────────────────────────────────────────────────

const spinnerSizeMap: Record<LoadingSize, string> = {
  sm: 'w-4 h-4 border-2',
  md: 'w-6 h-6 border-[3px]',
  lg: 'w-10 h-10 border-4',
};

interface SpinnerProps {
  size?: LoadingSize;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 'md' }) => (
  <span
    role="status"
    aria-label="로딩 중"
    className={[
      'inline-block rounded-full',
      'border-secondary-100 border-t-primary-base',
      'animate-spin',
      spinnerSizeMap[size],
    ].join(' ')}
  />
);

// ─── Dots ─────────────────────────────────────────────────────────────────────

const dotSizeMap: Record<LoadingSize, string> = {
  sm: 'w-1.5 h-1.5',
  md: 'w-2 h-2',
  lg: 'w-3 h-3',
};

const DOT_DELAYS = ['[animation-delay:0ms]', '[animation-delay:150ms]', '[animation-delay:300ms]'];

interface DotsProps {
  size?: LoadingSize;
}

const Dots: React.FC<DotsProps> = ({ size = 'md' }) => (
  <span role="status" aria-label="로딩 중" className="inline-flex items-center gap-1">
    {DOT_DELAYS.map((delay, i) => (
      <span
        key={i}
        className={[
          'rounded-full bg-primary-base animate-bounce',
          dotSizeMap[size],
          delay,
        ].join(' ')}
      />
    ))}
  </span>
);

// ─── Skeleton ─────────────────────────────────────────────────────────────────

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  rounded?: string;
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = '1rem',
  rounded = 'rounded',
  className = '',
}) => {
  const style: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  return (
    <span
      role="status"
      aria-label="로딩 중"
      style={style}
      className={[
        'inline-block bg-secondary-100 animate-pulse',
        rounded,
        className,
      ].join(' ')}
    />
  );
};

// ─── Unified Loading component ────────────────────────────────────────────────

interface LoadingSpinnerProps {
  variant?: 'spinner';
  size?: LoadingSize;
}

interface LoadingDotsProps {
  variant: 'dots';
  size?: LoadingSize;
}

interface LoadingSkeletonProps {
  variant: 'skeleton';
  width?: string | number;
  height?: string | number;
  rounded?: string;
  className?: string;
}

type LoadingProps = LoadingSpinnerProps | LoadingDotsProps | LoadingSkeletonProps;

export const Loading: React.FC<LoadingProps> = (props) => {
  if (props.variant === 'dots') {
    return <Dots size={props.size} />;
  }

  if (props.variant === 'skeleton') {
    return (
      <Skeleton
        width={props.width}
        height={props.height}
        rounded={props.rounded}
        className={props.className}
      />
    );
  }

  // Default: spinner
  return <Spinner size={(props as LoadingSpinnerProps).size} />;
};

// ─── Loader ───────────────────────────────────────────────────────────────────
// Figma Loader: small spinner(~14px) + text "데이터를 불러오는 중입니다." 14px Regular #777777
// 스피너와 텍스트가 세로로 쌓임, 전체 너비 중앙 정렬

interface LoaderProps {
  text?: string
  direction?: 'vertical' | 'horizontal'
}

export const Loader: React.FC<LoaderProps> = ({
  text = '데이터를 불러오는 중입니다.',
  direction = 'vertical',
}) => (
  <div
    className={[
      direction === 'vertical'
        ? 'flex flex-col items-center gap-2'
        : 'flex flex-row items-center gap-2',
    ].join(' ')}
    role="status"
    aria-label={text}
  >
    <Spinner size="sm" />
    <p className="text-body3 font-regular text-secondary-600">{text}</p>
  </div>
);

// Named exports for individual usage
export { Spinner, Dots, Skeleton };

export default Loading;

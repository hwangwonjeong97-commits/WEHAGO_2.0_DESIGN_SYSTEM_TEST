import React, { useState } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type FeedbackType = 'rating' | 'like' | 'reaction';

// ─── Rating ───────────────────────────────────────────────────────────────────

interface RatingProps {
  value?: number;
  onChange?: (value: number) => void;
  max?: number;
  readOnly?: boolean;
}

const StarIcon: React.FC<{ filled: boolean }> = ({ filled }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

export const Rating: React.FC<RatingProps> = ({
  value = 0,
  onChange,
  max = 5,
  readOnly = false,
}) => {
  const [hovered, setHovered] = useState<number>(0);

  const display = hovered > 0 ? hovered : value;

  return (
    <div role="group" aria-label="별점" className="flex items-center gap-1">
      {Array.from({ length: max }, (_, i) => {
        const starValue = i + 1;
        const isFilled = starValue <= display;

        return (
          <button
            key={starValue}
            type="button"
            aria-label={`${starValue}점`}
            disabled={readOnly}
            onClick={() => onChange?.(starValue)}
            onMouseEnter={() => !readOnly && setHovered(starValue)}
            onMouseLeave={() => !readOnly && setHovered(0)}
            className={[
              'transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-base rounded',
              isFilled
                ? 'text-pending-warningPoint'
                : 'text-secondary-200',
              readOnly ? 'cursor-default' : 'hover:text-pending-warningPoint',
            ].join(' ')}
          >
            <StarIcon filled={isFilled} />
          </button>
        );
      })}
    </div>
  );
};

// ─── Like ─────────────────────────────────────────────────────────────────────

interface LikeProps {
  count?: number;
  liked?: boolean;
  onChange?: (liked: boolean) => void;
}

const HeartIcon: React.FC<{ filled: boolean }> = ({ filled }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

export const Like: React.FC<LikeProps> = ({
  count = 0,
  liked = false,
  onChange,
}) => {
  const [internalLiked, setInternalLiked] = useState(liked);
  const [internalCount, setInternalCount] = useState(count);

  const toggle = () => {
    const next = !internalLiked;
    setInternalLiked(next);
    setInternalCount((c) => (next ? c + 1 : Math.max(0, c - 1)));
    onChange?.(next);
  };

  return (
    <button
      type="button"
      aria-label={internalLiked ? '좋아요 취소' : '좋아요'}
      aria-pressed={internalLiked}
      onClick={toggle}
      className={[
        'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border',
        'text-body3 font-medium transition-colors',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-base',
        internalLiked
          ? 'border-negative-dangerPoint text-negative-dangerPoint bg-negative-100'
          : 'border-secondary-200 text-secondary-600 bg-white hover:border-secondary-400',
      ].join(' ')}
    >
      <HeartIcon filled={internalLiked} />
      <span>{internalCount.toLocaleString()}</span>
    </button>
  );
};

// ─── Reaction ─────────────────────────────────────────────────────────────────

const REACTIONS = [
  { emoji: '👍', label: '좋아요' },
  { emoji: '😊', label: '기쁨' },
  { emoji: '😐', label: '보통' },
  { emoji: '😕', label: '실망' },
  { emoji: '😢', label: '슬픔' },
] as const;

type ReactionEmoji = (typeof REACTIONS)[number]['emoji'];

interface ReactionProps {
  value?: ReactionEmoji | null;
  onChange?: (value: ReactionEmoji | null) => void;
}

export const Reaction: React.FC<ReactionProps> = ({ value = null, onChange }) => {
  const [selected, setSelected] = useState<ReactionEmoji | null>(value);

  const handleSelect = (emoji: ReactionEmoji) => {
    const next = selected === emoji ? null : emoji;
    setSelected(next);
    onChange?.(next);
  };

  return (
    <div role="group" aria-label="반응" className="flex items-center gap-1">
      {REACTIONS.map(({ emoji, label }) => {
        const isSelected = selected === emoji;
        return (
          <button
            key={emoji}
            type="button"
            aria-label={label}
            aria-pressed={isSelected}
            onClick={() => handleSelect(emoji)}
            className={[
              'w-10 h-10 flex items-center justify-center rounded-full text-xl',
              'transition-all border focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-base',
              isSelected
                ? 'border-primary-base bg-primary-50 scale-110'
                : 'border-secondary-100 bg-white hover:border-secondary-300 hover:bg-secondary-50',
            ].join(' ')}
          >
            {emoji}
          </button>
        );
      })}
    </div>
  );
};

// ─── Unified Feedback component ───────────────────────────────────────────────

interface FeedbackRatingProps {
  type: 'rating';
  value?: number;
  onChange?: (value: number) => void;
  max?: number;
  readOnly?: boolean;
}

interface FeedbackLikeProps {
  type: 'like';
  count?: number;
  liked?: boolean;
  onChange?: (liked: boolean) => void;
}

interface FeedbackReactionProps {
  type: 'reaction';
  value?: ReactionEmoji | null;
  onChange?: (value: ReactionEmoji | null) => void;
}

type FeedbackProps = FeedbackRatingProps | FeedbackLikeProps | FeedbackReactionProps;

export const Feedback: React.FC<FeedbackProps> = (props) => {
  if (props.type === 'rating') {
    const { type: _type, ...rest } = props;
    return <Rating {...rest} />;
  }
  if (props.type === 'like') {
    const { type: _type, ...rest } = props;
    return <Like {...rest} />;
  }
  if (props.type === 'reaction') {
    const { type: _type, ...rest } = props;
    return <Reaction {...rest} />;
  }
  return null;
};

export default Feedback;

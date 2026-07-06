import React from 'react';

/* ──────────────────────────────────────────────
   Number Picker
────────────────────────────────────────────── */
interface NumberPickerProps {
  type: 'number';
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

/* ──────────────────────────────────────────────
   Color Picker
────────────────────────────────────────────── */
interface ColorPickerProps {
  type: 'color';
  value: string;
  onChange: (value: string) => void;
}

type PickerProps = NumberPickerProps | ColorPickerProps;

/* ──────────────────────────────────────────────
   Color palette
────────────────────────────────────────────── */
const COLOR_PALETTE: { name: string; value: string }[] = [
  { name: 'primary-base', value: '#105aff' },
  { name: 'primary-50', value: '#eff4ff' },
  { name: 'primary-700', value: '#0943c6' },
  { name: 'positive-success', value: '#27c36f' },
  { name: 'negative-dangerPoint', value: '#fa4553' },
  { name: 'pending-yellow', value: '#f59e0b' },
  { name: 'secondary-900', value: '#222222' },
  { name: 'secondary-800', value: '#333333' },
  { name: 'secondary-600', value: '#777777' },
  { name: 'secondary-200', value: '#d3d3d3' },
  { name: 'secondary-100', value: '#e1e1e1' },
  { name: 'secondary-50', value: '#f4f4f4' },
  { name: 'secondary-0', value: '#ffffff' },
];

/* ──────────────────────────────────────────────
   Icons
────────────────────────────────────────────── */
const MinusIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
  </svg>
);

const PlusIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
  </svg>
);

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={3}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

/* ──────────────────────────────────────────────
   NumberPicker
────────────────────────────────────────────── */
const NumberPicker: React.FC<NumberPickerProps> = ({
  value,
  onChange,
  min,
  max,
  step = 1,
}) => {
  const decrement = () => {
    const next = value - step;
    if (min === undefined || next >= min) onChange(next);
  };

  const increment = () => {
    const next = value + step;
    if (max === undefined || next <= max) onChange(next);
  };

  const canDecrement = min === undefined || value - step >= min;
  const canIncrement = max === undefined || value + step <= max;

  return (
    <div className="inline-flex items-center h-9 border border-[#d3d3d3] rounded-md overflow-hidden w-24">
      <button
        type="button"
        onClick={decrement}
        disabled={!canDecrement}
        className="h-9 w-9 flex items-center justify-center border-r border-[#d3d3d3] text-[#333333] hover:bg-[#f4f4f4] disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex-shrink-0"
        aria-label="감소"
      >
        <MinusIcon className="w-3.5 h-3.5" />
      </button>

      <span
        className="flex-1 text-center font-medium text-[#222222] select-none"
        style={{ fontSize: '13px' }}
      >
        {value}
      </span>

      <button
        type="button"
        onClick={increment}
        disabled={!canIncrement}
        className="h-9 w-9 flex items-center justify-center border-l border-[#d3d3d3] text-[#333333] hover:bg-[#f4f4f4] disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex-shrink-0"
        aria-label="증가"
      >
        <PlusIcon className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

/* ──────────────────────────────────────────────
   ColorPicker
────────────────────────────────────────────── */
const ColorPicker: React.FC<ColorPickerProps> = ({ value, onChange }) => {
  return (
    <div className="flex flex-wrap gap-2 p-1">
      {COLOR_PALETTE.map((color) => {
        const isSelected = value.toLowerCase() === color.value.toLowerCase();
        const isLight =
          color.value === '#ffffff' || color.value === '#eff4ff' || color.value === '#f4f4f4';

        return (
          <button
            key={color.name}
            type="button"
            title={color.name}
            onClick={() => onChange(color.value)}
            className={[
              'w-6 h-6 rounded-full flex items-center justify-center transition-all flex-shrink-0',
              isLight ? 'border border-[#d3d3d3]' : '',
              isSelected ? 'ring-2 ring-offset-1 ring-[#105aff]' : '',
            ].join(' ')}
            style={{ backgroundColor: color.value }}
            aria-label={color.name}
            aria-pressed={isSelected}
          >
            {isSelected && (
              <CheckIcon
                className={`w-3 h-3 ${isLight ? 'text-[#105aff]' : 'text-white'}`}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};

/* ──────────────────────────────────────────────
   Picker (main export)
────────────────────────────────────────────── */
const Picker: React.FC<PickerProps> = (props) => {
  if (props.type === 'number') {
    return <NumberPicker {...props} />;
  }
  return <ColorPicker {...props} />;
};

export default Picker;

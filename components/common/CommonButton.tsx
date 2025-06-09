import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  size: 'L' | 'M' | 'S';
  variant?: 'primary' | 'secondary';
  children?: React.ReactNode;
  width?: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

function CommonButton({
  size = 'L',
  variant = 'primary',
  children,
  width,
  className,
  type = 'button',
  ...rest
}: Props) {
  return (
    <button type={type} className={clsx(SIZE_MAP[size], VARIANT_MAP[variant ?? 'primary'], width, className)} {...rest}>
      {children}
    </button>
  );
}

const SIZE_MAP: {
  L: string;
  M: string;
  S: string;
} = {
  L: 'p-[11px] h-[56px] lg-bold',
  M: 'p-[11px] h-[48px] lg-bold',
  S: 'p-[8px] h-[38px] md-bold',
};
const VARIANT_MAP: {
  primary: string;
  secondary: string;
} = {
  primary:
    'border border-nomad-black bg-nomad-black text-white font-bold text-center disabled:border-gray-600 disabled:bg-gray-600 disabled:text-white',
  secondary:
    'border border-nomad-black text-nomad-black font-bold text-center disabled:border-gray-600 disabled:bg-gray-600 disabled:text-white',
};

export default CommonButton;

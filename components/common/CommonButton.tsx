import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  size: 'L' | 'M' | 'S';
  variant?: 'primary' | 'secondary';
  children?: React.ReactNode;
  width?: string;
  className?: string;
}
const SIZE_MAP: {
  L: string;
  M: string;
  S: string;
} = {
  L: 'p-[11px] h-[56px] text-[16px] leading-[26px]',
  M: 'p-[11px] h-[48px] text-[16px] leading-[26px]',
  S: 'p-[8px] h-[38px] text-[14px] leading-[24px]',
};
const VARIANT_MAP: {
  primary: string;
  secondary: string;
} = {
  primary:
    'border-[#112211] bg-[#112211] rounded-xl text-white font-bold text-center disabled:border-[#A4A1AA] disabled:bg-[#A4A1AA] disabled:text-white',
  secondary:
    'border border-[#112211] rounded-lg text-[#112211] font-bold text-center  disabled:border-[#A4A1AA] disabled:bg-[#A4A1AA] disabled:text-white',
};
function commonButton({ size = 'L', variant = 'primary', children, width, className, ...rest }: Props) {
  return (
    <button className={clsx(SIZE_MAP[size], VARIANT_MAP[variant ?? 'primary'], width, className)} {...rest}>
      {children}
    </button>
  );
}
export default commonButton;

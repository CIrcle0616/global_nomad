'use client';
import { useEffect, useRef, useState } from 'react';
import Input from './Input';
import Image from 'next/image';
import ArrowIcon from '@/public/ic_arrow.svg';
import CheckIcon from '@/public/ic_check.svg';

type DropdownSelectProps = {
  options: string[];
  selected?: string;
  onSelect: (value: string) => void;
  placeholder: string;
};

export default function DropdownSelect({ onSelect, selected, placeholder, options }: DropdownSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); //외부 클릭 감지

  const toggle = () => setIsOpen(prev => !prev);
  const handleSelect = (value: string) => {
    onSelect(value);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative itmes-center max-w-[800px] w-full max-w-xs">
      <div onClick={toggle}>
        <Input
          value={selected || ''}
          placeholder={placeholder}
          onChange={() => {}}
          readOnly
          icon={
            <Image
              src={ArrowIcon}
              alt="아래방향 화살표"
              className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
            />
          }
        />
      </div>

      {isOpen && (
        <ul className="absolute top-full left-0 mt-2 w-full border border-gray-200 rounded-md bg-white shadow-md z-50">
          {options.map(option => (
            <li key={option} onClick={() => handleSelect(option)} className="px-2 py-2 cursor-pointer text-gray-900">
              <div className="group">
                <div className="flex items-center gap-2 w-full py-2 px-3 rounded-[6px] group-hover:bg-black group-hover:text-white transition-colors duration-200">
                  <Image src={CheckIcon} alt="체크" className="hidden group-hover:inline w-4 h-4" />
                  <span>{option}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

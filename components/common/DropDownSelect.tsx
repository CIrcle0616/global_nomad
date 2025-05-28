'use client';
import { useEffect, useRef, useState } from 'react';
import Input from './Input';
import Image from 'next/image';
import CheckIcon from '@/public/ic_check.svg';
import DatePicker from './DatePicker';

type DropdownSelectProps = {
  options?: string[];
  selected?: string;
  onSelect: (value: string) => void;
  placeholder: string;
  type?: 'list' | 'datepicker';
  icon?: React.ReactNode;
};

export default function DropdownSelect({
  onSelect,
  selected,
  placeholder,
  options,
  type = 'list',
  icon,
}: DropdownSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); //외부 클릭 감지

  const toggle = () => setIsOpen(prev => !prev);
  const handleSelect = (value: string) => {
    onSelect(value);
    setIsOpen(false);
  };

  const handleSelectDate = (date: Date | undefined) => {
    if (!date) return;
    onSelect(date.toLocaleDateString());
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
    <div ref={dropdownRef} className="relative">
      <div onClick={toggle}>
        <Input value={selected || ''} placeholder={placeholder} onChange={() => {}} readOnly icon={icon} />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full border border-gray-200 rounded-md bg-white shadow-md z-50">
          {type === 'list' && options && (
            <ul>
              {options.map(option => (
                <li
                  key={option}
                  onClick={() => handleSelect(option)}
                  className="px-2 py-2 cursor-pointer text-gray-900"
                >
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

          {type === 'datepicker' && (
            <DatePicker selected={selected ? new Date(selected) : undefined} onSelect={handleSelectDate} />
          )}
        </div>
      )}
    </div>
  );
}

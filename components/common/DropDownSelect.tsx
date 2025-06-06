'use client';
import { useEffect, useRef, useState } from 'react';
import Input from './Input';
import DatePicker from './DatePicker';
import DropdownMenu from './DropDown';

type DropdownSelectProps = {
  options: string[];
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

  if (type === 'list' && options) {
    return (
      <div className="w-full">
        <DropdownMenu
          options={options}
          onSelect={onSelect}
          trigger={
            <Input
              value={selected || ''}
              placeholder={placeholder}
              onChange={() => {}}
              readOnly
              icon={{ element: icon }}
            />
          }
        ></DropdownMenu>
      </div>
    );
  }

  return (
    <div ref={dropdownRef} className="relative w-full">
      <div onClick={toggle}>
        <Input value={selected || ''} placeholder={placeholder} onChange={() => {}} readOnly icon={{ element: icon }} />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full border border-gray-200 rounded-md bg-white shadow-md z-50">
          <DatePicker selected={selected ? new Date(selected) : undefined} onSelect={handleSelectDate} />
        </div>
      )}
    </div>
  );
}

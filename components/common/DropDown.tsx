'use client';
import { useEffect, useRef, useState } from 'react';

type DropdownMenuProps = {
  options: string[];
  onSelect: (value: string) => void;
  trigger: React.ReactNode; //필터, 아이콘 버튼
};

export default function DropdownMenu({ onSelect, options, trigger }: DropdownMenuProps) {
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
    <div ref={dropdownRef} className="relative inline-block">
      <div onClick={toggle}>{trigger}</div>
      {isOpen && (
        <ul className="absolute top-full mt-2 w-full min-w-[160px] border border-gray-200 rounded-md bg-white shadow-md z-50 divide-y divide-gray-200">
          {options.map(option => (
            <li
              key={option}
              onClick={() => handleSelect(option)}
              className="cursor-pointer py-3 hover:bg-gray-200 2lg-medium text-gray-900 text-center"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

'use client';
import { useEffect, useRef, useState } from 'react';

type DropdownMenuProps = {
  options: string[];
  onSelect: (value: string) => void;
  trigger: React.ReactNode; //필터, 아이콘 버튼
  children?: (option: string) => React.ReactNode;
};

export default function DropdownMenu({ onSelect, options, trigger, children }: DropdownMenuProps) {
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
    <div ref={dropdownRef} className="relative block">
      <div onClick={toggle}>{trigger}</div>
      {isOpen && (
        <ul className="absolute w-full min-w-[130px] whitespace-nowrap right-0 top-full border border-gray-200 shadow-md rounded-md bg-white z-50">
          {options.map(option => (
            <li
              key={option}
              onClick={() => handleSelect(option)}
              className="cursor-pointer py-3 px-4 border-b border-gray-300 last:border-b-0  hover:bg-gray-300"
            >
              {children ? children(option) : option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

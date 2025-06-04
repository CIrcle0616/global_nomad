'use client';

import React, { MouseEvent, useEffect, useRef } from 'react';
import { useModalStore } from '@/store/modalStore';

export default function GlobalModal() {
  const { isOpen, modalContent: ModalContentComponent, modalProps, closeModal } = useModalStore();
  const modalRef = useRef<HTMLDivElement>(null);

  // 모달이 열렸을 때 배경 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Esc로 모달 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, closeModal]);

  //모달 외부 클릭 시 닫기
  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      closeModal();
    }
  };

  if (!isOpen || !ModalContentComponent) {
    return null;
  }

  return (
    <div
      role="dialog"
      className="fixed inset-0 bg-[#000000B2] flex justify-center items-center z-[9999]"
      onClick={handleOverlayClick}
    >
      <div ref={modalRef}>{ModalContentComponent && <ModalContentComponent {...modalProps} />}</div>
    </div>
  );
}

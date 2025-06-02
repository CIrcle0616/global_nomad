'use client';
import { useModalStore } from '@/store';
import OneButtonModal from './OneButtonModal';
import TwoButtonModal from './TwoButtonModal';

export default function GlobalModal() {
  const { isOpen, modalType, modalProps, closeModal } = useModalStore();

  if (!isOpen || !modalType || !modalProps) return null;

  switch (modalType) {
    case 'oneButton':
      return (
        <OneButtonModal
          content={modalProps.content}
          buttonText={modalProps.buttonText}
          onConfirm={() => {
            modalProps.onConfirm();
            closeModal();
          }}
        />
      );
    case 'twoButton':
      return (
        <TwoButtonModal
          content={modalProps.content}
          rightButtonText={modalProps.rightButtonText}
          leftButtonText={modalProps.leftButtonText}
          onConfirm={() => {
            modalProps.onConfirm();
            closeModal();
          }}
          onCancel={() => {
            modalProps.onCancel?.();
            closeModal();
          }}
        />
      );
    default:
      return null;
  }
}

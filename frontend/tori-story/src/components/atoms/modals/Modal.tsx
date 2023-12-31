import React from 'react';
import { useLocation } from 'react-router-dom';

interface ModalProps {
  isOverlap?: boolean;
  hasModalImg?: boolean;
  useModal?: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
}

export default function Modal({
  isOverlap,
  hasModalImg,
  useModal,
  setIsModalOpen,
  children,
}: ModalProps) {
  const location = useLocation();

  const handleClose = () => {
    if (!useModal) {
      setIsModalOpen(false);
    }
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={handleClose}
      className={`h-full w-full fixed left-0 top-0 flex justify-center items-center bg-opacity-30 z-[10000] transition-opacity ${
        hasModalImg ? 'bg-black bg-opacity-25' : 'bg-gray-600'
      }`}
    >
      <div
        onClick={stopPropagation}
        className={`w-full rounded-[8px] z-50 transform scale-100 transition-transform ${
          hasModalImg
            ? ''
            : location.pathname === '/mytori' && isOverlap
            ? 'bg-white p-4'
            : 'bg-white mx-4 p-4'
        }`}
      >
        {children}
      </div>
    </div>
  );
}
